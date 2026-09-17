import React from 'react';
import { 
  Building2, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  ShieldCheck,
  Calendar,
  Sparkles
} from 'lucide-react';
import { Property } from '../types';
import { formatCurrency } from '../lib/whatsapp';
import { CaseStudySection } from '../components/CaseStudySection';

interface ProjectsViewProps {
  properties: Property[];
  onViewProperty: (slug: string) => void;
  onOpenInspection: (property: Property) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  properties,
  onViewProperty,
  onOpenInspection
}) => {
  const projects = [
    {
      id: 'abu-estate',
      title: 'ABU Estate, Kyami District',
      location: 'Airport Road Growth Corridor, Abuja',
      tagline: 'Affordable Detached Luxury Living & Investment',
      propertyRef: 'ES-00045',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
      description: 'A master-planned residential community strategically situated in the rapidly developing Kyami district along the Airport Road corridor. Offering 3-bedroom detached bungalows with BQ on 400 sqm plots.',
      options: [
        { label: 'Completed Turnkey', price: '₦45,000,000' },
        { label: 'Structural Carcass', price: '₦25,000,000' },
        { label: 'Serviced Plot (400 sqm)', price: '₦10,000,000' }
      ],
      features: ['Right of Occupancy (R of O)', 'Asphalt road network', 'Dedicated electrification', 'Perimeter security fence']
    },
    {
      id: 'apo-dutse',
      title: 'Apo Dutse Luxury Terraces',
      location: 'Apo Dutse Residential Enclave, Abuja',
      tagline: 'Contemporary 4-Bedroom Smart Terraces + BQ',
      propertyRef: 'ES-00055',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80',
      description: 'An exclusive gated court offering bespoke 4-bedroom terrace duplexes with attached maid rooms. Designed with modern architecture, Italian finishes, and continuous power support.',
      options: [
        { label: '4-Bed Terrace + BQ', price: '₦55,000,000' }
      ],
      features: ['Statutory FCDA C of O', 'Automated gated access', 'Solar hybrid backup', 'High rental yield profile']
    },
    {
      id: 'nnpc-chiku',
      title: 'NNPC Staff 500-Unit Housing Scheme',
      location: 'Chiku Local Government Area, Kaduna State',
      tagline: 'Syndicated Mass Housing Scheme for Cooperative Society',
      propertyRef: 'ES-00500',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80',
      description: 'Institutional mass housing development comprising 500 residential homes successfully structured and marketed for the NNPC Staff Multipurpose Co-operative Society Abuja.',
      options: [
        { label: '500-Unit Co-operative Scheme', price: 'Institutional Delivery' }
      ],
      features: ['Full layout approval', 'Centralized water scheme', 'Electrification & transformers', 'Cooperative financing']
    }
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      
      {/* Page Title */}
      <section className="relative w-full py-20 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&auto=format&fit=crop&q=80" 
            alt="Architectural Estate Development" 
            className="w-full h-full object-cover object-center transform scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/45 to-slate-900/40 dark:from-slate-950/65 dark:via-slate-950/55 dark:to-slate-950/50 backdrop-blur-[0.5px]" />
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto space-y-3 text-white">
          <span className="inline-block px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-200 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            Portfolio & Track Record
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-brand-heading leading-tight">
            Featured Estate Developments
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed max-w-2xl mx-auto">
            Explore key residential master plans and institutional housing syndications marketed by Estate Shelters Ltd.
          </p>
        </div>
      </section>

      {/* Featured Projects List */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {projects.map((proj, idx) => {
          const matchedProperty = properties.find(p => p.property_id === proj.propertyRef || p.title.toLowerCase().includes(proj.title.toLowerCase()));

          return (
            <div
              key={proj.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8"
            >
              {/* Left Image */}
              <div className="lg:col-span-5 rounded-2xl overflow-hidden aspect-[4/3] bg-slate-950">
                <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
              </div>

              {/* Right Details */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center space-x-2 text-xs text-blue-600 dark:text-blue-400 font-semibold">
                  <MapPin className="w-4 h-4" />
                  <span>{proj.location}</span>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-brand-heading">
                  {proj.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {proj.description}
                </p>

                {/* Pricing / Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                  {proj.options.map((opt, oIdx) => (
                    <div key={oIdx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                      <span className="text-[10px] text-slate-400 block font-medium">{opt.label}</span>
                      <strong className="text-xs sm:text-sm text-blue-900 dark:text-blue-400 font-bold">{opt.price}</strong>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {proj.features.map((f, fIdx) => (
                    <div key={fIdx} className="text-xs text-slate-700 dark:text-slate-300 flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex flex-wrap items-center gap-3">
                  {matchedProperty ? (
                    <button
                      onClick={() => onViewProperty(matchedProperty.slug)}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md"
                    >
                      <span>View Full Dossier & Units</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        const text = `Hello Estate Shelters, I would like to inquire about ${proj.title}.`;
                        window.open(`https://wa.me/2348136656679?text=${encodeURIComponent(text)}`, '_blank');
                      }}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center space-x-1.5"
                    >
                      <span>Inquire on Project</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    onClick={() => {
                      const text = `Hello Estate Shelters, I want to book a site visit for ${proj.title}.`;
                      window.open(`https://wa.me/2348136656679?text=${encodeURIComponent(text)}`, '_blank');
                    }}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold"
                  >
                    Schedule Site Visit
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Case study banner */}
      <CaseStudySection />

    </div>
  );
};
