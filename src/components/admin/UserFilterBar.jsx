import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { FILTER_ROLES } from '../../constants/userConstants';

const UserFilterBar = ({ search, onSearchChange, selectedRole, onRoleChange }) => {
  const [localSearch, setLocalSearch] = useState(search);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Debounce search input by 300ms
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange(localSearch);
    }, 300);

    return () => clearTimeout(handler);
  }, [localSearch, onSearchChange]);

  // Sync external search reset if any
  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  // Handle outside click & escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownOpen]);

  return (
    <div className="flex flex-col sm:flex-row gap-3.5 mb-6">
      {/* Search Input */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate">
          <Search size={18} />
        </div>
        <input
          type="text"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Cari nama, NIP/NIK, atau surel"
          className="w-full h-[44px] bg-white border border-line rounded-[10px] pl-10 pr-4 text-[14px] text-ink placeholder:text-slate/70 focus:outline-none focus:border-royal-blue focus:ring-[3px] focus:ring-focus-ring transition-shadow"
          aria-label="Cari pengguna"
        />
      </div>

      {/* Role Filter Dropdown */}
      <div className="relative shrink-0" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full sm:w-[200px] h-[44px] bg-white border border-line rounded-[10px] px-4 flex items-center justify-between text-[14px] font-semibold text-ink focus:outline-none focus:border-royal-blue focus:ring-[3px] focus:ring-focus-ring transition-shadow cursor-pointer"
          aria-expanded={isDropdownOpen}
          aria-haspopup="listbox"
          aria-label="Filter berdasarkan peran"
        >
          <span className="truncate">{selectedRole}</span>
          {isDropdownOpen ? (
            <ChevronUp size={18} className="text-slate shrink-0 ml-2" />
          ) : (
            <ChevronDown size={18} className="text-slate shrink-0 ml-2" />
          )}
        </button>

        {isDropdownOpen && (
          <div
            className="absolute right-0 mt-1.5 w-full sm:w-[200px] bg-white border border-line rounded-[12px] p-1.5 shadow-lg z-40 animate-fade-in"
            role="listbox"
          >
            {FILTER_ROLES.map((role) => {
              const isSelected = selectedRole === role;
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => {
                    onRoleChange(role);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-[14px] rounded-[8px] transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-tint text-royal-blue font-bold'
                      : 'text-ink hover:bg-slate/5 font-medium'
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  {role}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserFilterBar;
