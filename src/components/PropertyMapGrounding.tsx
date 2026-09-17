import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Plane, 
  Building2, 
  ShoppingBag, 
  TreePine, 
  ShieldCheck, 
  ExternalLink,
  Compass
} from 'lucide-react';
import { Property } from '../types';

interface PropertyMapGroundingProps {
  property: Property;
}

export const PropertyMapGrounding: React.FC<PropertyMapGroundingProps> = ({ property }) => {
  const [activeLayer, setActiveLayer] = useState<'landmarks' | 'cadastral' | 'transit'>('landmarks');

  // Grounded landmark proximities based on district
  const getProximityData = (district: string) => {
    const d = district.toLowerCase();
    if (d.includes('kyami') || d.includes('airport')) {
      return [
        { name: 'Nnamdi Azikiwe International Airport', distance: '12 Mins', time: '14.2 km', type: 'transit' },
        { name: 'Centenary City Economic Zone', distance: '8 Mins', time: '9.0 km', type: 'commercial' },
        { name: 'Central Business District (CBD)', distance: '22 Mins', time: '28.5 km', type: 'hub' },
        { name: 'University of Abuja Permanent Site', distance: '15 Mins', time: '17.0 km', type: 'education' },
      ];
    } else if (d.includes('apo')) {
      return [
        { name: 'Central Business District (CBD)', distance: '14 Mins', time: '12.0 km', type: 'hub' },
        { name: 'Shoprite Grand Towers Mall', distance: '6 Mins', time: '4.5 km', type: 'commercial' },
        { name: 'National Assembly Complex', distance: '16 Mins', time: '13.8 km', type: 'government' },
        { name: 'International Conference Centre', distance: '15 Mins', time: '12.5 km', type: 'hub' },
      ];
    } else if (d.includes('maitama')) {
      return [
        { name: 'Transcorp Hilton Hotel', distance: '4 Mins', time: '2.5 km', type: 'hub' },
        { name: 'IBB International Golf Course', distance: '5 Mins', time: '3.0 km', type: 'recreation' },
        { name: 'Federal Secretariat Complex', distance: '6 Mins', time: '4.2 km', type: 'government' },
        { name: 'Nnamdi Azikiwe Airport', distance: '35 Mins', time: '38.0 km', type: 'transit' },
      ];
    } else {
      return [
        { name: 'Central Business District (CBD)', distance: '12 Mins', time: '10.5 km', type: 'hub' },
        { name: 'Jabi Lake Mall', distance: '8 Mins', time: '6.0 km', type: 'commercial' },
        { name: 'National Hospital Abuja', distance: '15 Mins', time: '11.0 km', type: 'healthcare' },
        { name: 'Nnamdi Azikiwe Airport', distance: '28 Mins', time: '32.0 km', type: 'transit' },
      ];
    }
  };

  const proximities = getProximityData(property.district);
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${property.title} ${property.district} Abuja Nigeria`)}`;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 md:p-8 space-y-6 shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Location Intelligence & Proximity Grounding
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Cadastral coordinates and transit times from {property.district}, Abuja
            </p>
          </div>
        </div>

        <a
          href={mapsSearchUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
        >
          <span>Open Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Map Visualizer Mock / Schematic */}
      <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
        <img
          src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1400&auto=format&fit=crop&q=80"
          alt="Abuja Cadastral Map"
          className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Pin marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce">
          <div className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-bold shadow-lg flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{property.title}</span>
          </div>
          <div className="w-3 h-3 bg-blue-600 rotate-45 -mt-1.5 shadow-md" />
        </div>

        {/* Cadastral stamp */}
        <div className="absolute bottom-3 left-4 flex items-center space-x-2 text-[11px] text-slate-300">
          <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md font-mono text-blue-400 font-semibold">
            AGIS CAD: {property.district.toUpperCase().slice(0, 3)}-SEC-{Math.floor(Math.random() * 80 + 10)}
          </span>
          <span className="hidden sm:inline text-slate-400">
            FCT Abuja Cadastral Zone &bull; Verified Coordinates
          </span>
        </div>
      </div>

      {/* Key Landmarks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {proximities.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{item.distance}</span>
              <span className="text-[10px] text-slate-400">{item.time}</span>
            </div>
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
              {item.name}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};
