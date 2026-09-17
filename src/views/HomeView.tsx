import React from 'react';
import { 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  TrendingUp, 
  ChevronRight, 
  CheckCircle2,
  Calendar,
  Layers,
  Phone
} from 'lucide-react';
import { Property, LocationItem, BlogPost, SiteSettings } from '../types';
import { AdvancedSearchBar, SearchFilters } from '../components/AdvancedSearchBar';
import { PropertyCard } from '../components/PropertyCard';
import { MADAdvisorSection } from '../components/MADAdvisorSection';
import { MortgageCalculator } from '../components/MortgageCalculator';
import { PartnersShowcase } from '../components/PartnersShowcase';
import { CaseStudySection } from '../components/CaseStudySection';
import { formatCurrency } from '../lib/whatsapp';

interface HomeViewProps {
  properties: Property[];
  locations: LocationItem[];
  blogPosts: BlogPost[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  compareList: Property[];
  onToggleCompare: (p: Property) => void;
  onQuickView: (p: Property) => void;
  onViewProperty: (slug: string) => void;
  onNavigate: (tab: string) => void;
  onOpenFindProperty: () => void;
  onOpenInspection: (p: Property) => void;
  onSearch: (filters: SearchFilters) => void;
  settings: SiteSettings;
}

export const HomeView: React.FC<HomeViewProps> = ({
  properties,
  locations,
  blogPosts,
  favorites,
  onToggleFavorite,
  compareList,
  onToggleCompare,
  onQuickView,
  onViewProperty,
  onNavigate,
  onOpenFindProperty,
  onOpenInspection,
  onSearch,
  settings
}) => {
  const featuredProperties = properties.filter(p => p.featured).slice(0, 6);
  const abuEstate = properties.find(p => p.id === 'abu-estate-kyami-01' || p.property_id === 'ES-00045') || properties[0];
  const apoDutse = properties.find(p => p.id === 'apo-dutse-terrace-02' || p.property_id === 'ES-00055') || properties[1];

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[calc(100vh-76px)] sm:min-h-[calc(100vh-80px)] flex flex-col justify-center items-center py-8 sm:py-12 md:py-16 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format&fit=crop&q=80" 
            alt="Luxury Abuja Property" 
            className="w-full h-full object-cover object-center transform scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/45 to-slate-900/40 dark:from-slate-950/65 dark:via-slate-950/55 dark:to-slate-950/50 backdrop-blur-[0.5px]" />
        </div>
        
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white my-auto">
          <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 md:space-y-5">
            
            {/* Corporate Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-200 text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-300 shrink-0" />
              <span>Abuja Verified Real Estate &bull; RC {settings.cac_reg_number}</span>
            </div>

            {/* Editorial Heading */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-brand-heading leading-[1.18]">
              Discover Better Property Opportunities.
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
              Connecting buyers and investors to verified residential terraces, detached bungalows, serviced plots, and high-yield properties across Abuja.
            </p>

            {/* Trust highlights */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 md:gap-5 text-[11px] sm:text-xs text-slate-300 pt-0.5">
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>AGIS Title Audit</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Developer Syndication</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Hidden Fees</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Millennium Plaza CBD Office</span>
              </span>
            </div>
          </div>

          {/* Search Engine Container */}
          <div className="mt-5 sm:mt-8 max-w-4xl mx-auto">
            <AdvancedSearchBar onSearch={onSearch} />
          </div>

        </div>
      </section>

      {/* 2. FLAGSHIP SCHEMES FLASH BANNER (ABU Estate & Apo Dutse) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* ABU Estate Kyami Card */}
          {abuEstate && (
            <div 
              onClick={() => onViewProperty(abuEstate.slug)}
              className="group relative bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white rounded-3xl overflow-hidden p-6 sm:p-8 border border-slate-800 shadow-xl cursor-pointer hover:border-blue-500/50 transition-all flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-blue-600/30 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
                    Flagship Opportunity
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Airport Road Corridor</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-brand-heading text-white group-hover:text-blue-300 transition-colors">
                  ABU Estate, Kyami District
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed max-w-md">
                  3-Bedroom Detached Bungalows on 400 sqm plots. Flexible acquisition: Fully Completed, Structural Carcass, or Serviced Plots.
                </p>

                {/* Price Matrix Pills */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                    <span className="text-[10px] text-slate-300 block">Completed</span>
                    <strong className="text-white text-xs sm:text-sm">₦45,000,000</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                    <span className="text-[10px] text-slate-300 block">Carcass</span>
                    <strong className="text-white text-xs sm:text-sm">₦25,000,000</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                    <span className="text-[10px] text-slate-300 block">Serviced Plot</span>
                    <strong className="text-white text-xs sm:text-sm">₦10,000,000</strong>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-800 flex items-center justify-between text-xs relative">
                <span className="text-emerald-400 font-semibold flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Right of Occupancy / FCDA Verified</span>
                </span>

                <span className="text-blue-300 font-bold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>Explore Units</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          )}

          {/* Apo Dutse Luxury Terraces Card */}
          {apoDutse && (
            <div 
              onClick={() => onViewProperty(apoDutse.slug)}
              className="group relative bg-gradient-to-br from-blue-950 via-slate-900 to-slate-900 text-white rounded-3xl overflow-hidden p-6 sm:p-8 border border-slate-800 shadow-xl cursor-pointer hover:border-emerald-500/50 transition-all flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-emerald-600/30 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                    High Yield Residence
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Apo District</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-brand-heading text-white group-hover:text-emerald-300 transition-colors">
                  Apo Dutse Luxury 4-Bed Terraces + BQ
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed max-w-md">
                  Premium gated court with Italian fitted kitchens, 24/7 solar backup, and dedicated security. Outstanding rental yield profile.
                </p>

                <div className="pt-2">
                  <span className="text-[11px] text-slate-400 block uppercase font-bold">Asking Price</span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-serif-luxury">
                    ₦55,000,000
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-800 flex items-center justify-between text-xs relative">
                <span className="text-blue-300 font-semibold flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Statutory C of O &bull; Immediate Handover</span>
                </span>

                <span className="text-emerald-300 font-bold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>View Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 3. FEATURED ABUJA PROPERTIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase text-blue-600 dark:text-blue-400 tracking-wider">
              <span>Curated Portfolio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-brand-heading mt-1">
              Featured Abuja Properties & Developments
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Hand-picked verified listings across prime residential and commercial corridors in Abuja.
            </p>
          </div>

          <button
            onClick={() => onNavigate('properties')}
            className="inline-flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:underline shrink-0"
          >
            <span>View All Available Properties ({properties.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isFavorite={favorites.includes(property.id)}
              onToggleFavorite={onToggleFavorite}
              isCompared={compareList.some(p => p.id === property.id)}
              onToggleCompare={onToggleCompare}
              onQuickView={onQuickView}
              onViewDetails={onViewProperty}
              whatsappNumber={settings.whatsapp_number}
            />
          ))}
        </div>
      </section>

      {/* 4. MARKET ANALYSIS DEPARTMENT (MAD) AI INVESTMENT SECTION */}
      <MADAdvisorSection />

      {/* 5. MORTGAGE & MILESTONE PAYMENT CALCULATOR */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <MortgageCalculator />
      </section>

      {/* 6. NNPC 500-UNIT CHIKU SCHEME CASE STUDY */}
      <CaseStudySection />

      {/* 7. STRATEGIC DEVELOPER PARTNERS */}
      <PartnersShowcase />

      {/* 8. ABUJA DISTRICTS EXPLORER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400 tracking-wider">
            Cadastral Coverage
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-brand-heading">
            Prime Abuja Real Estate Corridors
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Explore property dynamics across high-growth and established diplomatic districts.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {locations.map((loc) => {
            const districtName = loc.district || loc.name || 'Abuja';
            const count = loc.count || loc.property_count || loc.popular_estates?.length || 4;
            return (
              <button
                key={loc.id}
                onClick={() => onSearch({
                  transaction: 'All',
                  type: 'All',
                  district: districtName,
                  minPrice: 0,
                  maxPrice: 1000000000,
                  bedrooms: 'Any',
                  currency: 'NGN',
                  keyword: ''
                })}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-blue-500 hover:shadow-lg transition-all text-left group"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <MapPin className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                  {districtName}
                </h4>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {count}+ Verified Schemes
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* 9. MARKET INSIGHTS / BLOG PREVIEW */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400 tracking-wider">
              Market Intelligence
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-brand-heading mt-1">
              Abuja Property Insights & Title Guides
            </h2>
          </div>

          <button
            onClick={() => onNavigate('insights')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((post) => (
            <div
              key={post.id}
              onClick={() => onNavigate(`insights?slug=${post.slug}`)}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold">
                      {post.category}
                    </span>
                    <span>{post.read_time}</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                  <span>{post.author}</span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold flex items-center space-x-1">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. CALL TO ACTION BANNER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-brand-heading">
              Looking for a Specific Abuja Property?
            </h3>
            <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
              Submit your exact budget, district preference, and title requirements. Our Market Analysis Department will match verified listings and arrange direct site inspections.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={onOpenFindProperty}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-blue-900 hover:bg-blue-50 font-bold text-xs sm:text-sm shadow-lg transition-transform hover:scale-105"
            >
              Find My Property Specification
            </button>

            <button
              onClick={() => {
                window.open(`https://wa.me/2348136656679?text=${encodeURIComponent('Hello Estate Shelters, I would like to schedule a consultation with your senior property team.')}`, '_blank');
              }}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-blue-700/60 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm border border-blue-400/30 transition-colors"
            >
              Direct WhatsApp Chat
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
