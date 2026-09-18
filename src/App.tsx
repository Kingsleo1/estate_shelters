import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { PropertiesView } from './views/PropertiesView';
import { PropertyDetailView } from './views/PropertyDetailView';
import { AboutView } from './views/AboutView';
import { ServicesView } from './views/ServicesView';
import { ProjectsView } from './views/ProjectsView';
import { PartnersView } from './views/PartnersView';
import { InsightsView } from './views/InsightsView';
import { ContactView } from './views/ContactView';
import { AdminView } from './views/AdminView';

// Modals & Floating components
import { PropertyQuickViewModal } from './components/PropertyQuickViewModal';
import { PropertyComparisonModal } from './components/PropertyComparisonModal';
import { FindMyPropertyModal } from './components/FindMyPropertyModal';
import { InspectionBookingModal } from './components/InspectionBookingModal';
import { EnquiryModal } from './components/EnquiryModal';
import { GeminiChatAssistant } from './components/GeminiChatAssistant';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BackgroundDecorations } from './components/BackgroundDecorations';
import { ToastNotificationContainer } from './components/ToastNotification';

import { Property, LocationItem, BlogPost, SiteSettings } from './types';
import { INITIAL_PROPERTIES, INITIAL_LOCATIONS, INITIAL_BLOG_POSTS, DEFAULT_SETTINGS } from './data/seedData';
import { api } from './lib/api';
import { SearchFilters } from './components/AdvancedSearchBar';

export default function App() {
  // Navigation & Routing state
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedPropertySlug, setSelectedPropertySlug] = useState<string | null>(null);
  const [selectedInsightSlug, setSelectedInsightSlug] = useState<string | null>(null);

  // Application Data states
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [locations, setLocations] = useState<LocationItem[]>(INITIAL_LOCATIONS);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState<boolean>(true);

  // Filter pass-through state for Properties view
  const [activeSearchFilters, setActiveSearchFilters] = useState<{
    transaction?: string;
    type?: string;
    district?: string;
    keyword?: string;
  }>({});

  // User interaction states
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('estateshelters_favs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [compareList, setCompareList] = useState<Property[]>([]);

  // Theme state: DARK BY DEFAULT as requested
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('estateshelters_theme');
      if (saved) return saved === 'dark';
      return true; // Default to dark screen mode
    } catch {
      return true;
    }
  });

  // Modals state
  const [quickViewProperty, setQuickViewProperty] = useState<Property | null>(null);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isFindPropertyOpen, setIsFindPropertyOpen] = useState(false);
  const [inspectionProperty, setInspectionProperty] = useState<Property | null>(null);
  const [enquiryProperty, setEnquiryProperty] = useState<Property | null>(null);

  // Synchronize Dark / Light screen theme accurately
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('estateshelters_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('estateshelters_theme', 'light');
    }
  }, [isDarkMode]);

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('estateshelters_favs', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  // Load properties and settings from backend
  const loadInitialData = async () => {
    try {
      const [propsData, settingsData] = await Promise.all([
        api.getProperties(),
        api.getSettings().catch(() => DEFAULT_SETTINGS)
      ]);

      if (propsData && propsData.length > 0) {
        setProperties(propsData);
      }
      if (settingsData) {
        setSettings(settingsData);
      }
    } catch (err) {
      console.warn('Using local seed properties fallback:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // Handle URL hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('property/')) {
        const slug = hash.replace('property/', '');
        setSelectedPropertySlug(slug);
      } else if (hash.startsWith('insights/')) {
        const slug = hash.replace('insights/', '');
        setSelectedInsightSlug(slug);
        setCurrentTab('insights');
      } else if (hash.startsWith('properties?')) {
        const params = new URLSearchParams(hash.split('?')[1]);
        setActiveSearchFilters({
          transaction: params.get('transaction') || undefined,
          type: params.get('type') || undefined,
          district: params.get('district') || undefined,
          keyword: params.get('q') || undefined
        });
        setCurrentTab('properties');
        setSelectedPropertySlug(null);
      } else if (hash) {
        setCurrentTab(hash);
        setSelectedPropertySlug(null);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Navigation handlers with full submenu and query filter support
  const handleNavigate = (tab: string) => {
    if (tab.startsWith('insights?slug=')) {
      const slug = tab.split('=')[1];
      setSelectedInsightSlug(slug);
      setCurrentTab('insights');
      setSelectedPropertySlug(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tab.startsWith('properties?')) {
      const params = new URLSearchParams(tab.split('?')[1]);
      setActiveSearchFilters({
        transaction: params.get('transaction') || 'All',
        type: params.get('type') || 'All',
        district: params.get('district') || 'All',
        keyword: params.get('q') || ''
      });
      setCurrentTab('properties');
      setSelectedPropertySlug(null);
      setSelectedInsightSlug(null);
      window.location.hash = tab;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tab === 'properties') {
      setActiveSearchFilters({
        transaction: 'All',
        type: 'All',
        district: 'All',
        keyword: ''
      });
      setCurrentTab('properties');
      setSelectedPropertySlug(null);
      setSelectedInsightSlug(null);
      window.location.hash = 'properties';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tab === 'buy') {
      setActiveSearchFilters({ transaction: 'Buy', type: 'All', district: 'All', keyword: '' });
      setCurrentTab('properties');
      setSelectedPropertySlug(null);
      window.location.hash = 'properties?transaction=Buy';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tab === 'rent') {
      setActiveSearchFilters({ transaction: 'Rent', type: 'All', district: 'All', keyword: '' });
      setCurrentTab('properties');
      setSelectedPropertySlug(null);
      window.location.hash = 'properties?transaction=Rent';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tab === 'land') {
      setActiveSearchFilters({ transaction: 'Land', type: 'All', district: 'All', keyword: '' });
      setCurrentTab('properties');
      setSelectedPropertySlug(null);
      window.location.hash = 'properties?transaction=Land';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tab === 'favorites') {
      setCurrentTab('properties');
      setSelectedPropertySlug(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentTab(tab);
    setSelectedPropertySlug(null);
    setSelectedInsightSlug(null);
    window.location.hash = tab === 'home' ? '' : tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewProperty = (slug: string) => {
    setSelectedPropertySlug(slug);
    window.location.hash = `property/${slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleToggleCompare = (property: Property) => {
    setCompareList(prev => {
      const exists = prev.some(p => p.id === property.id);
      if (exists) {
        return prev.filter(p => p.id !== property.id);
      } else {
        if (prev.length >= 4) {
          alert('You can compare up to 4 properties at a time.');
          return prev;
        }
        return [...prev, property];
      }
    });
  };

  const handleRemoveCompare = (id: string) => {
    setCompareList(prev => prev.filter(p => p.id !== id));
  };

  const handleClearCompare = () => {
    setCompareList([]);
  };

  const handleExecuteSearch = (filters: SearchFilters) => {
    setActiveSearchFilters({
      transaction: filters.transaction,
      type: filters.type,
      district: filters.district,
      keyword: filters.keyword
    });
    setCurrentTab('properties');
    setSelectedPropertySlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find currently selected property if on detail view
  const currentProperty = selectedPropertySlug 
    ? properties.find(p => p.slug === selectedPropertySlug || p.id === selectedPropertySlug || p.property_id === selectedPropertySlug)
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#070D1E] text-slate-900 dark:text-slate-100 transition-colors duration-200 selection:bg-blue-600 selection:text-white overflow-x-hidden max-w-full relative">
      
      {/* Background Architectural Grid & Ambient Aura Orbs */}
      <BackgroundDecorations isDarkMode={isDarkMode} />

      {/* Top Main Navigation */}
      <Navbar
        activeTab={currentTab}
        setActiveTab={handleNavigate}
        favoritesCount={favorites.length}
        compareCount={compareList.length}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        onOpenFindProperty={() => setIsFindPropertyOpen(true)}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        settings={settings}
        onOpenAdmin={() => handleNavigate('admin')}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden relative z-10">
        {selectedPropertySlug && currentProperty ? (
          <PropertyDetailView
            property={currentProperty}
            onBack={() => {
              setSelectedPropertySlug(null);
              window.history.back();
            }}
            onBookInspection={(p) => setInspectionProperty(p)}
            onOpenEnquiry={(p) => setEnquiryProperty(p)}
            isFavorite={favorites.includes(currentProperty.id)}
            onToggleFavorite={handleToggleFavorite}
            isCompared={compareList.some(p => p.id === currentProperty.id)}
            onToggleCompare={handleToggleCompare}
            similarProperties={properties.filter(p => p.id !== currentProperty.id && (p.district === currentProperty.district || p.property_type === currentProperty.property_type))}
            onSelectProperty={handleViewProperty}
            whatsappNumber={settings.whatsapp_number}
          />
        ) : (
          <>
            {currentTab === 'home' && (
              <HomeView
                properties={properties}
                locations={locations}
                blogPosts={blogPosts}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                compareList={compareList}
                onToggleCompare={handleToggleCompare}
                onQuickView={(p) => setQuickViewProperty(p)}
                onViewProperty={handleViewProperty}
                onNavigate={handleNavigate}
                onOpenFindProperty={() => setIsFindPropertyOpen(true)}
                onOpenInspection={(p) => setInspectionProperty(p)}
                onSearch={handleExecuteSearch}
                settings={settings}
              />
            )}

            {currentTab === 'properties' && (
              <PropertiesView
                properties={properties}
                locations={locations}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                compareList={compareList}
                onToggleCompare={handleToggleCompare}
                onQuickView={(p) => setQuickViewProperty(p)}
                onViewProperty={handleViewProperty}
                initialFilters={activeSearchFilters}
                whatsappNumber={settings.whatsapp_number}
              />
            )}

            {currentTab === 'about' && (
              <AboutView
                settings={settings}
                onNavigate={handleNavigate}
                onOpenFindProperty={() => setIsFindPropertyOpen(true)}
              />
            )}

            {currentTab === 'services' && (
              <ServicesView
                settings={settings}
                onNavigate={handleNavigate}
                onOpenFindProperty={() => setIsFindPropertyOpen(true)}
              />
            )}

            {currentTab === 'projects' && (
              <ProjectsView
                properties={properties}
                onViewProperty={handleViewProperty}
                onOpenInspection={(p) => setInspectionProperty(p)}
              />
            )}

            {currentTab === 'partners' && (
              <PartnersView
                onOpenConsultation={() => setIsFindPropertyOpen(true)}
              />
            )}

            {currentTab === 'insights' && (
              <InsightsView
                posts={blogPosts}
                initialSlug={selectedInsightSlug}
              />
            )}

            {currentTab === 'contact' && (
              <ContactView settings={settings} />
            )}

            {currentTab === 'admin' && (
              <AdminView
                properties={properties}
                onRefreshProperties={loadInitialData}
                settings={settings}
                onUpdateSettings={(newSettings) => setSettings(newSettings)}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        settings={settings}
        setActiveTab={handleNavigate}
        onOpenAdmin={() => handleNavigate('admin')}
      />

      {/* Floating Speed Dial & Gemini AI Assistant */}
      <FloatingWhatsApp
        phone1={settings.phone_primary}
        phone2={settings.phone_secondary}
      />

      <GeminiChatAssistant
        currentContext={currentProperty ? `The user is currently inspecting property: ${currentProperty.title} in ${currentProperty.district}, priced at ₦${currentProperty.price.toLocaleString()}. Reference ID: ${currentProperty.property_id}.` : 'The user is browsing the main Estate Shelters Abuja real estate catalog.'}
        whatsappNumber={settings.whatsapp_number}
      />

      {/* Modals */}
      {quickViewProperty && (
        <PropertyQuickViewModal
          property={quickViewProperty}
          onClose={() => setQuickViewProperty(null)}
          onViewFullDetails={handleViewProperty}
          onBookInspection={(p) => {
            setQuickViewProperty(null);
            setInspectionProperty(p);
          }}
          whatsappNumber={settings.whatsapp_number}
        />
      )}

      {isCompareModalOpen && (
        <PropertyComparisonModal
          compareList={compareList}
          onClose={() => setIsCompareModalOpen(false)}
          onRemove={handleRemoveCompare}
          onClear={handleClearCompare}
          onViewDetails={handleViewProperty}
          whatsappNumber={settings.whatsapp_number}
        />
      )}

      <FindMyPropertyModal
        isOpen={isFindPropertyOpen}
        onClose={() => setIsFindPropertyOpen(false)}
      />

      <InspectionBookingModal
        property={inspectionProperty}
        isOpen={!!inspectionProperty}
        onClose={() => setInspectionProperty(null)}
        whatsappNumber={settings.whatsapp_number}
      />

      <EnquiryModal
        property={enquiryProperty}
        isOpen={!!enquiryProperty}
        onClose={() => setEnquiryProperty(null)}
        whatsappNumber={settings.whatsapp_number}
      />

      {/* Global Action Loading Effect & Success Toast Container */}
      <ToastNotificationContainer />

    </div>
  );
}
