import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Loader2 } from 'lucide-react';
import { USER_ROLES, USER_STATUS, ERROR_MESSAGES } from '../../constants/userConstants';

const UserFormDialog = ({
  isOpen,
  mode = 'add', // 'add' | 'edit'
  initialData = null,
  onClose,
  onSubmit,
  isSubmitting = false
}) => {
  const [formData, setFormData] = useState({
    name: '',
    nipNik: '',
    username: '',
    email: '',
    password: '',
    role: '',
    status: USER_STATUS.ACTIVE
  });

  const [errors, setErrors] = useState({});
  const dialogRef = useRef(null);
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && initialData) {
        setFormData({
          name: initialData.name || '',
          nipNik: initialData.nipNik || '',
          username: initialData.username || '',
          email: initialData.email || '',
          password: '',
          role: initialData.role || '',
          status: initialData.status || USER_STATUS.ACTIVE
        });
      } else {
        setFormData({
          name: '',
          nipNik: '',
          username: '',
          email: '',
          password: '',
          role: '',
          status: USER_STATUS.ACTIVE
        });
      }
      setErrors({});

      // Focus first input
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, mode, initialData]);

  // Trap focus and handle Escape
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

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};

    if (!formData.name.trim()) {
      errs.name = ERROR_MESSAGES.NAME_REQUIRED;
    }

    if (!formData.nipNik.trim()) {
      errs.nipNik = ERROR_MESSAGES.NIP_REQUIRED;
    } else if (!/^\d+$/.test(formData.nipNik.trim())) {
      errs.nipNik = ERROR_MESSAGES.NIP_DIGITS_ONLY;
    }

    if (!formData.username.trim()) {
      errs.username = ERROR_MESSAGES.USERNAME_REQUIRED;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = ERROR_MESSAGES.EMAIL_REQUIRED;
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = ERROR_MESSAGES.EMAIL_INVALID;
    }

    if (mode === 'add') {
      if (!formData.password) {
        errs.password = ERROR_MESSAGES.PASSWORD_REQUIRED;
      } else if (formData.password.length < 8) {
        errs.password = ERROR_MESSAGES.PASSWORD_MIN_LENGTH;
      }
    } else if (mode === 'edit' && formData.password && formData.password.length < 8) {
      errs.password = ERROR_MESSAGES.PASSWORD_MIN_LENGTH;
    }

    if (!formData.role) {
      errs.role = ERROR_MESSAGES.ROLE_REQUIRED;
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await onSubmit(formData);
    } catch (err) {
      if (err.message === ERROR_MESSAGES.USERNAME_EXISTS) {
        setErrors((prev) => ({ ...prev, username: ERROR_MESSAGES.USERNAME_EXISTS }));
      } else if (err.message === ERROR_MESSAGES.EMAIL_EXISTS) {
        setErrors((prev) => ({ ...prev, email: ERROR_MESSAGES.EMAIL_EXISTS }));
      } else {
        setErrors((prev) => ({ ...prev, general: err.message }));
      }
    }
  };

  const isEdit = mode === 'edit';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A2352]/60 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div
        ref={dialogRef}
        className="w-full max-w-[520px] bg-white rounded-[16px] p-7 shadow-2xl relative animate-scale-up"
      >
        <h2 id="dialog-title" className="text-[22px] font-bold text-navy mb-5">
          {isEdit ? 'Ubah pengguna' : 'Tambah pengguna'}
        </h2>

        {errors.general && (
          <div className="mb-4 p-3 bg-danger/10 border border-danger/20 text-danger rounded-[10px] text-[13px] font-semibold">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1. Nama Lengkap */}
          <div>
            <label htmlFor="field-name" className="block text-[13px] font-semibold text-ink mb-1.5">
              Nama lengkap
            </label>
            <input
              id="field-name"
              ref={firstInputRef}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={isEdit ? '' : 'Masukkan nama lengkap'}
              className={`w-full h-[44px] px-3.5 bg-white border rounded-[10px] text-[14px] text-ink transition-shadow focus:outline-none focus:border-royal-blue focus:ring-[3px] focus:ring-focus-ring ${
                errors.name ? 'border-danger' : 'border-line'
              }`}
            />
            {errors.name && (
              <p className="text-danger text-[12px] mt-1 font-medium">{errors.name}</p>
            )}
          </div>

          {/* 2. NIP / NIK + Nama Pengguna (2 Kolom) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="field-nip" className="block text-[13px] font-semibold text-ink mb-1.5">
                NIP / NIK
              </label>
              <input
                id="field-nip"
                type="text"
                name="nipNik"
                value={formData.nipNik}
                onChange={handleChange}
                placeholder={isEdit ? '' : 'Masukkan NIP / NIK'}
                className={`w-full h-[44px] px-3.5 bg-white border rounded-[10px] text-[14px] text-ink transition-shadow focus:outline-none focus:border-royal-blue focus:ring-[3px] focus:ring-focus-ring ${
                  errors.nipNik ? 'border-danger' : 'border-line'
                }`}
              />
              {errors.nipNik && (
                <p className="text-danger text-[12px] mt-1 font-medium">{errors.nipNik}</p>
              )}
            </div>

            <div>
              <label htmlFor="field-username" className="block text-[13px] font-semibold text-ink mb-1.5">
                Nama pengguna
              </label>
              <input
                id="field-username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder={isEdit ? '' : 'Contoh: nadya.s'}
                className={`w-full h-[44px] px-3.5 bg-white border rounded-[10px] text-[14px] text-ink transition-shadow focus:outline-none focus:border-royal-blue focus:ring-[3px] focus:ring-focus-ring ${
                  errors.username ? 'border-danger' : 'border-line'
                }`}
              />
              {errors.username && (
                <p className="text-danger text-[12px] mt-1 font-medium">{errors.username}</p>
              )}
            </div>
          </div>

          {/* 3. Surel */}
          <div>
            <label htmlFor="field-email" className="block text-[13px] font-semibold text-ink mb-1.5">
              Surel
            </label>
            <input
              id="field-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={isEdit ? '' : 'nama@polibatam.ac.id'}
              className={`w-full h-[44px] px-3.5 bg-white border rounded-[10px] text-[14px] text-ink transition-shadow focus:outline-none focus:border-royal-blue focus:ring-[3px] focus:ring-focus-ring ${
                errors.email ? 'border-danger' : 'border-line'
              }`}
            />
            {errors.email && (
              <p className="text-danger text-[12px] mt-1 font-medium">{errors.email}</p>
            )}
          </div>

          {/* 4. Kata Sandi + Peran (2 Kolom) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="field-password" className="block text-[13px] font-semibold text-ink mb-1.5">
                {isEdit ? 'Kata sandi baru' : 'Kata sandi awal'}
              </label>
              <input
                id="field-password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={isEdit ? 'Kosongkan jika tidak diubah' : 'Minimal 8 karakter'}
                className={`w-full h-[44px] px-3.5 bg-white border rounded-[10px] text-[14px] text-ink transition-shadow placeholder:text-slate/60 focus:outline-none focus:border-royal-blue focus:ring-[3px] focus:ring-focus-ring ${
                  errors.password ? 'border-danger' : 'border-line'
                }`}
              />
              {errors.password && (
                <p className="text-danger text-[12px] mt-1 font-medium">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="field-role" className="block text-[13px] font-semibold text-ink mb-1.5">
                Peran
              </label>
              <div className="relative">
                <select
                  id="field-role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`w-full h-[44px] px-3.5 pr-10 appearance-none bg-white border rounded-[10px] text-[14px] text-ink transition-shadow focus:outline-none focus:border-royal-blue focus:ring-[3px] focus:ring-focus-ring cursor-pointer ${
                    errors.role ? 'border-danger' : 'border-line'
                  }`}
                >
                  <option value="" disabled>Pilih peran</option>
                  {USER_ROLES.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate pointer-events-none" />
              </div>
              {errors.role && (
                <p className="text-danger text-[12px] mt-1 font-medium">{errors.role}</p>
              )}
            </div>
          </div>

          {/* 5. Status Akun */}
          <div>
            <label htmlFor="field-status" className="block text-[13px] font-semibold text-ink mb-1.5">
              Status akun
            </label>
            <div className="relative">
              <select
                id="field-status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full h-[44px] px-3.5 pr-10 appearance-none bg-white border border-line rounded-[10px] text-[14px] text-ink transition-shadow focus:outline-none focus:border-royal-blue focus:ring-[3px] focus:ring-focus-ring cursor-pointer"
              >
                <option value={USER_STATUS.ACTIVE}>Aktif</option>
                <option value={USER_STATUS.INACTIVE}>Nonaktif</option>
              </select>
              <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate pointer-events-none" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="h-[44px] px-6 border border-line rounded-[10px] text-ink font-semibold text-[14px] hover:bg-slate/5 transition-colors focus:outline-none focus:ring-2 focus:ring-royal-blue cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-[44px] px-6 bg-amber hover:bg-[#FFBA3D] text-amber-ink font-bold text-[14px] rounded-[10px] transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-amber cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting && <Loader2 size={16} className="animate-spin" />}
              <span>Simpan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormDialog;
