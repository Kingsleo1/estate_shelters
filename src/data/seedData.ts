import { Property, LocationItem, Partner, BlogPost, SiteSettings } from '../types';

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  company_name: 'Estate Shelters Ltd',
  tagline: 'Discover Better Property Opportunities.',
  industry: 'Real Estate Marketing & Property Solutions',
  cac_reg_number: '9673843',
  incorporation_date: '11 July 2026',
  company_type: 'Private Company Limited by Shares',
  office_address: 'Suite 212, Millennium Plaza, Central Business District, Abuja, Nigeria',
  primary_whatsapp: '+2347033385434',
  whatsapp_number: '+2347033385434',
  phone_1: '+2347033385434',
  phone_2: '+2347033385434',
  phone_3: '+2347033385434',
  phone_primary: '+2347033385434',
  phone_secondary: '+2347033385434',
  email_primary: 'estateshelters@gmail.com',
  email_secondary: 'info@estateshelters.ng',
  website_url: 'https://www.estateshelters.ng',
  business_hours: '9:00 AM – 6:00 PM (Mon - Sat)',
  social_facebook: 'Estate Shelters',
  social_instagram: '@estateshelters',
  enable_astra_db: false,
  astra_status: 'demo_mode'
};

export const DEFAULT_SETTINGS = INITIAL_SITE_SETTINGS;

export const INITIAL_LOCATIONS: LocationItem[] = [
  {
    id: 'loc-amac-1',
    country: 'Nigeria',
    state: 'Federal Capital Territory',
    lga: 'Abuja Municipal Area Council (AMAC)',
    district: 'Maitama',
    popular_estates: ['Maitama Farmers Market Area', 'Ministers Hill', 'IBB Golf Course Enclave'],
    is_fct_priority: true
  },
  {
    id: 'loc-amac-2',
    country: 'Nigeria',
    state: 'Federal Capital Territory',
    lga: 'Abuja Municipal Area Council (AMAC)',
    district: 'Apo Dutse',
    popular_estates: ['Apo Resettlement', 'Apo Legislative Quarters', 'Dutse Hills Court'],
    is_fct_priority: true
  },
  {
    id: 'loc-amac-3',
    country: 'Nigeria',
    state: 'Federal Capital Territory',
    lga: 'Abuja Municipal Area Council (AMAC)',
    district: 'Guzape',
    popular_estates: ['Guzape Diplomatic Zone', 'Guzape Extension Hills', 'Asokoro View'],
    is_fct_priority: true
  },
  {
    id: 'loc-amac-4',
    country: 'Nigeria',
    state: 'Federal Capital Territory',
    lga: 'Abuja Municipal Area Council (AMAC)',
    district: 'Central Business District (CBD)',
    popular_estates: ['Millennium Plaza Enclave', 'Churchgate Axis', 'NNPC Towers Corridor'],
    is_fct_priority: true
  },
  {
    id: 'loc-amac-5',
    country: 'Nigeria',
    state: 'Federal Capital Territory',
    lga: 'Abuja Municipal Area Council (AMAC)',
    district: 'Asokoro',
    popular_estates: ['Asokoro Main', 'Asokoro Extension', 'ECOWAS Secretariat Enclave'],
    is_fct_priority: true
  },
  {
    id: 'loc-amac-6',
    country: 'Nigeria',
    state: 'Federal Capital Territory',
    lga: 'Abuja Municipal Area Council (AMAC)',
    district: 'Katampe Extension',
    popular_estates: ['Diplomatic Enclave', 'Katampe Hills', 'Hilltop View Estate'],
    is_fct_priority: true
  },
  {
    id: 'loc-amac-7',
    country: 'Nigeria',
    state: 'Federal Capital Territory',
    lga: 'Abuja Municipal Area Council (AMAC)',
    district: 'Jabi & Utako',
    popular_estates: ['Jabi Lake View', 'Utako Commercial Boulevard', 'Lake Crest Heights'],
    is_fct_priority: true
  },
  {
    id: 'loc-amac-8',
    country: 'Nigeria',
    state: 'Federal Capital Territory',
    lga: 'Abuja Municipal Area Council (AMAC)',
    district: 'Wuse & Wuse 2',
    popular_estates: ['Adetokunbo Ademola Axis', 'Aminu Kano Corridor', 'Wuse Zone 4 & 6'],
    is_fct_priority: true
  },
  {
    id: 'loc-amac-9',
    country: 'Nigeria',
    state: 'Federal Capital Territory',
    lga: 'Abuja Municipal Area Council (AMAC)',
    district: 'Kyami',
    popular_estates: ['ABU Estate', 'Centenary City Corridor', 'Airport Road Enclave'],
    is_fct_priority: true
  },
  {
    id: 'loc-amac-10',
    country: 'Nigeria',
    state: 'Federal Capital Territory',
    lga: 'Abuja Municipal Area Council (AMAC)',
    district: 'Lugbe / Airport Road',
    popular_estates: ['Trademore Estate', 'Pyakasa Corridor', 'Federal Housing Estate Lugbe'],
    is_fct_priority: true
  },
  {
    id: 'loc-bwari-1',
    country: 'Nigeria',
    state: 'Federal Capital Territory',
    lga: 'Bwari Area Council',
    district: 'Gwarinpa & Dawaki',
    popular_estates: ['Gwarinpa 1st to 7th Avenue', 'Dawaki Rock View', 'News Engineering Axis'],
    is_fct_priority: true
  },
  {
    id: 'loc-bwari-2',
    country: 'Nigeria',
    state: 'Federal Capital Territory',
    lga: 'Bwari Area Council',
    district: 'Kubwa',
    popular_estates: ['Kubwa Phase 4', 'Arab Road', 'PW Enclave'],
    is_fct_priority: true
  },
  {
    id: 'loc-kuje-1',
    country: 'Nigeria',
    state: 'Federal Capital Territory',
    lga: 'Kuje Area Council',
    district: 'Kuje Central',
    popular_estates: ['Kuje Hillview', 'Union Homes Layout', 'Airport Bypass Green Scheme'],
    is_fct_priority: true
  },
  {
    id: 'loc-kaduna-1',
    country: 'Nigeria',
    state: 'Kaduna State',
    lga: 'Chikun LGA',
    district: 'Chiku Mass Housing Scheme',
    popular_estates: ['NNPC Cooperative Estate Scheme'],
    is_fct_priority: false
  }
];

export const INITIAL_PARTNERS: Partner[] = [
  {
    id: 'partner-1',
    name: 'Urban Shelters',
    slug: 'urban-shelters',
    logo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&auto=format&fit=crop&q=80',
    tagline: 'Pioneers in Residential and Commercial Infrastructure',
    description: 'Estate Shelters markets Urban Shelters’ property offerings and estate locations, supporting the company with market exposure, client engagement and property sales activities across relevant locations in Abuja and beyond.',
    website: 'https://urbanshelters.example.com',
    active: true,
    partnership_scope: 'Strategic sales representation and exclusive residential block distribution in Abuja.'
  },
  {
    id: 'partner-2',
    name: 'Ditto Group',
    slug: 'ditto-group',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&auto=format&fit=crop&q=80',
    tagline: 'Modern Architectural Innovation & Urban Schemes',
    description: 'Estate Shelters works with Ditto Group as a marketing partner, promoting its real estate offerings and connecting prospective buyers and investors with available property opportunities across the company’s relevant estate locations.',
    website: 'https://dittogroup.example.com',
    active: true,
    partnership_scope: 'Marketing partnership for modern terrace and detached duplex schemes.'
  },
  {
    id: 'partner-3',
    name: 'Tayan Group',
    slug: 'tayan-group',
    logo: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=300&auto=format&fit=crop&q=80',
    tagline: 'High-Value Community Developments',
    description: 'Estate Shelters supports Tayan Group through property marketing and sales activities, helping present its developments to prospective clients and expand reach across Abuja and other applicable locations.',
    website: 'https://tayangroup.example.com',
    active: true,
    partnership_scope: 'Commercial and residential developer sales marketing syndication.'
  },
  {
    id: 'partner-4',
    name: 'Ipent Estates',
    slug: 'ipent-estates',
    logo: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=300&auto=format&fit=crop&q=80',
    tagline: 'Master-Planned Gated Communities',
    description: 'Estate Shelters markets Ipent Estates’ property portfolio, supporting property visibility, prospect engagement and sales across the company’s estate locations in Abuja and beyond.',
    website: 'https://ipentestates.example.com',
    active: true,
    partnership_scope: 'Gated estate marketing, off-plan allocations, and client transaction handling.'
  },
  {
    id: 'partner-5',
    name: 'CAAM Engineering LTD',
    slug: 'caam-engineering',
    logo: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300&auto=format&fit=crop&q=80',
    tagline: 'Precision Civil Engineering & Structural Development',
    description: 'Estate Shelters markets the real estate projects of CAAM Engineering LTD, supporting the promotion and sales of its relevant property developments and estate locations.',
    website: 'https://caamengineering.example.com',
    active: true,
    partnership_scope: 'Civil engineering project sales advisory, structural quality assurance and marketing.'
  }
];

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-abu-kyami-01',
    property_id: 'ES-00041',
    title: '3-Bedroom Detached Bungalow - ABU Estate, Kyami',
    slug: '3-bedroom-detached-bungalow-abu-estate-kyami-abuja',
    description: 'A pocket-friendly property opportunity in a livable estate with convenient proximity to Nnamdi Azikiwe International Airport. Available in three tailored delivery options: fully completed turn-key, structural carcass for bespoke interior personalization, or serviced residential plot.',
    property_type: 'Bungalow',
    transaction_type: 'Buy',
    status: 'Available',
    price: 45000000,
    currency: 'NGN',
    price_label: 'Completed Price (Flexible Options Available)',
    options: [
      { name: 'Fully Completed Turn-Key', price: 45000000, description: 'Finished with vitrified tiles, sanitary wares, POP ceilings, painted internal/external.' },
      { name: 'Structural Carcass Option', price: 25000000, description: 'Roofing completed, internal plastering, ready for personalized fittings.' },
      { name: 'Serviced Residential Plot (400 sqm)', price: 10000000, description: 'Direct allocation in gated estate with access road demarcation.' }
    ],
    country: 'Nigeria',
    state: 'Federal Capital Territory',
    lga: 'Abuja Municipal Area Council (AMAC)',
    district: 'Kyami',
    location: 'Kyami / Airport Road Corridor, Abuja',
    estate: 'ABU Estate',
    street: 'Airport Expressway Access Boulevard',
    latitude: 8.9432,
    longitude: 7.2915,
    landmark_distances: [
      { landmark: 'Nnamdi Azikiwe Int. Airport', distance: '8.5 km', drive_time: '10 mins' },
      { landmark: 'Centenary City Site', distance: '5.2 km', drive_time: '7 mins' },
      { landmark: 'Abuja City Gate / CBD', distance: '22 km', drive_time: '20 mins' }
    ],
    land_size: '400 sqm',
    building_size: '220 sqm',
    bedrooms: 3,
    bathrooms: 3,
    toilets: 4,
    parking_spaces: 3,
    floors: 1,
    year_built: 2025,
    verification_status: 'Verified',
    documentation_status: ['Right of Occupancy (R of O)', 'Allocation Letter', 'Survey Plan', 'Estate Documentation'],
    documentation_notes: 'Verified estate allocation with clear title traceability through FCTA and registered layout scheme.',
    featured: true,
    published: true,
    is_demo: false,
    tags: ['Airport Road Corridor', 'Hot Deal', 'Affordable Luxury', 'Investment', 'Developer Offer'],
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80'
    ],
    features: [
      'Estate Perimeter Fencing',
      '24-hour Security Patrol',
      'Central Water Reticulation',
      'Pre-installed Electrical Infrastructure',
      'Tarred Access Road Network',
      'Dedicated Parking for 3 Cars',
      'All En-Suite Bedrooms',
      'Spacious Ante Room & Dining Area'
    ],
    video_url: 'https://www.youtube.com/watch?v=sample-abu-estate',
    created_at: '2026-08-10T10:00:00Z',
    updated_at: '2026-09-01T12:00:00Z'
  },
  {
    id: 'prop-apo-dutse-02',
    property_id: 'ES-00045',
    title: '4 Bedroom Luxury Terrace Duplex with BQ',
    slug: '4-bedroom-luxury-terrace-duplex-apo-dutse-abuja',
    description: 'An elegantly finished contemporary 4-bedroom terrace duplex in a serene, secure residential enclave in Apo Dutse. Features superior architectural design, Italian-fitted kitchen cabinetry, ensuite maid quarters, private rooftop sit-out terrace, and 24-hour manned estate security.',
    property_type: 'Terrace Duplex',
    transaction_type: 'Buy',
    status: 'Available',
    price: 55000000,
    currency: 'NGN',
    price_label: 'Outright Purchase',
    country: 'Nigeria',
    state: 'Federal Capital Territory',
    lga: 'Abuja Municipal Area Council (AMAC)',
    district: 'Apo Dutse',
    location: 'Apo Dutse District, Abuja',
    estate: 'Dutse Hills Residential Court',
    street: 'Plot 418, Apo Dutse Boulevard',
    latitude: 9.0084,
    longitude: 7.5021,
    landmark_distances: [
      { landmark: 'Apo Legislative Quarters', distance: '3.0 km', drive_time: '5 mins' },
      { landmark: 'Shoprite Apo Grand Towers', distance: '4.8 km', drive_time: '8 mins' },
      { landmark: 'Central Business District (CBD)', distance: '12 km', drive_time: '14 mins' }
    ],
    land_size: '350 sqm',
    building_size: '310 sqm',
    bedrooms: 4,
    bathrooms: 5,
    toilets: 5,
    parking_spaces: 3,
    floors: 2,
    year_built: 2025,
    verification_status: 'Verified',
    documentation_status: ['Certificate of Occupancy (C of O)', 'Deed of Assignment', 'Estate Documentation'],
    documentation_notes: 'Clear Certificate of Occupancy registered with AGIS (Abuja Geographic Information Systems).',
    developer_id: 'partner-1',
    developer_name: 'Urban Shelters',
    featured: true,
    published: true,
    is_demo: false,
    tags: ['Featured', 'Luxury', 'New Listing', 'Ready to Move In', 'Serviced'],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&auto=format&fit=crop&q=80'
    ],
    features: [
      '24-hour Estate Security & CCTV',
      'Italian Fitted Kitchen with Heat Extractor',
      'En-Suite Servant Quarters (BQ)',
      'Standby Generator Power Backup',
      'Solar Street Lighting',
      'Interlocked Paved Driveways',
      'Smart Door Lock & Intercom',
      'High-Speed Fiber Internet Ready'
    ],
    created_at: '2026-08-15T11:00:00Z',
    updated_at: '2026-09-05T14:30:00Z'
  },
  {
    id: 'prop-maitama-mansion-03',
    property_id: 'ES-00088',
    title: '5 Bedroom Contemporary Mansion with Penthouse & Infinity Pool',
    slug: '5-bedroom-contemporary-mansion-penthouse-maitama-abuja',
    description: 'An ultra-exclusive architectural masterpiece in prestigious Maitama. Boasts soaring double-volume living ceilings, private private elevator, heated rooftop infinity swimming pool, smart automated climate control, dedicated home cinema, private gymnasium, and executive security bunker.',
    property_type: 'Mansion',
    transaction_type: 'Buy',
    status: 'Available',
    price: 650000000,
    currency: 'NGN',
    price_label: 'Price on Verified Application',
    country: 'Nigeria',
    state: 'Federal Capital Territory',
    lga: 'Abuja Municipal Area Council (AMAC)',
    district: 'Maitama',
    location: 'Maitama Diplomatic Zone, Abuja',
    estate: 'Ministers Hill Executive Enclave',
    street: 'Gana Street Extension Axis',
    latitude: 9.0882,
    longitude: 7.4983,
    landmark_distances: [
      { landmark: 'Transcorp Hilton Hotel', distance: '2.5 km', drive_time: '4 mins' },
      { landmark: 'IBB International Golf Course', distance: '3.1 km', drive_time: '5 mins' },
      { landmark: 'Millennium Park', distance: '4.0 km', drive_time: '6 mins' }
    ],
    land_size: '1200 sqm',
    building_size: '950 sqm',
    bedrooms: 5,
    bathrooms: 6,
    toilets: 7,
    parking_spaces: 6,
    floors: 3,
    year_built: 2026,
    verification_status: 'Verified',
    documentation_status: ['Certificate of Occupancy (C of O)', "Governor's Consent"],
    documentation_notes: 'Direct primary FCTA C of O with all cadastral survey verifications in place.',
    featured: true,
    published: true,
    is_demo: false,
    tags: ['Featured', 'Luxury', 'Exclusive', 'Waterfront / Pool', 'Smart Home'],
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6c563aaec9?w=1200&auto=format&fit=crop&q=80'
    ],
    features: [
      'Private Heated Infinity Swimming Pool',
      'Private 6-Person Glass Elevator',
      'Fully Integrated Smart Home Automation',
      '12-Seater Acoustic Home Cinema',
      'Dual 2-Bedroom Boys Quarters (BQ)',
      'Underground Wine Cellar & Cigar Lounge',
      'Automated Access Control Gate & Manned Guard Post',
      'Heavy Duty Industrial Generator & Solar Microgrid'
    ],
    created_at: '2026-08-01T09:00:00Z',
    updated_at: '2026-09-12T16:00:00Z'
  },
  {
    id: 'prop-guzape-duplex-04',
    property_id: 'ES-00052',
    title: '4 Bedroom Semi-Detached Duplex with Panoramic Hill View',
    slug: '4-bedroom-semi-detached-duplex-panoramic-hill-view-guzape-abuja',
    description: 'Commanding breathtaking panoramic vistas of the Abuja skyline from the prestigious Guzape Hills. This premium residence blends modern clean aesthetics with solid engineering by CAAM Engineering LTD. Features expansive balconies, fitted chef kitchen, and private compound.',
    property_type: 'Semi-Detached House',
    transaction_type: 'Buy',
    status: 'Available',
    price: 135000000,
    currency: 'NGN',
    country: 'Nigeria',
    state: 'Federal Capital Territory',
    lga: 'Abuja Municipal Area Council (AMAC)',
    district: 'Guzape',
    location: 'Guzape Hills, Abuja',
    estate: 'Guzape View Crest',
    street: 'Hilltop Promenade',
    latitude: 9.0345,
    longitude: 7.5142,
    landmark_distances: [
      { landmark: 'Asokoro District Border', distance: '1.8 km', drive_time: '3 mins' },
      { landmark: 'Central Area / CBD', distance: '7.5 km', drive_time: '9 mins' },
      { landmark: 'National Hospital Abuja', distance: '6.2 km', drive_time: '8 mins' }
    ],
    land_size: '500 sqm',
    building_size: '420 sqm',
    bedrooms: 4,
    bathrooms: 4,
    toilets: 5,
    parking_spaces: 4,
    floors: 2,
    year_built: 2025,
    verification_status: 'Verified',
    documentation_status: ['Certificate of Occupancy (C of O)', 'Deed of Assignment'],
    developer_id: 'partner-5',
    developer_name: 'CAAM Engineering LTD',
    featured: true,
    published: true,
    is_demo: false,
    tags: ['Luxury', 'Panoramic View', 'Hot Deal', 'Ready to Move In'],
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&auto=format&fit=crop&q=80'
    ],
    features: [
      'Unobstructed Hilltop Panoramic Vistas',
      'German Engineered Windows & Bi-fold Balcony Doors',
      'Fitted Gourmet Kitchen with Marble Island',
      'Spacious Self-Contained BQ',
      'Paved Compound with Space for 4 Cars',
      'Estate Security Patrol & Smart Intercom'
    ],
    created_at: '2026-08-18T14:00:00Z',
    updated_at: '2026-09-10T10:00:00Z'
  },
  {
    id: 'prop-jabi-apartment-05',
    property_id: 'ES-00063',
    title: '3 Bedroom Fully Serviced Luxury Apartment near Jabi Lake',
    slug: '3-bedroom-serviced-luxury-apartment-jabi-lake-abuja',
    description: 'A premium lifestyle investment within walking distance of Jabi Lake Mall. Ideal for discerning homeowners or high-yield executive shortlet/rental investors. Features an on-site swimming pool, fully equipped gymnasium, 24/7 central generator, and concierge reception.',
    property_type: 'Apartment',
    transaction_type: 'Buy',
    status: 'Available',
    price: 75000000,
    currency: 'NGN',
    country: 'Nigeria',
    state: 'Federal Capital Territory',
    lga: 'Abuja Municipal Area Council (AMAC)',
    district: 'Jabi & Utako',
    location: 'Jabi Lake Promenade Axis, Abuja',
    estate: 'Lake Crest Heights',
    street: 'Bala Sokoto Way',
    latitude: 9.0621,
    longitude: 7.4298,
    landmark_distances: [
      { landmark: 'Jabi Lake Mall & Waterfront', distance: '0.8 km', drive_time: '2 mins' },
      { landmark: 'Utako Market & Commercial Zone', distance: '2.0 km', drive_time: '4 mins' },
      { landmark: 'Wuse 2 District', distance: '5.5 km', drive_time: '7 mins' }
    ],
    land_size: '220 sqm',
    building_size: '190 sqm',
    bedrooms: 3,
    bathrooms: 3,
    toilets: 4,
    parking_spaces: 2,
    floors: 1,
    year_built: 2025,
    verification_status: 'Verified',
    documentation_status: ['Right of Occupancy (R of O)', 'Deed of Assignment', 'Estate Documentation'],
    featured: false,
    published: true,
    is_demo: false,
    tags: ['Investment', 'High Rental Yield', 'Serviced', 'Near Jabi Lake'],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop&q=80'
    ],
    features: [
      'Resort-Style Swimming Pool & Sundeck',
      'Fully Equipped Fitness Gym',
      '24/7 Constant Electricity (Dual Power Backup)',
      'Modern Elevators & Concierge Lobby',
      'Dedicated Reserved Covered Parking',
      'Estimated ₦8M - ₦11M Annual Shortlet Yield'
    ],
    created_at: '2026-08-20T08:00:00Z',
    updated_at: '2026-09-08T09:00:00Z'
  },
  {
    id: 'prop-katampe-terrace-06',
    property_id: 'ES-00072',
    title: '4 Bedroom Smart Terrace Duplex with Solar Inverter System',
    slug: '4-bedroom-smart-terrace-duplex-katampe-extension-abuja',
    description: 'Contemporary living in the fast-appreciating Katampe Extension. Designed for energy independence with a built-in 10kVA solar inverter system. Features smart ambient lighting, designer kitchen island, rooftop lounge terrace, and dedicated maid room.',
    property_type: 'Terrace Duplex',
    transaction_type: 'Buy',
    status: 'Available',
    price: 95000000,
    currency: 'NGN',
    country: 'Nigeria',
    state: 'Federal Capital Territory',
    lga: 'Abuja Municipal Area Council (AMAC)',
    district: 'Katampe Extension',
    location: 'Katampe Extension, Abuja',
    estate: 'Hilltop Horizon Enclave',
    street: 'Diplomatic Zone Drive',
    latitude: 9.1023,
    longitude: 7.4611,
    land_size: '380 sqm',
    building_size: '330 sqm',
    bedrooms: 4,
    bathrooms: 4,
    toilets: 5,
    parking_spaces: 3,
    floors: 2,
    year_built: 2026,
    verification_status: 'Verified',
    documentation_status: ['Certificate of Occupancy (C of O)', 'Allocation Letter'],
    developer_id: 'partner-2',
    developer_name: 'Ditto Group',
    featured: true,
    published: true,
    is_demo: false,
    tags: ['Smart Home', 'Solar Powered', 'Luxury', 'Appreciating Area'],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&auto=format&fit=crop&q=80'
    ],
    features: [
      'Integrated 10kVA Solar & Lithium Battery Power',
      'Smart Voice & Mobile App Lighting Control',
      'Rooftop BBQ and Sundowner Terrace',
      'Separate En-Suite Maid Quarters',
      'Perimeter Security, Beam Sensors & 24/7 Guards'
    ],
    created_at: '2026-08-25T13:00:00Z',
    updated_at: '2026-09-14T11:00:00Z'
  },
  {
    id: 'prop-lugbe-plots-07',
    property_id: 'ES-00029',
    title: 'Prime 600 sqm Serviced Residential Plots on Airport Road',
    slug: 'prime-600sqm-serviced-residential-plots-lugbe-airport-road-abuja',
    description: 'Instant allocation plots located within a fully gated residential scheme along the Airport Road corridor. High capital appreciation zone close to Pyakasa and Federal Housing Lugbe. Ready for immediate building approval and construction.',
    property_type: 'Land',
    transaction_type: 'Land',
    status: 'Available',
    price: 18000000,
    currency: 'NGN',
    price_label: 'Per 600 sqm Plot',
    country: 'Nigeria',
    state: 'Federal Capital Territory',
    lga: 'Abuja Municipal Area Council (AMAC)',
    district: 'Lugbe / Airport Road',
    location: 'Airport Road / Lugbe Corridor, Abuja',
    estate: 'Green Crest Gated Layout',
    street: 'Airport Expressway Sector 4',
    latitude: 8.9812,
    longitude: 7.3621,
    land_size: '600 sqm',
    bedrooms: 0,
    bathrooms: 0,
    verification_status: 'Verified',
    documentation_status: ['Allocation Letter', 'Survey Plan', 'Deed of Assignment'],
    developer_id: 'partner-4',
    developer_name: 'Ipent Estates',
    featured: false,
    published: true,
    is_demo: false,
    tags: ['Land', 'Investment', 'Affordable', 'Ready for Construction'],
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500076656116-558758c991c1?w=1200&auto=format&fit=crop&q=80'
    ],
    features: [
      'Fully Beaconed & Demarcated 600 sqm Plots',
      'Graded and Tarred Internal Estate Roads',
      'Ready Drainage and Electricity Connection Poles',
      'Instant Physical Allocation on Confirmation'
    ],
    created_at: '2026-08-05T09:30:00Z',
    updated_at: '2026-09-02T15:00:00Z'
  },
  {
    id: 'prop-cbd-plaza-08',
    property_id: 'ES-00095',
    title: 'Multi-Floor Commercial Office Complex (Central Business District)',
    slug: 'multi-floor-commercial-office-complex-cbd-abuja',
    description: 'A Grade-A institutional commercial property located in the heart of Abuja’s financial and administrative nerve centre. Offers 2,500 sqm of lettable open-plan corporate space across 5 floors with high-speed passenger elevators, basement parking for 40 vehicles, and dedicated transformer.',
    property_type: 'Commercial Property',
    transaction_type: 'Buy',
    status: 'Available',
    price: 850000000,
    currency: 'NGN',
    price_label: 'Institutional Asset Sale',
    country: 'Nigeria',
    state: 'Federal Capital Territory',
    lga: 'Abuja Municipal Area Council (AMAC)',
    district: 'Central Business District (CBD)',
    location: 'Central Business District, Abuja',
    estate: 'Millennium Commercial Enclave',
    street: 'Herbert Macaulay Way Axis',
    latitude: 9.0551,
    longitude: 7.4892,
    land_size: '1800 sqm',
    building_size: '2500 sqm',
    bedrooms: 0,
    bathrooms: 12,
    toilets: 16,
    parking_spaces: 40,
    floors: 5,
    year_built: 2024,
    verification_status: 'Verified',
    documentation_status: ['Certificate of Occupancy (C of O)', 'Governor\'s Consent'],
    featured: true,
    published: true,
    is_demo: false,
    tags: ['Commercial', 'Corporate Investment', 'High Yield', 'CBD Abuja'],
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&auto=format&fit=crop&q=80'
    ],
    features: [
      '2,500 sqm Lettable Open-Plan Office Floorplates',
      'Dual 10-Passenger High-Speed Elevators',
      'Basement & Ground Level Secured Parking for 40+ Cars',
      '500kVA Dedicated Transformer & Dual Caterpillar Backup Gensets',
      'Central Chilled-Water HVAC Air-Conditioning System'
    ],
    created_at: '2026-07-20T10:00:00Z',
    updated_at: '2026-09-04T12:00:00Z'
  },
  {
    id: 'prop-wuse-rent-09',
    property_id: 'ES-00038',
    title: '2 Bedroom Luxury Serviced Apartment for Rent / Executive Lease',
    slug: '2-bedroom-luxury-serviced-apartment-wuse-2-abuja',
    description: 'Exquisitely furnished 2-bedroom executive apartment located in the prime lifestyle district of Wuse 2. Offers seamless convenience with 24-hour power, high-speed WiFi, housekeeping service, private gym, and premium security.',
    property_type: 'Apartment',
    transaction_type: 'Rent',
    status: 'Available',
    price: 8500000,
    currency: 'NGN',
    price_label: 'Per Annum (Service Charge Inclusive)',
    country: 'Nigeria',
    state: 'Federal Capital Territory',
    lga: 'Abuja Municipal Area Council (AMAC)',
    district: 'Wuse & Wuse 2',
    location: 'Wuse 2, Abuja',
    estate: 'Adetokunbo Court',
    street: 'Aminu Kano Crescent Offshoot',
    latitude: 9.0741,
    longitude: 7.4722,
    land_size: '160 sqm',
    building_size: '140 sqm',
    bedrooms: 2,
    bathrooms: 2,
    toilets: 3,
    parking_spaces: 2,
    floors: 1,
    year_built: 2025,
    verification_status: 'Verified',
    documentation_status: ['Estate Documentation'],
    featured: false,
    published: true,
    is_demo: false,
    tags: ['Rent', 'Fully Furnished', 'Wuse 2', 'Serviced'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502005229762-ee10234ba2b7?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=1200&auto=format&fit=crop&q=80'
    ],
    features: [
      'Fully Furnished with Designer European Furniture',
      '24/7 Uninterrupted Electricity & AC',
      'Equipped Kitchen with Microwave, Oven, Refrigerator',
      'High-Speed Fiber Optical Internet Included',
      'Daily Concierge & Bi-Weekly Housekeeping'
    ],
    created_at: '2026-08-28T16:00:00Z',
    updated_at: '2026-09-15T09:00:00Z'
  },
  {
    id: 'prop-gwarinpa-flat-10',
    property_id: 'ES-00049',
    title: '3 Bedroom Contemporary Flat in Gwarinpa Estate',
    slug: '3-bedroom-contemporary-flat-gwarinpa-estate-abuja',
    description: 'Located within Africa’s largest planned residential estate. This 3-bedroom flat offers excellent value with a master suite, fitted wardrobes, tiled floors, reliable water reticulation, and proximity to 3rd Avenue commercial strip.',
    property_type: 'Flat',
    transaction_type: 'Buy',
    status: 'Available',
    price: 48000000,
    currency: 'NGN',
    country: 'Nigeria',
    state: 'Federal Capital Territory',
    lga: 'Bwari Area Council',
    district: 'Gwarinpa & Dawaki',
    location: 'Gwarinpa Estate, Abuja',
    estate: 'Gwarinpa Model Enclave',
    street: '3rd Avenue Axis',
    latitude: 9.1154,
    longitude: 7.4112,
    land_size: '220 sqm',
    building_size: '180 sqm',
    bedrooms: 3,
    bathrooms: 3,
    toilets: 4,
    parking_spaces: 2,
    floors: 1,
    year_built: 2024,
    verification_status: 'Verified',
    documentation_status: ['Federal Housing Authority (FHA) Allocation', 'Deed of Assignment'],
    featured: false,
    published: true,
    is_demo: false,
    tags: ['Gwarinpa', 'Family Home', 'Affordable', 'Ready to Move In'],
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80'
    ],
    features: [
      'Master Bedroom with Jacuzzi Bath',
      'Dedicated Borehole with Overhead Storage',
      'Gated Compound with Manned Security',
      'Close proximity to Top Primary & Secondary Schools'
    ],
    created_at: '2026-08-12T11:00:00Z',
    updated_at: '2026-09-07T13:00:00Z'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Navigating Land Titles in Abuja: Understanding C of O, R of O, and Governor’s Consent',
    slug: 'navigating-land-titles-abuja-c-of-o-r-of-o-governors-consent',
    excerpt: 'Before committing funds to any Abuja property or plot, understanding the legal weight and verification procedures of land titles is crucial for secure investment.',
    content: `Property acquisition in the Federal Capital Territory (FCT) requires strict diligence. Unlike traditional land ownership in other Nigerian states governed by customary claims, all land in the FCT is vested in the Federal Government under the administration of the Minister of the Federal Capital Territory via the Abuja Geographic Information Systems (AGIS).

### 1. Certificate of Occupancy (C of O)
A Certificate of Occupancy is the highest proof of land ownership granted directly by the FCT Minister for a statutory term of 99 years. It certifies that the titleholder has been granted legal leasehold rights over the specified cadastral plot.

### 2. Right of Occupancy (R of O)
An R of O is an offer or preliminary grant of statutory right of occupancy by the FCDA/FCTA prior to the formal issuance of the physical C of O certificate. It constitutes valid title when backed by official allocation letters, acceptance receipts, and AGIS file indexing.

### 3. Deed of Assignment and Governor's Consent
When a property with an existing C of O or R of O is resold, the transfer of ownership is executed via a Deed of Assignment. For this transfer to be legally binding and registered at AGIS, Ministerial Consent (the FCT equivalent of Governor's Consent) must be obtained.

At Estate Shelters, our Market Analysis Department (MAD) and legal verification team perform comprehensive AGIS search and title verification on all partnered listings before presenting them to buyers.`,
    featured_image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    category: 'Buying Guide',
    author: 'Market Analysis Department (MAD)',
    author_role: 'Lead Real Estate Strategist',
    read_time: '5 min read',
    tags: ['Abuja Real Estate', 'Land Titles', 'AGIS', 'Due Diligence', 'C of O'],
    published: true,
    published_at: '2026-08-20T10:00:00Z',
    created_at: '2026-08-20T10:00:00Z'
  },
  {
    id: 'post-2',
    title: 'Top High-Yield Real Estate Growth Corridors in Abuja for 2026 and Beyond',
    slug: 'top-high-yield-real-estate-growth-corridors-abuja-2026',
    excerpt: 'An in-depth analysis of capital appreciation trends across Airport Road / Kyami, Katampe Extension, Guzape Hills, and Apo Dutse.',
    content: `Abuja continues to experience rapid demographic influx and infrastructure expansion. Investors seeking strong capital growth combined with steady rental yields must focus on specific developing sectors.

### 1. The Airport Road & Kyami Corridor
With developments like Centenary City, modern gated schemes such as ABU Estate, and direct expressway connectivity to Nnamdi Azikiwe Airport, the Kyami axis represents one of the most cost-effective entry points for residential and buy-to-let investments.

### 2. Katampe Extension
Positioned strategically between Maitama and the outer northern expressway, Katampe Extension attracts top-tier diplomat tenants and executive homeowners seeking modern architectural finishes and serene topography.

### 3. Apo Dutse and Resettlement
Apo Dutse offers a balanced lifestyle with rapid access to the Central Business District (CBD) and Apo Legislative Quarters. Terrace duplex schemes here boast average occupancy rates above 94%.

Contact Estate Shelters today to receive our customized quarterly Abuja Real Estate Yield Report.`,
    featured_image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
    category: 'Market Insights',
    author: 'Estate Shelters Research',
    author_role: 'Research & Advisory Team',
    read_time: '6 min read',
    tags: ['Investment', 'Abuja Growth', 'Kyami', 'Airport Road', 'Yield Analysis'],
    published: true,
    published_at: '2026-09-02T12:00:00Z',
    created_at: '2026-09-02T12:00:00Z'
  },
  {
    id: 'post-3',
    title: 'Case Study: Facilitating 500 Mass Housing Units for NNPC Cooperative in Chiku',
    slug: 'case-study-500-mass-housing-units-nnpc-cooperative-chiku',
    excerpt: 'How Estate Shelters structured and executed the marketing and sales of 500 mass housing units in Chiku LGA, Kaduna State.',
    content: `Large-scale institutional real estate transactions require rigorous coordination, transparent stakeholder management, and structured sales pipelines.

### Project Overview
- **Client:** NNPC Staff Multipurpose Co-operative Society Abuja
- **Scope:** Marketing and sales coordination of 500 mass housing units
- **Location:** Chiku LGA, Kaduna State
- **Execution Role:** Estate Shelters Ltd

### Key Outcomes Delivered
1. **Standardized Documentation:** Structured buyer documentation pipelines to streamline cooperative member subscriptions.
2. **Transparent Progress Tracking:** Coordinated phased property onboarding and quality inspection verification.
3. **Institutional Trust:** Demonstrated Estate Shelters' capacity to participate in high-volume, multi-stakeholder real estate delivery.

Whether you are a developer with a 20-unit luxury terrace scheme or an institutional body with hundreds of residential allocations, Estate Shelters provides the market intelligence and sales velocity needed for guaranteed success.`,
    featured_image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=1200&auto=format&fit=crop&q=80',
    category: 'Company News',
    author: 'Corporate Communications',
    author_role: 'Estate Shelters Ltd',
    read_time: '4 min read',
    tags: ['NNPC Project', 'Case Study', 'Mass Housing', 'Track Record', 'Chiku'],
    published: true,
    published_at: '2026-09-10T14:00:00Z',
    created_at: '2026-09-10T14:00:00Z'
  }
];
