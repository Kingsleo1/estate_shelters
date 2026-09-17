import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  MessageCircle, 
  Printer, 
  Share2, 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeft,
  Coins,
  Layers,
  Heart,
  Car,
  FileCheck,
  Compass,
  Sparkles
} from 'lucide-react';
import { Property } from '../types';
import { formatCurrency, createPropertyEnquiryWhatsAppUrl } from '../lib/whatsapp';
import { PropertyMapGrounding } from '../components/PropertyMapGrounding';
import { MortgageCalculator } from '../components/MortgageCalculator';

interface PropertyDetailViewProps {
  property: Property;
  onBack: () => void;
  onBookInspection: (property: Property) => void;
  onOpenEnquiry: (property: Property) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  isCompared: boolean;
  onToggleCompare: (property: Property) => void;
  similarProperties: Property[];
  onSelectProperty: (slug: string) => void;
  whatsappNumber?: string;
}

export const PropertyDetailView: React.FC<PropertyDetailViewProps> = ({
  property,
  onBack,
  onBookInspection,
  onOpenEnquiry,
  isFavorite,
  onToggleFavorite,
  isCompared,
  onToggleCompare,
  similarProperties,
  onSelectProperty,
  whatsappNumber = '+2347033385434'
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currency, setCurrency] = useState<'NGN' | 'USD' | 'GBP'>('NGN');

  const images = property.images && property.images.length > 0
    ? property.images
    : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&auto=format&fit=crop&q=80'];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${property.title} - Estate Shelters`,
        text: `Check out this verified property in ${property.district}, Abuja.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Property link copied to clipboard!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsApp = () => {
    const url = createPropertyEnquiryWhatsAppUrl(
      property,
      { name: 'Interested Investor', phone: '' },
      whatsappNumber
    );
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10" id="property-detail-container">
      
      {/* Top Bar / Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Properties</span>
        </button>

        <div className="flex items-center space-x-2">
          {/* Compare */}
          <button
            onClick={() => onToggleCompare(property)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
              isCompared
                ? 'bg-amber-500 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isCompared ? 'In Compare' : 'Add to Compare'}</span>
          </button>

          {/* Favorite */}
          <button
            onClick={() => onToggleFavorite(property.id)}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center justify-center transition-colors ${
              isFavorite
                ? 'bg-rose-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
            title="Save Property"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
            title="Share Property"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Print / Brochure */}
          <button
            onClick={handlePrint}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
            title="Print Property Dossier"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Image Gallery Section */}
      <div className="space-y-4">
        <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden bg-slate-950 shadow-xl border border-slate-200 dark:border-slate-800">
          <img
            src={images[selectedImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover"
          />

          {/* Controls */}
          {images.length > 1 && (
            <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none">
              <button
                type="button"
                onClick={() => setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md pointer-events-auto transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setSelectedImageIndex((prev) => (prev + 1) % images.length)}
                className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md pointer-events-auto transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Overlay tags */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-xl bg-blue-600 text-white text-xs font-bold uppercase tracking-wider shadow-md">
              {property.property_type} &bull; {property.transaction_type}
            </span>
            <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider shadow-md">
              {property.status}
            </span>
          </div>

          <div className="absolute bottom-4 right-4 px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-xs font-medium">
            {selectedImageIndex + 1} of {images.length} Photos
          </div>
        </div>

        {/* Thumbnails row */}
        {images.length > 1 && (
          <div className="flex items-center space-x-3 overflow-x-auto pb-2 no-scrollbar">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  selectedImageIndex === idx
                    ? 'border-blue-600 scale-105 shadow-md'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content & Sticky Action Rail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Dossier Body */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Header Info */}
          <div className="space-y-3 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-lg">
                REF: {property.property_id}
              </span>
              {property.verification_status === 'Verified' && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>AGIS & FCDA Title Audited</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white font-brand-heading leading-tight">
              {property.title}
            </h1>

            <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>{property.estate ? `${property.estate}, ` : ''}{property.location || property.district}, {property.lga}, Abuja</span>
            </div>
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800">
            <div className="space-y-1">
              <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-semibold uppercase">
                <Bed className="w-4 h-4 text-blue-600" />
                <span>Bedrooms</span>
              </div>
              <strong className="text-base text-slate-900 dark:text-white">
                {property.bedrooms > 0 ? `${property.bedrooms} Bedrooms` : 'Commercial'}
              </strong>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-semibold uppercase">
                <Bath className="w-4 h-4 text-blue-600" />
                <span>Bathrooms</span>
              </div>
              <strong className="text-base text-slate-900 dark:text-white">
                {property.bathrooms > 0 ? `${property.bathrooms} Baths` : 'Commercial'}
              </strong>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-semibold uppercase">
                <Maximize2 className="w-4 h-4 text-blue-600" />
                <span>Land Area</span>
              </div>
              <strong className="text-base text-slate-900 dark:text-white">
                {property.land_size || 'Prime Plot'}
              </strong>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-semibold uppercase">
                <Car className="w-4 h-4 text-blue-600" />
                <span>Parking</span>
              </div>
              <strong className="text-base text-slate-900 dark:text-white">
                {property.parking_spaces ? `${property.parking_spaces} Vehicles` : 'Ample Space'}
              </strong>
            </div>
          </div>

          {/* Structural Configurations (e.g. ABU Estate Completed vs Carcass vs Plot) */}
          {property.options && property.options.length > 0 && (
            <div className="p-6 rounded-3xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider flex items-center space-x-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Available Structural Options & Pricing</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {property.options.map((opt, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">{opt.name}</span>
                    <div className="text-lg font-extrabold text-blue-900 dark:text-blue-400 font-serif-luxury">
                      {formatCurrency(opt.price, property.currency)}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight pt-1">
                      {opt.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Property Description */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-brand-heading">
              Property Overview & Architectural Description
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Features Checklist */}
          {property.features && property.features.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-brand-heading">
                Features & Infrastructure Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.features.map((feat, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center space-x-2.5 text-xs text-slate-800 dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documentation & Title Status */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Statutory Title & Land Registry Record
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Cadastral verification conducted via AGIS (Abuja Geographic Information Systems)
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {property.documentation_status.map((doc, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-bold border border-slate-200 dark:border-slate-700 shadow-sm flex items-center space-x-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>{doc}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Location Grounding & Map */}
          <PropertyMapGrounding property={property} />

          {/* Interactive Mortgage Estimator for this Property */}
          <MortgageCalculator initialPrice={property.price} />

        </div>

        {/* Right Sticky Action Rail */}
        <div className="lg:col-span-4 space-y-6 sticky top-28">
          
          {/* Price & Action Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xl space-y-5">
            <div>
              <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                {property.price_label || 'Current Asking Price'}
              </div>
              <div className="text-3xl font-extrabold text-blue-900 dark:text-blue-400 font-serif-luxury mt-1">
                {formatCurrency(property.price, currency)}
              </div>

              {/* Currency Converter */}
              <div className="flex items-center space-x-2 pt-2 text-[11px] text-slate-500">
                <span>Display in:</span>
                {(['NGN', 'USD', 'GBP'] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`px-2 py-0.5 rounded font-semibold ${
                      currency === c ? 'bg-blue-600 text-white' : 'hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
              {/* WhatsApp CTA */}
              <button
                type="button"
                onClick={handleWhatsApp}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/20 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire via WhatsApp (+2347033385434)</span>
              </button>

              {/* Book Site Inspection */}
              <button
                type="button"
                onClick={() => onBookInspection(property)}
                className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/20 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Site Inspection</span>
              </button>

              {/* Fast Form Enquiry */}
              <button
                type="button"
                onClick={() => onOpenEnquiry(property)}
                className="w-full py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-center space-x-2 transition-colors"
              >
                <span>Send Formal Web Inquiry</span>
              </button>
            </div>

            {/* Consultant guarantee */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
              <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Estate Shelters Guarantee</span>
              </span>
              <p>Direct developer liaison, zero buyer commission markups, and comprehensive title audit support.</p>
            </div>
          </div>

          {/* Developer / Partner Card */}
          {property.developer_name && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-2 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Syndicated Developer</span>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                {property.developer_name}
              </h4>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[11px]">
                Authorized marketing and sales syndication agreement with Estate Shelters Ltd (CAC: 9673843).
              </p>
            </div>
          )}

        </div>

      </div>

      {/* Similar Properties Section */}
      {similarProperties.length > 0 && (
        <div className="pt-12 border-t border-slate-200 dark:border-slate-800 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-brand-heading">
              Similar Properties in {property.district} & Surrounds
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Compare alternatives within the same Abuja price and typology category.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.slice(0, 3).map((sim) => (
              <div
                key={sim.id}
                onClick={() => onSelectProperty(sim.slug)}
                className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all cursor-pointer p-4 space-y-3"
              >
                <img src={sim.images[0]} alt={sim.title} className="w-full h-36 object-cover rounded-2xl" />
                <div>
                  <span className="text-[10px] text-blue-600 font-bold">{sim.property_type}</span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600">
                    {sim.title}
                  </h4>
                  <div className="text-sm font-extrabold text-blue-900 dark:text-blue-400 mt-1">
                    {formatCurrency(sim.price, sim.currency)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
