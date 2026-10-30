import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SCALE_GUIDES } from '../../constants/laboranCompetencyConstants';

const CompetencyScaleGuide = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-line rounded-[12px] bg-white shadow-2xs mb-5 overflow-hidden transition-all">
      {/* Header Accordion Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 sm:px-5 sm:py-3.5 flex items-center justify-between text-left hover:bg-slate/5 transition-colors cursor-pointer focus:outline-none focus:bg-slate/5"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <span className="inline-block px-2.5 py-0.5 bg-tint text-royal-blue text-[12px] font-bold rounded-full">
            0 - 8
          </span>
          <span className="text-[13px] sm:text-[14px] font-bold text-ink">
            Petunjuk Skala Penilaian
          </span>
        </div>
        <ChevronDown
          size={18}
          className={`text-slate transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Accordion Body */}
      {isOpen && (
        <div className="px-5 pb-5 pt-2 border-t border-line/60 bg-white animate-accordion-down origin-top">
          <div className="space-y-2.5 mt-2">
            {SCALE_GUIDES.map((item) => (
              <div key={item.level} className="flex items-start gap-3 text-[13px] leading-relaxed">
                <span className="w-6 h-6 rounded-full border border-line bg-ice text-ink font-bold text-[12px] flex items-center justify-center shrink-0 mt-0.5">
                  {item.level}
                </span>
                <span className="text-ink font-normal">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompetencyScaleGuide;
