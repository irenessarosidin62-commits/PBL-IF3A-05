import React, { useEffect } from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';

const CurriculumDeleteDialog = ({
  isOpen,
  course,
  onClose,
  onConfirm,
  isDeleting = false
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !course) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A2352]/60 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-curriculum-dialog-title"
    >
      <div className="w-full max-w-[440px] bg-white rounded-[16px] p-6 sm:p-7 shadow-2xl relative animate-scale-up">
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-11 h-11 rounded-full bg-[#FEE4E2] text-danger flex items-center justify-center shrink-0">
            <AlertTriangle size={22} />
          </div>
          <div>
            <h2 id="delete-curriculum-dialog-title" className="text-[19px] font-bold text-navy leading-tight">
              Hapus Mata Kuliah
            </h2>
            <p className="text-[13px] text-slate mt-0.5">Konfirmasi penghapusan data kurikulum</p>
          </div>
        </div>

        <p className="text-[14px] text-ink leading-relaxed mb-6">
          Apakah Anda yakin ingin menghapus mata kuliah{' '}
          <span className="font-bold text-navy">
            {course.name} ({course.code})
          </span>
          ? Tindakan ini tidak dapat dibatalkan.
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="h-[44px] px-5 border border-line rounded-[10px] text-ink font-semibold text-[14px] hover:bg-slate/5 transition-colors focus:outline-none focus:ring-2 focus:ring-royal-blue cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={() => onConfirm(course.id)}
            disabled={isDeleting}
            className="h-[44px] px-6 bg-danger hover:bg-[#9B1C1C] text-white font-bold text-[14px] rounded-[10px] transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-danger cursor-pointer disabled:opacity-50"
          >
            {isDeleting && <Loader2 size={16} className="animate-spin" />}
            <span>Hapus</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurriculumDeleteDialog;
