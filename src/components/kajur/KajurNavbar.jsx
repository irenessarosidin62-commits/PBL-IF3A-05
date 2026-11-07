import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';

const KajurNavbar = ({ isSidebarOpen, onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const userName = user?.name || 'Irenessa Rosidin';
  const userNik = user?.nik || user?.nip || '213452';
  const userRole = user?.role === 'Kajur' || !user ? 'Ketua Jurusan' : user.role;
  const userProdi = user?.prodi || 'Program Studi Teknik Informatika';
  const userInitials = 'IR';

  // Close profile dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isProfileOpen]);

  const handleLogout = () => {
    if (logout) {
      logout();
    }
    navigate('/login');
  };

  return (
    <header className="w-full bg-[#0A2352] text-white sticky top-0 z-40 border-b border-[#071A3D] shadow-md font-sans">
      <div className="w-full h-[72px] px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Logo + Title, then Hamburger toggle on the right */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Logo & Brand Info */}
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Logo SIAP-PBM"
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl object-contain shadow-xs"
            />
            <div className="flex flex-col">
              <h1 className="text-base sm:text-[19px] font-bold tracking-tight text-white leading-tight">
                SIAP–PBM
              </h1>
              <p className="text-[11px] sm:text-[12px] text-white/70 font-medium leading-tight mt-0.5">
                Politeknik Negeri Batam
              </p>
            </div>
          </div>

          {/* Hamburger toggle button (di sebelah kanan logo) */}
          <button
            type="button"
            onClick={onToggleSidebar}
            className="p-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFB020] cursor-pointer ml-1 sm:ml-2"
            aria-label={isSidebarOpen ? 'Tutup menu sidebar' : 'Buka menu sidebar'}
            title={isSidebarOpen ? 'Sembunyikan Sidebar' : 'Tampilkan Sidebar'}
          >
            {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Right: User Profile Pill */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2.5 bg-white/10 hover:bg-white/15 border border-white/15 pl-1.5 pr-4 py-1.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#FFB020] cursor-pointer"
            aria-expanded={isProfileOpen}
            aria-haspopup="true"
            title="Menu Profil"
          >
            {/* Avatar Circle with IR initials */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FFB020] text-[#0A2352] font-bold text-xs sm:text-[13px] flex items-center justify-center shrink-0 shadow-inner">
              {userInitials}
            </div>
            <span className="text-[13px] sm:text-[14px] font-semibold text-white tracking-wide">
              Profil Saya
            </span>
          </button>

          {/* Profile Dropdown Popover */}
          {isProfileOpen && (
            <div
              className="absolute right-0 mt-2.5 w-72 bg-white border border-[#D8E0EE] rounded-[14px] p-5 shadow-2xl z-50 animate-in fade-in zoom-in-95 text-[#0F1B33]"
              role="menu"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-[#E2E8F0]">
                <div className="w-10 h-10 rounded-full bg-[#FFB020] text-[#0A2352] font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                  {userInitials}
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#0A2352] leading-tight">
                    {userName}
                  </h3>
                  <p className="text-[12px] text-[#51607A] mt-0.5">NIK: {userNik}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-[#E8EEFC] text-[#1B4FD8] font-semibold text-[11px] rounded">
                    {userRole}
                  </span>
                </div>
              </div>

              <div className="py-3 text-[13px] text-[#51607A]">
                <p className="font-semibold text-[#0F1B33]">Unit Kerja</p>
                <p className="text-[#51607A] mt-0.5">{userProdi}</p>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-[#FEE4E2] hover:bg-[#FECDCA] text-[#B42318] font-semibold py-2.5 px-4 rounded-[10px] text-[13px] transition-colors focus:outline-none focus:ring-2 focus:ring-[#B42318] cursor-pointer"
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

export default KajurNavbar;

