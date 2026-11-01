import React, { useEffect, useRef } from 'react';
import { Info } from 'lucide-react';

/**
 * Komponen bersama popup deskripsi mata kuliah.
 * Dipakai pada tabel mata kuliah halaman TU dan Laboran.
 * Bersifat hanya-baca (read-only), bersumber dari data kurikulum KPS.
 */
const DeskripsiMataKuliahPopup = ({
  course,
  isOpen,
  onToggle,
  onClose,
  isNearBottom = false
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
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
  }, [isOpen, onClose]);

  if (!course) return null;

  const descText =
    course.deskripsi || course.description || 'Deskripsi belum tersedia';

  return (
    <div className="relative inline-flex items-center align-middle" ref={containerRef}>
      {/* Tombol Info "i" Lingkaran Biru */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className={`w-5 h-5 rounded-full inline-flex items-center justify-center transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-royal-blue/30 ${
          isOpen
            ? 'text-white bg-royal-blue'
            : 'text-royal-blue hover:bg-tint active:bg-royal-blue/20'
        }`}
        title={`Lihat informasi deskripsi ${course.name}`}
        aria-label={`Informasi deskripsi ${course.name}`}
        aria-expanded={isOpen}
      >
        <Info size={15} className="shrink-0" />
      </button>

      {/* Popover Card */}
      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute left-0 z-50 w-[280px] sm:w-[320px] max-w-[calc(100vw-48px)] bg-white border border-line rounded-[12px] p-3.5 shadow-xl animate-fade-in text-left whitespace-normal select-none ${
            isNearBottom
              ? 'bottom-full mb-2 origin-bottom-left'
              : 'top-full mt-2 origin-top-left'
          }`}
          role="dialog"
          aria-label={`Deskripsi ${course.name}`}
        >
          {/* Panah kecil menunjuk ikon */}
          <div
            className={`absolute left-3 w-2.5 h-2.5 bg-white border-line transform rotate-45 ${
              isNearBottom
                ? 'bottom-[-6px] border-r border-b'
                : 'top-[-6px] border-l border-t'
            }`}
            aria-hidden="true"
          />

          <h4 className="text-[13px] font-bold text-navy leading-snug relative z-10">
            {course.name} ({course.code})
          </h4>

          <p className="text-[12px] text-slate mt-1.5 leading-relaxed font-normal break-words relative z-10">
            {descText}
          </p>

          <p className="text-[11px] text-slate/60 mt-2.5 pt-1.5 border-t border-line/60 font-medium relative z-10">
            Sumber: Data kurikulum
          </p>
        </div>
      )}
    </div>
  );
};

export default DeskripsiMataKuliahPopup;
