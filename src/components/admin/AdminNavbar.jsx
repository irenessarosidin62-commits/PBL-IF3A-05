import React, { useState, useEffect, useRef } from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';

const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'AD';

  return (
    <header className="w-full bg-navy text-white">
      <div className="max-w-[1120px] mx-auto h-[74px] px-6 sm:px-10 flex items-center justify-between">
        {/* Brand Left */}
        <div className="flex items-center gap-3.5">
          <img
            src={logo}
            alt="SIAP-PBM Logo"
            className="w-10 h-10 object-contain rounded-xl"
          />
          <div>
            <h1 className="text-[19px] font-bold tracking-tight text-white leading-tight">
              SIAP-PBM
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
          >
            <div className="w-7 h-7 rounded-full bg-amber text-amber-ink font-bold text-xs flex items-center justify-center">
              {initials}
            </div>
            <span className="text-[14px] font-semibold text-white">
              Profil Saya
            </span>
          </button>

          {/* Profile Popover Card */}
          {isOpen && (
            <div
              className="absolute right-0 mt-2.5 w-64 bg-white border border-line rounded-[14px] p-5 shadow-xl z-50 animate-fade-in"
              role="menu"
            >
              <div className="mb-3">
                <h3 className="text-[17px] font-bold text-navy leading-tight">
                  {user?.name || 'Admin'}
                </h3>
                <p className="text-[13px] text-slate mt-0.5 break-all">
                  {user?.email || 'admin@polibatam.ac.id'}
                </p>
              </div>

              <div className="pt-3 border-t border-line">
                <button
                  type="button"
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-2 bg-[#FEE4E2] hover:bg-[#FECDCA] text-danger font-semibold py-2.5 px-4 rounded-[10px] text-[14px] transition-colors focus:outline-none focus:ring-2 focus:ring-danger cursor-pointer"
                  role="menuitem"
                >
                  <LogOut size={16} strokeWidth={2.2} />
                  Keluar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
