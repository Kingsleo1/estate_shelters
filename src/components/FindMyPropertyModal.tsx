import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  MessageCircle, 
  Building2, 
  MapPin, 
  Coins, 
  Bed, 
  FileText, 
  ShieldCheck,
  ArrowRight,
  User,
  Phone,
  Mail
} from 'lucide-react';
import { api } from '../lib/api';
import { createPropertyRequestWhatsAppUrl } from '../lib/whatsapp';

interface FindMyPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber?: string;
}

export const FindMyPropertyModal: React.FC<FindMyPropertyModalProps> = ({
  isOpen,
  onClose,
  whatsappNumber = '+2347033385434'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    transaction_type: 'Buy',
    property_type: 'Terrace Duplex',
    preferred_state: 'Abuja (FCT)',
    preferred_lga: 'Abuja Municipal (AMAC)',
    preferred_district: 'Apo Dutse / Kyami / Maitama',
    preferred_estate: '',
    budget_min: 25000000,
    budget_max: 65000000,
    bedrooms: '3-4 Bedrooms',
    bathrooms: '3-4 Bathrooms',
    land_size: '400 - 800 sqm',
    preferred_documentation: ['C of O', 'R of O / AGIS Record'],
    purpose: 'Personal Residence & Investment',
    timeline: 'Immediate (1-3 Months)',
    additional_notes: 'Interested in gated estate with 24/7 security and verified AGIS records.'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (field: string, val: any) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const toggleDoc = (doc: string) => {
    setFormData(prev => {
      const exists = prev.preferred_documentation.includes(doc);
      return {
        ...prev,
        preferred_documentation: exists 
          ? prev.preferred_documentation.filter(d => d !== doc)
          : [...prev.preferred_documentation, doc]
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please provide your full name and phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.createRequest(formData as any);
      setIsSubmitted(true);
    } catch (e) {
      console.error(e);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendViaWhatsApp = () => {
    const url = createPropertyRequestWhatsAppUrl(formData as any, whatsappNumber);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-blue-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Find My Property Specification</h2>
              <p className="text-xs text-blue-200">
                Custom search & matching by Estate Shelters Market Analysis Department
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body or Success State */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Property Request Received!
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-2 leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Our Market Analysis Department has logged your requirements for <strong>{formData.preferred_district}</strong> ({formData.property_type}).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 max-w-md mx-auto text-left text-xs space-y-1.5">
                <div className="font-semibold text-blue-900 dark:text-blue-300">Next Recommended Step:</div>
                <p className="text-slate-600 dark:text-slate-400">
                  Transmit this exact specification directly to our senior property consultant on WhatsApp for instant portfolio cross-referencing.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleSendViaWhatsApp}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/20 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Spec on WhatsApp (+2347033385434)</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Personal Details */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center space-x-1.5">
                  <User className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>1. Your Contact Information</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Aliyu Bello"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0803 123 4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. aliyu@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Property Requirements */}
              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center space-x-1.5">
                  <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>2. Property Type & Transaction</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                      Transaction Intent
                    </label>
                    <select
                      value={formData.transaction_type}
                      onChange={(e) => handleInputChange('transaction_type', e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                    >
                      <option value="Buy">Outright Purchase / Buy</option>
                      <option value="Sell">Sell / List My Property</option>
                      <option value="Rent">Rent / Executive Lease</option>
                      <option value="Land">Land Acquisition</option>
                      <option value="Joint Venture">Joint Venture Developer Partnership</option>
                      <option value="Off-plan">Off-plan Investment</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                      Property Category
                    </label>
                    <select
                      value={formData.property_type}
                      onChange={(e) => handleInputChange('property_type', e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                    >
                      <option value="Terrace Duplex">Terrace Duplex (e.g. Apo Dutse)</option>
                      <option value="Detached Bungalow">Detached Bungalow (e.g. ABU Estate Kyami)</option>
                      <option value="Detached Duplex">Fully Detached Duplex / Mansion</option>
                      <option value="Serviced Plot / Land">Serviced Plot / Land</option>
                      <option value="Apartment / Flat">Apartment / Luxury Flat</option>
                      <option value="Commercial Space">Commercial / Office Building</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Location & Budget */}
              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>3. Location & Budget Frame</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                      Preferred District(s) in Abuja
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kyami, Apo Dutse, Maitama, Guzape, Katampe"
                      value={formData.preferred_district}
                      onChange={(e) => handleInputChange('preferred_district', e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                      Target Budget Range (NGN)
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        placeholder="Min ₦"
                        value={formData.budget_min}
                        onChange={(e) => handleInputChange('budget_min', Number(e.target.value))}
                        className="w-1/2 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                      />
                      <span className="text-slate-400">-</span>
                      <input
                        type="number"
                        placeholder="Max ₦"
                        value={formData.budget_max}
                        onChange={(e) => handleInputChange('budget_max', Number(e.target.value))}
                        className="w-1/2 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Title & Preferences */}
              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>4. Title Documentation & Due Diligence Requirements</span>
                </h4>

                <div className="flex flex-wrap gap-2">
                  {['C of O (FCTA)', 'R of O (FCDA)', 'Governor\'s Consent', 'AGIS Allocation', 'Deed of Assignment', 'Estate Sublease'].map((doc) => {
                    const isSelected = formData.preferred_documentation.includes(doc);
                    return (
                      <button
                        key={doc}
                        type="button"
                        onClick={() => toggleDoc(doc)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                          isSelected
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {doc}
                      </button>
                    );
                  })}
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                    Specific Features or Requirements
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Must have BQ, solar inverter provision, corner piece, tarred access road..."
                    value={formData.additional_notes}
                    onChange={(e) => handleInputChange('additional_notes', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center space-x-2 shadow-lg shadow-blue-600/25 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Specification'}</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
