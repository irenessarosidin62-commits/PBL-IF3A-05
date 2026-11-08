import React, { useState, useEffect } from 'react';
import { Loader2, X } from 'lucide-react';

const SEMESTER_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];

const CurriculumFormDialog = ({
  isOpen,
  mode = 'add', // 'add' | 'edit'
  initialData = null,
  onClose,
  onSubmit,
  isSubmitting = false
}) => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    semester: 3,
    sks: 3,
    teoriLuring: 14,
    teoriDaring: 0,
    praktikLuring: 14,
    praktikDaring: 0,
    peserta: 90,
    kelasTeoriLuring: 3,
    kelasPraktikLuring: 3,
    peralatan: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && initialData) {
        setFormData({
          code: initialData.code || '',
          name: initialData.name || '',
          description: initialData.description || '',
          semester: Number(initialData.semester) || 1,
          sks: Number(initialData.sks) || 2,
          teoriLuring: Number(initialData.teoriLuring ?? initialData.sesiTeori ?? 14),
          teoriDaring: Number(initialData.teoriDaring ?? 0),
          praktikLuring: Number(initialData.praktikLuring ?? initialData.sesiPraktik ?? 14),
          praktikDaring: Number(initialData.praktikDaring ?? 0),
          peserta: Number(initialData.peserta ?? 90),
          kelasTeoriLuring: Number(initialData.kelasTeoriLuring ?? 3),
          kelasPraktikLuring: Number(initialData.kelasPraktikLuring ?? 3),
          peralatan: initialData.peralatan || ''
        });
      } else {
        setFormData({
          code: '',
          name: '',
          description: '',
          semester: 3,
          sks: 3,
          teoriLuring: 14,
          teoriDaring: 0,
          praktikLuring: 14,
          praktikDaring: 0,
          peserta: 90,
          kelasTeoriLuring: 3,
          kelasPraktikLuring: 3,
          peralatan: ''
        });
      }
      setErrors({});
    }
  }, [isOpen, mode, initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.code.trim()) {
      newErrors.code = 'Kode mata kuliah wajib diisi.';
    }
    if (!formData.name.trim()) {
      newErrors.name = 'Nama mata kuliah wajib diisi.';
    }
    const sem = Number(formData.semester);
    if (!formData.semester || isNaN(sem) || sem < 1 || sem > 8) {
      newErrors.semester = 'Semester harus antara 1 sampai 8.';
    }
    const sks = Number(formData.sks);
    if (!formData.sks || isNaN(sks) || sks < 1 || sks > 10) {
      newErrors.sks = 'SKS harus antara 1 sampai 10.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const tLuring = Number(formData.teoriLuring) || 0;
    const tDaring = Number(formData.teoriDaring) || 0;
    const pLuring = Number(formData.praktikLuring) || 0;
    const pDaring = Number(formData.praktikDaring) || 0;

    onSubmit({
      ...formData,
      code: formData.code.trim().toUpperCase(),
      name: formData.name.trim(),
      description: formData.description.trim(),
      semester: Number(formData.semester),
      sks: Number(formData.sks),
      // Calculated total sessions for table compatibility
      sesiTeori: tLuring + tDaring,
      sesiPraktik: pLuring + pDaring,
      teoriLuring: tLuring,
      teoriDaring: tDaring,
      praktikLuring: pLuring,
      praktikDaring: pDaring,
      peserta: Number(formData.peserta) || 90,
      kelasTeoriLuring: Number(formData.kelasTeoriLuring) || 3,
      kelasPraktikLuring: Number(formData.kelasPraktikLuring) || 3,
      peralatan: formData.peralatan.trim(),
      prodi: initialData?.prodi || 'Teknik Informatika'
    });
  };

  const isEdit = mode === 'edit';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0A2352]/60 animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="curriculum-form-dialog-title"
    >
      <div className="w-full max-w-[580px] max-h-[92vh] flex flex-col bg-white rounded-[20px] shadow-2xl relative overflow-hidden border border-[#E2E8F0] animate-in zoom-in-95">
        {/* Header */}
        <div className="px-6 sm:px-7 py-4 sm:py-5 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white">
          <h2 id="curriculum-form-dialog-title" className="text-[20px] sm:text-[22px] font-bold text-[#0D2554] tracking-tight">
            {isEdit ? 'Ubah Mata Kuliah' : 'Tambah Mata Kuliah'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Tutup dialog"
          >
            <X size={19} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} id="curriculum-form" className="px-6 sm:px-7 py-5 overflow-y-auto space-y-6 flex-1 text-ink">
          {/* SECTION 1: INFORMASI MATA KULIAH */}
          <div>
            <h3 className="text-[13px] font-extrabold text-[#0D2554] tracking-wider uppercase mb-3">
              INFORMASI MATA KULIAH
            </h3>

            {/* Row: Semester, Kode, SKS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-3.5">
              {/* Semester */}
              <div>
                <label className="block text-[11px] font-bold text-[#64748B] tracking-wider uppercase mb-1">
                  SEMESTER <span className="text-red-500">*</span>
                </label>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  className="w-full h-[40px] px-3 bg-white border border-[#CBD5E1] rounded-[8px] text-[14px] text-[#0F1B33] font-medium focus:outline-none focus:border-[#0045C7] focus:ring-2 focus:ring-[#0045C7]/15 transition cursor-pointer"
                >
                  {SEMESTER_OPTIONS.map((sem) => (
                    <option key={sem} value={sem}>
                      Semester {sem}
                    </option>
                  ))}
                </select>
              </div>

              {/* Kode */}
              <div>
                <label className="block text-[11px] font-bold text-[#64748B] tracking-wider uppercase mb-1">
                  KODE <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="IF307"
                  className={`w-full h-[40px] px-3 bg-white border rounded-[8px] text-[14px] text-[#0F1B33] font-medium focus:outline-none focus:border-[#0045C7] focus:ring-2 focus:ring-[#0045C7]/15 transition ${
                    errors.code ? 'border-red-500' : 'border-[#CBD5E1]'
                  }`}
                />
                {errors.code && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{errors.code}</p>
                )}
              </div>

              {/* SKS */}
              <div>
                <label className="block text-[11px] font-bold text-[#64748B] tracking-wider uppercase mb-1">
                  SKS <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="sks"
                  min="1"
                  max="10"
                  value={formData.sks}
                  onChange={handleChange}
                  placeholder="3"
                  className={`w-full h-[40px] px-3 bg-white border rounded-[8px] text-[14px] text-[#0F1B33] font-medium focus:outline-none focus:border-[#0045C7] focus:ring-2 focus:ring-[#0045C7]/15 transition ${
                    errors.sks ? 'border-red-500' : 'border-[#CBD5E1]'
                  }`}
                />
                {errors.sks && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{errors.sks}</p>
                )}
              </div>
            </div>

            {/* Nama Mata Kuliah */}
            <div className="mb-3.5">
              <label className="block text-[11px] font-bold text-[#64748B] tracking-wider uppercase mb-1">
                NAMA MATA KULIAH <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Pemrograman Mobile"
                className={`w-full h-[40px] px-3.5 bg-white border rounded-[8px] text-[14px] text-[#0F1B33] font-medium focus:outline-none focus:border-[#0045C7] focus:ring-2 focus:ring-[#0045C7]/15 transition ${
                  errors.name ? 'border-red-500' : 'border-[#CBD5E1]'
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>
              )}
            </div>

            {/* Deskripsi Singkat Mata Kuliah */}
            <div>
              <label className="block text-[11px] font-bold text-[#64748B] tracking-wider uppercase mb-1">
                DESKRIPSI SINGKAT MATA KULIAH
              </label>
              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                placeholder="Masukkan deskripsi capaian pembelajaran atau materi pokok mata kuliah..."
                className="w-full p-3 bg-white border border-[#CBD5E1] rounded-[8px] text-[14px] text-[#0F1B33] focus:outline-none focus:border-[#0045C7] focus:ring-2 focus:ring-[#0045C7]/15 transition leading-relaxed resize-none"
              />
            </div>
          </div>

          {/* SECTION 2: RENCANA SESI (JUMLAH PERTEMUAN) */}
          <div className="pt-2 border-t border-gray-100">
            <h3 className="text-[13px] font-extrabold text-[#0D2554] tracking-wider uppercase mb-3">
              RENCANA SESI (JUMLAH PERTEMUAN)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Teori Luring */}
              <div>
                <label className="block text-[11px] font-bold text-[#64748B] tracking-wider uppercase mb-1">
                  TEORI – LURING
                </label>
                <input
                  type="number"
                  name="teoriLuring"
                  min="0"
                  value={formData.teoriLuring}
                  onChange={handleChange}
                  placeholder="14"
                  className="w-full h-[40px] px-3 bg-white border border-[#CBD5E1] rounded-[8px] text-[14px] text-[#0F1B33] font-medium focus:outline-none focus:border-[#0045C7] focus:ring-2 focus:ring-[#0045C7]/15 transition"
                />
              </div>

              {/* Teori Daring */}
              <div>
                <label className="block text-[11px] font-bold text-[#64748B] tracking-wider uppercase mb-1">
                  TEORI – DARING
                </label>
                <input
                  type="number"
                  name="teoriDaring"
                  min="0"
                  value={formData.teoriDaring}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full h-[40px] px-3 bg-white border border-[#CBD5E1] rounded-[8px] text-[14px] text-[#0F1B33] font-medium focus:outline-none focus:border-[#0045C7] focus:ring-2 focus:ring-[#0045C7]/15 transition"
                />
              </div>

              {/* Praktik Luring */}
              <div>
                <label className="block text-[11px] font-bold text-[#64748B] tracking-wider uppercase mb-1">
                  PRAKTIK – LURING
                </label>
                <input
                  type="number"
                  name="praktikLuring"
                  min="0"
                  value={formData.praktikLuring}
                  onChange={handleChange}
                  placeholder="14"
                  className="w-full h-[40px] px-3 bg-white border border-[#CBD5E1] rounded-[8px] text-[14px] text-[#0F1B33] font-medium focus:outline-none focus:border-[#0045C7] focus:ring-2 focus:ring-[#0045C7]/15 transition"
                />
              </div>

              {/* Praktik Daring */}
              <div>
                <label className="block text-[11px] font-bold text-[#64748B] tracking-wider uppercase mb-1">
                  PRAKTIK – DARING
                </label>
                <input
                  type="number"
                  name="praktikDaring"
                  min="0"
                  value={formData.praktikDaring}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full h-[40px] px-3 bg-white border border-[#CBD5E1] rounded-[8px] text-[14px] text-[#0F1B33] font-medium focus:outline-none focus:border-[#0045C7] focus:ring-2 focus:ring-[#0045C7]/15 transition"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: PESERTA DAN JUMLAH KELAS */}
          <div className="pt-2 border-t border-gray-100">
            <h3 className="text-[13px] font-extrabold text-[#0D2554] tracking-wider uppercase mb-3">
              PESERTA DAN JUMLAH KELAS
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* Jumlah Peserta */}
              <div>
                <label className="block text-[11px] font-bold text-[#64748B] tracking-wider uppercase mb-1">
                  JUMLAH PESERTA
                </label>
                <input
                  type="number"
                  name="peserta"
                  min="0"
                  value={formData.peserta}
                  onChange={handleChange}
                  placeholder="90"
                  className="w-full h-[40px] px-3 bg-white border border-[#CBD5E1] rounded-[8px] text-[14px] text-[#0F1B33] font-medium focus:outline-none focus:border-[#0045C7] focus:ring-2 focus:ring-[#0045C7]/15 transition"
                />
              </div>

              {/* Teori Luring */}
              <div>
                <label className="block text-[11px] font-bold text-[#64748B] tracking-wider uppercase mb-1">
                  TEORI – LURING
                </label>
                <input
                  type="number"
                  name="kelasTeoriLuring"
                  min="0"
                  value={formData.kelasTeoriLuring}
                  onChange={handleChange}
                  placeholder="3"
                  className="w-full h-[40px] px-3 bg-white border border-[#CBD5E1] rounded-[8px] text-[14px] text-[#0F1B33] font-medium focus:outline-none focus:border-[#0045C7] focus:ring-2 focus:ring-[#0045C7]/15 transition"
                />
              </div>

              {/* Praktik Luring */}
              <div>
                <label className="block text-[11px] font-bold text-[#64748B] tracking-wider uppercase mb-1">
                  PRAKTIK – LURING
                </label>
                <input
                  type="number"
                  name="kelasPraktikLuring"
                  min="0"
                  value={formData.kelasPraktikLuring}
                  onChange={handleChange}
                  placeholder="3"
                  className="w-full h-[40px] px-3 bg-white border border-[#CBD5E1] rounded-[8px] text-[14px] text-[#0F1B33] font-medium focus:outline-none focus:border-[#0045C7] focus:ring-2 focus:ring-[#0045C7]/15 transition"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: KEBUTUHAN PERALATAN */}
          <div className="pt-2 border-t border-gray-100">
            <h3 className="text-[13px] font-extrabold text-[#0D2554] tracking-wider uppercase mb-3">
              KEBUTUHAN PERALATAN
            </h3>

            <div>
              <label className="block text-[11px] font-bold text-[#64748B] tracking-wider uppercase mb-1">
                DAFTAR PERALATAN
              </label>
              <input
                type="text"
                name="peralatan"
                value={formData.peralatan}
                onChange={handleChange}
                placeholder="Contoh: Laptop / PC, Android Device, Kabel USB, Server Local"
                className="w-full h-[40px] px-3.5 bg-white border border-[#CBD5E1] rounded-[8px] text-[14px] text-[#0F1B33] font-medium focus:outline-none focus:border-[#0045C7] focus:ring-2 focus:ring-[#0045C7]/15 transition"
              />
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="px-6 sm:px-7 py-4 border-t border-gray-100 flex items-center justify-end gap-3 shrink-0 bg-white">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-6 py-2 text-sm font-bold text-red-600 hover:bg-red-50 border border-red-300 rounded-[8px] transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            type="submit"
            form="curriculum-form"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2 text-sm font-bold text-white bg-[#0045C7] hover:bg-[#0038A8] rounded-[8px] transition-colors shadow-xs cursor-pointer disabled:opacity-60"
          >
            {isSubmitting && <Loader2 size={16} className="animate-spin" />}
            <span>Simpan Mata Kuliah</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurriculumFormDialog;
