/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Doorbly Rotating Header Notice
 * Cycles through urgent callouts one after another:
 * 1. "do not waste time"
 * 2. "find your service and book now"
 * 3. "our team is ready to serve you"
 * 4. "Hurry Partners"
 * 5. "join us and start earning now"
 */

import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export const ROTATING_HEADER_MESSAGES = [
  { text: "do not waste time", targetId: "portals", badge: "FAST BOOKING" },
  { text: "find your service and book now", targetId: "services", badge: "DOORSTEP CARE" },
  { text: "our team is ready to serve you", targetId: "portals", badge: "VERIFIED EXPERTS" },
  { text: "Hurry Partners", targetId: "portals", badge: "LIMITED SLOTS" },
  { text: "join us and start earning now", targetId: "portals", badge: "START TODAY" },
];

interface RotatingHeaderNoticeProps {
  onNavigateSection?: (sectionId: string) => void;
  variant?: 'header' | 'tray' | 'compact';
  className?: string;
}

export const RotatingHeaderNotice: React.FC<RotatingHeaderNoticeProps> = ({
  onNavigateSection,
  variant = 'header',
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ROTATING_HEADER_MESSAGES.length);
        setIsFading(false);
      }, 250);
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  const currentItem = ROTATING_HEADER_MESSAGES[currentIndex];

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateSection) {
      onNavigateSection(currentItem.targetId);
    } else {
      const el = document.getElementById(currentItem.targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (variant === 'compact') {
    return (
      <a
        href={`#${currentItem.targetId}`}
        onClick={handleClick}
        className={`group inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#DDF4ED] hover:bg-[#c9eee2] text-[#0F766E] border border-[#0F766E]/20 transition-all duration-200 cursor-pointer max-w-[130px] min-[360px]:max-w-[165px] min-[420px]:max-w-[210px] sm:max-w-xs shrink min-w-0 ${className}`}
        title={currentItem.text}
      >
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0F766E] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0F766E]"></span>
        </span>
        <span
          className={`text-[11px] font-semibold truncate transition-all duration-200 capitalize ${
            isFading ? 'opacity-0 -translate-y-1' : 'opacity-100 translate-y-0'
          }`}
        >
          {currentItem.text}
        </span>
        <ArrowRight size={11} className="shrink-0 text-[#0F766E] group-hover:translate-x-0.5 transition-transform" />
      </a>
    );
  }

  if (variant === 'tray') {
    return (
      <a
        href={`#${currentItem.targetId}`}
        onClick={handleClick}
        className={`w-full group block p-2.5 rounded-xl bg-gradient-to-r from-[#0F766E] to-[#115E59] text-white hover:from-[#115E59] hover:to-[#0D5F58] shadow-xs transition-all duration-200 cursor-pointer overflow-hidden ${className}`}
        title={currentItem.text}
      >
        <div className="flex items-center justify-between text-[10px] text-[#DDF4ED] font-semibold mb-1">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span>{currentItem.badge}</span>
          </div>
          <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform text-[#DDF4ED]" />
        </div>
        <div
          className={`text-xs font-bold capitalize transition-all duration-200 truncate ${
            isFading ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
          }`}
        >
          {currentItem.text}
        </div>
      </a>
    );
  }

  // Default 'header' variant
  return (
    <a
      href={`#${currentItem.targetId}`}
      onClick={handleClick}
      className={`group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#DDF4ED]/90 to-emerald-50 hover:from-[#DDF4ED] hover:to-emerald-100 text-[#0F766E] border border-[#0F766E]/20 shadow-xs transition-all duration-200 cursor-pointer ${className}`}
      title={currentItem.text}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0F766E] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0F766E]"></span>
      </span>

      <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider bg-[#0F766E] text-white">
        {currentItem.badge}
      </span>

      <span
        className={`text-xs sm:text-sm font-bold tracking-tight capitalize transition-all duration-200 ${
          isFading ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
        }`}
      >
        "{currentItem.text}"
      </span>

      <ArrowRight size={13} className="shrink-0 text-[#0F766E] group-hover:translate-x-1 transition-transform" />
    </a>
  );
};
