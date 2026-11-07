import React, { useEffect, useRef } from 'react';
import { X, BookOpen, CheckCircle2, Clock } from 'lucide-react';

const CourseDetailDialog = ({
  isOpen,
  course,
  onClose
}) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !course) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A2352]/60 animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-dialog-title"
    >
      <div
        ref={dialogRef}
        className="w-full max-w-[500px] bg-white rounded-[16px] p-5 sm:p-6 shadow-xl relative animate-in zoom-in-95 border border-[#D8E0EE]"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#51607A] hover:text-[#0A2352] p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Tutup dialog"
        >
          <X size={18} />
        </button>

        {/* Dialog Header */}
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-[8px] bg-[#EFF6FF] text-[#1B4FD8] flex items-center justify-center shrink-0">
            <BookOpen size={18} />
          </div>
          <div>
            <span className="text-[10.5px] font-bold text-[#1B4FD8] uppercase tracking-wider block">
              Detail Mata Kuliah
            </span>
            <h3 id="detail-dialog-title" className="text-[17px] font-bold text-[#0A2352] leading-tight">
              {course.name}
            </h3>
          </div>
        </div>

        {/* Tags / Badges */}
        <div className="flex flex-wrap items-center gap-2 mt-2.5 mb-3.5">
          <span className="px-2 py-0.5 bg-[#F1F5F9] text-[#334155] rounded-[6px] text-[11.5px] font-bold">
            Kode: {course.code || 'IF318'}
          </span>
          <span className="px-2 py-0.5 bg-[#F1F5F9] text-[#334155] rounded-[6px] text-[11.5px] font-bold">
            {course.sks} SKS
          </span>
          <span className="px-2 py-0.5 bg-[#F1F5F9] text-[#334155] rounded-[6px] text-[11.5px] font-bold">
            Semester {course.semester}
          </span>
          {course.approved ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#DCFCE7] text-[#15803D] rounded-[6px] text-[11.5px] font-bold">
              <CheckCircle2 size={12} />
              Disetujui
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#FEE2E2] text-[#DC2626] rounded-[6px] text-[11.5px] font-bold">
              <Clock size={12} />
              Belum Disetujui
            </span>
          )}
        </div>

        {/* Description Box */}
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[9px] p-3.5 mb-3.5">
          <h4 className="text-[12.5px] font-bold text-[#0A2352] mb-1">
            Deskripsi Mata Kuliah
          </h4>
          <p className="text-[13px] text-[#51607A] leading-relaxed">
            {course.description ||
              'Mata kuliah ini membahas teori dan implementasi praktis sesuai kurikulum yang berlaku di Program Studi.'}
          </p>
        </div>

        {/* Assignment Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="p-3 rounded-[9px] border border-[#E2E8F0] bg-white">
            <span className="block text-[10.5px] font-bold text-[#51607A] uppercase tracking-wider mb-0.5">
              Dosen Koordinator
            </span>
            <p className="text-[13.5px] font-bold text-[#0A2352]">
              {course.koordinator || '-'}
            </p>
          </div>

          <div className="p-3 rounded-[9px] border border-[#E2E8F0] bg-white">
            <span className="block text-[10.5px] font-bold text-[#51607A] uppercase tracking-wider mb-0.5">
              Dosen Pengajar
            </span>
            <p className="text-[13.5px] font-bold text-[#0A2352]">
              {course.pengajar || '-'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-3 border-t border-[#E2E8F0]">
          <button
            type="button"
            onClick={onClose}
            className="h-[38px] px-5 bg-[#0A2352] hover:bg-[#071A3D] text-white rounded-[9px] text-[13px] font-bold transition-all shadow-xs cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailDialog;
