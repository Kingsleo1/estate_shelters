import React, { useState } from 'react';
import { MessageCircle, X, PhoneCall, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { getGeneralConsultationWhatsAppUrl } from '../lib/whatsapp';

interface FloatingWhatsAppProps {
  phone1?: string;
  phone2?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phone1 = '+2347033385434',
  phone2 = '+2347033385434'
}) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleOpenChat = (number: string) => {
    const url = getGeneralConsultationWhatsAppUrl(number);
    window.open(url, '_blank');
    setPopoverOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {/* Popover Menu */}
      {popoverOpen && (
        <div className="mb-3 w-72 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-4 text-xs space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="font-bold text-slate-900 dark:text-white">Estate Shelters Desk</span>
            </div>
            <button
              onClick={() => setPopoverOpen(false)}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[11px]">
            Connect directly with our Abuja property specialists for verified listings, title due diligence, or site inspections.
          </p>

          <div className="space-y-2">
            <button
              onClick={() => handleOpenChat(phone1)}
              className="w-full p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 font-semibold flex items-center justify-between transition-colors"
            >
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Primary Desk ({phone1})</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => handleOpenChat(phone2)}
              className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold flex items-center justify-between transition-colors"
            >
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-blue-600" />
                <span>Executive Desk ({phone2})</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </button>
          </div>

          <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Suite 212 Millennium Plaza, CBD, Abuja</span>
          </div>
        </div>
      )}

      {/* Main WhatsApp Trigger Button */}
      <button
        type="button"
        onClick={() => setPopoverOpen(!popoverOpen)}
        className="w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-900/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all relative group"
        id="whatsapp-speed-dial"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-white border-2 border-emerald-600 rounded-full flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
        </span>
      </button>
    </div>
  );
};
