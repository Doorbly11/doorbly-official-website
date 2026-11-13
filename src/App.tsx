/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Doorbly Official Website - Main App
 * Everyday Services. Endless Opportunities.
 */

import React, { useState } from 'react';
import { NavigationTray } from './components/NavigationTray.tsx';
import { Hero } from './components/Hero.tsx';
import { PortalsSection } from './components/PortalsSection.tsx';
import { ServiceCategories } from './components/ServiceCategories.tsx';
import { HowItWorks } from './components/HowItWorks.tsx';
import { WhyDoorbly } from './components/WhyDoorbly.tsx';
import { CareersSection } from './components/CareersSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';

import { LegalModal } from './components/LegalModal.tsx';
import { SettingsModal } from './components/SettingsModal.tsx';
import { RotatingHeaderNotice } from './components/RotatingHeaderNotice.tsx';
import { ResponsiveProvider } from './context/ResponsiveContext.tsx';
import { doorblyConfig } from './config/doorblyConfig.ts';

export default function App() {
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [isTrayCollapsed, setIsTrayCollapsed] = useState(false);

  const handleOpenRecruitment = (_deptName?: string) => {
    window.open(doorblyConfig.urls.candidateJoiningPortal, '_blank', 'noopener,noreferrer');
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ResponsiveProvider>
      <div className="min-h-screen bg-white text-[#172B2A] flex font-sans selection:bg-[#DDF4ED] selection:text-[#0F766E] overflow-x-hidden">
      {/* 1. Left-Side Navigation Tray (Desktop Dock & Mobile Slide-Out Drawer) */}
      <NavigationTray
        onOpenRecruitment={() => handleOpenRecruitment()}
        onOpenSettings={() => setSettingsModalOpen(true)}
        onNavigateSection={handleNavigateSection}
        isCollapsed={isTrayCollapsed}
        onToggleCollapse={() => setIsTrayCollapsed(!isTrayCollapsed)}
      />

      {/* Main Page Layout Wrapper (Shifted for Left Tray on Desktop, Padded for Mobile Bar) */}
      <div 
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out pt-14 lg:pt-0 ${
          isTrayCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* Desktop Sticky Header with Rotating Urgent Urgency Callout */}
        <header className="hidden lg:flex sticky top-0 z-30 bg-[#172B2A] border-b border-white/10 px-6 h-14 items-center justify-between text-white shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-white font-medium">Doorbly Official Services & Careers</span>
            <span className="text-white/40">•</span>
            <span className="text-emerald-300 font-medium">Odisha Ecosystem</span>
          </div>

          <RotatingHeaderNotice
            variant="header"
            onNavigateSection={handleNavigateSection}
          />
        </header>

        <main className="flex-1">
          {/* 2. Hero Section */}
          <Hero
            onExploreServices={() => handleNavigateSection('services')}
            onJoinDoorbly={() => handleNavigateSection('portals')}
          />

          {/* 3. Four Main Portal Access Cards (Section 5 - Most Important Section) */}
          <PortalsSection
            onOpenRecruitment={() => handleOpenRecruitment()}
          />

          {/* 4. Service Categories (Section 6) */}
          <ServiceCategories />

          {/* 5. How Doorbly Works (Section 7) */}
          <HowItWorks />

          {/* 6. Why Doorbly? (Section 8) */}
          <WhyDoorbly />

          {/* 7. Doorbly Careers (Section 9) */}
          <CareersSection
            onSelectDepartment={(deptName) => handleOpenRecruitment(deptName)}
            onOpenRecruitment={() => handleOpenRecruitment()}
          />

          {/* 8. About Doorbly (Section 10) */}
          <AboutSection />

          {/* 9. Contact Section (Section 11) */}
          <ContactSection />
        </main>

        {/* 10. Footer (Section 12) */}
        <Footer
          onOpenRecruitment={() => handleOpenRecruitment()}
          onOpenLegal={(type) => setLegalModalType(type)}
          onOpenSettings={() => setSettingsModalOpen(true)}
          onNavigateSection={handleNavigateSection}
        />
      </div>

      {/* Modals & Dialogs */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

        <SettingsModal
          isOpen={settingsModalOpen}
          onClose={() => setSettingsModalOpen(false)}
        />
      </div>
    </ResponsiveProvider>
  );
}
