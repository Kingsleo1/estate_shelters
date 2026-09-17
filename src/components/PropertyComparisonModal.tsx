import React from 'react';
import { 
  X, 
  Layers, 
  Trash2, 
  MessageCircle, 
  ExternalLink, 
  Check, 
  ShieldCheck, 
  Bed, 
  Bath, 
  Maximize2,
  Building2
} from 'lucide-react';
import { Property } from '../types';
import { formatCurrency, createPropertyEnquiryWhatsAppUrl } from '../lib/whatsapp';

interface PropertyComparisonModalProps {
  compareList: Property[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  onViewDetails: (slug: string) => void;
  whatsappNumber?: string;
}

export const PropertyComparisonModal: React.FC<PropertyComparisonModalProps> = ({
  compareList,
  onClose,
  onRemove,
  onClear,
  onViewDetails,
  whatsappNumber = '+2347033385434'
}) => {
  if (compareList.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-6xl w-full max-h-[92vh] flex flex-col border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/60">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Property Comparison Matrix
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Comparing {compareList.length} of 4 selected properties across Abuja
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClear}
              className="text-xs text-rose-600 dark:text-rose-400 hover:underline flex items-center space-x-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Matrix Table */}
        <div className="overflow-x-auto flex-1 p-6">
          <div className="min-w-[700px]">
            {/* Properties Top Row (Cards) */}
            <div className={`grid grid-cols-${compareList.length + 1} gap-4 pb-6 border-b border-slate-200 dark:border-slate-800`} style={{ gridTemplateColumns: `180px repeat(${compareList.length}, minmax(200px, 1fr))` }}>
              <div className="flex items-end pb-2">
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Property Listing
                </span>
              </div>

              {compareList.map((p) => (
                <div key={p.id} className="relative bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-3">
                  <button
                    onClick={() => onRemove(p.id)}
                    className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-rose-600 hover:text-white text-slate-600 dark:text-slate-300 flex items-center justify-center text-xs transition-colors"
                    title="Remove from comparison"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-full h-28 object-cover rounded-xl"
                  />

                  <div>
                    <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold block">{p.property_id}</span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 mt-0.5">
                      {p.title}
                    </h4>
                  </div>

                  <div className="text-base font-extrabold text-blue-900 dark:text-blue-400">
                    {formatCurrency(p.price, p.currency)}
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => {
                        const url = createPropertyEnquiryWhatsAppUrl(p, { name: 'Comparison Visitor', phone: '' }, whatsappNumber);
                        window.open(url, '_blank');
                      }}
                      className="py-2 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[11px] font-semibold flex items-center justify-center space-x-1"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>Enquire</span>
                    </button>

                    <button
                      onClick={() => {
                        onClose();
                        onViewDetails(p.slug);
                      }}
                      className="py-2 px-2.5 bg-slate-900 dark:bg-slate-700 hover:bg-blue-600 text-white rounded-xl text-[11px] font-semibold flex items-center justify-center space-x-1"
                    >
                      <span>Details</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Spec Attributes Rows */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              
              {/* Location */}
              <div className="grid py-3.5 items-center font-medium" style={{ gridTemplateColumns: `180px repeat(${compareList.length}, minmax(200px, 1fr))` }}>
                <span className="text-slate-400 font-semibold uppercase text-[11px]">District / Location</span>
                {compareList.map((p) => (
                  <span key={p.id} className="text-slate-800 dark:text-slate-200 px-2 font-semibold">
                    {p.district} ({p.lga.replace('Area Council', '').trim()})
                  </span>
                ))}
              </div>

              {/* Property Type */}
              <div className="grid py-3.5 items-center font-medium" style={{ gridTemplateColumns: `180px repeat(${compareList.length}, minmax(200px, 1fr))` }}>
                <span className="text-slate-400 font-semibold uppercase text-[11px]">Property Type</span>
                {compareList.map((p) => (
                  <span key={p.id} className="text-slate-800 dark:text-slate-200 px-2">
                    {p.property_type} &bull; {p.transaction_type}
                  </span>
                ))}
              </div>

              {/* Bedrooms & Bathrooms */}
              <div className="grid py-3.5 items-center font-medium" style={{ gridTemplateColumns: `180px repeat(${compareList.length}, minmax(200px, 1fr))` }}>
                <span className="text-slate-400 font-semibold uppercase text-[11px]">Bedrooms / Baths</span>
                {compareList.map((p) => (
                  <span key={p.id} className="text-slate-800 dark:text-slate-200 px-2">
                    {p.bedrooms} Beds / {p.bathrooms} Baths
                  </span>
                ))}
              </div>

              {/* Land / Building Size */}
              <div className="grid py-3.5 items-center font-medium" style={{ gridTemplateColumns: `180px repeat(${compareList.length}, minmax(200px, 1fr))` }}>
                <span className="text-slate-400 font-semibold uppercase text-[11px]">Land / Built Area</span>
                {compareList.map((p) => (
                  <span key={p.id} className="text-slate-800 dark:text-slate-200 px-2">
                    {p.land_size || 'N/A'} {p.building_size ? `(${p.building_size})` : ''}
                  </span>
                ))}
              </div>

              {/* Documentation */}
              <div className="grid py-3.5 items-center font-medium" style={{ gridTemplateColumns: `180px repeat(${compareList.length}, minmax(200px, 1fr))` }}>
                <span className="text-slate-400 font-semibold uppercase text-[11px]">Title / Documentation</span>
                {compareList.map((p) => (
                  <div key={p.id} className="px-2 space-y-1">
                    {p.documentation_status.map((doc, idx) => (
                      <span key={idx} className="inline-block mr-1 px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-medium border border-blue-200 dark:border-blue-900">
                        {doc}
                      </span>
                    ))}
                  </div>
                ))}
              </div>

              {/* Verification */}
              <div className="grid py-3.5 items-center font-medium" style={{ gridTemplateColumns: `180px repeat(${compareList.length}, minmax(200px, 1fr))` }}>
                <span className="text-slate-400 font-semibold uppercase text-[11px]">Verification</span>
                {compareList.map((p) => (
                  <span key={p.id} className="px-2 flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{p.verification_status}</span>
                  </span>
                ))}
              </div>

              {/* Parking */}
              <div className="grid py-3.5 items-center font-medium" style={{ gridTemplateColumns: `180px repeat(${compareList.length}, minmax(200px, 1fr))` }}>
                <span className="text-slate-400 font-semibold uppercase text-[11px]">Parking Spaces</span>
                {compareList.map((p) => (
                  <span key={p.id} className="text-slate-800 dark:text-slate-200 px-2">
                    {p.parking_spaces ? `${p.parking_spaces} Vehicles` : 'Ample Space'}
                  </span>
                ))}
              </div>

              {/* Developer / Partner */}
              <div className="grid py-3.5 items-center font-medium" style={{ gridTemplateColumns: `180px repeat(${compareList.length}, minmax(200px, 1fr))` }}>
                <span className="text-slate-400 font-semibold uppercase text-[11px]">Developer Partner</span>
                {compareList.map((p) => (
                  <span key={p.id} className="text-slate-800 dark:text-slate-200 px-2">
                    {p.developer_name || 'Estate Shelters Direct'}
                  </span>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Need specialized assistance selecting between these properties?</span>
          <button
            onClick={() => {
              const text = `Hello Estate Shelters, I am comparing ${compareList.map(p => p.property_id).join(', ')} on your website. Please guide me with an expert opinion.`;
              window.open(`https://wa.me/2348136656679?text=${encodeURIComponent(text)}`, '_blank');
            }}
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
          >
            Consult Market Analysis Department on WhatsApp &rarr;
          </button>
        </div>

      </div>
    </div>
  );
};
