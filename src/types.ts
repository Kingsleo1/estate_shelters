export type TransactionType = 'Buy' | 'Rent' | 'Lease' | 'Land' | 'Investment';

export type PropertyType = 
  | 'Apartment'
  | 'Flat'
  | 'Detached House'
  | 'Semi-Detached House'
  | 'Terrace Duplex'
  | 'Detached Duplex'
  | 'Bungalow'
  | 'Mansion'
  | 'Penthouse'
  | 'Villa'
  | 'Land'
  | 'Commercial Property'
  | 'Office'
  | 'Shop'
  | 'Warehouse'
  | 'Hotel'
  | 'Mixed-use'
  | 'Estate'
  | 'Development Project'
  | 'Other';

export type PropertyStatus = 
  | 'Available'
  | 'Sold'
  | 'Reserved'
  | 'Rented'
  | 'Under Construction'
  | 'Off-plan'
  | 'Coming Soon'
  | 'Unavailable'
  | 'Under Offer';

export type VerificationStatus = 'Verified' | 'Under Review' | 'Documentation Pending' | 'Unverified';

export type DocumentationType = 
  | 'Certificate of Occupancy (C of O)'
  | 'Right of Occupancy (R of O)'
  | 'Deed of Assignment'
  | "Governor's Consent"
  | 'Survey Plan'
  | 'Allocation Letter'
  | 'Estate Documentation'
  | 'Federal Housing Authority (FHA) Allocation'
  | string;

export interface PropertyOption {
  name: string;
  price: number;
  description?: string;
}

export interface Property {
  id: string;
  property_id: string; // e.g. ES-00045
  title: string;
  slug: string;
  description: string;
  property_type: PropertyType;
  transaction_type: TransactionType;
  status: PropertyStatus;
  price: number;
  currency: 'NGN' | 'USD' | 'GBP';
  price_label?: string; // e.g. "Per Annum" or "From"
  options?: PropertyOption[]; // e.g. Completed 45M, Carcass 25M, Plot 10M
  
  // Location Hierarchy
  country: string;
  state: string;
  lga: string; // e.g. AMAC, Bwari, Kuje
  district: string; // e.g. Apo Dutse, Maitama, Kyami, Guzape
  location: string; // Friendly name
  estate?: string; // e.g. ABU Estate, Urban Homes
  street?: string;
  latitude?: number;
  longitude?: number;
  landmark_distances?: { landmark: string; distance: string; drive_time: string }[];
  
  // Specifications
  land_size?: string; // e.g. 400 sqm
  building_size?: string; // e.g. 350 sqm
  bedrooms: number;
  bathrooms: number;
  toilets?: number;
  parking_spaces?: number;
  floors?: number;
  year_built?: number;
  
  // Verification & Documentation
  verification_status: VerificationStatus;
  documentation_status: DocumentationType[];
  documentation_notes?: string;
  
  // Associations
  developer_id?: string;
  developer_name?: string;
  
  // Flags & Media
  featured: boolean;
  published: boolean;
  is_demo?: boolean;
  tags: string[];
  images: string[];
  features: string[];
  video_url?: string;
  virtual_tour_url?: string;
  floor_plan_url?: string;
  brochure_url?: string;
  
  created_at: string;
  updated_at: string;
}

export interface LocationItem {
  id: string;
  name?: string;
  country: string;
  state: string;
  lga: string;
  district: string;
  popular_estates: string[];
  is_fct_priority?: boolean;
  image?: string;
  count?: number;
  property_count?: number;
}

export interface Partner {
  id: string;
  name: string;
  slug: string;
  logo: string;
  tagline: string;
  description: string;
  website?: string;
  phone?: string;
  email?: string;
  active: boolean;
  featured_projects?: string[];
  partnership_scope: string;
  relationship_type?: string;
  projects_count?: number;
  featured_developments?: string[];
}

export interface Enquiry {
  id: string;
  property_id?: string;
  property_ref?: string;
  property_title?: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  source: string; // e.g. "Property Detail Page", "Contact Page", "WhatsApp Pre-fill"
  status: 'New' | 'Contacted' | 'In Progress' | 'Closed';
  created_at: string;
}

export interface PropertyRequest {
  id: string;
  name: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  transaction_type?: TransactionType;
  property_type?: PropertyType | string;
  state?: string;
  lga?: string;
  preferred_area?: string;
  preferred_districts?: string;
  preferred_estate?: string;
  budget_min?: number;
  budget_max?: number;
  budget_range?: string;
  currency?: 'NGN' | 'USD' | 'GBP';
  bedrooms?: string;
  bathrooms?: string;
  land_size?: string;
  documentation_preference?: string;
  purpose?: string;
  message?: string;
  notes?: string;
  preferred_contact?: string;
  status?: string;
  created_at?: string;
}

export interface InspectionRequest {
  id: string;
  property_id?: string;
  property_ref?: string;
  property_title?: string;
  property_location?: string;
  name?: string;
  client_name?: string;
  phone?: string;
  client_phone?: string;
  email?: string;
  date?: string;
  preferred_date?: string;
  time?: string;
  preferred_time?: string;
  time_slot?: string;
  visitors?: number;
  number_of_visitors?: number;
  inspection_type?: string;
  message?: string;
  notes?: string;
  status?: string;
  created_at?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  image?: string;
  category: string;
  author: string;
  author_role: string;
  read_time: string;
  tags: string[];
  published: boolean;
  published_at?: string;
  published_date?: string;
  created_at?: string;
}

export interface NewsletterSubscriber {
  id: string;
  name?: string;
  email: string;
  source: string;
  active: boolean;
  created_at: string;
}

export interface SiteSettings {
  company_name: string;
  tagline: string;
  industry: string;
  cac_reg_number: string;
  incorporation_date: string;
  company_type: string;
  office_address: string;
  primary_whatsapp: string;
  whatsapp_number?: string;
  phone_1: string;
  phone_2: string;
  phone_3?: string;
  phone_primary?: string;
  phone_secondary?: string;
  email?: string;
  email_primary: string;
  email_secondary: string;
  website_url: string;
  business_hours: string;
  social_facebook: string;
  social_instagram: string;
  enable_astra_db: boolean;
  astra_status: 'connected' | 'demo_mode' | 'unconfigured';
}

export interface AnalyticsSummary {
  total_properties: number;
  available_properties: number;
  sold_properties: number;
  rented_properties: number;
  featured_properties: number;
  total_enquiries: number;
  total_inspections: number;
  total_requests: number;
  total_subscribers: number;
  whatsapp_click_count: number;
  views_count: number;
  top_viewed_districts: { name: string; count: number }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  property_recommendations?: Partial<Property>[];
  suggested_actions?: { label: string; action: string; payload?: any }[];
}
