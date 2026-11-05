import React from 'react';
import { BookOpen } from 'lucide-react';

const EmptyState = ({
  icon: Icon = BookOpen,
  title = 'Belum ada data',
  description,
  action,
  className = ''
}) => {
  return (
    <div
      className={`w-full bg-white border border-line rounded-[14px] p-10 sm:p-12 flex flex-col items-center justify-center text-center min-h-[280px] my-4 shadow-2xs ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-slate/10 flex items-center justify-center text-slate mb-3.5">
        <Icon size={24} />
      </div>
      <p className="text-[15px] font-bold text-ink mb-1">
        {title}
      </p>
      {description && (
        <p className="text-[13px] text-slate max-w-sm leading-relaxed">
          {description}
        </p>
      )}
      {action && (
        <div className="mt-3.5">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;

