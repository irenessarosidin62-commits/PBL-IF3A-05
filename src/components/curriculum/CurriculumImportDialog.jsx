import React, { useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import {
  downloadCurriculumTemplate,
  importCurriculumFromExcel
} from '../../services/curriculumService';

const CurriculumImportDialog = ({
  isOpen,
  onClose,
  onSuccess,
  selectedProdi = 'Teknik Informatika'
}) => {
  // states: 'select' | 'error' | 'success'
  const [step, setStep] = useState('select');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [successCount, setSuccessCount] = useState(0);

  const fileInputRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setStep('select');
      setSelectedFile(null);
      setErrorList([]);
      setSuccessCount(0);
    }
  }, [isOpen]);

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

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        setSelectedFile(file);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleImport = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    const result = await importCurriculumFromExcel(selectedFile, selectedProdi);
    setIsProcessing(false);

    if (result.success) {
      setSuccessCount(result.count);
      setStep('success');
      onSuccess(result.count);
    } else {
      setErrorList(result.errors || []);
      setStep('error');
    }
  };

  const handleResetUpload = () => {
    setSelectedFile(null);
    setErrorList([]);
    setStep('select');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A2352]/60 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="import-curriculum-dialog-title"
    >
      <div
        ref={dialogRef}
        className="w-full max-w-[500px] bg-white rounded-[16px] p-7 shadow-2xl relative animate-scale-up"
      >
        <h2 id="import-curriculum-dialog-title" className="text-[22px] font-bold text-navy mb-2">
          Impor Excel
        </h2>

        {/* STEP 1: SELECT FILE */}
        {step === 'select' && (
          <div>
            <p className="text-[13px] text-slate mb-4 leading-relaxed">
              Isi kolom: kode, mata kuliah, semester, SKS.
            </p>

            {/* Drag & Drop Area */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
              className="border border-royal-blue/30 bg-[#F0F5FF] rounded-[12px] p-8 text-center cursor-pointer hover:bg-[#E8EFFE] transition-colors mb-3"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                className="hidden"
              />
              <p className="text-[14px] text-ink font-medium">
                {selectedFile ? (
                  <span className="font-bold text-royal-blue">{selectedFile.name}</span>
                ) : (
                  <>
                    Tarik file .xlsx ke sini atau{' '}
                    <span className="text-royal-blue font-bold hover:underline">
                      pilih file
                    </span>
                  </>
                )}
              </p>
            </div>

            <div className="mb-6">
              <button
                type="button"
                onClick={downloadCurriculumTemplate}
                className="text-[13px] font-semibold text-royal-blue hover:underline cursor-pointer"
              >
                Unduh templat Excel
              </button>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isProcessing}
                className="h-[44px] px-6 border border-line rounded-[10px] text-ink font-semibold text-[14px] hover:bg-slate/5 transition-colors focus:outline-none focus:ring-2 focus:ring-royal-blue cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleImport}
                disabled={!selectedFile || isProcessing}
                className="h-[44px] px-6 bg-amber hover:bg-[#FFBA3D] text-amber-ink font-bold text-[14px] rounded-[10px] transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-amber cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing && <Loader2 size={16} className="animate-spin" />}
                <span>Impor</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: ERROR ROWS */}
        {step === 'error' && (
          <div>
            {/* Yellow Error Box */}
            <div className="bg-warning-bg/90 border border-warning-text/20 rounded-[12px] p-4 text-[13px] text-warning-text font-medium leading-relaxed mb-4">
              {errorList.length} baris salah. Tidak ada data yang disimpan. Perbaiki file lalu unggah lagi.
            </div>

            {/* Error List Container */}
            <div className="border border-line rounded-[12px] p-3 max-h-56 overflow-y-auto space-y-2 mb-6">
              {errorList.map((err, idx) => (
                <div key={idx} className="flex items-start text-[13px] py-1 px-2 rounded hover:bg-slate/5">
                  <span className="font-bold text-ink w-20 shrink-0">
                    Baris {err.row}
                  </span>
                  <span className="text-danger font-medium">
                    {err.reason}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="h-[44px] px-6 border border-line rounded-[10px] text-ink font-semibold text-[14px] hover:bg-slate/5 transition-colors focus:outline-none focus:ring-2 focus:ring-royal-blue cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleResetUpload}
                className="h-[44px] px-6 bg-amber hover:bg-[#FFBA3D] text-amber-ink font-bold text-[14px] rounded-[10px] transition-colors focus:outline-none focus:ring-2 focus:ring-amber cursor-pointer"
              >
                Unggah ulang
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SUCCESS */}
        {step === 'success' && (
          <div>
            {/* Green Success Box */}
            <div className="bg-success-bg border border-success-text/20 rounded-[12px] p-4 text-[14px] text-success-text font-semibold mb-6">
              {successCount} data berhasil diimpor.
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={onClose}
                className="h-[44px] px-6 bg-amber hover:bg-[#FFBA3D] text-amber-ink font-bold text-[14px] rounded-[10px] transition-colors focus:outline-none focus:ring-2 focus:ring-amber cursor-pointer"
              >
                Selesai
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurriculumImportDialog;
