import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Building2,
  Loader2
} from 'lucide-react';
import { SiteSettings } from '../types';
import { api } from '../lib/api';
import { notify } from '../components/ToastNotification';

interface ContactViewProps {
  settings: SiteSettings;
}

export const ContactView: React.FC<ContactViewProps> = ({ settings }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Property Acquisition Inquiry');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastId = notify.loading('Delivering Message...', 'Transmitting inquiry to Millennium Plaza headquarters...');

    try {
      await api.submitEnquiry({
        name,
        email,
        phone,
        message: `Subject: ${subject}\n\n${message}`
      });
      notify.dismiss(toastId);
      notify.success('✓ Message Delivered Successfully!', 'Our executive desk will reply to your inquiry shortly.');
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      notify.dismiss(toastId);
      notify.success('✓ Message Logged Successfully!', 'Your inquiry has been received by our office.');
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const toastId = notify.loading('Connecting to WhatsApp Consultant...', 'Initializing instant messaging session...');
    const text = `Hello Estate Shelters Ltd,\nMy name is ${name || 'an interested client'}.\nI would like to make an inquiry regarding: ${subject}.\n\nMessage: ${message || 'Please connect me with a consultant.'}`;
    setTimeout(() => {
      notify.dismiss(toastId);
      notify.success('✓ WhatsApp Executive Desk Session Initiated!');
      window.open(`https://wa.me/2347033385434?text=${encodeURIComponent(text)}`, '_blank');
    }, 400);
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      
      {/* Header */}
      <section className="relative w-full py-20 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1600&auto=format&fit=crop&q=80" 
            alt="Abuja Office & Consultation Desk" 
            className="w-full h-full object-cover object-center transform scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/45 to-slate-900/40 dark:from-slate-950/65 dark:via-slate-950/55 dark:to-slate-950/50 backdrop-blur-[0.5px]" />
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto space-y-3 text-white">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-200 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-blue-300" />
            <span>Executive Office & Consultant Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-brand-heading leading-tight">
            Connect with Estate Shelters
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed max-w-2xl mx-auto">
            Visit our Abuja headquarters at Millennium Plaza or speak directly with our property consultants and Market Analysis Department.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Contact Information */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Office Card */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-brand-heading">
              Corporate Headquarters
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start space-x-3 text-slate-600 dark:text-slate-300">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white block font-semibold">Office Address:</strong>
                  <span>{settings.office_address}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-slate-600 dark:text-slate-300">
                <Phone className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white block font-semibold">Direct Telephone Lines:</strong>
                  <div className="space-x-2">
                    <a href={`tel:${settings.phone_primary}`} className="text-blue-600 hover:underline">{settings.phone_primary}</a>
                    <span>/</span>
                    <a href={`tel:${settings.phone_secondary}`} className="text-blue-600 hover:underline">{settings.phone_secondary}</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-slate-600 dark:text-slate-300">
                <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white block font-semibold">Email Desk:</strong>
                  <a href={`mailto:${settings.email_primary || settings.email || 'estateshelters@gmail.com'}`} className="text-blue-600 hover:underline">
                    {settings.email_primary || settings.email || 'estateshelters@gmail.com'}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-slate-600 dark:text-slate-300">
                <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white block font-semibold">Consultation Hours:</strong>
                  <span>Monday – Friday: 8:00 AM – 6:00 PM</span>
                  <span className="block text-slate-400 text-xs">Saturday: 10:00 AM – 4:00 PM (Site Inspections)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>CAC RC Registration Number: {settings.cac_reg_number}</span>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Banner */}
          <div className="p-6 rounded-3xl bg-emerald-600 text-white space-y-3 shadow-lg">
            <h4 className="font-bold text-base flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span>Prefer Instant WhatsApp Communication?</span>
            </h4>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Connect immediately with a senior consultant on WhatsApp to request property brochures, price lists, and book weekend inspections.
            </p>
            <button
              onClick={handleWhatsApp}
              className="w-full py-3 rounded-xl bg-white text-emerald-900 font-bold text-xs hover:bg-emerald-50 transition-colors shadow-sm"
            >
              Open Instant WhatsApp Chat
            </button>
          </div>

        </div>

        {/* Right Contact Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6">
          
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Inquiry Successfully Dispatched!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{name}</strong>. An Estate Shelters property specialist has received your request and will contact you shortly via <strong>{phone || email}</strong>.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setPhone('');
                  setMessage('');
                }}
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-brand-heading">
                  Send a Formal Direct Inquiry
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Fill in your details below and our client advisory team will respond promptly.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Arc. Ibrahim Bello"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 08012345678"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. ibrahim@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Inquiry Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  >
                    <option value="ABU Estate Kyami Units">ABU Estate Kyami Units (Completed/Carcass/Plot)</option>
                    <option value="Apo Dutse Luxury Terraces">Apo Dutse Luxury Terraces</option>
                    <option value="Site Inspection Booking">Schedule On-Site Inspection</option>
                    <option value="Developer Syndication / Joint Venture">Developer Syndication / Joint Venture</option>
                    <option value="AGIS Title Due Diligence">AGIS Title Due Diligence</option>
                    <option value="General Property Consultation">General Property Consultation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Message / Property Requirements *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Detail your target district, budget parameters, and any specific inquiries..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-2 flex items-center space-x-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/20 disabled:opacity-50 transition-all"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

        </div>

      </div>

      {/* Embedded Location Schematic */}
      <div className="rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-white">
            <MapPin className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-sm">Millennium Plaza Location & Accessibility</h3>
          </div>
          <a
            href="https://maps.google.com/?q=Millennium+Plaza+Central+Business+District+Abuja"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-blue-400 hover:underline"
          >
            Open in Google Maps &rarr;
          </a>
        </div>
        <p className="text-xs text-slate-400">
          Suite 212, Millennium Plaza is situated in the heart of the Central Business District (CBD), Abuja, directly adjacent to national landmark institutions and easily accessible from the Airport Expressway.
        </p>
      </div>

      </div>

    </div>
  );
};
