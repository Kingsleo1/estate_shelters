import { Property, LocationItem, Partner, BlogPost, Enquiry, PropertyRequest, InspectionRequest, NewsletterSubscriber, SiteSettings, AnalyticsSummary } from '../types';
import { INITIAL_PROPERTIES, INITIAL_LOCATIONS, INITIAL_PARTNERS, INITIAL_BLOG_POSTS, INITIAL_SITE_SETTINGS } from '../data/seedData';

export const api = {
  // Properties
  async getProperties(params: Record<string, any> = {}): Promise<Property[]> {
    try {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
          query.append(key, String(val));
        }
      });
      const res = await fetch(`/api/properties?${query.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch properties');
      return await res.json();
    } catch (e) {
      console.warn('API fallback to local properties cache', e);
      let list = [...INITIAL_PROPERTIES];
      if (params.transaction && params.transaction !== 'All') {
        list = list.filter(p => p.transaction_type.toLowerCase() === String(params.transaction).toLowerCase());
      }
      if (params.type && params.type !== 'All') {
        list = list.filter(p => p.property_type.toLowerCase() === String(params.type).toLowerCase());
      }
      if (params.district && params.district !== 'All') {
        list = list.filter(p => p.district.toLowerCase().includes(String(params.district).toLowerCase()));
      }
      if (params.q) {
        const q = String(params.q).toLowerCase();
        list = list.filter(p => p.title.toLowerCase().includes(q) || p.district.toLowerCase().includes(q) || p.property_id.toLowerCase().includes(q));
      }
      return list;
    }
  },

  async getPropertyBySlug(slug: string): Promise<Property | null> {
    try {
      const res = await fetch(`/api/properties/${slug}`);
      if (!res.ok) throw new Error('Property not found');
      return await res.json();
    } catch (e) {
      const found = INITIAL_PROPERTIES.find(p => p.slug === slug || p.id === slug || p.property_id.toLowerCase() === slug.toLowerCase());
      return found || null;
    }
  },

  async createProperty(data: Partial<Property>): Promise<Property> {
    const res = await fetch('/api/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create property');
    return await res.json();
  },

  async updateProperty(id: string, data: Partial<Property>): Promise<Property> {
    const res = await fetch(`/api/properties/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update property');
    return await res.json();
  },

  async deleteProperty(id: string): Promise<boolean> {
    const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
    const json = await res.json();
    return json.success;
  },

  // Locations
  async getLocations(): Promise<LocationItem[]> {
    try {
      const res = await fetch('/api/locations');
      if (!res.ok) throw new Error('Failed to fetch locations');
      return await res.json();
    } catch {
      return INITIAL_LOCATIONS;
    }
  },

  async addLocation(data: Partial<LocationItem>): Promise<LocationItem> {
    const res = await fetch('/api/locations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  // Partners
  async getPartners(): Promise<Partner[]> {
    try {
      const res = await fetch('/api/partners');
      if (!res.ok) throw new Error('Failed to fetch partners');
      return await res.json();
    } catch {
      return INITIAL_PARTNERS;
    }
  },

  async updatePartner(id: string, data: Partial<Partner>): Promise<Partner> {
    const res = await fetch(`/api/partners/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  // Enquiries
  async getEnquiries(): Promise<Enquiry[]> {
    try {
      const res = await fetch('/api/enquiries');
      return await res.json();
    } catch {
      return [];
    }
  },

  async createEnquiry(data: Partial<Enquiry>): Promise<Enquiry> {
    const res = await fetch('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  async submitEnquiry(data: Partial<Enquiry>): Promise<Enquiry> {
    return this.createEnquiry(data);
  },

  async updateEnquiryStatus(id: string, status: Enquiry['status']): Promise<Enquiry> {
    const res = await fetch(`/api/enquiries/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return await res.json();
  },

  // Property Requests
  async getRequests(): Promise<PropertyRequest[]> {
    try {
      const res = await fetch('/api/requests');
      return await res.json();
    } catch {
      return [];
    }
  },

  async getPropertyRequests(): Promise<PropertyRequest[]> {
    return this.getRequests();
  },

  async createRequest(data: Partial<PropertyRequest>): Promise<PropertyRequest> {
    const res = await fetch('/api/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  async updateRequestStatus(id: string, status: PropertyRequest['status']): Promise<PropertyRequest> {
    const res = await fetch(`/api/requests/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return await res.json();
  },

  // Inspections
  async getInspections(): Promise<InspectionRequest[]> {
    try {
      const res = await fetch('/api/inspections');
      return await res.json();
    } catch {
      return [];
    }
  },

  async createInspection(data: Partial<InspectionRequest>): Promise<InspectionRequest> {
    const res = await fetch('/api/inspections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  async updateInspectionStatus(id: string, status: InspectionRequest['status']): Promise<InspectionRequest> {
    const res = await fetch(`/api/inspections/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return await res.json();
  },

  // Blog
  async getBlogPosts(): Promise<BlogPost[]> {
    try {
      const res = await fetch('/api/blog');
      if (!res.ok) throw new Error('Failed');
      return await res.json();
    } catch {
      return INITIAL_BLOG_POSTS;
    }
  },

  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const res = await fetch(`/api/blog/${slug}`);
      if (!res.ok) throw new Error('Failed');
      return await res.json();
    } catch {
      return INITIAL_BLOG_POSTS.find(p => p.slug === slug || p.id === slug) || null;
    }
  },

  async createBlogPost(data: Partial<BlogPost>): Promise<BlogPost> {
    const res = await fetch('/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  // Subscribers
  async getSubscribers(): Promise<NewsletterSubscriber[]> {
    try {
      const res = await fetch('/api/subscribers');
      return await res.json();
    } catch {
      return [];
    }
  },

  async addSubscriber(email: string, name?: string, source?: string): Promise<NewsletterSubscriber> {
    const res = await fetch('/api/subscribers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, source })
    });
    return await res.json();
  },

  async deleteSubscriber(id: string): Promise<boolean> {
    const res = await fetch(`/api/subscribers/${id}`, { method: 'DELETE' });
    const json = await res.json();
    return json.success;
  },

  // Settings & Analytics
  async getSettings(): Promise<SiteSettings> {
    try {
      const res = await fetch('/api/settings');
      if (!res.ok) throw new Error('Failed');
      return await res.json();
    } catch {
      return INITIAL_SITE_SETTINGS;
    }
  },

  async updateSettings(data: Partial<SiteSettings>): Promise<SiteSettings> {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  async getAnalytics(): Promise<AnalyticsSummary> {
    try {
      const res = await fetch('/api/analytics');
      return await res.json();
    } catch {
      return {
        total_properties: INITIAL_PROPERTIES.length,
        available_properties: INITIAL_PROPERTIES.length,
        sold_properties: 0,
        rented_properties: 0,
        featured_properties: INITIAL_PROPERTIES.filter(p => p.featured).length,
        total_enquiries: 2,
        total_inspections: 1,
        total_requests: 1,
        total_subscribers: 2,
        whatsapp_click_count: 318,
        views_count: 1420,
        top_viewed_districts: [{ name: 'Apo Dutse', count: 48 }, { name: 'Kyami', count: 42 }, { name: 'Maitama', count: 35 }]
      };
    }
  },

  async trackEvent(type: 'views' | 'whatsapp'): Promise<void> {
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      });
    } catch {}
  },

  // AI Services
  async runMADAdvisor(payload: {
    district: string;
    property_type: string;
    budget: number;
    investment_horizon_years: number;
    primary_goal: string;
    additional_notes?: string;
  }): Promise<string> {
    const res = await fetch('/api/ai/advisor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    return json.result;
  },

  async sendChatMessage(messages: { role: 'user' | 'assistant'; content: string }[], currentContext?: string): Promise<string> {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, currentContext })
    });
    const json = await res.json();
    return json.reply;
  },

  async enhanceListingCopy(data: {
    title: string;
    property_type?: string;
    location?: string;
    district?: string;
    price: number;
    features?: string[];
    key_features?: string[];
    raw_notes?: string;
  }): Promise<{ enhanced_title?: string; title?: string; description?: string; marketing_description?: string; highlights?: string[]; features?: string[]; tagline?: string }> {
    const res = await fetch('/api/ai/enhance-listing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  async enhanceListing(data: any): Promise<any> {
    return this.enhanceListingCopy(data);
  },

  async getAstraStatus(): Promise<{ configured: boolean; endpoint: string | null; namespace: string; schemaDocs: any }> {
    try {
      const res = await fetch('/api/astra/status');
      return await res.json();
    } catch {
      return {
        configured: false,
        endpoint: null,
        namespace: 'default_keyspace',
        schemaDocs: {}
      };
    }
  },

  async loginAdmin(credentials: { email: string; password: string }): Promise<{ success: boolean; token?: string; user?: any; error?: string }> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return await res.json();
  }
};
