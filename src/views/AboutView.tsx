import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  Users, 
  CheckCircle2, 
  Target, 
  Compass, 
  ArrowRight,
  Sparkles,
  MapPin,
  TrendingUp,
  FileText
} from 'lucide-react';
import { SiteSettings } from '../types';

interface AboutViewProps {
  settings: SiteSettings;
  onNavigate: (tab: string) => void;
  onOpenFindProperty: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ settings, onNavigate, onOpenFindProperty }) => {
  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      
      {/* Hero Header */}
      <section className="relative w-full py-20 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=1600&auto=format&fit=crop&q=80" 
            alt="Abuja Corporate Skyline" 
            className="w-full h-full object-cover object-center transform scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/45 to-slate-900/40 dark:from-slate-950/65 dark:via-slate-950/55 dark:to-slate-950/50 backdrop-blur-[0.5px]" />
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto space-y-3.5 text-white">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-200 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-blue-300" />
            <span>Corporate Profile &bull; CAC: {settings.cac_reg_number}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-brand-heading leading-tight">
            Pioneering Transparent Property Marketing in Abuja.
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed max-w-2xl mx-auto">
            Estate Shelters Ltd is an incorporated Nigerian real estate marketing and advisory enterprise headquartered in the Central Business District, Abuja. We bridge verified developers with discerning buyers and institutional investors.
          </p>
        </div>
      </section>

      {/* Corporate Pillars Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Our Mission</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              To demystify real estate acquisitions across Abuja by providing rigorous title due diligence, zero-hidden-markup pricing, and seamless client advisory.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Our Vision</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              To be the most trusted, analytical real estate distribution and investment advisory platform in West Africa, known for integrity, velocity, and institutional standards.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-600/10 text-amber-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Corporate Compliance</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Fully registered under the Companies and Allied Matters Act 1990 (RC: {settings.cac_reg_number}). Fully compliant with FIRS tax protocols and ethical broker syndications.
            </p>
          </div>

        </div>
      </section>

      {/* Market Analysis Department (MAD) Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proprietary Methodology</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-brand-heading">
            The Market Analysis Department (MAD)
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            Our specialized in-house Market Analysis Department (MAD) performs empirical appraisals on every estate and parcel before it is listed on our platform. From cadastral surveys at the Abuja Geographic Information Systems (AGIS) to developer financial stress-testing, MAD protects your capital.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
              <strong className="text-blue-400 block text-sm">Cadastral Verification</strong>
              <p className="text-slate-400">AGIS database search, beacon coordinate cross-referencing, and layout approval confirmation.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
              <strong className="text-emerald-400 block text-sm">Yield & Growth Modeling</strong>
              <p className="text-slate-400">Institutional forecasting of rental yields and capital appreciation horizons across Abuja corridors.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
              <strong className="text-amber-400 block text-sm">Developer Track-Record</strong>
              <p className="text-slate-400">Delivery history audit, structural carcass integrity checks, and construction milestone guarantees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Head Office Details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Executive Head Office & Consultant Desk
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{settings.office_address}</span>
            </p>
          </div>

          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
          >
            Visit Our Office or Contact Us
          </button>
        </div>
      </section>

    </div>
  );
};
