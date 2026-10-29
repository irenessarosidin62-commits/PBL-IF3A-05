import React, { useState, useEffect, useRef } from 'react';
import { Menu, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';

const TuNavbar = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const userName = user?.name || 'Irenessa Rosidin';
  const userNik = user?.nipNik || user?.nip || user?.nik || '123456';
  const userRole = user?.role || 'Tata Usaha';
  const userUnit = 'Laboran Teknik Informatika';

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
      <div className="w-full px-4 sm:px-8 h-[74px] flex items-center justify-between">
        {/* Brand Left + Hamburger */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-royal-blue cursor-pointer"
            aria-label="Toggle menu sidebar"
          >
            <Menu size={22} />
          </button>

          <div className="flex items-center gap-3">
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
              IR
            </div>
            <span className="text-[14px] font-semibold text-white">
              Profil Saya
            </span>
          </button>

          {/* Profile Popover Card (Gambar 3) */}
          {isOpen && (
            <div
              className="absolute right-0 mt-2.5 w-72 bg-white border border-line rounded-[14px] p-5 shadow-xl z-50 animate-fade-in text-ink"
              role="menu"
            >
              <div className="flex items-start gap-3 pb-3 border-b border-line">
                <div className="w-10 h-10 rounded-full bg-amber text-amber-ink font-extrabold text-sm flex items-center justify-center shrink-0">
                  IR
                </div>
                <div className="flex-1">
                  <h3 className="text-[15px] font-bold text-navy leading-tight">
                    {userName}
                  </h3>
                  <p className="text-[12px] text-slate mt-0.5 font-medium">
                    NIK: {userNik}
                  </p>
                  <span className="inline-block mt-1 px-2.5 py-0.5 bg-tint text-royal-blue font-bold text-[11px] rounded-md">
                    {userRole}
                  </span>
                </div>
              </div>

              <div className="py-3 text-[13px]">
                <p className="font-semibold text-ink">Unit Kerja</p>
                <p className="text-slate mt-0.5 font-medium">{userUnit}</p>
              </div>

              <div className="pt-3 border-t border-line">
                <button
                  type="button"
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-2 bg-[#FEE4E2] hover:bg-[#FECDCA] text-danger font-semibold py-2.5 px-4 rounded-[10px] text-[13px] transition-colors focus:outline-none focus:ring-2 focus:ring-danger cursor-pointer"
                  role="menuitem"
                >
                  <LogOut size={16} strokeWidth={2.2} />
                  <span>Keluar</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TuNavbar;
