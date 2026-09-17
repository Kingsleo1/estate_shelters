import React from 'react';
import { 
  Building2, 
  CheckCircle2, 
  Users, 
  ShieldCheck, 
  MapPin, 
  ArrowRight,
  Sparkles,
  Award
} from 'lucide-react';

export const CaseStudySection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden" id="case-study-nnpc">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Top Tag */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
          <Award className="w-4 h-4" />
          <span>Major Project Track Record</span>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-brand-heading leading-tight">
              500 Mass Housing Scheme for NNPC Staff Multipurpose Co-operative Society Abuja
            </h2>

            <div className="flex items-center space-x-2 text-xs text-blue-300">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Location: Chiku Local Government Area, Kaduna State</span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Estate Shelters successfully participated in the transaction advisory, marketing, and syndication of <strong>500 mass housing residential units</strong> developed for the NNPC Staff Multipurpose Co-operative Society Abuja.
            </p>

            {/* Impact Metric Cards */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-serif-luxury">500</div>
                <div className="text-xs text-slate-400 mt-1">Mass Housing Units</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-serif-luxury">100%</div>
                <div className="text-xs text-slate-400 mt-1">Title & Allocation Audit</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-serif-luxury">NNPC</div>
                <div className="text-xs text-slate-400 mt-1">Cooperative Society</div>
              </div>
            </div>

            {/* Delivery Highlights */}
            <div className="space-y-2.5 pt-2">
              {[
                'Syndicated milestone delivery across completed homes and structural carcass units.',
                'Cadastral layout verification and statutory title documentation per beneficiary member.',
                'Equipped with paved access roads, dedicated transformers, and integrated water distribution.'
              ].map((highlight, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  const text = "Hello Estate Shelters, I would like to discuss cooperative / corporate mass housing syndication like your NNPC 500-unit project.";
                  window.open(`https://wa.me/2348136656679?text=${encodeURIComponent(text)}`, '_blank');
                }}
                className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30 transition-all"
              >
                <span>Inquire on Institutional Syndications</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Visual Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-700 shadow-2xl aspect-[4/3] bg-slate-800">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80"
                alt="NNPC Mass Housing Scheme Chiku"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 text-xs text-white">
                <span className="font-bold block text-sm">Chiku Mass Housing Scheme</span>
                <span className="text-slate-300 text-[11px]">Kaduna State &bull; Co-operative Housing Development</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
