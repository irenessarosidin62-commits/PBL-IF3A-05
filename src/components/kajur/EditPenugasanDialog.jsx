import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown } from 'lucide-react';

const DOSEN_CANDIDATES = [
  'Yeni Rokhayati',
  'Sri Rahayu',
  'Nadya Setya',
  'Nizan',
  'Nur Zahrati',
  'Dwi Amalia',
  'Swono Sibagariang',
  'Hamim Tohari',
  'Qeysha Nadine',
  'Andri Albertha Pratama',
  'Festy Winda Sari',
  'Irenessa Rosidin'
];

const EditPenugasanDialog = ({
  isOpen,
  course,
  onClose,
  onSave
}) => {
  const [koordinator, setKoordinator] = useState(course?.koordinator || '');
  const [pengajar, setPengajar] = useState(course?.pengajar || '');
  const [prevCourseId, setPrevCourseId] = useState(course?.id);
  const dialogRef = useRef(null);

  if (course && course.id !== prevCourseId) {
    setPrevCourseId(course.id);
    setKoordinator(course.koordinator || '');
    setPengajar(course.pengajar || '');
  }

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...course,
      koordinator: koordinator.trim(),
      pengajar: pengajar.trim()
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A2352]/60 animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-dialog-title"
    >
      <div
        ref={dialogRef}
        className="w-full max-w-[480px] bg-white rounded-[16px] p-5 sm:p-6 shadow-xl relative animate-in zoom-in-95 border border-[#D8E0EE]"
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

        {/* Dialog Title */}
        <h3 id="edit-dialog-title" className="text-[17px] font-bold text-[#0A2352] mb-1">
          Ubah Penugasan Dosen
        </h3>
        <p className="text-[12.5px] text-[#51607A] mb-4">
          Perbarui dosen koordinator dan dosen pengajar untuk mata kuliah terpilih.
        </p>

        {/* Course Info Box */}
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[9px] p-3.5 mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-[#1B4FD8] bg-[#EFF6FF] px-2 py-0.5 rounded">
              {course.code || 'MK'}
            </span>
            <span className="text-[11.5px] font-medium text-[#51607A]">
              Semester {course.semester} • {course.sks} SKS
            </span>
          </div>
          <h4 className="text-[14px] font-bold text-[#0A2352] mt-0.5">
            {course.name}
          </h4>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Dosen Koordinator */}
          <div>
            <label
              htmlFor="field-koordinator"
              className="block text-[12.5px] font-semibold text-[#0A2352] mb-1"
            >
              Dosen Koordinator
            </label>
            <div className="relative">
              <select
                id="field-koordinator"
                value={koordinator}
                onChange={(e) => setKoordinator(e.target.value)}
                className="w-full h-[40px] pl-3 pr-8 bg-white border border-[#CBD5E1] rounded-[9px] text-[13px] text-[#0F1B33] appearance-none focus:outline-none focus:border-[#1B4FD8] focus:ring-1 focus:ring-[#1B4FD8] transition cursor-pointer font-medium"
              >
                <option value="">Pilih Dosen Koordinator</option>
                {DOSEN_CANDIDATES.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#51607A] pointer-events-none"
              />
            </div>
          </div>

          {/* Dosen Pengajar */}
          <div>
            <label
              htmlFor="field-pengajar"
              className="block text-[12.5px] font-semibold text-[#0A2352] mb-1"
            >
              Dosen Pengajar
            </label>
            <div className="relative">
              <select
                id="field-pengajar"
                value={pengajar}
                onChange={(e) => setPengajar(e.target.value)}
                className="w-full h-[40px] pl-3 pr-8 bg-white border border-[#CBD5E1] rounded-[9px] text-[13px] text-[#0F1B33] appearance-none focus:outline-none focus:border-[#1B4FD8] focus:ring-1 focus:ring-[#1B4FD8] transition cursor-pointer font-medium"
              >
                <option value="">Pilih Dosen Pengajar</option>
                {DOSEN_CANDIDATES.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#51607A] pointer-events-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E2E8F0] mt-4">
            <button
              type="button"
              onClick={onClose}
              className="h-[38px] px-4 border border-[#CBD5E1] rounded-[9px] text-[13px] font-semibold text-[#51607A] hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="h-[38px] px-5 bg-[#0A2352] hover:bg-[#071A3D] text-white rounded-[9px] text-[13px] font-bold transition-all shadow-xs cursor-pointer"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPenugasanDialog;
