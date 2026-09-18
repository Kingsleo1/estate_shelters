import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'loading' | 'success' | 'error' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

// Custom event system so any component can trigger toasts without prop drilling
export const notify = {
  loading: (title: string, message?: string, id?: string) => {
    const toastId = id || Math.random().toString(36).substring(2, 9);
    window.dispatchEvent(new CustomEvent('app_toast', {
      detail: { id: toastId, type: 'loading', title, message }
    }));
    return toastId;
  },
  success: (title: string, message?: string, duration = 4000) => {
    const toastId = Math.random().toString(36).substring(2, 9);
    window.dispatchEvent(new CustomEvent('app_toast', {
      detail: { id: toastId, type: 'success', title, message, duration }
    }));
    return toastId;
  },
  error: (title: string, message?: string, duration = 4500) => {
    const toastId = Math.random().toString(36).substring(2, 9);
    window.dispatchEvent(new CustomEvent('app_toast', {
      detail: { id: toastId, type: 'error', title, message, duration }
    }));
    return toastId;
  },
  dismiss: (id: string) => {
    window.dispatchEvent(new CustomEvent('app_toast_dismiss', { detail: { id } }));
  },
  // Convenience helper to wrap any async action or button click handler
  runAction: async <T,>(
    actionFn: () => Promise<T> | T,
    loadingTitle = 'Initiating request...',
    loadingMessage = 'Processing your request, please wait...',
    successTitle = 'Initiation Successful!',
    successMessage = 'Your request has been successfully initiated.'
  ): Promise<T | null> => {
    const toastId = notify.loading(loadingTitle, loadingMessage);
    try {
      // Simulate minimum 400ms loading effect for crisp visual feedback if too fast
      const [result] = await Promise.all([
        Promise.resolve(actionFn()),
        new Promise(resolve => setTimeout(resolve, 400))
      ]);
      notify.dismiss(toastId);
      notify.success(successTitle, successMessage);
      return result;
    } catch (err: any) {
      notify.dismiss(toastId);
      notify.error('Action Failed', err?.message || 'An unexpected error occurred. Please try again.');
      return null;
    }
  }
};

export function ToastNotificationContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handleToast = (e: Event) => {
      const detail = (e as CustomEvent<ToastMessage>).detail;
      setToasts((prev) => {
        // If updating an existing loading toast with same ID
        const existingIndex = prev.findIndex(t => t.id === detail.id);
        if (existingIndex !== -1) {
          const updated = [...prev];
          updated[existingIndex] = detail;
          return updated;
        }
        return [...prev, detail];
      });

      if (detail.type !== 'loading') {
        const timer = setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== detail.id));
        }, detail.duration || 4000);
        return () => clearTimeout(timer);
      }
    };

    const handleDismiss = (e: Event) => {
      const id = (e as CustomEvent<{ id: string }>).detail.id;
      setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    window.addEventListener('app_toast', handleToast);
    window.addEventListener('app_toast_dismiss', handleDismiss);

    return () => {
      window.removeEventListener('app_toast', handleToast);
      window.removeEventListener('app_toast_dismiss', handleDismiss);
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col space-y-2.5 max-w-sm w-full px-4 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start space-x-3 p-4 rounded-2xl shadow-xl backdrop-blur-md border transition-all duration-300 animate-in slide-in-from-bottom-5 fade-in ${
            toast.type === 'loading'
              ? 'bg-slate-900/95 text-white border-blue-500/40 dark:bg-slate-800/95'
              : toast.type === 'success'
              ? 'bg-emerald-950/95 text-emerald-100 border-emerald-500/50 dark:bg-emerald-900/95'
              : toast.type === 'error'
              ? 'bg-rose-950/95 text-rose-100 border-rose-500/50 dark:bg-rose-900/95'
              : 'bg-slate-900/95 text-slate-100 border-slate-700/50'
          }`}
        >
          {/* Icon */}
          <div className="shrink-0 pt-0.5">
            {toast.type === 'loading' && (
              <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
            )}
            {toast.type === 'success' && (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            )}
            {toast.type === 'error' && (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            )}
            {toast.type === 'info' && (
              <Info className="w-5 h-5 text-blue-400 shrink-0" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold leading-snug">{toast.title}</h4>
            {toast.message && (
              <p className="text-[11px] opacity-90 mt-0.5 leading-relaxed font-normal">
                {toast.message}
              </p>
            )}
          </div>

          {/* Close button */}
          {toast.type !== 'loading' && (
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
