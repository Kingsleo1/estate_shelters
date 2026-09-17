-- ==============================================================================
-- ESTATE SHELTERS LTD - DATASTAX ASTRA DB / APACHE CASSANDRA COMPLETE CQL SCHEMA
-- ==============================================================================
-- Corporate Entity: Estate Shelters Ltd (CAC Registration No: 9673843)
-- Target Platform: DataStax Astra DB (Serverless Cassandra) & Apache Cassandra 4.x/5.x
-- Description: Complete schema for properties, locations, enquiries, inspections,
--              property requests, partners, blog posts, site settings, and storage buckets.
-- ==============================================================================

-- 1. CREATE KEYSPACE / NAMESPACE
-- In DataStax Astra DB, keyspaces are managed via the Astra Portal or CQL Console.
-- If running locally or on self-managed Apache Cassandra, execute:
CREATE KEYSPACE IF NOT EXISTS estateshelters_keyspace
WITH replication = {
    'class': 'NetworkTopologyStrategy',
    'us-east1': 3
};

USE estateshelters_keyspace;

-- ==============================================================================
-- 2. USER DEFINED TYPES (UDTs)
-- ==============================================================================

-- Landmark Proximity & Distance Type
CREATE TYPE IF NOT EXISTS landmark_distance_type (
    landmark text,
    distance text,
    drive_time text
);

-- Flexible Pricing / Option Structure (e.g. Carcass, Finished, Land Plot)
CREATE TYPE IF NOT EXISTS property_option_type (
    name text,
    price decimal,
    description text
);

-- ==============================================================================
-- 3. CORE TABLES DEFINITION
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- Table: properties
-- Primary entity storing Abuja residential, commercial, off-plan & serviced land listings
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS properties (
    id text,
    property_id text,               -- e.g. ES-00045, ES-KYA-001
    title text,
    slug text,
    description text,
    property_type text,             -- Bungalow, Terrace Duplex, Detached Duplex, Apartment, Mansion, Land, etc.
    transaction_type text,          -- Buy, Rent, Lease, Land, Investment
    status text,                    -- Available, Sold, Under Offer, Under Construction, Off-plan
    price decimal,                  -- Monetary valuation in NGN or specified currency
    currency text,                  -- NGN, USD, GBP
    price_label text,               -- e.g. "Per Annum", "Fixed Price", "From"
    
    -- Location Attributes
    country text,
    state text,
    lga text,                       -- AMAC, Bwari, Gwagwalada, Kuje
    district text,                  -- Kyami, Apo Dutse, Maitama, Guzape, Katampe, Jabi, etc.
    location text,                  -- Human-readable location description
    estate text,                    -- Estate name if applicable
    street text,
    latitude double,
    longitude double,
    landmark_distances list<frozen<landmark_distance_type>>,
    
    -- Architectural Specifications
    land_size text,                 -- e.g. "400 sqm", "600 sqm"
    building_size text,             -- e.g. "350 sqm"
    bedrooms int,
    bathrooms int,
    toilets int,
    parking_spaces int,
    floors int,
    year_built int,
    
    -- Due Diligence & Legal Verification
    verification_status text,       -- Verified, Under Review, Documentation Pending
    documentation_status list<text>,-- C of O, R of O, Building Plan Approval, Governor's Consent
    documentation_notes text,
    c_of_o_verified boolean,
    r_of_o_verified boolean,
    survey_plan_number text,
    
    -- Developer & Partner
    developer_id text,
    developer_name text,
    
    -- Marketing Media & Visual Assets (Max 8 images per property)
    display_image text,             -- Primary display/cover photo
    images list<text>,              -- Gallery images (up to 8 full URLs or encoded base64)
    features list<text>,            -- 24/7 Security, Paved Roads, Solar Hybrid, etc.
    video_url text,                 -- YouTube, Vimeo, or MP4 tour URL
    virtual_tour_url text,          -- 3D Matterport or 360-tour
    floor_plan_url text,            -- Architectural layout diagram
    brochure_url text,              -- PDF Brochure
    tags list<text>,                -- Filter tags
    
    -- Flags & Timestamps
    featured boolean,
    published boolean,
    created_at timestamp,
    updated_at timestamp,
    PRIMARY KEY (id)
);

-- Secondary Indexes for rapid querying and filtering
CREATE INDEX IF NOT EXISTS properties_property_id_idx ON properties (property_id);
CREATE INDEX IF NOT EXISTS properties_slug_idx ON properties (slug);
CREATE INDEX IF NOT EXISTS properties_district_idx ON properties (district);
CREATE INDEX IF NOT EXISTS properties_lga_idx ON properties (lga);
CREATE INDEX IF NOT EXISTS properties_property_type_idx ON properties (property_type);
CREATE INDEX IF NOT EXISTS properties_transaction_type_idx ON properties (transaction_type);
CREATE INDEX IF NOT EXISTS properties_status_idx ON properties (status);
CREATE INDEX IF NOT EXISTS properties_featured_idx ON properties (featured);
CREATE INDEX IF NOT EXISTS properties_published_idx ON properties (published);
CREATE INDEX IF NOT EXISTS properties_developer_id_idx ON properties (developer_id);

-- ------------------------------------------------------------------------------
-- Table: locations
-- Cadastral directory of Abuja districts and LGAs
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS locations (
    id text,
    name text,
    country text,
    state text,
    lga text,
    district text,
    popular_estates list<text>,
    is_fct_priority boolean,
    image text,
    property_count int,
    created_at timestamp,
    PRIMARY KEY (id)
);

CREATE INDEX IF NOT EXISTS locations_district_idx ON locations (district);
CREATE INDEX IF NOT EXISTS locations_lga_idx ON locations (lga);
CREATE INDEX IF NOT EXISTS locations_fct_priority_idx ON locations (is_fct_priority);

-- ------------------------------------------------------------------------------
-- Table: enquiries
-- Leads submitted by prospective buyers & investors via website or WhatsApp
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS enquiries (
    id text,
    property_id text,
    property_ref text,
    property_title text,
    name text,
    phone text,
    email text,
    message text,
    source text,                    -- e.g. "Property Detail Page", "WhatsApp Pre-fill", "Contact Page"
    status text,                    -- "New", "Contacted", "In Progress", "Closed"
    created_at timestamp,
    PRIMARY KEY (id)
);

CREATE INDEX IF NOT EXISTS enquiries_property_id_idx ON enquiries (property_id);
CREATE INDEX IF NOT EXISTS enquiries_status_idx ON enquiries (status);
CREATE INDEX IF NOT EXISTS enquiries_email_idx ON enquiries (email);

-- ------------------------------------------------------------------------------
-- Table: inspections
-- Physical on-site or virtual property inspection bookings
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS inspections (
    id text,
    property_id text,
    property_ref text,
    property_title text,
    property_location text,
    client_name text,
    client_phone text,
    email text,
    preferred_date text,
    preferred_time text,
    visitors int,
    inspection_type text,           -- "Physical On-Site", "Virtual Video Tour"
    notes text,
    status text,                    -- "Pending", "Confirmed", "Completed", "Cancelled"
    created_at timestamp,
    PRIMARY KEY (id)
);

CREATE INDEX IF NOT EXISTS inspections_property_id_idx ON inspections (property_id);
CREATE INDEX IF NOT EXISTS inspections_status_idx ON inspections (status);
CREATE INDEX IF NOT EXISTS inspections_client_phone_idx ON inspections (client_phone);

-- ------------------------------------------------------------------------------
-- Table: property_requests
-- "Find My Property" custom search specifications submitted by buyers
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS property_requests (
    id text,
    name text,
    phone text,
    whatsapp text,
    email text,
    transaction_type text,
    property_type text,
    state text,
    lga text,
    preferred_districts text,
    preferred_estate text,
    budget_min decimal,
    budget_max decimal,
    budget_range text,
    currency text,
    bedrooms text,
    bathrooms text,
    land_size text,
    documentation_preference text,
    purpose text,                   -- "Personal Residence", "Rental Investment", "Capital Growth"
    notes text,
    status text,                    -- "New", "Under Review", "Matched", "Closed"
    created_at timestamp,
    PRIMARY KEY (id)
);

CREATE INDEX IF NOT EXISTS property_requests_status_idx ON property_requests (status);
CREATE INDEX IF NOT EXISTS property_requests_phone_idx ON property_requests (phone);

-- ------------------------------------------------------------------------------
-- Table: partners
-- Corporate development and construction partners (Urban Shelters, Tayan, CAAM, etc.)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS partners (
    id text,
    name text,
    slug text,
    logo text,
    tagline text,
    description text,
    website text,
    phone text,
    email text,
    partnership_scope text,
    relationship_type text,
    active boolean,
    featured_developments list<text>,
    projects_count int,
    created_at timestamp,
    PRIMARY KEY (id)
);

CREATE INDEX IF NOT EXISTS partners_slug_idx ON partners (slug);
CREATE INDEX IF NOT EXISTS partners_active_idx ON partners (active);

-- ------------------------------------------------------------------------------
-- Table: blog_posts
-- Market analysis, title verification guides, and real estate articles
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS blog_posts (
    id text,
    title text,
    slug text,
    excerpt text,
    content text,
    featured_image text,
    category text,
    author text,
    author_role text,
    read_time text,
    tags list<text>,
    published boolean,
    published_at timestamp,
    created_at timestamp,
    PRIMARY KEY (id)
);

CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts (slug);
CREATE INDEX IF NOT EXISTS blog_posts_category_idx ON blog_posts (category);
CREATE INDEX IF NOT EXISTS blog_posts_published_idx ON blog_posts (published);

-- ------------------------------------------------------------------------------
-- Table: newsletter_subscribers
-- Property alert and investment newsletter subscriber registry
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    email text,
    id text,
    name text,
    source text,
    active boolean,
    created_at timestamp,
    PRIMARY KEY (email)
);

CREATE INDEX IF NOT EXISTS newsletter_active_idx ON newsletter_subscribers (active);

-- ------------------------------------------------------------------------------
-- Table: site_settings
-- Corporate configuration and contact data
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS site_settings (
    id text,
    company_name text,
    tagline text,
    industry text,
    cac_reg_number text,
    incorporation_date text,
    phone_primary text,
    phone_secondary text,
    whatsapp_number text,
    email_primary text,
    email_support text,
    office_address text,
    social_instagram text,
    social_facebook text,
    social_linkedin text,
    updated_at timestamp,
    PRIMARY KEY (id)
);

-- ------------------------------------------------------------------------------
-- Table: storage_buckets_meta
-- Metadata for media storage buckets (DataStax Astra DB, AWS S3, Cloudinary)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS storage_buckets_meta (
    bucket_id text,
    provider text,                  -- "astra_vector_store", "aws_s3", "cloudinary", "local_datastore"
    bucket_name text,
    region text,
    max_images_per_property int,   -- Default: 8
    max_file_size_mb int,          -- Default: 10
    allowed_mime_types list<text>, -- ['image/jpeg', 'image/png', 'image/webp']
    cdn_base_url text,
    status text,                    -- "active", "configured", "standby"
    updated_at timestamp,
    PRIMARY KEY (bucket_id)
);

-- ==============================================================================
-- 4. DEFAULT SEED DATA INSERTIONS
-- ==============================================================================

-- Site Corporate Settings Seed
INSERT INTO site_settings (
    id, company_name, tagline, industry, cac_reg_number, 
    phone_primary, phone_secondary, whatsapp_number, 
    email_primary, office_address, social_instagram, social_facebook, updated_at
) VALUES (
    'config_main',
    'Estate Shelters Ltd',
    'Your Gateway to Verified Abuja Properties & Prime Real Estate Investments',
    'Real Estate & Development',
    '9673843',
    '08136656679',
    '09117114313',
    '08136656679',
    'estateshelters@gmail.com',
    'Suite 212, Millennium Plaza, Central Business District, Abuja, Nigeria',
    '@estateshelters',
    'Estate Shelters Ltd',
    toTimestamp(now())
);

-- Storage Bucket Metadata Seed (Max 8 images per property limit)
INSERT INTO storage_buckets_meta (
    bucket_id, provider, bucket_name, region, 
    max_images_per_property, max_file_size_mb, allowed_mime_types, 
    cdn_base_url, status, updated_at
) VALUES (
    'estateshelters_media_bucket',
    'astra_vector_store',
    'estateshelters-property-assets',
    'us-east1',
    8,
    10,
    ['image/jpeg', 'image/png', 'image/webp'],
    'https://images.unsplash.com',
    'active',
    toTimestamp(now())
);

-- Sample Verified Property Seed (Kyami Detached Bungalow)
INSERT INTO properties (
    id, property_id, title, slug, description, property_type, transaction_type, status,
    price, currency, price_label, country, state, lga, district, location,
    land_size, bedrooms, bathrooms, toilets, parking_spaces,
    verification_status, documentation_status, c_of_o_verified, r_of_o_verified,
    developer_name, display_image, images, features,
    featured, published, created_at, updated_at
) VALUES (
    'prop_001',
    'ES-00045',
    '3-Bedroom Detached Bungalow with BQ',
    '3-bedroom-detached-bungalow-kyami',
    'Exquisitely designed 3-bedroom detached contemporary bungalow nestled in the prime development corridor of Kyami District, along Airport Road, Abuja.',
    'Bungalow',
    'Buy',
    'Available',
    45000000,
    'NGN',
    'Total Price',
    'Nigeria',
    'Federal Capital Territory',
    'Abuja Municipal',
    'Kyami',
    'Kyami District, Airport Road Corridor, Abuja',
    '400 sqm',
    3,
    4,
    4,
    3,
    'Verified',
    ['Right of Occupancy (R of O)', 'Building Plan Approval', 'FCDA Allocation'],
    false,
    true,
    'Urban Shelters Infrastructure Ltd',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    ['24/7 Armed Security Patrol', 'Tarred Access Road', 'Central Water Supply', 'Solar Inverter Ready', 'Dedicated Transformer'],
    true,
    true,
    toTimestamp(now()),
    toTimestamp(now())
);

-- ==============================================================================
-- 5. DATASTAX ASTRA DB / REAL-TIME INTEGRATION INSTRUCTIONS
-- ==============================================================================
-- 1. Go to DataStax Astra Portal: https://astra.datastax.com
-- 2. Open your Astra DB Database -> click "CQL Console" in the top navigation bar.
-- 3. Copy and paste all the statements above into the CQL Console and press Enter.
-- 4. To connect Estate Shelters in real-time:
--    a. Generate an "Application Token" with role 'Database Administrator'.
--    b. Add the token to your .env file:
--       ASTRA_DB_APPLICATION_TOKEN="AstraCS:..."
--       ASTRA_DB_API_ENDPOINT="https://<your-db-id>-<region>.apps.astra.datastax.com"
--       ASTRA_DB_NAMESPACE="default_keyspace"
-- 5. All properties, images (up to 8), enquiries, and inspections will sync in real-time!
-- ==============================================================================
