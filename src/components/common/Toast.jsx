import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 2600);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-navy border-l-4 border-amber text-white py-3.5 px-5 rounded-r-lg shadow-2xl animate-fade-in max-w-md text-sm font-medium"
      style={{ boxShadow: '0 10px 25px -5px rgba(10, 35, 82, 0.4)' }}
    >
      {type === 'error' ? (
        <AlertCircle size={18} className="text-danger shrink-0" />
      ) : (
        <CheckCircle2 size={18} className="text-amber shrink-0" />
      )}
      <span className="flex-1 leading-snug">{message}</span>
      <button
        onClick={onClose}
        className="text-white/60 hover:text-white transition-colors ml-1 p-0.5"
        aria-label="Tutup notifikasi"
      >
        <X size={15} />
      </button>
    </div>
  );
};

export default Toast;
