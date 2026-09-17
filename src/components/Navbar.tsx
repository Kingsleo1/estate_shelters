import React, { useState, useRef, useEffect } from 'react';
import { 
  Building2, 
  Search, 
  Heart, 
  Layers, 
  Phone, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Sparkles, 
  ShieldCheck, 
  UserCheck, 
  ChevronDown, 
  ChevronRight,
  Home,
  KeyRound,
  Compass,
  PlusCircle,
  Briefcase
} from 'lucide-react';
import { SiteSettings } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  favoritesCount: number;
  compareCount: number;
  onOpenCompare: () => void;
  onOpenFindProperty: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  settings: SiteSettings;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  favoritesCount,
  compareCount,
  onOpenCompare,
  onOpenFindProperty,
  isDarkMode,
  setIsDarkMode,
  settings,
  onOpenAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobilePropertiesOpen, setMobilePropertiesOpen] = useState(false);
  const [propertiesDropdownOpen, setPropertiesDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickSearchTerm, setQuickSearchTerm] = useState('');
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setPropertiesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Main navigation items
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'properties', label: 'Properties', hasSubmenu: true },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'partners', label: 'Partners' },
    { id: 'insights', label: 'Insights' },
    { id: 'contact', label: 'Contact' },
  ];

  // Property Submenu categories
  const propertySubmenu = [
    {
      id: 'properties',
      label: 'All Properties',
      description: 'Explore our complete Abuja portfolio',
      icon: Home
    },
    {
      id: 'properties?transaction=Buy',
      label: 'Buy Properties',
      description: 'Detached duplexes, mansions & bungalows',
      icon: Building2
    },
    {
      id: 'properties?transaction=Rent',
      label: 'Rent & Lease',
      description: 'Verified residential & commercial rentals',
      icon: KeyRound
    },
    {
      id: 'properties?transaction=Land',
      label: 'Land & Serviced Plots',
      description: 'Cadastral titles, C of O, R of O allocations',
      icon: Compass
    },
    {
      id: 'sell',
      label: 'Sell / List Property',
      description: 'Submit your property for developer syndication',
      icon: PlusCircle
    },
    {
      id: 'projects',
      label: 'Development Projects',
      description: 'Off-plan & joint-venture schemes across FCT',
      icon: Briefcase
    }
  ];

  const handleNavClick = (id: string) => {
    setPropertiesDropdownOpen(false);
    setMobileMenuOpen(false);

    if (id === 'sell') {
      onOpenFindProperty();
      return;
    }

    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearchTerm.trim()) {
      setActiveTab(`properties?q=${encodeURIComponent(quickSearchTerm.trim())}`);
      setSearchOpen(false);
      setQuickSearchTerm('');
      setMobileMenuOpen(false);
    }
  };

  const isPropertiesActive = 
    activeTab === 'properties' || 
    activeTab.startsWith('properties?') || 
    activeTab === 'buy' || 
    activeTab === 'rent' || 
    activeTab === 'land';

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/95 dark:bg-[#070D1E]/95 border-b border-slate-200 dark:border-slate-800 transition-colors">
      
      {/* Top Corporate Bar */}
      <div className="hidden lg:block bg-slate-100 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 text-[11px] py-1 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 xl:space-x-5">
            <span className="flex items-center space-x-1.5 text-slate-600 dark:text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>RC Number: <strong className="text-slate-900 dark:text-slate-200">{settings.cac_reg_number}</strong> | Incorporated July 2026</span>
            </span>
            <span className="hidden xl:inline text-slate-300 dark:text-slate-700">•</span>
            <span className="hidden xl:inline text-slate-500 dark:text-slate-400 truncate max-w-xs">
              Suite 212, Millennium Plaza, CBD, Abuja
            </span>
          </div>

          <div className="flex items-center space-x-3 xl:space-x-4">
            <a 
              href={`tel:${settings.phone_1 || settings.phone_primary || '+2347033385434'}`}
              className="flex items-center space-x-1 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Phone className="w-3 h-3 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>Sales & Calls: <strong>{settings.phone_1 || '+2347033385434'}</strong></span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo Brand */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2 sm:space-x-2.5 text-left group focus:outline-none shrink-0"
            id="brand-logo-button"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center p-1 shadow-sm group-hover:scale-105 transition-transform shrink-0 overflow-hidden">
              <img 
                src="/logo.png" 
                alt="Estate Shelters Logo" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  if (e.currentTarget.nextElementSibling) {
                    (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                  }
                }}
              />
              <div className="w-full h-full bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 flex items-center justify-center text-white hidden">
                <Building2 className="w-5 h-5 text-blue-200" />
              </div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5">
                <span className="text-sm sm:text-base xl:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white font-brand-heading whitespace-nowrap">
                  ESTATE SHELTERS
                </span>
                <span className="text-[9px] uppercase font-bold tracking-wider px-1 py-0.2 rounded bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
                  LTD
                </span>
              </div>
              <p className="text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400 truncate hidden xs:block">
                Abuja Real Estate & Property Solutions
              </p>
            </div>
          </button>

          {/* Desktop Nav Links (Compact, strictly single line with whitespace-nowrap) */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 shrink">
            {navLinks.map((link) => {
              if (link.hasSubmenu) {
                return (
                  <div 
                    key={link.id} 
                    className="relative"
                    ref={dropdownRef}
                    onMouseEnter={() => setPropertiesDropdownOpen(true)}
                    onMouseLeave={() => setPropertiesDropdownOpen(false)}
                  >
                    <button
                      onClick={() => setPropertiesDropdownOpen(prev => !prev)}
                      className={`px-2 xl:px-2.5 py-1.5 rounded-lg text-xs xl:text-[13px] font-semibold transition-all flex items-center space-x-1 whitespace-nowrap ${
                        isPropertiesActive
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 font-bold'
                          : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }`}
                      id="nav-properties-dropdown-btn"
                    >
                      <span className="whitespace-nowrap">{link.label}</span>
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${propertiesDropdownOpen ? 'rotate-180 text-blue-600' : 'opacity-60'}`} />
                    </button>

                    {/* Submenu Flyout Menu */}
                    {propertiesDropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 w-72 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            Abuja Property Portfolio
                          </span>
                        </div>
                        <div className="space-y-0.5">
                          {propertySubmenu.map((sub) => {
                            const SubIcon = sub.icon;
                            return (
                              <button
                                key={sub.id}
                                onClick={() => handleNavClick(sub.id)}
                                className="w-full flex items-start space-x-2.5 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-left transition-colors group"
                              >
                                <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0 mt-0.5">
                                  <SubIcon className="w-3.5 h-3.5" />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors whitespace-nowrap">
                                    {sub.label}
                                  </div>
                                  <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5 truncate">
                                    {sub.description}
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-2 xl:px-2.5 py-1.5 rounded-lg text-xs xl:text-[13px] font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <span className="whitespace-nowrap">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action CTAs & Controls (Always cleanly fit on PC screen) */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-1.5 shrink-0">
            {/* Quick Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1.5 xl:p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Search Properties"
              id="search-toggle-btn"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Compare Button */}
            <button
              onClick={onOpenCompare}
              className="p-1.5 xl:p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
              title="Compare Properties"
              id="compare-btn"
            >
              <Layers className="w-4 h-4" />
              {compareCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {compareCount}
                </span>
              )}
            </button>

            {/* Favorites Button */}
            <button
              onClick={() => handleNavClick('favorites')}
              className="p-1.5 xl:p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
              title="Saved Properties"
              id="favorites-btn"
            >
              <Heart className="w-4 h-4" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Theme Toggle (Light / Dark Switcher) */}
            <button
              onClick={() => setIsDarkMode(prev => !prev)}
              className="p-1.5 xl:p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200/80 dark:border-slate-800"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              id="theme-toggle-btn"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-blue-600" />
              )}
            </button>

            {/* Primary Action Button (Compact & strictly within boundary) */}
            <button
              onClick={onOpenFindProperty}
              className="inline-flex items-center space-x-1.5 px-3 xl:px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs xl:text-xs font-bold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0"
              id="find-property-nav-btn"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-200" />
              <span className="whitespace-nowrap">Find My Property</span>
            </button>
          </div>

          {/* Mobile Bar Controls */}
          <div className="flex items-center space-x-1 lg:hidden">
            <button
              onClick={() => handleNavClick('favorites')}
              className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 relative"
              aria-label="Favorites"
            >
              <Heart className="w-4.5 h-4.5" />
              {favoritesCount > 0 && (
                <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-rose-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsDarkMode(prev => !prev)}
              className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-blue-600" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
              id="mobile-menu-toggle"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-blue-600" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Quick Search Popover */}
        {searchOpen && (
          <div className="py-2.5 px-3 pb-3 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 rounded-b-2xl animate-in fade-in slide-in-from-top-2 duration-200 shadow-xl">
            <form onSubmit={handleQuickSearchSubmit} className="flex items-center space-x-2 max-w-xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by district (e.g. Maitama, Apo Dutse, Kyami) or ID..."
                  value={quickSearchTerm}
                  onChange={(e) => setQuickSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shrink-0"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1.5 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[56px] sm:top-[64px] z-50 bg-white dark:bg-[#070D1E] border-b border-slate-200 dark:border-slate-800 shadow-2xl max-h-[calc(100vh-64px)] overflow-y-auto px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Quick Search */}
          <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
            <form onSubmit={handleQuickSearchSubmit} className="flex space-x-2">
              <input
                type="text"
                placeholder="Search Abuja properties..."
                value={quickSearchTerm}
                onChange={(e) => setQuickSearchTerm(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
              />
              <button type="submit" className="px-3.5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shrink-0">
                Go
              </button>
            </form>
          </div>

          {/* Nav Items (strictly 1 straight line per item, no wrapping) */}
          <div className="space-y-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs sm:text-sm font-semibold text-left whitespace-nowrap ${
                activeTab === 'home'
                  ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 font-bold'
                  : 'text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className="whitespace-nowrap">Home</span>
              <ChevronRight className="w-4 h-4 opacity-40 shrink-0" />
            </button>

            {/* Properties Expandable Section */}
            <div className="rounded-xl border border-slate-100 dark:border-slate-800/80 overflow-hidden">
              <button
                onClick={() => setMobilePropertiesOpen(prev => !prev)}
                className={`w-full flex items-center justify-between p-2.5 text-xs sm:text-sm font-semibold text-left whitespace-nowrap ${
                  isPropertiesActive
                    ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-slate-800 dark:text-slate-200 bg-slate-50/50 dark:bg-slate-800/30'
                }`}
              >
                <span className="whitespace-nowrap">Properties</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 shrink-0 ${mobilePropertiesOpen ? 'rotate-180 text-blue-600' : 'opacity-40'}`} />
              </button>

              {mobilePropertiesOpen && (
                <div className="bg-slate-50/80 dark:bg-slate-800/50 p-2 space-y-1 border-t border-slate-100 dark:border-slate-800">
                  {propertySubmenu.map((sub) => {
                    const SubIcon = sub.icon;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => handleNavClick(sub.id)}
                        className="w-full flex items-center space-x-2.5 p-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:text-blue-600 transition-colors text-left whitespace-nowrap"
                      >
                        <SubIcon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span className="whitespace-nowrap">{sub.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {navLinks.filter(l => l.id !== 'home' && l.id !== 'properties').map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs sm:text-sm font-semibold text-left whitespace-nowrap ${
                  activeTab === link.id
                    ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span className="whitespace-nowrap">{link.label}</span>
                <ChevronRight className="w-4 h-4 opacity-40 shrink-0" />
              </button>
            ))}
          </div>

          {/* Quick Action Buttons */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenFindProperty();
              }}
              className="w-full py-2.5 bg-blue-600 text-white font-bold rounded-xl text-center text-xs sm:text-sm shadow-md flex items-center justify-center space-x-2 whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-blue-200 shrink-0" />
              <span className="whitespace-nowrap">Find My Property</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
