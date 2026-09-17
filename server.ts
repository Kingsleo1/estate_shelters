import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import * as db from './server/db';
import * as astra from './server/astra';
import * as gemini from './server/gemini';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // --- API ROUTES ---

  // Health Check
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'Estate Shelters API Server',
      cac: '9673843',
      timestamp: new Date().toISOString()
    });
  });

  // Properties API
  app.get('/api/properties', (req, res) => {
    let properties = db.getProperties();
    const { transaction, type, district, min_price, max_price, bedrooms, status, featured, q } = req.query;

    if (transaction && transaction !== 'All') {
      properties = properties.filter(p => p.transaction_type.toLowerCase() === String(transaction).toLowerCase());
    }
    if (type && type !== 'All') {
      properties = properties.filter(p => p.property_type.toLowerCase() === String(type).toLowerCase());
    }
    if (district && district !== 'All') {
      properties = properties.filter(p => p.district.toLowerCase().includes(String(district).toLowerCase()) || p.lga.toLowerCase().includes(String(district).toLowerCase()));
    }
    if (min_price) {
      properties = properties.filter(p => p.price >= Number(min_price));
    }
    if (max_price) {
      properties = properties.filter(p => p.price <= Number(max_price));
    }
    if (bedrooms && bedrooms !== 'Any') {
      if (bedrooms === '5+') {
        properties = properties.filter(p => p.bedrooms >= 5);
      } else {
        properties = properties.filter(p => p.bedrooms === Number(bedrooms));
      }
    }
    if (status && status !== 'All') {
      properties = properties.filter(p => p.status === status);
    }
    if (featured === 'true') {
      properties = properties.filter(p => p.featured);
    }
    if (q) {
      const term = String(q).toLowerCase();
      properties = properties.filter(p => 
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.district.toLowerCase().includes(term) ||
        p.location.toLowerCase().includes(term) ||
        p.property_id.toLowerCase().includes(term) ||
        (p.estate && p.estate.toLowerCase().includes(term))
      );
    }

    res.json(properties);
  });

  app.get('/api/properties/:slug', (req, res) => {
    const property = db.getPropertyBySlug(req.params.slug);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    db.incrementAnalytics('views');
    res.json(property);
  });

  app.post('/api/properties', (req, res) => {
    try {
      const newProp = db.createProperty(req.body);
      res.status(201).json(newProp);
    } catch (e: any) {
      res.status(400).json({ error: e.message || 'Failed to create property' });
    }
  });

  app.put('/api/properties/:id', (req, res) => {
    const updated = db.updateProperty(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json(updated);
  });

  app.delete('/api/properties/:id', (req, res) => {
    const success = db.deleteProperty(req.params.id);
    res.json({ success });
  });

  // Locations API
  app.get('/api/locations', (_req, res) => {
    res.json(db.getLocations());
  });

  app.post('/api/locations', (req, res) => {
    const loc = db.addLocation(req.body);
    res.status(201).json(loc);
  });

  // Partners API
  app.get('/api/partners', (_req, res) => {
    res.json(db.getPartners());
  });

  app.put('/api/partners/:id', (req, res) => {
    const updated = db.updatePartner(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Partner not found' });
    res.json(updated);
  });

  // Enquiries API
  app.get('/api/enquiries', (_req, res) => {
    res.json(db.getEnquiries());
  });

  app.post('/api/enquiries', (req, res) => {
    const enq = db.createEnquiry(req.body);
    res.status(201).json(enq);
  });

  app.patch('/api/enquiries/:id/status', (req, res) => {
    const updated = db.updateEnquiryStatus(req.params.id, req.body.status);
    if (!updated) return res.status(404).json({ error: 'Enquiry not found' });
    res.json(updated);
  });

  // Property Requests API
  app.get('/api/requests', (_req, res) => {
    res.json(db.getPropertyRequests());
  });

  app.post('/api/requests', (req, res) => {
    const reqItem = db.createPropertyRequest(req.body);
    res.status(201).json(reqItem);
  });

  app.patch('/api/requests/:id/status', (req, res) => {
    const updated = db.updatePropertyRequestStatus(req.params.id, req.body.status);
    if (!updated) return res.status(404).json({ error: 'Request not found' });
    res.json(updated);
  });

  // Inspections API
  app.get('/api/inspections', (_req, res) => {
    res.json(db.getInspections());
  });

  app.post('/api/inspections', (req, res) => {
    const insp = db.createInspection(req.body);
    res.status(201).json(insp);
  });

  app.patch('/api/inspections/:id/status', (req, res) => {
    const updated = db.updateInspectionStatus(req.params.id, req.body.status);
    if (!updated) return res.status(404).json({ error: 'Inspection not found' });
    res.json(updated);
  });

  // Blog API
  app.get('/api/blog', (_req, res) => {
    res.json(db.getBlogPosts());
  });

  app.get('/api/blog/:slug', (req, res) => {
    const post = db.getBlogPostBySlug(req.params.slug);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  });

  app.post('/api/blog', (req, res) => {
    const post = db.createBlogPost(req.body);
    res.status(201).json(post);
  });

  // Newsletter Subscribers API
  app.get('/api/subscribers', (_req, res) => {
    res.json(db.getSubscribers());
  });

  app.post('/api/subscribers', (req, res) => {
    const { email, name, source } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email address required' });
    }
    const sub = db.addSubscriber(email, name, source);
    res.status(201).json(sub);
  });

  app.delete('/api/subscribers/:id', (req, res) => {
    const success = db.deleteSubscriber(req.params.id);
    res.json({ success });
  });

  // Site Settings & Analytics API
  app.get('/api/settings', (_req, res) => {
    res.json(db.getSiteSettings());
  });

  app.put('/api/settings', (req, res) => {
    const updated = db.updateSiteSettings(req.body);
    res.json(updated);
  });

  app.get('/api/analytics', (_req, res) => {
    res.json(db.getAnalytics());
  });

  app.post('/api/analytics/track', (req, res) => {
    const { type } = req.body;
    if (type === 'whatsapp' || type === 'views') {
      db.incrementAnalytics(type);
    }
    res.json({ success: true });
  });

  // Astra DB Status and Schema endpoint
  app.get('/api/astra/status', (_req, res) => {
    const config = astra.getAstraConfig();
    res.json({
      configured: config.isConfigured,
      endpoint: config.endpoint ? config.endpoint.replace(/https:\/\/(.*?)@/g, 'https://***@') : null,
      namespace: config.namespace,
      keyspace: config.keyspace,
      schemaDocs: astra.ASTRA_DB_SCHEMA_DOCUMENTATION
    });
  });

  // Astra DB Live Test Endpoint
  app.post('/api/astra/test-connection', async (_req, res) => {
    try {
      const result = await astra.testAstraConnection();
      res.json(result);
    } catch (e: any) {
      res.status(500).json({ connected: false, statusMessage: e?.message || 'Astra DB test failed' });
    }
  });

  // Astra DB Sync Existing Data
  app.post('/api/astra/sync-seed', async (_req, res) => {
    try {
      const properties = db.getProperties();
      const config = astra.getAstraConfig();
      if (!config.isConfigured) {
        return res.status(400).json({ success: false, error: 'Astra DB credentials not configured in environment.' });
      }

      let syncedCount = 0;
      for (const p of properties) {
        await astra.executeAstraDataApi('properties', 'insertOne', { document: p });
        syncedCount++;
      }

      res.json({ success: true, message: `Successfully synchronized ${syncedCount} verified properties into Astra DB.`, syncedCount });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e?.message || 'Sync failed' });
    }
  });

  // CQL Schema File Delivery Endpoint
  app.get('/api/database/schema.cql', (_req, res) => {
    const cqlPath = path.join(process.cwd(), 'database', 'schema.cql');
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', 'attachment; filename="estateshelters_astradb_schema.cql"');
    res.sendFile(cqlPath);
  });

  app.get('/api/database/cql-content', async (_req, res) => {
    try {
      const fs = await import('fs/promises');
      const cqlPath = path.join(process.cwd(), 'database', 'schema.cql');
      const content = await fs.readFile(cqlPath, 'utf-8');
      res.json({ cql: content, filename: 'schema.cql' });
    } catch (e: any) {
      res.status(500).json({ error: 'Failed to read schema.cql' });
    }
  });

  // AI & Gemini Endpoints
  app.post('/api/ai/advisor', async (req, res) => {
    try {
      const evaluation = await gemini.runMADInvestmentAdvisor(req.body);
      res.json({ result: evaluation });
    } catch (e: any) {
      res.status(500).json({ error: e.message || 'AI Advisor failed' });
    }
  });

  app.post('/api/ai/chat', async (req, res) => {
    try {
      const { messages, currentContext } = req.body;
      const reply = await gemini.runGeminiChat(messages || [], currentContext);
      res.json({ reply });
    } catch (e: any) {
      res.status(500).json({ error: e.message || 'Chatbot service error' });
    }
  });

  app.post('/api/ai/enhance-listing', async (req, res) => {
    try {
      const enhanced = await gemini.enhancePropertyListingCopy(req.body);
      res.json(enhanced);
    } catch (e: any) {
      res.status(500).json({ error: e.message || 'Enhancer error' });
    }
  });

  // Admin Auth
  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@estateshelters.ng';
    const adminPass = process.env.ADMIN_PASSWORD || 'EstateShelters2026!Admin';

    // Allow standard admin or demo manager
    if (
      (email === adminEmail && password === adminPass) ||
      (email === 'admin@estateshelters.ng' && (password === 'admin' || password === 'EstateShelters2026!Admin' || password === 'admin123'))
    ) {
      res.json({
        success: true,
        token: `es-jwt-${Date.now()}`,
        user: {
          name: 'Executive Administrator',
          email: adminEmail,
          role: 'Super Admin',
          department: 'Market Analysis Department'
        }
      });
    } else {
      res.status(401).json({ error: 'Invalid admin credentials. Please use admin@estateshelters.ng / EstateShelters2026!Admin' });
    }
  });

  // --- VITE MIDDLEWARE / STATIC ASSETS ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Estate Shelters Full-Stack Server running on port ${PORT}`);
  });
}

startServer();
