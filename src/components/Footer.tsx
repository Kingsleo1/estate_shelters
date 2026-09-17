import React, { useState } from 'react';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  ArrowUpRight, 
  Clock, 
  Send, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { SiteSettings } from '../types';
import { api } from '../lib/api';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  settings: SiteSettings;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, settings, onOpenAdmin }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setLoading(true);
    try {
      await api.addSubscriber(email, undefined, 'Footer Subscription');
      setSubscribed(true);
      setEmail('');
    } catch {
      setSubscribed(true);
    } finally {
      setLoading(false);
    }
  };

  const handleNav = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800 transition-colors relative">
      {/* Top Value Banner */}
      <div className="border-b border-slate-900 bg-slate-900/50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm sm:text-base">Corporate Integrity & Compliance</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Registered under the Companies and Allied Matters Act (CAC: {settings.cac_reg_number}). Compliant with FIRS tax protocols and ethical real estate distribution.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm sm:text-base">Market Analysis Department (MAD)</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Empirical valuation, AGIS cadastral searches, and strategic positioning to ensure zero title encumbrances for every property.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm sm:text-base">Rapid Response & WhatsApp Routing</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Direct engagement with verified consultants across Abuja. Seamless inspection bookings and structured transaction execution.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center p-1 shadow-md overflow-hidden">
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
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-slate-900 flex items-center justify-center text-white hidden">
                  <Building2 className="w-5 h-5 text-blue-300" />
                </div>
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-white font-brand-heading">
                  ESTATE SHELTERS
                </span>
                <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-900 text-blue-200 border border-blue-700">
                  LTD
                </span>
                <p className="text-[10px] uppercase font-semibold tracking-wider text-blue-400">
                  Real Estate Marketing & Property Solutions
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Connecting clients to quality properties and high-yield investments across Abuja and beyond. We partner with reputable developers to deliver verified, value-driven property transactions.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center space-x-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{settings.office_address}</span>
              </div>
              <div className="flex items-center space-x-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{settings.phone_1} &bull; {settings.phone_2} &bull; {settings.phone_3}</span>
              </div>
              <div className="flex items-center space-x-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{settings.email_primary} &bull; {settings.email_secondary}</span>
              </div>
              <div className="flex items-center space-x-2.5 text-slate-300">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{settings.business_hours}</span>
              </div>
            </div>
          </div>

          {/* Quick Properties */}
          <div>
            <h5 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
              Abuja Properties
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleNav('buy')} className="hover:text-white transition-colors flex items-center space-x-1">
                  <span>Residential Duplexes</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('properties')} className="hover:text-white transition-colors">
                  Apo Dutse Terraces
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('properties')} className="hover:text-white transition-colors">
                  ABU Estate, Kyami (Airport Road)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('properties')} className="hover:text-white transition-colors">
                  Maitama Mansions & Penthouses
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('properties')} className="hover:text-white transition-colors">
                  Guzape Hilltop Residences
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('land')} className="hover:text-white transition-colors">
                  Serviced Residential Plots
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('rent')} className="hover:text-white transition-colors">
                  Executive Rentals & Shortlets
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Corporate */}
          <div>
            <h5 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
              Corporate
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors">
                  About Estate Shelters
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors">
                  Executive Profile & MAD
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-white transition-colors">
                  Developer Partnerships
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('projects')} className="hover:text-white transition-colors">
                  NNPC 500-Unit Chiku Scheme
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('partners')} className="hover:text-white transition-colors">
                  Strategic Partners
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('insights')} className="hover:text-white transition-colors">
                  Abuja Real Estate Insights
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('legal')} className="hover:text-white transition-colors">
                  Privacy Policy & Terms
                </button>
              </li>
            </ul>
          </div>

          {/* Stay Ahead / Newsletter */}
          <div>
            <h5 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
              Stay Ahead of the Market
            </h5>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Subscribe to receive verified off-plan opportunities, land allocation alerts, and quarterly Abuja market reports.
            </p>

            {subscribed ? (
              <div className="p-3 bg-blue-950/60 border border-blue-800 rounded-xl text-xs text-blue-300 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Thank you for subscribing to Estate Shelters updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? 'Subscribing...' : 'Subscribe to Alerts'}</span>
                </button>
              </form>
            )}

            <div className="pt-4 flex items-center space-x-4 text-xs text-slate-400">
              <span>Follow:</span>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-blue-400 transition-colors flex items-center space-x-0.5"
              >
                <span>{settings.social_instagram}</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-blue-400 transition-colors flex items-center space-x-0.5"
              >
                <span>Facebook</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer and Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} Estate Shelters Ltd. All rights reserved. CAC Registration No: <strong>{settings.cac_reg_number}</strong>.
          </p>

          <div className="flex items-center space-x-5">
            <button onClick={() => handleNav('legal')} className="hover:text-white transition-colors">
              Property Disclaimer
            </button>
            <span className="text-slate-800">&bull;</span>
            <button onClick={() => handleNav('legal')} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <span className="text-slate-800">&bull;</span>
            <button onClick={() => handleNav('legal')} className="hover:text-white transition-colors">
              Terms & Conditions
            </button>
            <span className="text-slate-800">&bull;</span>
            <button onClick={onOpenAdmin} className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
              Admin Portal
            </button>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-6 p-4 rounded-xl bg-slate-900/40 border border-slate-900 text-[11px] text-slate-400 leading-relaxed text-center">
          <strong>Important Property Disclaimer:</strong> All property details, architectural specifications, pricing, and documentation descriptions displayed on this platform are presented in good faith based on developer and AGIS cadastral records. Prospective purchasers and investors are advised to conduct independent due diligence, title confirmation, and physical verification prior to transaction finalization.
        </div>
      </div>
    </footer>
  );
};
