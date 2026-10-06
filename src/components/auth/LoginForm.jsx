import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Lock, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const roles = ['Admin(TU)', 'KPS', 'Laboran', 'Sekjur', 'Kajur', 'Dosen'];

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    role: '',
    nip: '',
    password: '',
    rememberMe: true
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (submitError) setSubmitError('');
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.role) newErrors.role = 'Jenis user wajib dipilih.';
    if (!formData.nip) newErrors.nip = 'NIK / NIP wajib diisi.';
    if (!formData.password) newErrors.password = 'Kata sandi wajib diisi.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError('');

    const result = await login(formData.role, formData.nip, formData.password, formData.rememberMe);
    
    if (result.success) {
      const routeMap = {
        'Admin(TU)': '/admin',
        'KPS': '/kps',
        'Laboran': '/laboran',
        'Sekjur': '/sekjur',
        'Kajur': '/kajur',
        'Dosen': '/dosen'
      };
      navigate(routeMap[result.role] || '/');
    } else {
      setSubmitError(result.message);
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="mx-auto w-full rounded-[18px] bg-white p-7 text-ink shadow-[0_24px_60px_rgba(3,16,43,0.22)] sm:px-[38px] sm:pt-[38px] sm:pb-[31px]">
      <h2 className="mb-1.5 text-[24px] font-bold leading-[1.2] tracking-tight text-[#10264B] sm:text-[28px]">Selamat datang di SIAP–PBM</h2>
      <p className="mb-7 text-[14px] text-slate sm:text-[15px]">Masuk dengan akun NIK/NIP Polibatam Anda.</p>

      {submitError && (
        <div className="mb-4 p-3 bg-danger/10 border border-danger/20 text-danger rounded-lg text-sm font-semibold">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Role Select */}
        <div>
          <label className="mb-2 block text-[14px] font-semibold text-ink">Pilih jenis user</label>
          <div className="relative">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`h-[50px] w-full appearance-none rounded-[10px] border bg-white pl-4 pr-10 text-[15px] text-ink transition-shadow focus:border-royal-blue focus:outline-none focus:ring-[3px] focus:ring-focus-ring ${errors.role ? 'border-danger' : 'border-line'}`}
            >
              <option value="" disabled>Pilih jenis user</option>
              {roles.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate pointer-events-none" />
          </div>
          {errors.role && <p className="text-danger text-xs mt-1.5 font-medium">{errors.role}</p>}
        </div>

        {/* NIK / NIP */}
        <div>
          <label className="mb-2 block text-[14px] font-semibold text-ink">NIK / NIP / akun SSO Polibatam</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User size={18} className="text-slate" />
            </div>
            <input
              type="text"
              name="nip"
              placeholder="Masukkan NIK / NIP"
              value={formData.nip}
              onChange={handleChange}
              className={`h-[50px] w-full rounded-[10px] border bg-white pl-11 pr-4 text-[15px] text-ink transition-shadow placeholder:text-[#8491A5] focus:border-royal-blue focus:outline-none focus:ring-[3px] focus:ring-focus-ring ${errors.nip ? 'border-danger' : 'border-line'}`}
            />
          </div>
          {errors.nip && <p className="text-danger text-xs mt-1.5 font-medium">{errors.nip}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="mb-2 block text-[14px] font-semibold text-ink">Kata sandi</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock size={18} className="text-slate" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Masukkan kata sandi"
              value={formData.password}
              onChange={handleChange}
              className={`h-[50px] w-full rounded-[10px] border bg-white pl-11 pr-11 text-[15px] text-ink transition-shadow placeholder:text-[#8491A5] focus:border-royal-blue focus:outline-none focus:ring-[3px] focus:ring-focus-ring ${errors.password ? 'border-danger' : 'border-line'}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate hover:text-ink transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-danger text-xs mt-1.5 font-medium">{errors.password}</p>}
        </div>

        {/* Remember Me */}
        <div className="flex items-center pt-0.5">
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="h-[18px] w-[18px] rounded border-line bg-white text-royal-blue focus:ring-royal-blue focus:ring-offset-0"
          />
          <label htmlFor="rememberMe" className="ml-2 text-[14px] font-medium text-slate">
            Ingat sesi saya
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-1">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`h-[54px] w-full rounded-[10px] bg-amber text-[16px] font-bold text-amber-ink transition-colors hover:bg-[#FFBA3D] ${isSubmitting ? 'cursor-not-allowed opacity-70' : ''}`}
          >
            {isSubmitting ? 'Memproses...' : 'Masuk'}
          </button>
          <div className="text-right mt-4">
            <a href="#" className="text-[14px] font-semibold text-royal-blue transition-colors hover:text-navy">
              Reset kata sandi
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
