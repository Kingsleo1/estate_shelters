import React, { useState, useMemo, useId } from 'react';
import { 
  Building2, 
  Search, 
  SlidersHorizontal, 
  Grid, 
  List, 
  MapPin, 
  RotateCcw, 
  Filter, 
  X,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { Property, LocationItem } from '../types';
import { PropertyCard } from '../components/PropertyCard';
import { formatCurrency } from '../lib/whatsapp';

interface PropertiesViewProps {
  properties: Property[];
  locations: LocationItem[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  compareList: Property[];
  onToggleCompare: (p: Property) => void;
  onQuickView: (p: Property) => void;
  onViewProperty: (slug: string) => void;
  initialFilters?: {
    transaction?: string;
    type?: string;
    district?: string;
    keyword?: string;
  };
  whatsappNumber?: string;
}

export const PropertiesView: React.FC<PropertiesViewProps> = ({
  properties,
  locations,
  favorites,
  onToggleFavorite,
  compareList,
  onToggleCompare,
  onQuickView,
  onViewProperty,
  initialFilters,
  whatsappNumber = '+2347033385434'
}) => {
  const [transaction, setTransaction] = useState<string>(initialFilters?.transaction || 'All');
  const [propertyType, setPropertyType] = useState<string>(initialFilters?.type || 'All');
  const [district, setDistrict] = useState<string>(initialFilters?.district || 'All');
  const [maxPrice, setMaxPrice] = useState<number>(1000000000);
  const [bedrooms, setBedrooms] = useState<string>('Any');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>(initialFilters?.keyword || '');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync prop changes from Navbar submenus
  React.useEffect(() => {
    if (initialFilters?.transaction !== undefined) {
      setTransaction(initialFilters.transaction || 'All');
    }
    if (initialFilters?.type !== undefined) {
      setPropertyType(initialFilters.type || 'All');
    }
    if (initialFilters?.district !== undefined) {
      setDistrict(initialFilters.district || 'All');
    }
    if (initialFilters?.keyword !== undefined) {
      setKeyword(initialFilters.keyword || '');
    }
  }, [initialFilters]);

  const priceRangeId = useId();

  // Filter and sort logic
  const filteredProperties = useMemo(() => {
    let list = [...properties];

    if (transaction !== 'All') {
      list = list.filter(p => p.transaction_type.toLowerCase() === transaction.toLowerCase());
    }
    if (propertyType !== 'All') {
      list = list.filter(p => p.property_type.toLowerCase() === propertyType.toLowerCase());
    }
    if (district !== 'All') {
      list = list.filter(p => p.district.toLowerCase().includes(district.toLowerCase()) || p.lga.toLowerCase().includes(district.toLowerCase()));
    }
    if (maxPrice < 1000000000) {
      list = list.filter(p => p.price <= maxPrice);
    }
    if (bedrooms !== 'Any') {
      if (bedrooms === '5+') {
        list = list.filter(p => p.bedrooms >= 5);
      } else {
        list = list.filter(p => p.bedrooms === Number(bedrooms));
      }
    }
    if (statusFilter !== 'All') {
      list = list.filter(p => p.status === statusFilter);
    }
    if (verifiedOnly) {
      list = list.filter(p => p.verification_status === 'Verified');
    }
    if (keyword.trim()) {
      const q = keyword.toLowerCase();
      list = list.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q) ||
        p.property_id.toLowerCase().includes(q) ||
        (p.estate && p.estate.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'featured') {
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    } else if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [properties, transaction, propertyType, district, maxPrice, bedrooms, statusFilter, verifiedOnly, keyword, sortBy]);

  const handleResetFilters = () => {
    setTransaction('All');
    setPropertyType('All');
    setDistrict('All');
    setMaxPrice(1000000000);
    setBedrooms('Any');
    setStatusFilter('All');
    setVerifiedOnly(false);
    setKeyword('');
    setSortBy('featured');
  };

  const hasActiveFilters = transaction !== 'All' || propertyType !== 'All' || district !== 'All' || maxPrice < 1000000000 || bedrooms !== 'Any' || statusFilter !== 'All' || verifiedOnly || keyword.trim() !== '';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">
      
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white font-brand-heading leading-tight">
            Abuja Properties & Real Estate Portfolio
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Showing {filteredProperties.length} verified listings across Abuja Municipal, Airport Corridor, and Satellite Growth Zones.
          </p>
        </div>

        {/* View mode & mobile filter trigger */}
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold flex items-center space-x-2"
          >
            <Filter className="w-4 h-4" />
            <span>Filter Search</span>
          </button>

          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6 sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Search Filters</span>
            </h3>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Search Keyword */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Search Keyword
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="District, estate, ID..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full pl-8.5 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Transaction Type */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Transaction Type
            </label>
            <div className="flex flex-wrap gap-1.5">
              {['All', 'Buy', 'Rent', 'Land'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTransaction(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    transaction === t
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Property Typology */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Property Typology
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
            >
              <option value="All">All Property Types</option>
              <option value="Terrace Duplex">Terrace Duplex</option>
              <option value="Detached Duplex">Detached Duplex</option>
              <option value="Bungalow">Detached Bungalow</option>
              <option value="Apartment">Apartment / Flat</option>
              <option value="Mansion">Mansion</option>
              <option value="Land">Serviced Plot / Land</option>
              <option value="Commercial">Commercial Property</option>
            </select>
          </div>

          {/* District Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Abuja District
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
            >
              <option value="All">All Abuja Districts</option>
              <option value="Kyami">Kyami (Airport Road)</option>
              <option value="Apo Dutse">Apo Dutse</option>
              <option value="Maitama">Maitama</option>
              <option value="Guzape">Guzape Hills</option>
              <option value="Katampe">Katampe Extension</option>
              <option value="Jabi">Jabi & Utako</option>
              <option value="Lugbe">Lugbe Corridor</option>
              <option value="Chiku">Chiku (NNPC Scheme)</option>
            </select>
          </div>

          {/* Max Price Range Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-1">
              <label htmlFor={priceRangeId} className="text-slate-700 dark:text-slate-300">Max Budget</label>
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                {maxPrice >= 1000000000 ? 'Any Price' : formatCurrency(maxPrice, 'NGN')}
              </span>
            </div>
            <input
              id={priceRangeId}
              type="range"
              min="10000000"
              max="1000000000"
              step="10000000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Bedrooms */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Bedrooms
            </label>
            <div className="flex flex-wrap gap-1.5">
              {['Any', '1', '2', '3', '4', '5+'].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBedrooms(b)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    bedrooms === b
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Verified Toggle */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="flex items-center space-x-2.5 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
              <span>Only AGIS & Title Verified</span>
            </label>
          </div>
        </div>

        {/* Right Properties List / Grid */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Sorting & Filter Pills Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-xs">
            <div className="flex items-center space-x-2">
              <span className="text-slate-400 font-medium">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold text-slate-800 dark:text-slate-200"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            <div className="text-slate-500 dark:text-slate-400">
              Showing <strong>{filteredProperties.length}</strong> of {properties.length} Total Properties
            </div>
          </div>

          {/* Properties Feed */}
          {filteredProperties.length > 0 ? (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-4'}>
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isFavorite={favorites.includes(property.id)}
                  onToggleFavorite={onToggleFavorite}
                  isCompared={compareList.some(p => p.id === property.id)}
                  onToggleCompare={onToggleCompare}
                  onQuickView={onQuickView}
                  onViewDetails={onViewProperty}
                  whatsappNumber={whatsappNumber}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mx-auto">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No Properties Match Your Specific Search Criteria
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Try widening your price range, choosing "All Districts", or submit a custom specification to our Market Analysis Department.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm lg:hidden flex justify-end">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm h-full p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white">Filters</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Filters Controls (Replicated simply) */}
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-semibold block mb-1">Transaction Type</label>
                <div className="flex flex-wrap gap-1">
                  {['All', 'Buy', 'Rent', 'Land'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTransaction(t)}
                      className={`px-3 py-1.5 rounded-lg font-semibold ${transaction === t ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">District</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="All">All Districts</option>
                  <option value="Kyami">Kyami</option>
                  <option value="Apo Dutse">Apo Dutse</option>
                  <option value="Maitama">Maitama</option>
                  <option value="Guzape">Guzape</option>
                  <option value="Katampe">Katampe</option>
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1">Property Type</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="All">All Types</option>
                  <option value="Terrace Duplex">Terrace Duplex</option>
                  <option value="Bungalow">Bungalow</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Land">Land</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex space-x-2">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
