import React, { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

const UserDeleteDialog = ({
  isOpen,
  user,
  onClose,
  onConfirm,
  isDeleting = false
}) => {
  const dialogRef = useRef(null);
  const confirmBtnRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => confirmBtnRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !user) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A2352]/60 backdrop-blur-xs animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
    >
      <div
        ref={dialogRef}
        className="w-full max-w-[480px] bg-white rounded-[16px] p-7 shadow-2xl relative animate-scale-up"
      >
        <h2 id="delete-dialog-title" className="text-[20px] font-bold text-navy mb-3">
          Hapus pengguna?
        </h2>

        <p className="text-[14px] text-ink leading-relaxed mb-6">
          Akun <span className="font-bold">{user.name}</span> ({user.role}) akan dihapus. Tindakan ini tidak bisa dibatalkan.
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="h-[44px] px-6 border border-line rounded-[10px] text-ink font-semibold text-[14px] hover:bg-slate/5 transition-colors focus:outline-none focus:ring-2 focus:ring-royal-blue cursor-pointer"
          >
            Batal
          </button>
          <button
            ref={confirmBtnRef}
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="h-[44px] px-6 bg-danger hover:bg-[#9B1D14] text-white font-bold text-[14px] rounded-[10px] transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-danger cursor-pointer disabled:opacity-60"
          >
            {isDeleting && <Loader2 size={16} className="animate-spin" />}
            <span>Ya, hapus</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDeleteDialog;
