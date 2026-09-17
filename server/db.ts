import fs from 'fs';
import path from 'path';
import { Property, LocationItem, Partner, BlogPost, Enquiry, PropertyRequest, InspectionRequest, NewsletterSubscriber, SiteSettings, AnalyticsSummary } from '../src/types';
import { INITIAL_PROPERTIES, INITIAL_LOCATIONS, INITIAL_PARTNERS, INITIAL_BLOG_POSTS, INITIAL_SITE_SETTINGS } from '../src/data/seedData';
import { getAstraConfig, executeAstraDataApi } from './astra';

const STORE_FILE_PATH = path.join(process.cwd(), 'database', 'store.json');

const DEFAULT_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq-1',
    property_id: 'ES-00045',
    property_title: '4 Bedroom Luxury Terrace Duplex with BQ',
    name: 'Dr. Chidi Okafor',
    phone: '08034567890',
    email: 'chidi.okafor@example.com',
    message: 'Interested in the payment structure and deed of assignment timeline for Apo Dutse.',
    source: 'Property Detail Page',
    status: 'New',
    created_at: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: 'enq-2',
    property_id: 'ES-00041',
    property_title: '3-Bedroom Detached Bungalow - ABU Estate, Kyami',
    name: 'Mrs. Fatima Bello',
    phone: '08123456789',
    email: 'fatima.bello@example.com',
    message: 'Would like to inspect the carcass and completed options at Kyami this Saturday.',
    source: 'WhatsApp Enquiry Pre-fill',
    status: 'Contacted',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString()
  }
];

const DEFAULT_REQUESTS: PropertyRequest[] = [
  {
    id: 'req-1',
    name: 'Alhaji Musa Danladi',
    phone: '08098765432',
    whatsapp: '08098765432',
    email: 'musa.danladi@example.com',
    transaction_type: 'Buy',
    property_type: 'Detached Duplex',
    state: 'Federal Capital Territory',
    lga: 'Abuja Municipal Area Council (AMAC)',
    preferred_area: 'Guzape or Katampe Extension',
    preferred_estate: 'Diplomatic Enclave preferred',
    budget_min: 100000000,
    budget_max: 180000000,
    currency: 'NGN',
    bedrooms: '4',
    bathrooms: '5',
    purpose: 'Personal Residence',
    message: 'Looking for a solid build with clear AGIS title and great view.',
    preferred_contact: 'WhatsApp',
    status: 'Reviewing',
    created_at: new Date(Date.now() - 3600000 * 18).toISOString()
  }
];

const DEFAULT_INSPECTIONS: InspectionRequest[] = [
  {
    id: 'insp-1',
    property_id: 'ES-00041',
    property_title: '3-Bedroom Detached Bungalow - ABU Estate, Kyami',
    property_location: 'Kyami / Airport Road Corridor, Abuja',
    name: 'Engr. Emeka Nwosu',
    phone: '08076543210',
    email: 'emeka.nwosu@example.com',
    date: '2026-09-22',
    time: '11:00 AM',
    visitors: 2,
    inspection_type: 'Physical On-Site',
    message: 'Visiting with my architect to inspect structural foundations of carcass units.',
    status: 'Confirmed',
    created_at: new Date(Date.now() - 3600000 * 36).toISOString()
  }
];

const DEFAULT_SUBSCRIBERS: NewsletterSubscriber[] = [
  {
    id: 'sub-1',
    name: 'Amina Yusuf',
    email: 'amina.yusuf@example.com',
    source: 'Homepage Newsletter Form',
    active: true,
    created_at: new Date(Date.now() - 3600000 * 48).toISOString()
  },
  {
    id: 'sub-2',
    name: 'Tunde Adeleke',
    email: 'tunde.adeleke@example.com',
    source: 'Footer Subscription',
    active: true,
    created_at: new Date(Date.now() - 3600000 * 72).toISOString()
  }
];

let propertiesStore: Property[] = [];
let locationsStore: LocationItem[] = [];
let partnersStore: Partner[] = [];
let blogPostsStore: BlogPost[] = [];
let enquiriesStore: Enquiry[] = [];
let requestsStore: PropertyRequest[] = [];
let inspectionsStore: InspectionRequest[] = [];
let subscribersStore: NewsletterSubscriber[] = [];
let siteSettingsStore: SiteSettings = { ...INITIAL_SITE_SETTINGS };
let analyticsMetrics = {
  views_count: 1420,
  whatsapp_click_count: 318
};

function initAndLoadStore() {
  try {
    if (fs.existsSync(STORE_FILE_PATH)) {
      const content = fs.readFileSync(STORE_FILE_PATH, 'utf-8');
      if (content.trim()) {
        const parsed = JSON.parse(content);
        propertiesStore = parsed.properties || [...INITIAL_PROPERTIES];
        locationsStore = parsed.locations || [...INITIAL_LOCATIONS];
        partnersStore = parsed.partners || [...INITIAL_PARTNERS];
        blogPostsStore = parsed.blogPosts || [...INITIAL_BLOG_POSTS];
        enquiriesStore = parsed.enquiries || [...DEFAULT_ENQUIRIES];
        requestsStore = parsed.requests || [...DEFAULT_REQUESTS];
        inspectionsStore = parsed.inspections || [...DEFAULT_INSPECTIONS];
        subscribersStore = parsed.subscribers || [...DEFAULT_SUBSCRIBERS];
        siteSettingsStore = parsed.siteSettings || { ...INITIAL_SITE_SETTINGS };
        analyticsMetrics = parsed.analyticsMetrics || { views_count: 1420, whatsapp_click_count: 318 };
        return;
      }
    }
  } catch (err) {
    console.error('Failed to parse database store file, re-initializing defaults:', err);
  }

  propertiesStore = [...INITIAL_PROPERTIES];
  locationsStore = [...INITIAL_LOCATIONS];
  partnersStore = [...INITIAL_PARTNERS];
  blogPostsStore = [...INITIAL_BLOG_POSTS];
  enquiriesStore = [...DEFAULT_ENQUIRIES];
  requestsStore = [...DEFAULT_REQUESTS];
  inspectionsStore = [...DEFAULT_INSPECTIONS];
  subscribersStore = [...DEFAULT_SUBSCRIBERS];
  siteSettingsStore = { ...INITIAL_SITE_SETTINGS };
  analyticsMetrics = { views_count: 1420, whatsapp_click_count: 318 };

  saveStore();
}

function saveStore() {
  try {
    const dir = path.dirname(STORE_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const data = {
      properties: propertiesStore,
      locations: locationsStore,
      partners: partnersStore,
      blogPosts: blogPostsStore,
      enquiries: enquiriesStore,
      requests: requestsStore,
      inspections: inspectionsStore,
      subscribers: subscribersStore,
      siteSettings: siteSettingsStore,
      analyticsMetrics: analyticsMetrics
    };
    fs.writeFileSync(STORE_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save persistent store to file:', err);
  }
}

// Initial load
initAndLoadStore();

// Properties CRUD
export function getProperties(): Property[] {
  return propertiesStore;
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return propertiesStore.find(p => p.slug === slug || p.id === slug || p.property_id.toLowerCase() === slug.toLowerCase());
}

export function createProperty(propData: Partial<Property>): Property {
  const count = propertiesStore.length + 1;
  const property_id = propData.property_id || `ES-${String(count).padStart(5, '0')}`;
  const slug = (propData.title || `property-${count}`)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const newProp: Property = {
    id: `prop-${Date.now()}`,
    property_id,
    title: propData.title || 'Untitled Property',
    slug,
    description: propData.description || '',
    property_type: propData.property_type || 'Terrace Duplex',
    transaction_type: propData.transaction_type || 'Buy',
    status: propData.status || 'Available',
    price: propData.price || 0,
    currency: propData.currency || 'NGN',
    price_label: propData.price_label,
    options: propData.options || [],
    country: propData.country || 'Nigeria',
    state: propData.state || 'Federal Capital Territory',
    lga: propData.lga || 'Abuja Municipal Area Council (AMAC)',
    district: propData.district || 'Apo Dutse',
    location: propData.location || propData.district || 'Abuja',
    estate: propData.estate,
    street: propData.street,
    latitude: propData.latitude || 9.0765,
    longitude: propData.longitude || 7.3986,
    landmark_distances: propData.landmark_distances || [],
    land_size: propData.land_size,
    building_size: propData.building_size,
    bedrooms: propData.bedrooms || 0,
    bathrooms: propData.bathrooms || 0,
    toilets: propData.toilets,
    parking_spaces: propData.parking_spaces,
    floors: propData.floors,
    year_built: propData.year_built || new Date().getFullYear(),
    verification_status: propData.verification_status || 'Under Review',
    documentation_status: propData.documentation_status || ['Right of Occupancy (R of O)'],
    documentation_notes: propData.documentation_notes,
    developer_id: propData.developer_id,
    developer_name: propData.developer_name,
    featured: Boolean(propData.featured),
    published: propData.published !== undefined ? propData.published : true,
    is_demo: false,
    tags: propData.tags || ['New Listing'],
    images: propData.images && propData.images.length > 0 ? propData.images : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80'],
    features: propData.features || ['Estate Security', 'Water Reticulation', 'Tarred Access Road'],
    video_url: propData.video_url,
    virtual_tour_url: propData.virtual_tour_url,
    floor_plan_url: propData.floor_plan_url,
    brochure_url: propData.brochure_url,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  propertiesStore.unshift(newProp);
  saveStore();

  // Attempt async sync to Astra DB if configured
  const astra = getAstraConfig();
  if (astra.isConfigured) {
    executeAstraDataApi('properties', 'insertOne', { document: newProp }).catch(console.error);
  }

  return newProp;
}

export function updateProperty(id: string, updates: Partial<Property>): Property | null {
  const index = propertiesStore.findIndex(p => p.id === id);
  if (index === -1) return null;

  const current = propertiesStore[index];
  const updated: Property = {
    ...current,
    ...updates,
    updated_at: new Date().toISOString()
  };

  propertiesStore[index] = updated;
  saveStore();

  const astra = getAstraConfig();
  if (astra.isConfigured) {
    executeAstraDataApi('properties', 'updateOne', {
      filter: { id },
      update: { $set: updated }
    }).catch(console.error);
  }

  return updated;
}

export function deleteProperty(id: string): boolean {
  const initialLength = propertiesStore.length;
  propertiesStore = propertiesStore.filter(p => p.id !== id);
  if (propertiesStore.length < initialLength) {
    saveStore();
    return true;
  }
  return false;
}

// Locations
export function getLocations(): LocationItem[] {
  return locationsStore;
}

export function addLocation(loc: Partial<LocationItem>): LocationItem {
  const newLoc: LocationItem = {
    id: `loc-${Date.now()}`,
    country: loc.country || 'Nigeria',
    state: loc.state || 'Federal Capital Territory',
    lga: loc.lga || 'Abuja Municipal Area Council (AMAC)',
    district: loc.district || 'New District',
    popular_estates: loc.popular_estates || [],
    is_fct_priority: loc.is_fct_priority !== undefined ? loc.is_fct_priority : true
  };
  locationsStore.push(newLoc);
  saveStore();
  return newLoc;
}

// Partners
export function getPartners(): Partner[] {
  return partnersStore;
}

export function updatePartner(id: string, updates: Partial<Partner>): Partner | null {
  const index = partnersStore.findIndex(p => p.id === id);
  if (index === -1) return null;
  partnersStore[index] = { ...partnersStore[index], ...updates };
  saveStore();
  return partnersStore[index];
}

// Enquiries
export function getEnquiries(): Enquiry[] {
  return enquiriesStore;
}

export function createEnquiry(data: Partial<Enquiry>): Enquiry {
  const newEnq: Enquiry = {
    id: `enq-${Date.now()}`,
    property_id: data.property_id,
    property_title: data.property_title,
    name: data.name || 'Anonymous Prospect',
    phone: data.phone || '',
    email: data.email || '',
    message: data.message || 'General Property Enquiry',
    source: data.source || 'Website Form',
    status: 'New',
    created_at: new Date().toISOString()
  };
  enquiriesStore.unshift(newEnq);
  saveStore();
  return newEnq;
}

export function updateEnquiryStatus(id: string, status: Enquiry['status']): Enquiry | null {
  const enq = enquiriesStore.find(e => e.id === id);
  if (!enq) return null;
  enq.status = status;
  saveStore();
  return enq;
}

// Property Requests
export function getPropertyRequests(): PropertyRequest[] {
  return requestsStore;
}

export function createPropertyRequest(data: Partial<PropertyRequest>): PropertyRequest {
  const newReq: PropertyRequest = {
    id: `req-${Date.now()}`,
    name: data.name || '',
    phone: data.phone || '',
    whatsapp: data.whatsapp || data.phone || '',
    email: data.email || '',
    transaction_type: data.transaction_type || 'Buy',
    property_type: data.property_type || 'Terrace Duplex',
    state: data.state || 'Federal Capital Territory',
    lga: data.lga || 'AMAC',
    preferred_area: data.preferred_area || 'Abuja',
    preferred_estate: data.preferred_estate,
    budget_min: Number(data.budget_min) || 0,
    budget_max: Number(data.budget_max) || 0,
    currency: data.currency || 'NGN',
    bedrooms: data.bedrooms,
    bathrooms: data.bathrooms,
    land_size: data.land_size,
    documentation_preference: data.documentation_preference,
    purpose: data.purpose || 'Personal Residence',
    message: data.message,
    preferred_contact: data.preferred_contact || 'WhatsApp',
    status: 'New',
    created_at: new Date().toISOString()
  };
  requestsStore.unshift(newReq);
  saveStore();
  return newReq;
}

export function updatePropertyRequestStatus(id: string, status: PropertyRequest['status']): PropertyRequest | null {
  const req = requestsStore.find(r => r.id === id);
  if (!req) return null;
  req.status = status;
  saveStore();
  return req;
}

// Inspections
export function getInspections(): InspectionRequest[] {
  return inspectionsStore;
}

export function createInspection(data: Partial<InspectionRequest>): InspectionRequest {
  const newInsp: InspectionRequest = {
    id: `insp-${Date.now()}`,
    property_id: data.property_id || '',
    property_title: data.property_title || '',
    property_location: data.property_location || '',
    name: data.name || '',
    phone: data.phone || '',
    email: data.email || '',
    date: data.date || '',
    time: data.time || '10:00 AM',
    visitors: Number(data.visitors) || 1,
    inspection_type: data.inspection_type || 'Physical On-Site',
    message: data.message,
    status: 'Pending',
    created_at: new Date().toISOString()
  };
  inspectionsStore.unshift(newInsp);
  saveStore();
  return newInsp;
}

export function updateInspectionStatus(id: string, status: InspectionRequest['status']): InspectionRequest | null {
  const insp = inspectionsStore.find(i => i.id === id);
  if (!insp) return null;
  insp.status = status;
  saveStore();
  return insp;
}

// Blog
export function getBlogPosts(): BlogPost[] {
  return blogPostsStore;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPostsStore.find(p => p.slug === slug || p.id === slug);
}

export function createBlogPost(data: Partial<BlogPost>): BlogPost {
  const slug = (data.title || 'untitled-post')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const newPost: BlogPost = {
    id: `post-${Date.now()}`,
    title: data.title || '',
    slug,
    excerpt: data.excerpt || '',
    content: data.content || '',
    featured_image: data.featured_image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
    category: data.category || 'Market Insights',
    author: data.author || 'Market Analysis Department (MAD)',
    author_role: data.author_role || 'Real Estate Advisory',
    read_time: data.read_time || '4 min read',
    tags: data.tags || ['Abuja Real Estate'],
    published: data.published !== undefined ? data.published : true,
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString()
  };
  blogPostsStore.unshift(newPost);
  saveStore();
  return newPost;
}

// Newsletter
export function getSubscribers(): NewsletterSubscriber[] {
  return subscribersStore;
}

export function addSubscriber(email: string, name?: string, source: string = 'Website'): NewsletterSubscriber {
  const existing = subscribersStore.find(s => s.email.toLowerCase() === email.toLowerCase());
  if (existing) return existing;

  const newSub: NewsletterSubscriber = {
    id: `sub-${Date.now()}`,
    name,
    email,
    source,
    active: true,
    created_at: new Date().toISOString()
  };
  subscribersStore.unshift(newSub);
  saveStore();
  return newSub;
}

export function deleteSubscriber(id: string): boolean {
  const initialLength = subscribersStore.length;
  subscribersStore = subscribersStore.filter(s => s.id !== id);
  if (subscribersStore.length < initialLength) {
    saveStore();
    return true;
  }
  return false;
}

// Settings & Analytics
export function getSiteSettings(): SiteSettings {
  const astra = getAstraConfig();
  return {
    ...siteSettingsStore,
    enable_astra_db: astra.isConfigured,
    astra_status: astra.isConfigured ? 'connected' : 'demo_mode'
  };
}

export function updateSiteSettings(settings: Partial<SiteSettings>): SiteSettings {
  siteSettingsStore = { ...siteSettingsStore, ...settings };
  saveStore();
  return siteSettingsStore;
}

export function incrementAnalytics(type: 'views' | 'whatsapp'): void {
  if (type === 'views') analyticsMetrics.views_count++;
  if (type === 'whatsapp') analyticsMetrics.whatsapp_click_count++;
  saveStore();
}

export function getAnalytics(): AnalyticsSummary {
  const available = propertiesStore.filter(p => p.status === 'Available').length;
  const sold = propertiesStore.filter(p => p.status === 'Sold').length;
  const rented = propertiesStore.filter(p => p.status === 'Rented').length;
  const featured = propertiesStore.filter(p => p.featured).length;

  // Aggregate districts
  const districtCounts: Record<string, number> = {};
  propertiesStore.forEach(p => {
    districtCounts[p.district] = (districtCounts[p.district] || 0) + 1;
  });

  const top_viewed_districts = Object.entries(districtCounts).map(([name, count]) => ({
    name,
    count: count * 15 + Math.floor(Math.random() * 8)
  })).sort((a, b) => b.count - a.count);

  return {
    total_properties: propertiesStore.length,
    available_properties: available,
    sold_properties: sold,
    rented_properties: rented,
    featured_properties: featured,
    total_enquiries: enquiriesStore.length,
    total_inspections: inspectionsStore.length,
    total_requests: requestsStore.length,
    total_subscribers: subscribersStore.length,
    whatsapp_click_count: analyticsMetrics.whatsapp_click_count,
    views_count: analyticsMetrics.views_count,
    top_viewed_districts
  };
}
