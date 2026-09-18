import React, { useState } from 'react';
import { 
  Heart, 
  Layers, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  ShieldCheck, 
  MessageCircle, 
  Eye, 
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Tag
} from 'lucide-react';
import { Property } from '../types';
import { formatCurrency, createPropertyEnquiryWhatsAppUrl } from '../lib/whatsapp';
import { notify } from './ToastNotification';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  isCompared: boolean;
  onToggleCompare: (property: Property) => void;
  onQuickView: (property: Property) => void;
  onViewDetails: (slug: string) => void;
  whatsappNumber?: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite,
  onToggleFavorite,
  isCompared,
  onToggleCompare,
  onQuickView,
  onViewDetails,
  whatsappNumber = '+2347033385434'
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = property.images && property.images.length > 0 
    ? property.images 
    : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80'];

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const toastId = notify.loading('Initiating WhatsApp Chat...', `Connecting for ${property.title}...`);
    const url = createPropertyEnquiryWhatsAppUrl(
      property,
      { name: 'Website Visitor', phone: '' },
      whatsappNumber
    );
    setTimeout(() => {
      notify.dismiss(toastId);
      notify.success('✓ WhatsApp Direct Chat Session Initiated!');
      window.open(url, '_blank');
    }, 350);
  };

  return (
    <div 
      className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl dark:hover:shadow-black/50 transition-all duration-300 flex flex-col cursor-pointer"
      onClick={() => onViewDetails(property.slug)}
      id={`property-card-${property.property_id}`}
    >
      {/* Image Gallery Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <img
          src={images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
          <div className="flex flex-wrap gap-1.5 pointer-events-auto">
            {property.featured && (
              <span className="px-2.5 py-1 rounded-lg bg-blue-600/95 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider shadow-sm flex items-center space-x-1">
                <span>Featured</span>
              </span>
            )}
            
            <span className={`px-2.5 py-1 rounded-lg backdrop-blur-md text-[11px] font-bold uppercase tracking-wider shadow-sm ${
              property.status === 'Available'
                ? 'bg-emerald-600/90 text-white'
                : property.status === 'Sold'
                ? 'bg-slate-700/90 text-slate-200'
                : 'bg-amber-600/90 text-white'
            }`}>
              {property.status}
            </span>

            <span className="px-2 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-slate-200 text-[11px] font-medium">
              {property.transaction_type}
            </span>
          </div>

          {/* Quick Interactive Actions */}
          <div className="flex items-center space-x-1.5 pointer-events-auto">
            {/* Quick View */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(property);
              }}
              className="w-8 h-8 rounded-full bg-slate-900/80 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md flex items-center justify-center transition-all"
              title="Quick Preview"
            >
              <Eye className="w-4 h-4" />
            </button>

            {/* Compare */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(property);
                notify.success(
                  isCompared ? 'Removed from Comparison' : '✓ Added to Comparison List',
                  `${property.title} updated in property comparison drawer.`
                );
              }}
              className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                isCompared
                  ? 'bg-amber-500 text-white'
                  : 'bg-slate-900/80 hover:bg-white text-white hover:text-slate-900'
              }`}
              title="Compare Property"
            >
              <Layers className="w-4 h-4" />
            </button>

            {/* Favorite */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(property.id);
                notify.success(
                  isFavorite ? 'Removed from Favorites' : '✓ Saved to Favorites',
                  `${property.title} saved to your personal collection.`
                );
              }}
              className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                isFavorite
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-900/80 hover:bg-white text-white hover:text-slate-900'
              }`}
              title="Save to Favorites"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        {images.length > 1 && (
          <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={handlePrevImage}
              className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextImage}
              className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Image count pill */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] text-white font-medium">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}

        {/* ID & Verification Badge at Bottom Image */}
        <div className="absolute bottom-3 left-3 flex items-center space-x-2">
          <span className="px-2 py-0.5 rounded-md bg-slate-900/90 text-blue-300 text-[11px] font-mono font-bold tracking-wider">
            {property.property_id}
          </span>
          {property.verification_status === 'Verified' && (
            <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold flex items-center space-x-1 backdrop-blur-sm">
              <ShieldCheck className="w-3 h-3" />
              <span>Verified Title</span>
            </span>
          )}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Title & Location */}
        <div>
          <div className="flex items-center justify-between text-xs text-blue-600 dark:text-blue-400 font-semibold mb-1">
            <span>{property.property_type}</span>
            {property.developer_name && (
              <span className="text-slate-500 dark:text-slate-400 font-normal">
                Dev: <strong>{property.developer_name}</strong>
              </span>
            )}
          </div>

          <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {property.title}
          </h3>

          <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 mt-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">
              {property.estate ? `${property.estate}, ` : ''}{property.location || property.district}, Abuja
            </span>
          </div>
        </div>

        {/* Key Specs Bar (Beds, Baths, Land Size) */}
        <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center space-x-1.5 text-slate-700 dark:text-slate-300">
            <Bed className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>{property.bedrooms > 0 ? `${property.bedrooms} Beds` : 'Commercial'}</span>
          </div>

          <div className="flex items-center space-x-1.5 text-slate-700 dark:text-slate-300">
            <Bath className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>{property.bathrooms > 0 ? `${property.bathrooms} Baths` : 'N/A'}</span>
          </div>

          <div className="flex items-center space-x-1.5 text-slate-700 dark:text-slate-300">
            <Maximize2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="truncate">{property.land_size || property.building_size || 'Prime Plot'}</span>
          </div>
        </div>

        {/* Options Preview for schemes like ABU Estate Kyami */}
        {property.options && property.options.length > 1 && (
          <div className="space-y-1 py-1.5 px-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 text-[11px]">
            <span className="font-semibold text-blue-900 dark:text-blue-300">Available Configurations:</span>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {property.options.map((opt, idx) => (
                <span key={idx} className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                  {opt.name.split(' ')[0]}: <strong>{formatCurrency(opt.price, property.currency)}</strong>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              {property.price_label || 'Asking Price'}
            </div>
            <div className="text-lg font-extrabold text-blue-900 dark:text-blue-400 tracking-tight">
              {formatCurrency(property.price, property.currency)}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* WhatsApp Quick Button */}
            <button
              type="button"
              onClick={handleWhatsAppClick}
              className="p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 hover:text-white border border-emerald-500/20 transition-colors"
              title="Instant WhatsApp Enquiry"
            >
              <MessageCircle className="w-4 h-4" />
            </button>

            {/* View Details */}
            <button
              type="button"
              onClick={() => onViewDetails(property.slug)}
              className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white dark:bg-slate-800 dark:hover:bg-blue-600 text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-sm"
            >
              <span>View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
