import React, { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

const UserConflictDialog = ({
  isOpen,
  user,
  onClose,
  onDeactivate,
  isDeactivating = false
}) => {
  const dialogRef = useRef(null);
  const actionBtnRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => actionBtnRef.current?.focus(), 50);
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A2352]/60 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="conflict-dialog-title"
    >
      <div
        ref={dialogRef}
        className="w-full max-w-[500px] bg-white rounded-[16px] p-7 shadow-2xl relative animate-scale-up"
      >
        <h2 id="conflict-dialog-title" className="text-[20px] font-bold text-navy mb-3">
          Pengguna tidak bisa dihapus
        </h2>

        <p className="text-[14px] text-ink leading-relaxed mb-4">
          <span className="font-bold">{user.name}</span> ({user.role}) sudah mengisi form kompetensi, jadi datanya masih terhubung ke rekap.
        </p>

        {/* Warning Box */}
        <div className="bg-warning-bg/90 border border-warning-text/20 rounded-[12px] p-4 text-[13px] text-warning-text font-medium leading-relaxed mb-6">
          Hapus akun akan merusak rekap kompetensi. Nonaktifkan akun agar tidak bisa masuk, dan datanya tetap aman.
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeactivating}
            className="h-[44px] px-6 border border-line rounded-[10px] text-ink font-semibold text-[14px] hover:bg-slate/5 transition-colors focus:outline-none focus:ring-2 focus:ring-royal-blue cursor-pointer"
          >
            Tutup
          </button>
          <button
            ref={actionBtnRef}
            type="button"
            onClick={() => onDeactivate(user)}
            disabled={isDeactivating}
            className="h-[44px] px-6 bg-amber hover:bg-[#FFBA3D] text-amber-ink font-bold text-[14px] rounded-[10px] transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-amber cursor-pointer disabled:opacity-60"
          >
            {isDeactivating && <Loader2 size={16} className="animate-spin" />}
            <span>Nonaktifkan akun</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserConflictDialog;
