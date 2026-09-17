import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Home, 
  Coins, 
  Bed, 
  RotateCcw, 
  ChevronDown, 
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';
import { TransactionType, PropertyType } from '../types';

export interface SearchFilters {
  transaction: string;
  type: string;
  district: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: string;
  currency: 'NGN' | 'USD' | 'GBP';
  keyword: string;
}

interface AdvancedSearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  initialFilters?: Partial<SearchFilters>;
  compact?: boolean;
}

export const AdvancedSearchBar: React.FC<AdvancedSearchBarProps> = ({
  onSearch,
  initialFilters,
  compact = false
}) => {
  const [transaction, setTransaction] = useState<string>(initialFilters?.transaction || 'Buy');
  const [type, setType] = useState<string>(initialFilters?.type || 'All');
  const [district, setDistrict] = useState<string>(initialFilters?.district || 'All');
  const [minPrice, setMinPrice] = useState<number>(initialFilters?.minPrice || 0);
  const [maxPrice, setMaxPrice] = useState<number>(initialFilters?.maxPrice || 1000000000);
  const [bedrooms, setBedrooms] = useState<string>(initialFilters?.bedrooms || 'Any');
  const [currency, setCurrency] = useState<'NGN' | 'USD' | 'GBP'>(initialFilters?.currency || 'NGN');
  const [keyword, setKeyword] = useState<string>(initialFilters?.keyword || '');
  const [showMoreFilters, setShowMoreFilters] = useState<boolean>(!compact);

  const abujaDistricts = [
    'All Districts',
    'Kyami (Airport Road / ABU Estate)',
    'Apo Dutse',
    'Maitama',
    'Guzape',
    'Katampe Extension',
    'Jabi & Utako',
    'Wuse & Wuse 2',
    'Central Business District (CBD)',
    'Asokoro',
    'Lugbe / Airport Road',
    'Gwarinpa & Dawaki',
    'Kubwa',
    'Kuje Central',
    'Chiku (Kaduna - NNPC Scheme)'
  ];

  const propertyTypes = [
    'All Types',
    'Terrace Duplex',
    'Detached Duplex',
    'Bungalow',
    'Apartment',
    'Mansion',
    'Semi-Detached House',
    'Land',
    'Commercial Property',
    'Penthouse'
  ];

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSearch({
      transaction,
      type: type === 'All Types' ? 'All' : type,
      district: district === 'All Districts' ? 'All' : district.split(' ')[0],
      minPrice,
      maxPrice,
      bedrooms,
      currency,
      keyword
    });
  };

  const handleReset = () => {
    setTransaction('Buy');
    setType('All');
    setDistrict('All');
    setMinPrice(0);
    setMaxPrice(1000000000);
    setBedrooms('Any');
    setKeyword('');
    onSearch({
      transaction: 'All',
      type: 'All',
      district: 'All',
      minPrice: 0,
      maxPrice: 1000000000,
      bedrooms: 'Any',
      currency: 'NGN',
      keyword: ''
    });
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-900/10 dark:shadow-black/40 border border-slate-200/90 dark:border-slate-800 p-3.5 sm:p-5 md:p-7 transition-all">
      
      {/* Transaction Selector Pills */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3.5 sm:pb-5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-x-auto max-w-full">
          {(['Buy', 'Rent', 'Land', 'Investment', 'All'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setTransaction(tab);
              }}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                transaction === tab
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab === 'All' ? 'All' : tab}
            </button>
          ))}
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-400 font-medium hidden sm:inline">Currency:</span>
          <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-50 dark:bg-slate-800">
            {(['NGN', 'USD', 'GBP'] as const).map((curr) => (
              <button
                key={curr}
                type="button"
                onClick={() => setCurrency(curr)}
                className={`px-2 sm:px-2.5 py-1 text-xs font-semibold ${
                  currency === curr
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {curr === 'NGN' ? '₦ NGN' : curr === 'USD' ? '$ USD' : '£ GBP'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Search Inputs Grid */}
      <form onSubmit={handleSearchSubmit} className="mt-3.5 sm:mt-5 space-y-3.5 sm:space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Location / District */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Abuja Location / District</span>
            </label>
            <div className="relative">
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none cursor-pointer"
              >
                {abujaDistricts.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Property Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
              <Home className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Property Type</span>
            </label>
            <div className="relative">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none cursor-pointer"
              >
                {propertyTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Bedrooms */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
              <Bed className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Bedrooms</span>
            </label>
            <div className="relative">
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none cursor-pointer"
              >
                <option value="Any">Any Bedrooms</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms (e.g. ABU Estate)</option>
                <option value="4">4 Bedrooms (e.g. Apo Dutse)</option>
                <option value="5+">5+ Bedrooms (Mansions)</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Keyword / Free Search */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
              <Search className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Keyword / Property ID</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Kyami, Pool, Carcass, ES-00045"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

        </div>

        {/* Secondary Filters (Price Range) */}
        {showMoreFilters && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1 w-full flex items-center space-x-3 text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-semibold shrink-0 flex items-center space-x-1">
                <Coins className="w-3.5 h-3.5 text-blue-500" />
                <span>Price Filter ({currency}):</span>
              </span>
              <div className="flex items-center space-x-2 w-full max-w-md">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice || ''}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="w-1/2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                />
                <span className="text-slate-400">-</span>
                <input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice === 1000000000 ? '' : maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value) || 1000000000)}
                  className="w-1/2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                type="button"
                onClick={handleReset}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        )}

        {/* Submit Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => setShowMoreFilters(!showMoreFilters)}
            className="text-xs text-blue-600 dark:text-blue-400 font-medium flex items-center space-x-1 hover:underline"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{showMoreFilters ? 'Hide Price Filter' : 'Show Price Filter'}</span>
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
            id="main-property-search-submit"
          >
            <Search className="w-4 h-4" />
            <span>Discover Properties</span>
          </button>
        </div>

      </form>
    </div>
  );
};
