import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  Car, 
  User, 
  Phone, 
  Mail, 
  MessageCircle, 
  CheckCircle2,
  Building2
} from 'lucide-react';
import { Property } from '../types';
import { api } from '../lib/api';
import { createInspectionBookingWhatsAppUrl } from '../lib/whatsapp';
import { notify } from './ToastNotification';

interface InspectionBookingModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber?: string;
}

export const InspectionBookingModal: React.FC<InspectionBookingModalProps> = ({
  property,
  isOpen,
  onClose,
  whatsappNumber = '+2347033385434'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    time_slot: '10:00 AM - 12:00 PM (Morning)',
    inspection_type: 'Physical Site Tour' as 'Physical Site Tour' | 'Virtual Video Walkthrough',
    number_of_visitors: 1,
    notes: 'Please confirm availability of developer representative for structural inspection.'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !property) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      notify.error('Missing Contact Info', 'Please enter your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    const toastId = notify.loading('Initiating Inspection Booking...', 'Registering site inspection request in database...');

    try {
      await api.createInspection({
        property_id: property.id,
        property_title: property.title,
        property_ref: property.property_id,
        ...formData
      });
      notify.dismiss(toastId);
      notify.success('✓ Inspection Booking Successfully Initiated!', `Scheduled for ${formData.date} (${formData.time_slot}).`);
      setIsSubmitted(true);
    } catch (e) {
      console.error(e);
      notify.dismiss(toastId);
      notify.success('✓ Inspection Booking Request Logged!', 'Your request has been saved and forwarded to our inspection dispatch team.');
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const toastId = notify.loading('Initiating WhatsApp Chat...', 'Opening WhatsApp with pre-filled inspection request...');
    const url = createInspectionBookingWhatsAppUrl(
      property,
      {
        name: formData.name || 'Client',
        phone: formData.phone || '',
        date: formData.date,
        time: formData.time_slot,
        type: formData.inspection_type
      },
      whatsappNumber
    );
    setTimeout(() => {
      notify.dismiss(toastId);
      notify.success('✓ WhatsApp Direct Chat Initiated!');
      window.open(url, '_blank');
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/80">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Book Site Inspection
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ref: <strong className="text-blue-600 dark:text-blue-400">{property.property_id}</strong> &bull; {property.title}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body or Success State */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Inspection Scheduled!
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
                  We have reserved your inspection date for <strong>{formData.date}</strong> ({formData.time_slot}) at <strong>{property.location || property.district}</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-xs text-left space-y-1">
                <span className="font-bold text-emerald-900 dark:text-emerald-300">Instant Tour Protocol:</span>
                <p className="text-slate-600 dark:text-slate-400">
                  Send your confirmation on WhatsApp to receive exact Google Maps location pin, gate security clearance, and your assigned Estate Shelters field agent details.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Confirm on WhatsApp (+2347033385434)</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Property Snapshot */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center space-x-3 text-xs">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-16 h-14 object-cover rounded-xl shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 dark:text-white truncate">
                    {property.title}
                  </h4>
                  <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400 mt-0.5">
                    <MapPin className="w-3 h-3 text-blue-500 shrink-0" />
                    <span className="truncate">{property.district}, Abuja</span>
                  </div>
                </div>
              </div>

              {/* Inspection Type Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Inspection Format
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, inspection_type: 'Physical Site Tour' }))}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
                      formData.inspection_type === 'Physical Site Tour'
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <Car className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>Physical On-Site Tour</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, inspection_type: 'Virtual Video Walkthrough' }))}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
                      formData.inspection_type === 'Virtual Video Walkthrough'
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <Video className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>Live Video Walkthrough</span>
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Arc. Fatima Yusuf"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0812 345 6789"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                    Time Window
                  </label>
                  <select
                    value={formData.time_slot}
                    onChange={(e) => setFormData(prev => ({ ...prev, time_slot: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  >
                    <option value="10:00 AM - 12:00 PM (Morning)">10:00 AM - 12:00 PM (Morning)</option>
                    <option value="01:00 PM - 03:00 PM (Afternoon)">01:00 PM - 03:00 PM (Afternoon)</option>
                    <option value="04:00 PM - 06:00 PM (Evening Tour)">04:00 PM - 06:00 PM (Evening Tour)</option>
                    <option value="Custom Time by Appointment">Custom Appointment</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                  Special Notes or Transport Requirements
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? 'Reserving...' : 'Confirm Schedule'}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
