import React, { useEffect, useRef } from 'react';
import { Info, X } from 'lucide-react';

const CourseDescriptionModal = ({ course, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!course) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-deep/40 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-desc-title"
    >
      <div
        ref={modalRef}
        className="w-full max-w-[440px] bg-white rounded-[14px] p-5 shadow-2xl border border-line animate-scale-up relative text-ink"
      >
        <div className="flex items-start justify-between gap-3 pb-2.5 border-b border-line/60">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-tint text-royal-blue flex items-center justify-center shrink-0">
              <Info size={15} />
            </div>
            <h3 id="course-desc-title" className="text-[15px] font-bold text-navy leading-snug">
              {course.name} ({course.code})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate hover:text-ink hover:bg-slate/10 transition-colors cursor-pointer"
            aria-label="Tutup deskripsi"
          >
            <X size={16} />
          </button>
        </div>

        <p className="mt-3 text-[13px] text-ink/80 leading-relaxed font-normal">
          {course.description || 'Deskripsi mata kuliah belum tersedia.'}
        </p>

        <div className="mt-4 pt-3 border-t border-line/60 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-ice hover:bg-slate/10 border border-line text-ink font-semibold text-[12px] rounded-[8px] transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDescriptionModal;
