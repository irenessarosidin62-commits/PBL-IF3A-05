import React, { useState, useEffect, useRef } from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';

const getInitials = (name) => {
  if (!name || typeof name !== 'string') return '??';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '??';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const CurriculumNavbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const userName = user?.name || 'Yeni Rokhayati';
  const userNik = user?.nik || user?.nip || '112093';
  const userRole = user?.role || 'KPS';
  const userProdi = user?.prodi || 'Program Studi Teknik Informatika';
  const userInitials = getInitials(userName);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <header className="w-full bg-navy text-white sticky top-0 z-30 border-b border-navy-deep">
      <div className="max-w-[1140px] mx-auto h-[74px] px-4 sm:px-8 flex items-center justify-between">
        {/* Brand Left */}
        <div className="flex items-center gap-3.5">
          <img
            src={logo}
            alt="SIAP-PBM Logo"
            className="w-10 h-10 object-contain rounded-xl"
          />
          <div>
            <h1 className="text-[19px] font-bold tracking-tight text-white leading-tight">
              SIAP–PBM
            </h1>
            <p className="text-[12px] text-white/70 font-medium">
              Politeknik Negeri Batam
            </p>
          </div>
        </div>

        {/* Profile Pill Right */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2.5 bg-white/10 hover:bg-white/15 border border-white/15 pl-1.5 pr-4 py-1.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-royal-blue focus:ring-offset-2 focus:ring-offset-navy cursor-pointer"
            aria-expanded={isOpen}
            aria-haspopup="true"
            title="Menu Profil"
          >
            <div className="w-7 h-7 rounded-full bg-amber text-amber-ink font-bold text-xs flex items-center justify-center">
              {userInitials}
            </div>
            <span className="text-[14px] font-semibold text-white">
              Profil Saya
            </span>
          </button>

          {/* Profile Popover Card */}
          {isOpen && (
            <div
              className="absolute right-0 mt-2.5 w-72 bg-white border border-line rounded-[14px] p-5 shadow-xl z-50 animate-fade-in text-ink"
              role="menu"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-line">
                <div className="w-10 h-10 rounded-full bg-amber text-amber-ink font-extrabold text-sm flex items-center justify-center shrink-0">
                  {userInitials}
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-navy leading-tight">
                    {userName}
                  </h3>
                  <p className="text-[12px] text-slate mt-0.5">NIK: {userNik}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-tint text-royal-blue font-semibold text-[11px] rounded">
                    {userRole}
                  </span>
                </div>
              </div>

              <div className="py-3 text-[13px] text-slate">
                <p className="font-semibold text-ink">Unit Kerja</p>
                <p className="text-slate mt-0.5">{userProdi}</p>
              </div>

              <div className="pt-3 border-t border-line">
                <button
                  type="button"
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-2 bg-[#FEE4E2] hover:bg-[#FECDCA] text-danger font-semibold py-2.5 px-4 rounded-[10px] text-[13px] transition-colors focus:outline-none focus:ring-2 focus:ring-danger cursor-pointer"
                  role="menuitem"
                >
                  <LogOut size={15} strokeWidth={2.2} />
                  <span>Keluar dari Akun</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default CurriculumNavbar;
