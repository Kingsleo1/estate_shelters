import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Handshake, 
  ArrowUpRight, 
  CheckCircle2 
} from 'lucide-react';
import { INITIAL_PARTNERS } from '../data/seedData';

interface PartnersShowcaseProps {
  onSelectPartner?: (partnerName: string) => void;
}

export const PartnersShowcase: React.FC<PartnersShowcaseProps> = ({ onSelectPartner }) => {
  return (
    <section className="py-16 md:py-20 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
              <Handshake className="w-3.5 h-3.5" />
              <span>Syndicated Developer Ecosystem</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-brand-heading">
              Our Strategic Real Estate Partners
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Estate Shelters collaborates with premier developers and engineering syndicates to distribute verified residential estates across Abuja and surrounding economic hubs.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>All Partner Developments Are Title-Audited</span>
          </div>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_PARTNERS.map((partner) => (
            <div
              key={partner.id}
              className="group bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[11px] font-bold">
                    {partner.relationship_type || 'Development Partner'}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {partner.projects_count ? `${partner.projects_count}+ Projects` : 'Verified Portfolio'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {partner.name}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {partner.description}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  Key Focus Areas:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(partner.featured_developments || [partner.partnership_scope || 'Abuja Real Estate Developments']).map((dev: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-medium"
                    >
                      {dev}
                    </span>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Developer</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      const text = `Hello Estate Shelters, I would like to inquire about current listings from ${partner.name}.`;
                      window.open(`https://wa.me/2348136656679?text=${encodeURIComponent(text)}`, '_blank');
                    }}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
                  >
                    <span>Inquire Units</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
