import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

const PRESET_STRATEGIES = [
  'Tidak perlu penanganan',
  'Belum ditentukan',
  'Ajukan pengadaan peralatan',
  'Rekrut dosen baru',
  'Optimasi jadwal laboratorium / workshop',
  'Pengajuan usulan sarana ke Jurusan'
];

const EditStrategiDialog = ({
  isOpen,
  onClose,
  item,
  onSave
}) => {
  const [strategi, setStrategi] = useState(item?.strategi || '');

  if (!isOpen || !item) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(item.id, strategi);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div className="bg-white rounded-[16px] border border-[#D8E0EE] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-[#E2E8F0] bg-[#F8FAFC]">
          <div>
            <h3
              id="dialog-title"
              className="text-[17px] font-bold text-[#0A2352]"
            >
              Ubah Strategi Penanganan
            </h3>
            <p className="text-[12.5px] text-[#51607A] mt-0.5">
              Tentukan tindak lanjut untuk pemenuhan sumber daya
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#51607A] hover:text-[#0A2352] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Tutup dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            {/* Item Info Box */}
            <div className="p-3.5 bg-[#F3F6FB] rounded-[10px] border border-[#E2E8F0]">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-[14.5px] text-[#0F1B33]">
                    {item.name}
                  </h4>
                  <span className="text-[12px] text-[#51607A]">{item.category}</span>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[12px] font-bold ${
                      item.status === 'Cukup'
                        ? 'bg-[#D1FADF] text-[#027A48]'
                        : 'bg-[#FEE4E2] text-[#D92D20]'
                    }`}
                  >
                    {item.selisih > 0 ? `+${item.selisih}` : item.selisih} {item.status}
                  </span>
                  <div className="text-[11px] text-[#51607A] mt-0.5">
                    Kebutuhan: {item.dibutuhkan} | Tersedia: {item.tersedia}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Presets */}
            <div>
              <label className="block text-[12px] font-bold text-[#51607A] uppercase tracking-wider mb-2">
                Pilih Opsi Cepat
              </label>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_STRATEGIES.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setStrategi(opt)}
                    className={`text-[12px] px-2.5 py-1.5 rounded-[8px] transition-colors border cursor-pointer ${
                      strategi === opt
                        ? 'bg-[#E8EEFC] border-[#1B4FD8] text-[#1B4FD8] font-bold'
                        : 'bg-white border-[#D8E0EE] text-[#51607A] hover:bg-slate-50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Strategy Input / Textarea */}
            <div>
              <label
                htmlFor="strategi-input"
                className="block text-[13px] font-bold text-[#0F1B33] mb-1.5"
              >
                Strategi Penanganan
              </label>
              <textarea
                id="strategi-input"
                rows={3}
                value={strategi}
                onChange={(e) => setStrategi(e.target.value)}
                placeholder="Contoh: Ajukan pengadaan peralatan praktikum semester genap..."
                className="w-full px-3.5 py-2.5 border border-[#CBD5E1] rounded-[10px] text-[13.5px] text-[#0F1B33] focus:outline-none focus:border-[#1B4FD8] focus:ring-[3px] focus:ring-[#D6DFF8] transition-all resize-none"
                required
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 bg-[#F8FAFC] border-t border-[#E2E8F0]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#D8E0EE] text-[#51607A] hover:bg-white hover:text-[#0F1B33] font-semibold text-[13.5px] rounded-[9px] transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 bg-[#FFB020] hover:bg-[#EAA11A] text-[#0A2352] font-bold text-[13.5px] rounded-[9px] shadow-xs transition-colors cursor-pointer"
            >
              <Check size={16} strokeWidth={2.5} />
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStrategiDialog;
