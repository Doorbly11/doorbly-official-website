/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Doorbly Left-Side Navigation Tray
 * - Left side tray dock (collapsible on desktop, slide-out drawer on mobile)
 * - Contains logo with continuous 3D flip & golden light orbit
 * - Vertical navigation links with icons
 * - Small unified teal buttons for Settings Console and Urgent Rotating Notices
 */

import React, { useState } from 'react';
import { Logo } from './Logo.tsx';
import { ResponsiveModeIndicator } from './ResponsiveModeIndicator.tsx';
import { doorblyConfig } from '../config/doorblyConfig.ts';
import { 
  Home, 
  Compass, 
  Briefcase, 
  Sparkles, 
  Info, 
  Mail, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X,
  ArrowRight,
  Lock,
  ExternalLink
} from 'lucide-react';

interface NavigationTrayProps {
  onOpenRecruitment: (dept?: string) => void;
  onOpenSettings: () => void;
  onNavigateSection: (sectionId: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const NavigationTray: React.FC<NavigationTrayProps> = ({
  onOpenRecruitment,
  onOpenSettings,
  onNavigateSection,
  isCollapsed,
  onToggleCollapse,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('home');

  const navLinks = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'services', label: 'Explore Services', icon: Compass },
    { id: 'portals', label: 'Become a Partner', icon: Briefcase },
    { id: 'careers', label: 'Careers', icon: Sparkles },
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'contact', label: 'Contact Us', icon: Mail },
  ];

  const handleLinkClick = (id: string) => {
    setActiveItem(id);
    setMobileOpen(false);
    onNavigateSection(id);
  };

  return (
    <>
      {/* Mobile Top Floating Bar with Tray Trigger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#172B2A] border-b border-white/10 px-2.5 sm:px-4 h-14 flex items-center justify-between gap-1.5 sm:gap-2 shadow-xs">
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-1.5 sm:p-2 text-slate-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors focus:outline-none"
            aria-label="Open Navigation Tray"
          >
            <Menu size={20} className="sm:w-[22px] sm:h-[22px]" />
          </button>
          <a href="#home" onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }} className="shrink-0">
            <Logo size="sm" variant="white" />
          </a>
        </div>
      </div>

      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
          aria-hidden="true"
        />
      )}

      {/* Left Navigation Tray Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-white border-r border-slate-200/80 flex flex-col justify-between transition-all duration-300 ease-in-out shadow-xs ${
          /* Desktop width: expanded (w-64) or collapsed (w-20) */
          isCollapsed ? 'lg:w-20' : 'lg:w-64'
        } ${
          /* Mobile slide-in drawer: full width or w-72 */
          mobileOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Tray Top: Logo & Collapse Toggle */}
        <div className="h-16 px-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('home');
            }}
            className="flex items-center overflow-hidden focus:outline-none"
          >
            {isCollapsed ? (
              <Logo size="sm" showWordmark={false} />
            ) : (
              <Logo size="sm" showWordmark={true} />
            )}
          </a>

          {/* Desktop Collapse Tray Toggle Button */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex p-1.5 text-slate-400 hover:text-[#0F766E] hover:bg-[#DDF4ED]/50 rounded-lg transition-colors cursor-pointer"
            title={isCollapsed ? 'Expand Tray' : 'Collapse Tray'}
            aria-label={isCollapsed ? 'Expand Tray' : 'Collapse Tray'}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 text-slate-500 hover:text-slate-800 rounded-lg"
            aria-label="Close Tray"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tray Middle: Vertical Navigation Links */}
        <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto overflow-x-hidden">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeItem === link.id;

            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id);
                }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group cursor-pointer ${
                  isActive
                    ? 'bg-[#DDF4ED] text-[#0F766E] font-semibold shadow-xs'
                    : 'text-slate-700 hover:text-[#0F766E] hover:bg-slate-50'
                }`}
                title={link.label}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isActive ? 'text-[#0F766E]' : 'text-slate-500 group-hover:text-[#0F766E]'
                  }`}
                >
                  <Icon size={18} />
                </div>

                {(!isCollapsed || mobileOpen) && (
                  <span className="whitespace-nowrap transition-opacity duration-200">
                    {link.label}
                  </span>
                )}
              </a>
            );
          })}
          {/* Direct Link: Official Login */}
          <div className="pt-2 mt-2 border-t border-slate-200/60">
            <a
              href={doorblyConfig.urls.officialLogin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-[#0F766E] hover:bg-[#DDF4ED]/40 transition-all group cursor-pointer"
              title="Official Login"
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-slate-500 group-hover:text-[#0F766E] transition-colors">
                <Lock size={18} />
              </div>

              {(!isCollapsed || mobileOpen) && (
                <div className="flex items-center justify-between flex-1 min-w-0">
                  <span className="whitespace-nowrap font-medium">Official Login</span>
                  <ExternalLink size={13} className="text-slate-400 group-hover:text-[#0F766E] shrink-0 ml-1" />
                </div>
              )}
            </a>
          </div>
        </nav>

        {/* Tray Bottom: Small Buttons with Unified Brand Color */}
        <div className="p-3 border-t border-slate-100 bg-[#F7FAF9]/60 shrink-0 space-y-2">
          {/* 1. Official Login Action Button */}
          <a
            href={doorblyConfig.urls.officialLogin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className={`w-full inline-flex items-center justify-center gap-1.5 text-[11px] font-medium text-white bg-[#0F766E] hover:bg-[#115E59] active:bg-[#0D5F58] rounded-md transition-colors shadow-xs whitespace-nowrap cursor-pointer ${
              isCollapsed && !mobileOpen ? 'p-2' : 'px-2.5 py-1.5'
            }`}
            title="Official Login"
          >
            <Lock size={13} className="shrink-0" />
            {(!isCollapsed || mobileOpen) && (
              <span className="flex items-center gap-1">
                <span>Official Login</span>
                <ExternalLink size={11} className="opacity-85" />
              </span>
            )}
          </a>

          {/* 2. Settings Console */}
          <button
            onClick={() => {
              setMobileOpen(false);
              onOpenSettings();
            }}
            className={`w-full inline-flex items-center justify-center gap-1.5 text-[11px] font-medium text-white bg-[#0F766E] hover:bg-[#115E59] active:bg-[#0D5F58] rounded-md transition-colors shadow-xs whitespace-nowrap cursor-pointer ${
              isCollapsed && !mobileOpen ? 'p-2' : 'px-2.5 py-1.5'
            }`}
            title="Settings Console (Password Locked)"
          >
            <Settings size={13} className="shrink-0" />
            {(!isCollapsed || mobileOpen) && <span>Settings Console</span>}
          </button>

          {/* 3. Responsive Support Mode (in Menu Bar) */}
          <ResponsiveModeIndicator isCollapsed={isCollapsed && !mobileOpen} />
        </div>
      </aside>
    </>
  );
};
