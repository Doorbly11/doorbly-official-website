/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Doorbly Responsive Support Mode Controller
 * Integrated cleanly into the Menu Bar (Navigation Tray)
 * Displays device mode, screen width, and allows selecting Auto Adapt / Compact / Comfortable.
 */

import React, { useState } from 'react';
import { useResponsive } from '../context/ResponsiveContext.tsx';
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  Tv, 
  SlidersHorizontal, 
  Check, 
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ResponsiveModeIndicatorProps {
  isCollapsed?: boolean;
}

export const ResponsiveModeIndicator: React.FC<ResponsiveModeIndicatorProps> = ({
  isCollapsed = false,
}) => {
  const { 
    width, 
    screenCategory, 
    density, 
    effectiveDensity, 
    setDensity,
  } = useResponsive();

  const [isOpen, setIsOpen] = useState(false);

  const getDeviceIcon = () => {
    switch (screenCategory) {
      case 'mobile-xs':
      case 'mobile':
        return <Smartphone size={12} className="text-[#0F766E] shrink-0" />;
      case 'tablet':
        return <Tablet size={12} className="text-[#0F766E] shrink-0" />;
      case 'desktop':
        return <Monitor size={12} className="text-[#0F766E] shrink-0" />;
      case 'ultrawide':
        return <Tv size={12} className="text-[#0F766E] shrink-0" />;
    }
  };

  const getCategoryLabel = () => {
    switch (screenCategory) {
      case 'mobile-xs': return 'Phone';
      case 'mobile': return 'Mobile';
      case 'tablet': return 'Tablet';
      case 'desktop': return 'Desktop';
      case 'ultrawide': return 'Wide';
    }
  };

  return (
    <div className="relative w-full">
      {/* Menu Bar Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full inline-flex items-center justify-between gap-1.5 text-[11px] font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-md transition-colors shadow-2xs whitespace-nowrap cursor-pointer ${
          isCollapsed ? 'p-2 justify-center' : 'px-2.5 py-1.5'
        }`}
        title={`Responsive Support Mode: ${getCategoryLabel()} (${width}px)`}
      >
        <div className="flex items-center gap-1.5 truncate">
          <SlidersHorizontal size={12} className="text-[#0F766E] shrink-0" />
          {!isCollapsed && <span className="truncate">Responsive Mode</span>}
        </div>

        {!isCollapsed && (
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#0F766E] bg-[#DDF4ED] px-1.5 py-0.5 rounded">
              {density === 'auto' ? `Auto` : density}
            </span>
            {isOpen ? <ChevronUp size={11} className="text-slate-400" /> : <ChevronDown size={11} className="text-slate-400" />}
          </div>
        )}
      </button>

      {/* Popover / Dropdown Drawer in Menu Bar */}
      {isOpen && (
        <div 
          className={`absolute z-50 bg-white rounded-xl border border-slate-200 shadow-xl p-2.5 text-[#172B2A] text-xs animate-in fade-in duration-150 ${
            isCollapsed 
              ? 'left-full bottom-0 ml-2 w-60' 
              : 'bottom-full left-0 right-0 mb-1.5 w-full'
          }`}
        >
          <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-100">
            <div className="flex items-center gap-1.5 font-bold text-[11px] text-[#0F766E]">
              {getDeviceIcon()}
              <span>{getCategoryLabel()} Mode</span>
            </div>
            <span className="text-[10px] font-mono font-semibold text-slate-400">
              {width}px
            </span>
          </div>

          <div className="space-y-1">
            {/* Auto Adapt */}
            <button
              onClick={() => {
                setDensity('auto');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                density === 'auto'
                  ? 'bg-[#DDF4ED] text-[#0F766E] font-semibold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Sparkles size={12} className={density === 'auto' ? 'text-[#0F766E]' : 'text-slate-400'} />
                <div>
                  <div className="text-[11px] font-medium leading-tight">Auto Adapt</div>
                  <div className="text-[9px] text-slate-400 leading-tight">Optimized for {getCategoryLabel()}</div>
                </div>
              </div>
              {density === 'auto' && <Check size={12} className="text-[#0F766E]" />}
            </button>

            {/* Compact View */}
            <button
              onClick={() => {
                setDensity('compact');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                density === 'compact'
                  ? 'bg-[#DDF4ED] text-[#0F766E] font-semibold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div>
                <div className="text-[11px] font-medium leading-tight">Compact Grid</div>
                <div className="text-[9px] text-slate-400 leading-tight">Tighter card spacing</div>
              </div>
              {density === 'compact' && <Check size={12} className="text-[#0F766E]" />}
            </button>

            {/* Comfortable View */}
            <button
              onClick={() => {
                setDensity('comfortable');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                density === 'comfortable'
                  ? 'bg-[#DDF4ED] text-[#0F766E] font-semibold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div>
                <div className="text-[11px] font-medium leading-tight">Comfortable Grid</div>
                <div className="text-[9px] text-slate-400 leading-tight">Spacious cards & bounds</div>
              </div>
              {density === 'comfortable' && <Check size={12} className="text-[#0F766E]" />}
            </button>
          </div>

          <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-400">
            <span>Density Applied:</span>
            <span className="font-semibold text-[#0F766E] capitalize">{effectiveDensity}</span>
          </div>
        </div>
      )}
    </div>
  );
};
