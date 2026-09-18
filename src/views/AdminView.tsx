import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Plus, 
  Trash2, 
  Edit3, 
  Sparkles, 
  CheckCircle2, 
  X, 
  Eye, 
  ShieldCheck, 
  Database, 
  Lock, 
  LogOut, 
  MessageCircle, 
  Calendar, 
  FileText, 
  Users, 
  Settings as SettingsIcon, 
  Search,
  Save,
  Loader2,
  TrendingUp,
  Clock,
  Copy,
  Check,
  Download,
  Terminal,
  Server,
  HardDrive,
  Layers,
  ArrowUpRight,
  Star
} from 'lucide-react';
import { Property, SiteSettings, PropertyOption, PropertyType, TransactionType, VerificationStatus } from '../types';
import { api } from '../lib/api';
import { formatCurrency } from '../lib/whatsapp';
import { PropertyImageUploader } from '../components/PropertyImageUploader';
import { notify } from '../components/ToastNotification';

const PRESET_FEATURES = [
  '24/7 Security Patrol & Gatehouse',
  'Central Solar & Inverter Backup',
  'Italian Fitted Kitchen + Heat Extractor',
  'En-Suite Boys\' Quarters (BQ)',
  'Water Reticulation & Treatment Plant',
  'Tarred Access Road Network',
  'Underground Drainage System',
  'Elevator / Mechanical Lift',
  'Fiber Optic WiFi Infrastructure',
  'Smart Home Automation & Intercom',
  'CCTV Surveillance System',
  'Electric Perimeter Fencing',
  'Ample Parking (3+ Vehicles)',
  'Swimming Pool & Sun Deck',
  'Fitness Gym & Wellness Club',
  'Standby Industrial Generator',
  'Private Rooftop Sit-Out Lounge',
  'Jacuzzi / Master Soaker Tub',
  'Children Play Park & Lawn',
  'Private Cinema / Media Room'
];

const PRESET_DOCUMENTS = [
  'Certificate of Occupancy (C of O)',
  'Right of Occupancy (R of O)',
  'Deed of Assignment',
  'Governor\'s Consent',
  'Survey Plan',
  'Building Plan Approval',
  'FHA Allocation',
  'AGIS Recertification Passed',
  'Estate Allocation Letter'
];

const PRESET_TAGS = [
  'Featured',
  'AGIS Verified',
  'High Yield ROI',
  'Hot Deal',
  'Off-Plan Discount',
  'Ready to Move In',
  'Diplomatic Enclave',
  'Airport Road Corridor',
  'Flexible Payment Plan',
  'Distress Sale'
];

const PRESET_OPTIONS_TEMPLATES = [
  { name: 'Carcass / Structural Shell Option', price: 35000000, description: 'Roofing, blockwork & structural framing complete' },
  { name: 'Semi-Finished Option', price: 48000000, description: 'Plastered walls, electrical piping & windows completed' },
  { name: 'Fully Finished Option', price: 60000000, description: 'Move-in ready with luxury tiling, sanitary ware & fitted kitchen' },
  { name: 'Fully Serviced Package', price: 75000000, description: 'Includes inverter backup, AC units & facility management' },
  { name: 'Serviced Plot / Land Allocation', price: 20000000, description: 'Approved building layout plot with estate infrastructure' }
];

interface AdminViewProps {
  properties: Property[];
  onRefreshProperties: () => void;
  settings: SiteSettings;
  onUpdateSettings: (newSettings: SiteSettings) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  properties,
  onRefreshProperties,
  settings,
  onUpdateSettings
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('estateshelters_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'properties' | 'enquiries' | 'inspections' | 'requests' | 'settings' | 'database'>('properties');
  
  // Data states
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [inspections, setInspections] = useState<any[]>([]);
  const [propertyRequests, setPropertyRequests] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Astra DB / CQL states
  const [astraStatus, setAstraStatus] = useState<any>(null);
  const [cqlContent, setCqlContent] = useState<string>('');
  const [cqlCopied, setCqlCopied] = useState(false);
  const [isTestingAstra, setIsTestingAstra] = useState(false);
  const [astraTestResult, setAstraTestResult] = useState<any>(null);
  const [isSyncingAstra, setIsSyncingAstra] = useState(false);
  const [astraSyncResult, setAstraSyncResult] = useState<any>(null);

  // Property Modal (Add / Edit)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiEnhanceLoading, setAiEnhanceLoading] = useState(false);

  // Comprehensive Form states for Property
  const [formTitle, setFormTitle] = useState('');
  const [formPropertyId, setFormPropertyId] = useState('');
  const [formDistrict, setFormDistrict] = useState('Kyami');
  const [formLga, setFormLga] = useState('Abuja Municipal Area Council (AMAC)');
  const [formState, setFormState] = useState('Federal Capital Territory');
  const [formEstate, setFormEstate] = useState('ABU Estate Corridor');
  const [formStreet, setFormStreet] = useState('');
  const [formPrice, setFormPrice] = useState(45000000);
  const [formCurrency, setFormCurrency] = useState<'NGN' | 'USD' | 'GBP'>('NGN');
  const [formPriceLabel, setFormPriceLabel] = useState('Outright Purchase');
  const [formPropertyType, setFormPropertyType] = useState<any>('Terrace Duplex');
  const [formTransactionType, setFormTransactionType] = useState<any>('Buy');
  const [formBedrooms, setFormBedrooms] = useState(4);
  const [formBathrooms, setFormBathrooms] = useState(4);
  const [formToilets, setFormToilets] = useState(5);
  const [formParkingSpaces, setFormParkingSpaces] = useState(3);
  const [formFloors, setFormFloors] = useState(2);
  const [formYearBuilt, setFormYearBuilt] = useState(2026);
  const [formLandSize, setFormLandSize] = useState('400 sqm');
  const [formBuildingSize, setFormBuildingSize] = useState('320 sqm');
  const [formDescription, setFormDescription] = useState('');
  const [formImagesList, setFormImagesList] = useState<string[]>([]);
  const [formVideoUrl, setFormVideoUrl] = useState('');
  const [formVirtualTourUrl, setFormVirtualTourUrl] = useState('');
  const [formFloorPlanUrl, setFormFloorPlanUrl] = useState('');
  const [formBrochureUrl, setFormBrochureUrl] = useState('');
  const [formFeaturesList, setFormFeaturesList] = useState<string[]>([]);
  const [formDocStatusList, setFormDocStatusList] = useState<string[]>([]);
  const [formDocNotes, setFormDocNotes] = useState('');
  const [formVerificationStatus, setFormVerificationStatus] = useState<VerificationStatus>('Verified');
  const [formFeatured, setFormFeatured] = useState(false);
  const [formStatus, setFormStatus] = useState<any>('Available');
  const [formDeveloper, setFormDeveloper] = useState('Estate Shelters Syndicate');
  const [formTagsList, setFormTagsList] = useState<string[]>([]);
  const [formOptionsList, setFormOptionsList] = useState<PropertyOption[]>([]);
  const [formCustomFeatureInput, setFormCustomFeatureInput] = useState('');
  const [formCustomDocInput, setFormCustomDocInput] = useState('');
  const [formCustomTagInput, setFormCustomTagInput] = useState('');

  // Settings form
  const [tempSettings, setTempSettings] = useState<SiteSettings>(settings);

  // Fetch admin items
  const loadAdminData = async () => {
    setLoadingData(true);
    try {
      const [enqRes, inspRes, reqRes] = await Promise.all([
        api.getEnquiries(),
        api.getInspections(),
        api.getPropertyRequests()
      ]);
      setEnquiries(enqRes);
      setInspections(inspRes);
      setPropertyRequests(reqRes);

      // Load Astra status and CQL content
      try {
        const astraRes = await fetch('/api/astra/status');
        if (astraRes.ok) setAstraStatus(await astraRes.json());
      } catch (e) {
        console.warn(e);
      }

      try {
        const cqlRes = await fetch('/api/database/cql-content');
        if (cqlRes.ok) {
          const cqlData = await cqlRes.json();
          setCqlContent(cqlData.cql || '');
        }
      } catch (e) {
        console.warn(e);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAdminData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'Estateshelters@1' || passwordInput === 'admin') {
      setIsAuthenticated(true);
      localStorage.setItem('estateshelters_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Invalid administrator credentials. Please contact IT support if you require access.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('estateshelters_admin_auth');
  };

  const openAddPropertyModal = () => {
    setEditingProperty(null);
    const count = properties.length + 1;
    setFormTitle('');
    setFormPropertyId(`ES-${Math.floor(Math.random() * 90000 + 10000)}`);
    setFormDistrict('Kyami');
    setFormLga('Abuja Municipal Area Council (AMAC)');
    setFormState('Federal Capital Territory');
    setFormEstate('ABU Estate Corridor');
    setFormStreet('');
    setFormPrice(45000000);
    setFormCurrency('NGN');
    setFormPriceLabel('Outright Purchase');
    setFormPropertyType('Terrace Duplex');
    setFormTransactionType('Buy');
    setFormBedrooms(4);
    setFormBathrooms(4);
    setFormToilets(5);
    setFormParkingSpaces(3);
    setFormFloors(2);
    setFormYearBuilt(2026);
    setFormLandSize('400 sqm');
    setFormBuildingSize('320 sqm');
    setFormDescription('An elegantly finished luxury property offering contemporary living in a serene, master-planned Abuja enclave with verified cadastral title.');
    setFormImagesList([
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80'
    ]);
    setFormVideoUrl('');
    setFormVirtualTourUrl('');
    setFormFloorPlanUrl('');
    setFormBrochureUrl('');
    setFormFeaturesList([
      '24/7 Security Patrol & Gatehouse',
      'Central Solar & Inverter Backup',
      'Italian Fitted Kitchen + Heat Extractor',
      'En-Suite Boys\' Quarters (BQ)',
      'Water Reticulation & Treatment Plant',
      'Tarred Access Road Network'
    ]);
    setFormDocStatusList([
      'Right of Occupancy (R of O)',
      'Building Plan Approval',
      'AGIS Recertification Passed'
    ]);
    setFormDocNotes('Verified AGIS allocation with clear FCDA layout clearance and beacon certificate.');
    setFormVerificationStatus('Verified');
    setFormFeatured(true);
    setFormStatus('Available');
    setFormDeveloper('Estate Shelters Syndicate');
    setFormTagsList(['Featured', 'AGIS Verified', 'Hot Deal']);
    setFormOptionsList([
      { name: 'Carcass / Structural Shell Option', price: 35000000, description: 'Roofing, masonry & structural framing complete' },
      { name: 'Fully Finished & Serviced Option', price: 55000000, description: 'Move-in ready with luxury tiling, sanitary ware & fitted kitchen' }
    ]);
    setIsModalOpen(true);
  };

  const openEditPropertyModal = (p: Property) => {
    setEditingProperty(p);
    setFormTitle(p.title || '');
    setFormPropertyId(p.property_id || '');
    setFormDistrict(p.district || 'Kyami');
    setFormLga(p.lga || 'Abuja Municipal Area Council (AMAC)');
    setFormState(p.state || 'Federal Capital Territory');
    setFormEstate(p.estate || '');
    setFormStreet(p.street || '');
    setFormPrice(p.price || 0);
    setFormCurrency(p.currency || 'NGN');
    setFormPriceLabel(p.price_label || 'Outright Purchase');
    setFormPropertyType(p.property_type || 'Terrace Duplex');
    setFormTransactionType(p.transaction_type || 'Buy');
    setFormBedrooms(p.bedrooms || 0);
    setFormBathrooms(p.bathrooms || 0);
    setFormToilets(p.toilets || p.bathrooms || 0);
    setFormParkingSpaces(p.parking_spaces || 3);
    setFormFloors(p.floors || 2);
    setFormYearBuilt(p.year_built || 2026);
    setFormLandSize(p.land_size || '400 sqm');
    setFormBuildingSize(p.building_size || '320 sqm');
    setFormDescription(p.description || '');
    setFormImagesList(p.images && p.images.length > 0 ? p.images : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80']);
    setFormVideoUrl(p.video_url || '');
    setFormVirtualTourUrl(p.virtual_tour_url || '');
    setFormFloorPlanUrl(p.floor_plan_url || '');
    setFormBrochureUrl(p.brochure_url || '');
    setFormFeaturesList(p.features || []);
    setFormDocStatusList(p.documentation_status || []);
    setFormDocNotes(p.documentation_notes || '');
    setFormVerificationStatus(p.verification_status || 'Verified');
    setFormFeatured(Boolean(p.featured));
    setFormStatus(p.status || 'Available');
    setFormDeveloper(p.developer_name || '');
    setFormTagsList(p.tags || []);
    setFormOptionsList(p.options || []);
    setIsModalOpen(true);
  };

  const toggleFeature = (feat: string) => {
    setFormFeaturesList(prev =>
      prev.includes(feat) ? prev.filter(f => f !== feat) : [...prev, feat]
    );
  };

  const toggleDoc = (doc: string) => {
    setFormDocStatusList(prev =>
      prev.includes(doc) ? prev.filter(d => d !== doc) : [...prev, doc]
    );
  };

  const toggleTag = (tag: string) => {
    setFormTagsList(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const addCustomFeature = () => {
    const val = formCustomFeatureInput.trim();
    if (val && !formFeaturesList.includes(val)) {
      setFormFeaturesList([...formFeaturesList, val]);
      setFormCustomFeatureInput('');
    }
  };

  const addCustomDoc = () => {
    const val = formCustomDocInput.trim();
    if (val && !formDocStatusList.includes(val)) {
      setFormDocStatusList([...formDocStatusList, val]);
      setFormCustomDocInput('');
    }
  };

  const addCustomTag = () => {
    const val = formCustomTagInput.trim();
    if (val && !formTagsList.includes(val)) {
      setFormTagsList([...formTagsList, val]);
      setFormCustomTagInput('');
    }
  };

  const addOption = (opt: PropertyOption) => {
    setFormOptionsList([...formOptionsList, opt]);
  };

  const removeOption = (index: number) => {
    setFormOptionsList(formOptionsList.filter((_, i) => i !== index));
  };

  const updateOption = (index: number, field: keyof PropertyOption, value: any) => {
    const updated = [...formOptionsList];
    updated[index] = { ...updated[index], [field]: value };
    setFormOptionsList(updated);
  };

  const handleSaveProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const imagesToSave = formImagesList.slice(0, 8);
    const primaryCoverImage = imagesToSave[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80';

    const propertyPayload: Partial<Property> = {
      property_id: formPropertyId,
      title: formTitle,
      slug: slug || 'estate-shelters-property',
      price: Number(formPrice),
      currency: formCurrency,
      price_label: formPriceLabel,
      options: formOptionsList,
      country: 'Nigeria',
      state: formState,
      lga: formLga,
      district: formDistrict,
      location: `${formDistrict}, ${formState}`,
      estate: formEstate,
      street: formStreet,
      property_type: formPropertyType as PropertyType,
      transaction_type: formTransactionType as TransactionType,
      bedrooms: Number(formBedrooms),
      bathrooms: Number(formBathrooms),
      toilets: Number(formToilets),
      parking_spaces: Number(formParkingSpaces),
      floors: Number(formFloors),
      year_built: Number(formYearBuilt),
      land_size: formLandSize,
      building_size: formBuildingSize,
      description: formDescription,
      features: formFeaturesList,
      documentation_status: formDocStatusList,
      documentation_notes: formDocNotes,
      verification_status: formVerificationStatus,
      status: formStatus,
      featured: formFeatured,
      developer_name: formDeveloper || 'Estate Shelters Syndicate',
      tags: formTagsList,
      images: imagesToSave.length > 0 ? imagesToSave : [primaryCoverImage],
      video_url: formVideoUrl,
      virtual_tour_url: formVirtualTourUrl,
      floor_plan_url: formFloorPlanUrl,
      brochure_url: formBrochureUrl,
      published: true
    };

    const toastId = notify.loading(
      editingProperty ? 'Saving Property Updates...' : 'Publishing Property Listing...',
      'Persisting records to local database and Astra DB store...'
    );

    try {
      if (editingProperty) {
        await api.updateProperty(editingProperty.id, propertyPayload);
      } else {
        await api.createProperty(propertyPayload);
      }
      notify.dismiss(toastId);
      notify.success(
        editingProperty ? '✓ Property Listing Successfully Updated!' : '✓ New Property Listing Successfully Published!',
        `${formTitle} is now live and synchronized across database stores.`
      );
      setIsModalOpen(false);
      onRefreshProperties();
    } catch (err) {
      console.error('Failed to save property:', err);
      notify.dismiss(toastId);
      notify.error('Database Operation Failed', 'Could not save property record. Please try again.');
    }
  };

  const handleDeleteProperty = async (id: string) => {
    if (confirm('Are you sure you want to delete this property listing?')) {
      const toastId = notify.loading('Deleting Property Listing...', 'Removing record from database...');
      try {
        await api.deleteProperty(id);
        notify.dismiss(toastId);
        notify.success('✓ Property Removed', 'The property listing has been deleted from the database.');
        onRefreshProperties();
      } catch (err) {
        console.error(err);
        notify.dismiss(toastId);
        notify.error('Delete Failed', 'Could not delete property listing.');
      }
    }
  };

  const handleAiEnhanceListing = async () => {
    setAiEnhanceLoading(true);
    try {
      const res = await api.enhanceListing({
        title: formTitle,
        district: formDistrict,
        property_type: formPropertyType,
        price: formPrice,
        key_features: formFeaturesList,
        raw_notes: formDescription
      });

      if (res.title) setFormTitle(res.title);
      if (res.marketing_description) setFormDescription(res.marketing_description);
      if (res.features && res.features.length > 0) setFormFeaturesList(res.features);
      if (res.tagline) alert(`AI Enhanced Tagline: ${res.tagline}`);
    } catch (e) {
      console.error(e);
      alert('Could not enhance listing. Please check Gemini API configuration.');
    } finally {
      setAiEnhanceLoading(false);
    }
  };

  const handleCopyCql = () => {
    if (!cqlContent) return;
    navigator.clipboard.writeText(cqlContent);
    setCqlCopied(true);
    notify.success('✓ CQL Schema Copied!', 'Astra DB CQL initialization script copied to clipboard.');
    setTimeout(() => setCqlCopied(false), 3000);
  };

  const handleTestAstraConnection = async () => {
    setIsTestingAstra(true);
    setAstraTestResult(null);
    const toastId = notify.loading('Testing Database Connection...', 'Pinging DataStax Astra DB cluster...');

    try {
      const res = await fetch('/api/astra/test-connection', { method: 'POST' });
      const data = await res.json();
      setAstraTestResult(data);
      notify.dismiss(toastId);
      if (data.connected) {
        notify.success('✓ Database Connection Verified!', data.statusMessage || 'Connected to Astra DB');
      } else {
        notify.error('Database Connection Error', data.statusMessage || 'Could not reach Astra DB');
      }
    } catch (e: any) {
      notify.dismiss(toastId);
      notify.error('Network Error', e?.message || 'Error pinging database server');
      setAstraTestResult({ connected: false, statusMessage: e?.message || 'Network error testing Astra DB' });
    } finally {
      setIsTestingAstra(false);
    }
  };

  const handleSyncAstraData = async () => {
    setIsSyncingAstra(true);
    setAstraSyncResult(null);
    const toastId = notify.loading('Syncing Property Records...', 'Writing property listings to database...');

    try {
      const res = await fetch('/api/astra/sync-seed', { method: 'POST' });
      const data = await res.json();
      setAstraSyncResult(data);
      notify.dismiss(toastId);
      if (data.success) {
        notify.success('✓ Database Sync Complete!', data.message || 'Records synced successfully.');
      } else {
        notify.error('Database Sync Error', data.error || 'Sync failed');
      }
    } catch (e: any) {
      notify.dismiss(toastId);
      notify.error('Database Sync Error', e?.message || 'Error syncing database records');
      setAstraSyncResult({ success: false, message: e?.message || 'Network error syncing Astra DB' });
    } finally {
      setIsSyncingAstra(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-16 px-4">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-brand-heading">
              Estate Shelters Portal
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Authorized access for Estate Shelters Ltd staff & administrators.
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 text-xs font-semibold">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter administrator passcode"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors"
            >
              Authenticate Portal Access
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
            ES
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white font-brand-heading">
              Estate Shelters Administrator Dashboard
            </h1>
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <span className="flex items-center space-x-1 text-emerald-600">
                <Database className="w-3.5 h-3.5" />
                <span>{astraStatus?.configured ? 'Astra DB Cloud Connected' : 'Astra DB Schema Ready (Local Sync)'}</span>
              </span>
              <span>&bull;</span>
              <span>RC {settings.cac_reg_number}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={openAddPropertyModal}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Property</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-slate-600 dark:text-slate-300 hover:text-rose-600 transition-colors"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Live Listings</span>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 font-serif-luxury">{properties.length}</div>
          <span className="text-[10px] text-slate-400">All Abuja corridors</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Direct Enquiries</span>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-serif-luxury">{enquiries.length}</div>
          <span className="text-[10px] text-slate-400">Website leads</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Site Inspections</span>
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 font-serif-luxury">{inspections.length}</div>
          <span className="text-[10px] text-slate-400">Scheduled visits</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase">Property Requests</span>
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 font-serif-luxury">{propertyRequests.length}</div>
          <span className="text-[10px] text-slate-400">Finder matches</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2 text-xs font-bold overflow-x-auto no-scrollbar">
        {[
          { id: 'properties', label: `Properties (${properties.length})`, icon: Building2 },
          { id: 'enquiries', label: `Enquiries (${enquiries.length})`, icon: MessageCircle },
          { id: 'inspections', label: `Inspections (${inspections.length})`, icon: Calendar },
          { id: 'requests', label: `Client Requests (${propertyRequests.length})`, icon: FileText },
          { id: 'database', label: 'Astra DB & CQL Schema', icon: Database },
          { id: 'settings', label: 'Company Settings', icon: SettingsIcon },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl flex items-center space-x-1.5 transition-colors shrink-0 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab: Properties */}
      {activeTab === 'properties' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Property</th>
                  <th className="p-4">District</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Gallery</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Featured</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {properties.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={p.images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80'} 
                          alt="" 
                          className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700" 
                        />
                        <div>
                          <strong className="text-slate-900 dark:text-white font-bold line-clamp-1">{p.title}</strong>
                          <span className="text-[10px] text-slate-400 font-mono">ID: {p.property_id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-300 font-medium">{p.district}</td>
                    <td className="p-4 text-blue-600 dark:text-blue-400 font-bold">{formatCurrency(p.price, p.currency)}</td>
                    <td className="p-4 text-slate-500">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold">
                        {p.images?.length || 1} / 8 Photos
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        p.status === 'Available'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-800'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {p.featured ? (
                        <span className="text-amber-500 font-bold text-[11px] flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-amber-500" />
                          <span>Featured</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Standard</span>
                      )}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => openEditPropertyModal(p)}
                        className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300 transition-colors"
                        title="Edit Property & Photos"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProperty(p.id)}
                        className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950 dark:text-rose-300 transition-colors"
                        title="Delete Property"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Astra DB & CQL Schema */}
      {activeTab === 'database' && (
        <div className="space-y-6">
          
          {/* Connection Status & Summary Banner */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                    <span>DataStax Astra DB / Cassandra Real-Time Architecture</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                      CQL Ready
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Keyspace: <strong>{astraStatus?.namespace || 'estateshelters_keyspace'}</strong> &bull; Serverless Cassandra 4.x/5.x &bull; Multi-region replication
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <button
                  onClick={handleCopyCql}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-xs transition-colors"
                >
                  {cqlCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{cqlCopied ? 'CQL Copied!' : 'Copy Complete CQL'}</span>
                </button>

                <a
                  href="/api/database/schema.cql"
                  download="estateshelters_astradb_schema.cql"
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center space-x-1.5 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .cql</span>
                </a>
              </div>
            </div>

            {/* Quick Setup Instructions Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 space-y-1.5">
                <span className="text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400">Step 1</span>
                <h4 className="font-semibold text-xs text-slate-900 dark:text-white">Open Astra CQL Console</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Log in to <a href="https://astra.datastax.com" target="_blank" rel="noreferrer" className="text-blue-500 underline inline-flex items-center">astra.datastax.com <ArrowUpRight className="w-2.5 h-2.5 ml-0.5" /></a>, select your database, and open the <strong>CQL Console</strong> tab.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 space-y-1.5">
                <span className="text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400">Step 2</span>
                <h4 className="font-semibold text-xs text-slate-900 dark:text-white">Run Schema Commands</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Click <strong>Copy Complete CQL</strong> above, paste it directly into the Astra CQL Console, and press Enter to create all 10 tables and indexes.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 space-y-1.5">
                <span className="text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400">Step 3</span>
                <h4 className="font-semibold text-xs text-slate-900 dark:text-white">Connect Application Token</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Generate an Application Token (Database Admin) in Astra and add <code>ASTRA_DB_APPLICATION_TOKEN</code> and <code>ASTRA_DB_API_ENDPOINT</code> in <code>.env</code>.
                </p>
              </div>
            </div>

            {/* Live Connection Test & Seed Synchronization Panel */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white space-y-4 border border-blue-500/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-white flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <span>Live Astra DB Cluster Actions</span>
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Test your active cluster connection and synchronize verified Abuja real estate properties directly to Astra DB.
                  </p>
                </div>

                <div className="flex items-center space-x-2.5 shrink-0">
                  <button
                    onClick={handleTestAstraConnection}
                    disabled={isTestingAstra}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors disabled:opacity-50"
                  >
                    {isTestingAstra ? 'Pinging Cluster...' : 'Test Connection'}
                  </button>

                  <button
                    onClick={handleSyncAstraData}
                    disabled={isSyncingAstra}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors disabled:opacity-50"
                  >
                    {isSyncingAstra ? 'Syncing...' : 'Sync Properties to Astra DB'}
                  </button>
                </div>
              </div>

              {astraTestResult && (
                <div className={`p-3 rounded-xl text-xs font-mono ${astraTestResult.connected ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30' : 'bg-rose-950/80 text-rose-300 border border-rose-500/30'}`}>
                  <strong>{astraTestResult.connected ? '✓ Connected:' : '✕ Connection Error:'}</strong> {astraTestResult.statusMessage}
                  {astraTestResult.keyspace && <span className="block mt-1 text-[11px] opacity-80">Keyspace: {astraTestResult.keyspace}</span>}
                </div>
              )}

              {astraSyncResult && (
                <div className={`p-3 rounded-xl text-xs font-mono ${astraSyncResult.success ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30' : 'bg-rose-950/80 text-rose-300 border border-rose-500/30'}`}>
                  <strong>{astraSyncResult.success ? '✓ Sync Completed:' : '✕ Sync Error:'}</strong> {astraSyncResult.message || astraSyncResult.error}
                </div>
              )}
            </div>
          </div>

          {/* Database Tables Summary Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { name: 'properties', desc: 'Abuja Listings & Up to 8 Photos', count: properties.length },
              { name: 'locations', desc: 'AMAC, Bwari, Kuje Cadastrals', count: '45+ Districts' },
              { name: 'enquiries', desc: 'Direct Leads & WhatsApp Logs', count: enquiries.length },
              { name: 'inspections', desc: 'On-Site & Virtual Schedules', count: inspections.length },
              { name: 'storage_buckets_meta', desc: 'Max 8 Images / Property Meta', count: 'Active Bucket' },
            ].map((tbl) => (
              <div key={tbl.name} className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs space-y-1">
                <div className="flex items-center space-x-1.5 text-blue-600 dark:text-blue-400 font-mono font-bold text-[11px]">
                  <Layers className="w-3.5 h-3.5" />
                  <span>{tbl.name}</span>
                </div>
                <p className="text-[10px] text-slate-400">{tbl.desc}</p>
                <div className="pt-1 font-semibold text-slate-700 dark:text-slate-300 text-[11px]">{tbl.count}</div>
              </div>
            ))}
          </div>

          {/* Full CQL Code Viewer */}
          <div className="bg-slate-950 text-slate-200 rounded-3xl border border-slate-800 p-6 space-y-3 font-mono text-xs overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2 text-slate-400">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-white font-bold">database/schema.cql</span>
                <span className="text-[10px] text-slate-500">(DataStax Astra DB / Apache Cassandra 4.x/5.x)</span>
              </div>

              <button
                onClick={handleCopyCql}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-sans font-semibold flex items-center space-x-1"
              >
                {cqlCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{cqlCopied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <pre className="max-h-[420px] overflow-y-auto p-2 leading-relaxed text-slate-300 text-[11px] select-all">
              {cqlContent || `-- Loading DataStax Astra DB CQL schema... (Click Copy or Download above)`}
            </pre>
          </div>

        </div>
      )}

      {/* Tab: Enquiries */}
      {activeTab === 'enquiries' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 space-y-4 shadow-xs">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Client Property Enquiries ({enquiries.length})</h3>
          {enquiries.length === 0 ? (
            <p className="text-xs text-slate-400">No client enquiries received yet.</p>
          ) : (
            <div className="space-y-3">
              {enquiries.map((enq) => (
                <div key={enq.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 dark:text-white text-sm">{enq.name} ({enq.phone})</strong>
                    <span className="text-slate-400 text-[10px]">{enq.email}</span>
                  </div>
                  <div className="text-slate-600 dark:text-slate-300">
                    <strong>Property:</strong> {enq.property_title || enq.property_ref || 'General Enquiry'} &bull; <strong>Source:</strong> {enq.source}
                  </div>
                  <p className="bg-white dark:bg-slate-900 p-2.5 rounded-xl text-slate-500 italic">
                    "{enq.message}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Inspections */}
      {activeTab === 'inspections' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 space-y-4 shadow-xs">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Scheduled On-Site Inspections ({inspections.length})</h3>
          {inspections.length === 0 ? (
            <p className="text-xs text-slate-400">No inspections scheduled yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inspections.map((insp) => (
                <div key={insp.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <strong className="text-sm text-slate-900 dark:text-white">{insp.client_name}</strong>
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-bold">
                      {insp.status || 'Pending'}
                    </span>
                  </div>
                  <div className="text-slate-600 dark:text-slate-400 space-y-0.5">
                    <div><strong>Phone:</strong> {insp.client_phone}</div>
                    <div><strong>Date & Time:</strong> {insp.preferred_date} ({insp.preferred_time})</div>
                    <div><strong>Property:</strong> {insp.property_title || insp.property_id}</div>
                  </div>
                  <div className="pt-2 flex items-center space-x-2">
                    <button
                      onClick={() => {
                        window.open(`https://wa.me/${insp.client_phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${insp.client_name}, Estate Shelters is confirming your site inspection for ${insp.property_title} on ${insp.preferred_date}.`)}`, '_blank');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold text-[11px] flex items-center space-x-1"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>Confirm via WhatsApp</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Requests */}
      {activeTab === 'requests' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 space-y-4 shadow-xs">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Custom Property Specifications ({propertyRequests.length})</h3>
          {propertyRequests.length === 0 ? (
            <p className="text-xs text-slate-400">No custom property search specifications submitted yet.</p>
          ) : (
            <div className="space-y-3">
              {propertyRequests.map((req) => (
                <div key={req.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 dark:text-white text-sm">{req.name} ({req.phone})</strong>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">{req.budget_range}</span>
                  </div>
                  <div className="text-slate-600 dark:text-slate-300">
                    <strong>Districts:</strong> {req.preferred_districts} &bull; <strong>Type:</strong> {req.property_type} &bull; <strong>Bedrooms:</strong> {req.bedrooms}
                  </div>
                  {req.notes && (
                    <p className="bg-white dark:bg-slate-900 p-2.5 rounded-xl text-slate-500 italic">
                      "{req.notes}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Settings */}
      {activeTab === 'settings' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-xs max-w-2xl">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Company Identity & Contact Configuration</h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-semibold block mb-1">Company Name</label>
              <input
                type="text"
                value={tempSettings.company_name}
                onChange={(e) => setTempSettings({ ...tempSettings, company_name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">CAC Registration Number</label>
              <input
                type="text"
                value={tempSettings.cac_reg_number}
                onChange={(e) => setTempSettings({ ...tempSettings, cac_reg_number: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">Office Address</label>
              <input
                type="text"
                value={tempSettings.office_address}
                onChange={(e) => setTempSettings({ ...tempSettings, office_address: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold block mb-1">Primary Phone</label>
                <input
                  type="text"
                  value={tempSettings.phone_primary}
                  onChange={(e) => setTempSettings({ ...tempSettings, phone_primary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Secondary Phone</label>
                <input
                  type="text"
                  value={tempSettings.phone_secondary}
                  onChange={(e) => setTempSettings({ ...tempSettings, phone_secondary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <button
              onClick={() => {
                const toastId = notify.loading('Saving Site Settings...', 'Updating company profile and contact details...');
                onUpdateSettings(tempSettings);
                setTimeout(() => {
                  notify.dismiss(toastId);
                  notify.success('✓ Site Settings Saved!', 'Company credentials and contact information updated.');
                }, 300);
              }}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors"
            >
              Save Configuration
            </button>
          </div>
        </div>
      )}

      {/* Property Modal (Add / Edit) with Multi-Image Uploader & Gemini Enhancer */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-brand-heading">
                  {editingProperty ? 'Edit Property Listing & Visual Assets' : 'Add New Verified Property'}
                </h3>
                <p className="text-[11px] text-slate-400">Manage property parameters, up to 8 gallery photos, and cover selection.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* AI Assistant Button */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between shadow-xs">
              <div>
                <strong className="text-xs font-bold flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                  <span>Gemini AI Listing Copy Enhancer</span>
                </strong>
                <p className="text-[11px] text-blue-100">Auto-generate high-conversion marketing copy and luxury phrasing.</p>
              </div>

              <button
                type="button"
                onClick={handleAiEnhanceListing}
                disabled={aiEnhanceLoading}
                className="px-3.5 py-1.5 rounded-xl bg-white text-blue-900 hover:bg-blue-50 text-xs font-bold shrink-0 transition-colors"
              >
                {aiEnhanceLoading ? 'Enhancing...' : 'Enhance with AI'}
              </button>
            </div>

            <form onSubmit={handleSaveProperty} className="space-y-6 text-xs">
              
              {/* SECTION 1: BASIC INFO & PRICING */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-4">
                <div className="flex items-center space-x-2 text-slate-800 dark:text-slate-200 font-bold text-sm">
                  <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>1. Basic Property Information & Pricing</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1">Property Title *</label>
                    <input
                      type="text"
                      required
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="e.g. 4-Bedroom Terrace Duplex with BQ"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Reference Property ID *</label>
                    <input
                      type="text"
                      required
                      value={formPropertyId}
                      onChange={(e) => setFormPropertyId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-semibold block mb-1">Transaction Type</label>
                    <select
                      value={formTransactionType}
                      onChange={(e) => setFormTransactionType(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    >
                      <option value="Buy">Outright Buy</option>
                      <option value="Rent">Rent</option>
                      <option value="Lease">Lease</option>
                      <option value="Land">Land / Plot Sale</option>
                      <option value="Investment">Investment Opportunity</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Property Typology</label>
                    <select
                      value={formPropertyType}
                      onChange={(e) => setFormPropertyType(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    >
                      <option value="Terrace Duplex">Terrace Duplex</option>
                      <option value="Detached Duplex">Detached Duplex</option>
                      <option value="Semi-Detached House">Semi-Detached House</option>
                      <option value="Bungalow">Detached Bungalow</option>
                      <option value="Apartment">Luxury Apartment</option>
                      <option value="Mansion">Luxury Mansion</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Villa">Executive Villa</option>
                      <option value="Land">Serviced Plot / Land</option>
                      <option value="Commercial Property">Commercial Property</option>
                      <option value="Office Space">Office Space</option>
                      <option value="Warehouse">Warehouse / Industrial</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Currency</label>
                    <select
                      value={formCurrency}
                      onChange={(e: any) => setFormCurrency(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    >
                      <option value="NGN">NGN (₦ - Nigerian Naira)</option>
                      <option value="USD">USD ($ - US Dollar)</option>
                      <option value="GBP">GBP (£ - British Pound)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1">Asking Price *</label>
                    <input
                      type="number"
                      required
                      value={formPrice}
                      onChange={(e) => setFormPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Price Label / Option Phrasing</label>
                    <input
                      type="text"
                      value={formPriceLabel}
                      onChange={(e) => setFormPriceLabel(e.target.value)}
                      placeholder="e.g. Outright Purchase, Carcass Option, Per Annum"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: STRUCTURAL CONFIGURATIONS & FINISHING OPTIONS */}
              <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-800/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 text-blue-900 dark:text-blue-200 font-bold text-sm">
                      <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>2. Available Structural Configurations & Finishing Options</span>
                    </div>
                    <p className="text-[11px] text-blue-700 dark:text-blue-300 mt-0.5">
                      Add custom finishing packages (e.g., Carcass, Semi-Finished, Fully Serviced) so buyers can choose structural options.
                    </p>
                  </div>
                </div>

                {/* Preset Option Buttons */}
                <div>
                  <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1.5">
                    Click to add standard finishing option templates:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_OPTIONS_TEMPLATES.map((tmpl, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => addOption(tmpl)}
                        className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-[11px] font-medium flex items-center space-x-1 transition-colors"
                      >
                        <Plus className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                        <span>{tmpl.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Option List */}
                {formOptionsList.length > 0 && (
                  <div className="space-y-2 pt-2">
                    {formOptionsList.map((opt, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                        <div className="sm:col-span-5">
                          <input
                            type="text"
                            value={opt.name}
                            onChange={(e) => updateOption(idx, 'name', e.target.value)}
                            placeholder="Option Name (e.g., Fully Finished)"
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold"
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <input
                            type="number"
                            value={opt.price}
                            onChange={(e) => updateOption(idx, 'price', Number(e.target.value))}
                            placeholder="Price (NGN)"
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold"
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <input
                            type="text"
                            value={opt.description || ''}
                            onChange={(e) => updateOption(idx, 'description', e.target.value)}
                            placeholder="Option details..."
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[11px]"
                          />
                        </div>
                        <div className="sm:col-span-1 flex justify-end">
                          <button
                            type="button"
                            onClick={() => removeOption(idx)}
                            className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SECTION 3: LOCATION & ENCLAVE */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
                <div className="flex items-center space-x-2 text-slate-800 dark:text-slate-200 font-bold text-sm">
                  <Server className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>3. Location & Enclave Cadastral Address</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-semibold block mb-1">State / Territory</label>
                    <input
                      type="text"
                      value={formState}
                      onChange={(e) => setFormState(e.target.value)}
                      placeholder="e.g. Federal Capital Territory"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">LGA / Area Council</label>
                    <input
                      type="text"
                      value={formLga}
                      onChange={(e) => setFormLga(e.target.value)}
                      placeholder="e.g. Abuja Municipal Area Council (AMAC)"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">District / Corridor *</label>
                    <input
                      type="text"
                      required
                      value={formDistrict}
                      onChange={(e) => setFormDistrict(e.target.value)}
                      placeholder="e.g. Kyami, Apo Dutse, Maitama, Guzape"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1">Estate / Residential Enclave Name</label>
                    <input
                      type="text"
                      value={formEstate}
                      onChange={(e) => setFormEstate(e.target.value)}
                      placeholder="e.g. ABU Estate, Dutse Hills Court"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Street Address / Cadastral Plot</label>
                    <input
                      type="text"
                      value={formStreet}
                      onChange={(e) => setFormStreet(e.target.value)}
                      placeholder="e.g. Plot 418, Apo Dutse Boulevard"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 4: SPECIFICATIONS & MEASUREMENTS */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
                <div className="flex items-center space-x-2 text-slate-800 dark:text-slate-200 font-bold text-sm">
                  <HardDrive className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>4. Architectural Specifications & Dimensions</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="font-semibold block mb-1">Bedrooms</label>
                    <input
                      type="number"
                      value={formBedrooms}
                      onChange={(e) => setFormBedrooms(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Bathrooms</label>
                    <input
                      type="number"
                      value={formBathrooms}
                      onChange={(e) => setFormBathrooms(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Toilets</label>
                    <input
                      type="number"
                      value={formToilets}
                      onChange={(e) => setFormToilets(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Parking Spaces</label>
                    <input
                      type="number"
                      value={formParkingSpaces}
                      onChange={(e) => setFormParkingSpaces(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="font-semibold block mb-1">Floors / Storeys</label>
                    <input
                      type="number"
                      value={formFloors}
                      onChange={(e) => setFormFloors(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Year Built / Completion</label>
                    <input
                      type="number"
                      value={formYearBuilt}
                      onChange={(e) => setFormYearBuilt(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Land Size</label>
                    <input
                      type="text"
                      value={formLandSize}
                      onChange={(e) => setFormLandSize(e.target.value)}
                      placeholder="e.g. 400 sqm, 1 Plot"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Building Floor Area</label>
                    <input
                      type="text"
                      value={formBuildingSize}
                      onChange={(e) => setFormBuildingSize(e.target.value)}
                      placeholder="e.g. 320 sqm"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 5: PROPERTY FEATURES & AMENITIES */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-slate-800 dark:text-slate-200 font-bold text-sm">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>5. Property Features & Luxury Estate Amenities</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {formFeaturesList.length} Selected
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Click any feature chip to toggle selection, or type custom features below:
                </p>

                {/* Preset Feature Chips */}
                <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto p-1">
                  {PRESET_FEATURES.map((feat, idx) => {
                    const selected = formFeaturesList.includes(feat);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => toggleFeature(feat)}
                        className={`px-3 py-1.5 rounded-xl text-[11px] font-medium flex items-center space-x-1.5 transition-all ${
                          selected
                            ? 'bg-blue-600 text-white shadow-xs font-semibold'
                            : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {selected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3 h-3 text-slate-400" />}
                        <span>{feat}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Feature Input */}
                <div className="flex items-center space-x-2 pt-1">
                  <input
                    type="text"
                    value={formCustomFeatureInput}
                    onChange={(e) => setFormCustomFeatureInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addCustomFeature();
                      }
                    }}
                    placeholder="Add custom feature (e.g. Smart Intercom System)..."
                    className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={addCustomFeature}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white font-semibold shrink-0"
                  >
                    + Add Feature
                  </button>
                </div>
              </div>

              {/* SECTION 6: TITLE, DOCUMENTATION & VERIFICATION */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
                <div className="flex items-center space-x-2 text-slate-800 dark:text-slate-200 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>6. Cadastral Title, Documentation & Verification</span>
                </div>

                {/* Preset Documentation Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_DOCUMENTS.map((doc, idx) => {
                    const selected = formDocStatusList.includes(doc);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => toggleDoc(doc)}
                        className={`px-3 py-1.5 rounded-xl text-[11px] font-medium flex items-center space-x-1.5 transition-all ${
                          selected
                            ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                            : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {selected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3 h-3 text-slate-400" />}
                        <span>{doc}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Doc Input */}
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={formCustomDocInput}
                    onChange={(e) => setFormCustomDocInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addCustomDoc();
                      }
                    }}
                    placeholder="Add custom title document..."
                    className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={addCustomDoc}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white font-semibold shrink-0"
                  >
                    + Add Title
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div>
                    <label className="font-semibold block mb-1">Verification Status</label>
                    <select
                      value={formVerificationStatus}
                      onChange={(e: any) => setFormVerificationStatus(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold"
                    >
                      <option value="Verified">Verified Title (AGIS Clear)</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Documentation Pending">Documentation Pending</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-semibold block mb-1">Verification / Cadastral Title Notes</label>
                    <input
                      type="text"
                      value={formDocNotes}
                      onChange={(e) => setFormDocNotes(e.target.value)}
                      placeholder="e.g. Clear Certificate of Occupancy registered with AGIS (Abuja Geographic Info System)"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 7: MULTI-IMAGE UPLOADER & MEDIA URLS */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
                <div className="flex items-center space-x-2 text-slate-800 dark:text-slate-200 font-bold text-sm">
                  <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>7. Gallery Photos, Video Tour & Media Assets</span>
                </div>

                <PropertyImageUploader
                  images={formImagesList}
                  onChange={setFormImagesList}
                  videoUrl={formVideoUrl}
                  onVideoUrlChange={setFormVideoUrl}
                  maxImages={8}
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div>
                    <label className="font-semibold block mb-1">3D Virtual Tour Link</label>
                    <input
                      type="url"
                      value={formVirtualTourUrl}
                      onChange={(e) => setFormVirtualTourUrl(e.target.value)}
                      placeholder="https://my.matterport.com/show/..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Floor Plan Diagram Link</label>
                    <input
                      type="url"
                      value={formFloorPlanUrl}
                      onChange={(e) => setFormFloorPlanUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">PDF Brochure Link</label>
                    <input
                      type="url"
                      value={formBrochureUrl}
                      onChange={(e) => setFormBrochureUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 8: MARKETING DESCRIPTION */}
              <div>
                <label className="font-semibold block mb-1">Comprehensive Marketing Description *</label>
                <textarea
                  rows={4}
                  required
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Provide an engaging description highlighting the architecture, estate infrastructure, accessibility, title status, and investment yield..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white leading-relaxed"
                />
              </div>

              {/* SECTION 9: TAGS, DEVELOPER & LISTING STATUS */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
                <div className="flex items-center space-x-2 text-slate-800 dark:text-slate-200 font-bold text-sm">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span>9. Tags, Developer & Availability Status</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-semibold block mb-1">Developer / Syndicate Name</label>
                    <input
                      type="text"
                      value={formDeveloper}
                      onChange={(e) => setFormDeveloper(e.target.value)}
                      placeholder="e.g. Estate Shelters Syndicate"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Listing Status</label>
                    <select
                      value={formStatus}
                      onChange={(e: any) => setFormStatus(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold"
                    >
                      <option value="Available">Available</option>
                      <option value="Reserved">Reserved</option>
                      <option value="Under Offer">Under Offer</option>
                      <option value="Sold">Sold</option>
                      <option value="Rented">Rented</option>
                    </select>
                  </div>

                  <div className="flex items-center pt-5">
                    <label className="flex items-center space-x-2 cursor-pointer p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 w-full">
                      <input
                        type="checkbox"
                        checked={formFeatured}
                        onChange={(e) => setFormFeatured(e.target.checked)}
                        className="rounded text-blue-600 w-4 h-4"
                      />
                      <span className="font-semibold text-slate-900 dark:text-white">Pin to Featured Properties Showcase</span>
                    </label>
                  </div>
                </div>

                {/* Tag Chips */}
                <div>
                  <span className="font-semibold block mb-1">Property Badges & Marketing Tags:</span>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {PRESET_TAGS.map((tag, idx) => {
                      const selected = formTagsList.includes(tag);
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1 rounded-lg text-[11px] font-medium flex items-center space-x-1.5 transition-all ${
                            selected
                              ? 'bg-amber-500 text-white shadow-xs font-semibold'
                              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          {selected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3 h-3 text-slate-400" />}
                          <span>{tag}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={formCustomTagInput}
                      onChange={(e) => setFormCustomTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addCustomTag();
                        }
                      }}
                      placeholder="Add custom marketing tag..."
                      className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={addCustomTag}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white font-semibold shrink-0"
                    >
                      + Add Tag
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Data will be instantly synced to persistent local store & Astra DB.
                </span>

                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-7 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md transition-colors flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingProperty ? 'Save Property Updates' : 'Publish Property Listing'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
