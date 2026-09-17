import React from 'react';
import { 
  Building2, 
  Handshake, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink,
  MessageCircle,
  FileText
} from 'lucide-react';
import { INITIAL_PARTNERS } from '../data/seedData';

interface PartnersViewProps {
  onOpenConsultation?: () => void;
}

export const PartnersView: React.FC<PartnersViewProps> = ({ onOpenConsultation }) => {
  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      
      {/* Header */}
      <section className="relative w-full py-20 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&fit=crop&q=80" 
            alt="Corporate Partnership District" 
            className="w-full h-full object-cover object-center transform scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/45 to-slate-900/40 dark:from-slate-950/65 dark:via-slate-950/55 dark:to-slate-950/50 backdrop-blur-[0.5px]" />
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto space-y-3 text-white">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-200 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <Handshake className="w-3.5 h-3.5 text-blue-300" />
            <span>Strategic Syndications & JVs</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-brand-heading leading-tight">
            Our Developer Partners & Syndicates
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed max-w-2xl mx-auto">
            Estate Shelters Ltd works hand-in-hand with Nigeria's leading residential developers and engineering institutions to bring fully verified properties to our clients.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">

      {/* Partners Detailed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {INITIAL_PARTNERS.map((partner) => (
          <div
            key={partner.id}
            className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-xs font-bold">
                  {partner.relationship_type || 'Development Partner'}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {partner.projects_count ? `${partner.projects_count}+ Joint Schemes` : 'Verified Portfolio'}
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-brand-heading">
                {partner.name}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {partner.description}
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Key Projects & Developments:
                </span>
                <div className="flex flex-wrap gap-2">
                  {(partner.featured_developments || [partner.partnership_scope || 'Abuja Real Estate Developments']).map((dev: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium"
                    >
                      {dev}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Audited Legal Title & Delivery</span>
              </span>

              <button
                onClick={() => {
                  const text = `Hello Estate Shelters, I would like to explore available units by ${partner.name}.`;
                  window.open(`https://wa.me/2348136656679?text=${encodeURIComponent(text)}`, '_blank');
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center space-x-1 transition-colors"
              >
                <span>Inquire Listings</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Developer Partnership CTA */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-xl sm:text-2xl font-bold font-brand-heading">
            Are You an Abuja Property Developer?
          </h3>
          <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
            Partner with Estate Shelters for exclusive off-plan marketing, institutional buyer syndication, and high-velocity property sales campaigns.
          </p>
        </div>

        <button
          onClick={() => {
            const text = "Hello Estate Shelters Management, I represent a development firm and would like to discuss a marketing syndication partnership.";
            window.open(`https://wa.me/2347033385434?text=${encodeURIComponent(text)}`, '_blank');
          }}
          className="px-6 py-3.5 rounded-xl bg-white text-blue-900 hover:bg-blue-50 font-bold text-xs sm:text-sm shrink-0 transition-transform hover:scale-105"
        >
          Discuss Developer Partnership
        </button>
      </div>

      </div>

    </div>
  );
};
