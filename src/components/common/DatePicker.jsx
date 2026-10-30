import React, { useState, useEffect, useRef } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const MONTH_NAMES = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember'
];

const DAY_NAMES = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

// Parse "dd/mm/yyyy" string to Date object
const parseDateString = (str) => {
  if (!str || typeof str !== 'string') return null;
  const parts = str.trim().split(/[/.-]/);
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && !isNaN(month) && !isNaN(year) && year > 1900) {
      const d = new Date(year, month, day);
      if (d.getDate() === day && d.getMonth() === month && d.getFullYear() === year) {
        return d;
      }
    }
  }
  return null;
};

// Format Date object to "dd/mm/yyyy"
const formatDateString = (d) => {
  if (!d || !(d instanceof Date) || isNaN(d.getTime())) return '';
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

// Generate list of years (e.g. from 2020 to 2035)
const YEAR_OPTIONS = [];
for (let y = 2020; y <= 2035; y++) {
  YEAR_OPTIONS.push(y);
}

const DatePicker = ({
  id,
  label,
  value,
  onChange,
  placeholder = 'dd/mm/yyyy',
  align = 'left',
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Initialize viewMonth and viewYear from current value, or default to current date
  const parsedCurrent = parseDateString(value);
  const [viewMonth, setViewMonth] = useState(() => (parsedCurrent ? parsedCurrent.getMonth() : new Date().getMonth()));
  const [viewYear, setViewYear] = useState(() => (parsedCurrent ? parsedCurrent.getFullYear() : new Date().getFullYear()));
  const [today] = useState(() => new Date());

  const handleToggle = () => {
    if (disabled) return;
    if (!isOpen) {
      const parsed = parseDateString(value);
      if (parsed) {
        setViewMonth(parsed.getMonth());
        setViewYear(parsed.getFullYear());
      }
    }
    setIsOpen((prev) => !prev);
  };

  // Handle outside click & escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
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

  // Month navigation
  const handlePrevMonth = (e) => {
    e.stopPropagation();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((prev) => prev - 1);
    } else {
      setViewMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = (e) => {
    e.stopPropagation();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((prev) => prev + 1);
    } else {
      setViewMonth((prev) => prev + 1);
    }
  };

  // Day click handler
  const handleSelectDay = (year, month, day) => {
    const selected = new Date(year, month, day);
    onChange(formatDateString(selected));
    setIsOpen(false);
  };

  // Quick action: Today
  const handleSelectToday = () => {
    const today = new Date();
    onChange(formatDateString(today));
    setIsOpen(false);
  };

  // Quick action: Clear
  const handleClear = () => {
    onChange('');
    setIsOpen(false);
  };

  // Calculate calendar days
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay(); // 0 is Sunday
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const daysList = [];

  // Previous month padding
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    daysList.push({
      day: daysInPrevMonth - i,
      month: viewMonth === 0 ? 11 : viewMonth - 1,
      year: viewMonth === 0 ? viewYear - 1 : viewYear,
      isCurrentMonth: false
    });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    daysList.push({
      day: i,
      month: viewMonth,
      year: viewYear,
      isCurrentMonth: true
    });
  }

  // Next month padding to fill multiple of 7
  const total = daysList.length;
  const remainder = total % 7;
  const nextCount = remainder === 0 ? 0 : 7 - remainder;
  for (let i = 1; i <= nextCount; i++) {
    daysList.push({
      day: i,
      month: viewMonth === 11 ? 0 : viewMonth + 1,
      year: viewMonth === 11 ? viewYear + 1 : viewYear,
      isCurrentMonth: false
    });
  }

  const selectedDate = parseDateString(value);

  return (
    <div className="relative" ref={containerRef}>
      {/* Input Display Trigger */}
      <div
        id={id}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
            e.preventDefault();
            handleToggle();
          }
        }}
        className={`w-full h-[44px] bg-white border border-line rounded-[10px] pl-3.5 pr-10 flex items-center justify-between text-[13px] font-semibold transition-all duration-200 cursor-pointer select-none focus:outline-none focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/30 ${
          disabled ? 'opacity-50 cursor-not-allowed bg-slate-50' : 'hover:border-slate/40'
        } ${isOpen ? 'border-royal-blue ring-2 ring-royal-blue/30' : ''}`}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={label || 'Pilih tanggal'}
      >
        <span className={value ? 'text-ink' : 'text-slate/60 font-normal'}>
          {value || placeholder}
        </span>
        <CalendarIcon
          size={16}
          className={`shrink-0 transition-colors ${
            isOpen ? 'text-royal-blue' : 'text-slate'
          }`}
        />
      </div>

      {/* Calendar Popover */}
      {isOpen && (
        <div
          className={`absolute ${
            align === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left'
          } mt-2 w-[290px] sm:w-[310px] bg-white border border-line rounded-[14px] p-3.5 shadow-xl z-50 animate-scale-up text-ink`}
          role="dialog"
          aria-modal="true"
          aria-label="Kalender pemilih tanggal"
        >
          {/* Header: Month & Year Selectors with Next/Prev arrows */}
          <div className="flex items-center justify-between pb-3 border-b border-line gap-1">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg text-slate hover:text-navy hover:bg-slate/10 transition-colors cursor-pointer"
              aria-label="Bulan sebelumnya"
              title="Bulan sebelumnya"
            >
              <ChevronLeft size={17} />
            </button>

            <div className="flex items-center gap-1.5">
              {/* Month Dropdown */}
              <select
                value={viewMonth}
                onChange={(e) => setViewMonth(Number(e.target.value))}
                className="bg-slate/5 hover:bg-slate/10 border border-line/60 rounded-[8px] py-1 px-2 text-[13px] font-bold text-navy cursor-pointer focus:outline-none focus:ring-1 focus:ring-royal-blue transition-colors"
                aria-label="Pilih bulan"
              >
                {MONTH_NAMES.map((m, idx) => (
                  <option key={m} value={idx}>
                    {m}
                  </option>
                ))}
              </select>

              {/* Year Dropdown */}
              <select
                value={viewYear}
                onChange={(e) => setViewYear(Number(e.target.value))}
                className="bg-slate/5 hover:bg-slate/10 border border-line/60 rounded-[8px] py-1 px-2 text-[13px] font-bold text-navy cursor-pointer focus:outline-none focus:ring-1 focus:ring-royal-blue transition-colors"
                aria-label="Pilih tahun"
              >
                {YEAR_OPTIONS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg text-slate hover:text-navy hover:bg-slate/10 transition-colors cursor-pointer"
              aria-label="Bulan berikutnya"
              title="Bulan berikutnya"
            >
              <ChevronRight size={17} />
            </button>
          </div>

          {/* Day Names Grid */}
          <div className="grid grid-cols-7 gap-1 mt-2 mb-1 text-center">
            {DAY_NAMES.map((name) => (
              <span
                key={name}
                className="text-[11px] font-bold text-slate py-1"
              >
                {name}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {daysList.map((item, idx) => {
              const isSelected =
                selectedDate &&
                selectedDate.getDate() === item.day &&
                selectedDate.getMonth() === item.month &&
                selectedDate.getFullYear() === item.year;

              const isCurrentDay =
                today.getDate() === item.day &&
                today.getMonth() === item.month &&
                today.getFullYear() === item.year;

              return (
                <button
                  key={`${item.year}-${item.month}-${item.day}-${idx}`}
                  type="button"
                  onClick={() => handleSelectDay(item.year, item.month, item.day)}
                  className={`h-8 sm:h-8.5 rounded-[8px] text-[12px] sm:text-[13px] font-medium flex items-center justify-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-royal-blue text-white font-bold shadow-xs'
                      : isCurrentDay
                      ? 'border border-royal-blue text-royal-blue font-bold hover:bg-tint'
                      : item.isCurrentMonth
                      ? 'text-ink hover:bg-slate/10 font-semibold'
                      : 'text-slate/40 hover:bg-slate/5'
                  }`}
                >
                  {item.day}
                </button>
              );
            })}
          </div>

          {/* Footer Shortcuts */}
          <div className="flex items-center justify-between pt-3 mt-2 border-t border-line text-[12px]">
            <button
              type="button"
              onClick={handleSelectToday}
              className="text-royal-blue hover:underline font-bold transition-colors cursor-pointer"
            >
              Hari ini
            </button>
            {value && (
              <button
                type="button"
                onClick={handleClear}
                className="text-danger hover:underline font-semibold transition-colors cursor-pointer"
              >
                Hapus
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
