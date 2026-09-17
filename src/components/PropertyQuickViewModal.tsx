import React from 'react';
import { 
  X, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  ShieldCheck, 
  MessageCircle, 
  Calendar, 
  ArrowRight,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { Property } from '../types';
import { formatCurrency, createPropertyEnquiryWhatsAppUrl } from '../lib/whatsapp';

interface PropertyQuickViewModalProps {
  property: Property | null;
  onClose: () => void;
  onViewFullDetails: (slug: string) => void;
  onBookInspection: (property: Property) => void;
  whatsappNumber?: string;
}

export const PropertyQuickViewModal: React.FC<PropertyQuickViewModalProps> = ({
  property,
  onClose,
  onViewFullDetails,
  onBookInspection,
  whatsappNumber = '+2347033385434'
}) => {
  if (!property) return null;

  const images = property.images && property.images.length > 0 ? property.images : [];

  const handleWhatsApp = () => {
    const url = createPropertyEnquiryWhatsAppUrl(
      property,
      { name: 'Interested Buyer', phone: '' },
      whatsappNumber
    );
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-md flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] w-full bg-slate-950">
          <img
            src={images[0]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white">
            <div>
              <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-[11px] font-bold uppercase tracking-wider">
                {property.property_type} &bull; {property.transaction_type}
              </span>
              <div className="text-2xl font-extrabold mt-1.5 font-serif-luxury">
                {formatCurrency(property.price, property.currency)}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-lg bg-emerald-600/90 text-white text-xs font-bold">
                {property.status}
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-6">
          
          <div>
            <div className="flex items-center space-x-2 text-xs text-blue-600 dark:text-blue-400 font-bold uppercase">
              <span>ID: {property.property_id}</span>
              {property.verification_status === 'Verified' && (
                <span className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>AGIS & Title Verified</span>
                </span>
              )}
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {property.title}
            </h2>

            <p className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 mt-2">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{property.estate ? `${property.estate}, ` : ''}{property.location || property.district}, Abuja</span>
            </p>
          </div>

          {/* Quick Specifications */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 px-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Bedrooms</span>
              <strong className="text-slate-800 dark:text-slate-200 text-sm">{property.bedrooms} Beds</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Bathrooms</span>
              <strong className="text-slate-800 dark:text-slate-200 text-sm">{property.bathrooms} Baths</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Land / Size</span>
              <strong className="text-slate-800 dark:text-slate-200 text-sm">{property.land_size || property.building_size || 'N/A'}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Documentation</span>
              <strong className="text-slate-800 dark:text-slate-200 text-sm truncate block">{property.documentation_status[0] || 'Verified'}</strong>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">Overview</h4>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Key Features Chips */}
          {property.features && property.features.length > 0 && (
            <div>
              <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2.5">Key Highlights</h4>
              <div className="flex flex-wrap gap-2">
                {property.features.slice(0, 6).map((feat, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>{feat}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleWhatsApp}
                className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center space-x-2 shadow-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Enquiry</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBookInspection(property);
                }}
                className="flex-1 sm:flex-none px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-center space-x-2 transition-colors"
              >
                <Calendar className="w-4 h-4 text-blue-500" />
                <span>Book Inspection</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onViewFullDetails(property.slug);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center space-x-2 shadow-md transition-colors"
            >
              <span>View Complete Property Dossier</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
