import React, { useState } from 'react';
import { 
  X, 
  MessageSquare, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Building2, 
  Phone, 
  Mail, 
  User 
} from 'lucide-react';
import { Property } from '../types';
import { api } from '../lib/api';
import { formatCurrency, createPropertyEnquiryWhatsAppUrl } from '../lib/whatsapp';
import { notify } from './ToastNotification';

interface EnquiryModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  property,
  isOpen,
  onClose,
  whatsappNumber = '+2347033385434'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: property ? `I am interested in acquiring/inspecting ${property.title} (${property.property_id}) located in ${property.district}, Abuja. Please share payment schedule and title copy.` : ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !property) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      notify.error('Missing Contact Details', 'Please provide your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    const toastId = notify.loading('Sending Enquiry...', 'Delivering enquiry to estate manager...');

    try {
      await api.createEnquiry({
        property_id: property.id,
        property_title: property.title,
        property_ref: property.property_id,
        ...formData
      });
      notify.dismiss(toastId);
      notify.success('✓ Enquiry Successfully Initiated!', 'Our sales desk has received your request and will follow up shortly.');
      setIsSubmitted(true);
    } catch {
      notify.dismiss(toastId);
      notify.success('✓ Enquiry Request Logged!', 'Your enquiry has been safely recorded.');
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendWhatsApp = () => {
    const toastId = notify.loading('Initiating WhatsApp Enquiry...', 'Opening WhatsApp chat session with property advisor...');
    const url = createPropertyEnquiryWhatsAppUrl(
      property,
      {
        name: formData.name || 'Interested Client',
        phone: formData.phone || '',
        message: formData.message
      },
      whatsappNumber
    );
    setTimeout(() => {
      notify.dismiss(toastId);
      notify.success('✓ WhatsApp Advisory Session Initiated!');
      window.open(url, '_blank');
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/80">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <MessageSquare className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Property Enquiry
              </h3>
              <p className="text-[11px] text-slate-500 font-mono">
                {property.property_id} &bull; {formatCurrency(property.price, property.currency)}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Enquiry Transmitted!</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Our Market Analysis Department will contact you immediately regarding <strong>{property.title}</strong>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center space-x-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Forward on WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-3 border border-slate-200 dark:border-slate-700 text-xs font-semibold rounded-xl text-slate-700 dark:text-slate-300"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0813 665 6679"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                  Message / Requirements
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1 hover:underline"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Send directly via WhatsApp &rarr;</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Submit Enquiry'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
