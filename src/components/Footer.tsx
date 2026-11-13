/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Doorbly Footer Component (Section 12)
 */

import React from 'react';
import { Logo } from './Logo.tsx';
import { doorblyConfig } from '../config/doorblyConfig.ts';
import { 
  MapPin, 
  Mail, 
  Phone, 
  ExternalLink,
  Shield, 
  Heart
} from 'lucide-react';

interface FooterProps {
  onOpenRecruitment: () => void;
  onOpenLegal: (type: 'privacy' | 'terms') => void;
  onOpenSettings?: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenRecruitment,
  onOpenLegal,
  onOpenSettings,
  onNavigateSection,
}) => {
  return (
    <footer className="bg-[#172B2A] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand & Short Company Description (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="white" size="lg" />
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Doorbly is an Odisha-based doorstep services and work-opportunity ecosystem connecting customers with verified local service professionals and empowering communities with sustainable livelihood.
            </p>
            <div className="text-xs text-[#DDF4ED] font-medium flex items-center gap-1.5 pt-1">
              <MapPin size={14} className="shrink-0" />
              <span>Headquartered in Bhubaneswar · Operating Across Odisha</span>
            </div>
          </div>

          {/* Quick Links: Portals & Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#DDF4ED]">
              Platform Portals
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a
                  href={doorblyConfig.urls.customerApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <span>Explore Services</span>
                  <ExternalLink size={13} className="text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href={doorblyConfig.urls.partnerApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <span>Become a Partner</span>
                  <ExternalLink size={13} className="text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href={doorblyConfig.urls.candidateJoiningPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1.5 transition-colors text-left"
                >
                  <span>Apply for a Job (Careers)</span>
                  <ExternalLink size={13} className="text-slate-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links: Company & Exploration (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#DDF4ED]">
              Company
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection('home');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection('about');
                  }}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#careers"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection('careers');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection('contact');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#DDF4ED]">
              Legal & Trust
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <button
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Terms and Conditions
                </button>
              </li>
              <li className="pt-2 text-xs text-slate-400 leading-normal">
                Compliant with Indian consumer safety and personal data regulations.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span>© 2026 Doorbly. All Rights Reserved.</span>
            {onOpenSettings && (
              <>
                <span className="text-slate-600">·</span>
                <button
                  onClick={onOpenSettings}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Settings
                </button>
              </>
            )}
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Everyday Services. Endless Opportunities across Odisha.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
