/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Doorbly Sticky Top Navigation Bar
 * - Compact reduced height (h-14 / 56px)
 * - Small buttons with unified brand color (#0F766E) for:
 *   "Settings Console" and Urgent Rotating Notices
 */

import React, { useState, useEffect } from 'react';
import { Logo } from './Logo.tsx';
import { RotatingHeaderNotice } from './RotatingHeaderNotice.tsx';
import { doorblyConfig } from '../config/doorblyConfig.ts';
import { Menu, X, Settings, ArrowRight, Lock, ExternalLink } from 'lucide-react';

interface HeaderProps {
  onOpenRecruitment: (dept?: string) => void;
  onOpenSettings: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenRecruitment,
  onOpenSettings,
  onNavigateSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigateSection(targetId);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 bg-[#172B2A] border-b border-white/10 text-white shadow-xs`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Reduced Menu Bar Height from h-20 to h-14 */}
        <div className="flex items-center justify-between h-14 gap-5">
          {/* Zone 1: Brand Wordmark / Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            className="shrink-0 flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md"
            aria-label="Doorbly Home"
          >
            <Logo size="sm" variant="white" />
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-200">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'home')}
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              Home
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              className="hover:text-[#0F766E] transition-colors whitespace-nowrap"
            >
              Explore Services
            </a>
            <a
              href="#portals"
              onClick={(e) => handleNavClick(e, 'portals')}
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              Become a Partner
            </a>
            <a
              href="#careers"
              onClick={(e) => handleNavClick(e, 'careers')}
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              Careers
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              About Us
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              Contact Us
            </a>
          </nav>

          {/* Zone 3: Primary Actions with same unified teal color & reduced button sizing */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            {/* 1. Settings Console (Reduced Compact Size) */}
            <button
              onClick={onOpenSettings}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-white bg-[#0F766E] hover:bg-[#115E59] active:bg-[#0D5F58] rounded-md transition-colors shadow-xs whitespace-nowrap cursor-pointer leading-tight"
              title="Settings Console (Password Locked)"
            >
              <Settings size={12} />
              <span>Settings Console</span>
            </button>

            {/* 2. Rotating Urgent Notice replacing Get Started */}
            <RotatingHeaderNotice onNavigateSection={onNavigateSection} variant="compact" />
          </div>

          {/* Mobile menu hamburger toggle button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Reduced & Compact Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white shadow-md animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="px-4 py-3 space-y-1">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'home')}
              className="block px-2.5 py-1.5 text-sm font-medium text-slate-800 hover:bg-[#DDF4ED]/50 hover:text-[#0F766E] rounded-md transition-colors"
            >
              Home
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              className="block px-2.5 py-1.5 text-sm font-medium text-slate-800 hover:bg-[#DDF4ED]/50 hover:text-[#0F766E] rounded-md transition-colors"
            >
              Explore Services
            </a>
            <a
              href="#portals"
              onClick={(e) => handleNavClick(e, 'portals')}
              className="block px-2.5 py-1.5 text-sm font-medium text-slate-800 hover:bg-[#DDF4ED]/50 hover:text-[#0F766E] rounded-md transition-colors"
            >
              Become a Partner
            </a>
            <a
              href="#careers"
              onClick={(e) => handleNavClick(e, 'careers')}
              className="block px-2.5 py-1.5 text-sm font-medium text-slate-800 hover:bg-[#DDF4ED]/50 hover:text-[#0F766E] rounded-md transition-colors"
            >
              Careers
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              className="block px-2.5 py-1.5 text-sm font-medium text-slate-800 hover:bg-[#DDF4ED]/50 hover:text-[#0F766E] rounded-md transition-colors"
            >
              About Us
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="block px-2.5 py-1.5 text-sm font-medium text-slate-800 hover:bg-[#DDF4ED]/50 hover:text-[#0F766E] rounded-md transition-colors"
            >
              Contact Us
            </a>

            {/* Official Login Link in Menu */}
            <a
              href={doorblyConfig.urls.officialLogin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-2.5 py-1.5 text-sm font-medium text-slate-800 hover:bg-[#DDF4ED]/50 hover:text-[#0F766E] rounded-md transition-colors"
            >
              <span className="flex items-center gap-2">
                <Lock size={14} className="text-[#0F766E]" />
                <span>Official Login</span>
              </span>
              <ExternalLink size={13} className="text-slate-400" />
            </a>

            {/* Small buttons with the SAME cohesive color (#0F766E) in the menu */}
            <div className="pt-2 mt-2 border-t border-slate-100 flex flex-col gap-1.5">
              {/* Official Login Direct Button */}
              <a
                href={doorblyConfig.urls.officialLogin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium text-white bg-[#0F766E] hover:bg-[#115E59] active:bg-[#0D5F58] rounded-md transition-colors shadow-xs"
              >
                <Lock size={12} />
                <span>Official Login</span>
                <ExternalLink size={11} className="opacity-80" />
              </a>

              {/* 1. Settings Console (Reduced) */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSettings();
                }}
                className="w-full inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium text-white bg-[#0F766E] hover:bg-[#115E59] active:bg-[#0D5F58] rounded-md transition-colors shadow-xs cursor-pointer"
              >
                <Settings size={12} />
                <span>Settings Console</span>
              </button>

              {/* 2. Urgent Rotating Notice replacing Get Started */}
              <div className="pt-1">
                <RotatingHeaderNotice onNavigateSection={onNavigateSection} variant="tray" />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
