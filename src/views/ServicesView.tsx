import React from 'react';
import { 
  Building2, 
  Handshake, 
  TrendingUp, 
  ShieldCheck, 
  FileCheck, 
  Key, 
  ArrowRight,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { SiteSettings } from '../types';

interface ServicesViewProps {
  settings: SiteSettings;
  onNavigate: (tab: string) => void;
  onOpenFindProperty: () => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ settings, onNavigate, onOpenFindProperty }) => {
  const services = [
    {
      icon: Building2,
      title: 'Residential & Commercial Brokerage',
      description: 'Full-service representation for buyers, sellers, and corporate tenants across Abuja. Access off-market luxury terraces, completed detached homes, and prime commercial plots.',
      features: ['Direct developer pricing', 'Zero buyer markups', 'End-to-end conveyance guidance']
    },
    {
      icon: Handshake,
      title: 'Developer Sales Syndication & Joint Ventures',
      description: 'Exclusive marketing partnerships with top-tier Abuja developers. We handle transaction structuring, off-plan marketing, and institutional co-operative syndications.',
      features: ['Off-plan presales campaigns', 'Co-operative scheme structuring', 'Milestone escrow advisory']
    },
    {
      icon: TrendingUp,
      title: 'Market Analysis Department (MAD) Valuations',
      description: 'Institutional-grade real estate analytics powered by empirical market data and Gemini AI intelligence. Forecasting rental yields, capital growth, and infrastructure appreciation.',
      features: ['Corridor yield modeling', 'Cadastral viability scoring', 'High-net-worth portfolio optimization']
    },
    {
      icon: ShieldCheck,
      title: 'AGIS & Cadastral Title Due Diligence',
      description: 'Comprehensive title search and legal verification at the Abuja Geographic Information Systems (AGIS) and Federal Capital Development Authority (FCDA).',
      features: ['Right of Occupancy (R of O) audit', 'Certificate of Occupancy (C of O) verification', 'Cadastral layout confirmation']
    },
    {
      icon: FileCheck,
      title: 'Structural Carcass vs Completed Advisory',
      description: 'Strategic advisory for buyers choosing between fully finished turnkey residences, builder carcass units (for custom finishes), or serviced plots.',
      features: ['Cost-to-finish modeling', 'Contractor vetting', 'Custom finish timeline planning']
    },
    {
      icon: Key,
      title: 'Executive Property & Lease Management',
      description: 'Tailored property management for diaspora investors, expatriates, and high-net-worth property owners seeking optimized tenant placement and seamless maintenance.',
      features: ['Vetted tenant screening', 'Automated rent collection', 'Periodic condition inspections']
    }
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      
      {/* Header */}
      <section className="relative w-full py-20 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&auto=format&fit=crop&q=80" 
            alt="Professional Real Estate Advisory" 
            className="w-full h-full object-cover object-center transform scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/45 to-slate-900/40 dark:from-slate-950/65 dark:via-slate-950/55 dark:to-slate-950/50 backdrop-blur-[0.5px]" />
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto space-y-3 text-white">
          <span className="inline-block px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-200 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            Comprehensive Real Estate Solutions
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-brand-heading leading-tight">
            Our Core Professional Services
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed max-w-2xl mx-auto">
            From developer sales syndication and off-plan marketing to AGIS cadastral title audits and institutional investments.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((srv, idx) => {
          const Icon = srv.icon;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-brand-heading">
                  {srv.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {srv.description}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="space-y-1.5">
                  {srv.features.map((f, fIdx) => (
                    <div key={fIdx} className="text-xs text-slate-700 dark:text-slate-300 flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    const text = `Hello Estate Shelters, I would like to inquire about your service: "${srv.title}".`;
                    window.open(`https://wa.me/2348136656679?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="pt-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
                >
                  <span>Inquire on Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Box */}
      <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-xl sm:text-2xl font-bold font-brand-heading">
            Need a Custom Development Syndication or Title Audit?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Our Market Analysis Department provides custom consultancy for land acquisitions, joint ventures, and estate developments.
          </p>
        </div>

        <button
          onClick={onOpenFindProperty}
          className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shrink-0 transition-colors"
        >
          Submit Consultation Request
        </button>
      </div>

      </div>

    </div>
  );
};
