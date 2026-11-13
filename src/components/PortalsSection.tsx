/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Doorbly Main Portal Access Cards (Section 5)
 * - Clean digital access pass design (no background images, no chips)
 * - Refined typography with reduced font sizes and zero bold fonts
 * - 3 Cards: Customer Access Pass, Service Partner Pass, Careers & Joining Pass
 * - Fully responsive with clean hover states and interactive CTA buttons
 */

import React from 'react';
import { doorblyConfig } from '../config/doorblyConfig.ts';
import { useResponsive } from '../context/ResponsiveContext.tsx';
import { 
  ExternalLink,
  ShieldCheck,
  Search,
  Briefcase,
  Users
} from 'lucide-react';

interface PortalsSectionProps {
  onOpenRecruitment?: () => void;
}

export const PortalsSection: React.FC<PortalsSectionProps> = ({
  onOpenRecruitment: _onOpenRecruitment,
}) => {
  const { effectiveDensity } = useResponsive();
  const isCompact = effectiveDensity === 'compact';

  const cards = [
    {
      id: 'customer-portal',
      cardType: 'CUSTOMER ACCESS PASS',
      title: 'Find a Service',
      badge: 'FOR HOMES & BUSINESSES',
      description: 'Looking for reliable services? Discover local professionals and book the services you need from the comfort of your home.',
      buttonText: 'Explore Services',
      url: doorblyConfig.urls.customerApp,
      icon: Search,
      accentGlow: 'bg-[#14B8A6]/20 group-hover:bg-[#14B8A6]/30',
    },
    {
      id: 'partner-portal',
      cardType: 'SERVICE PARTNER PASS',
      title: 'Earn as a Partner',
      badge: 'FOR TECHNICIANS & FREELANCERS',
      description: 'Are you a skilled professional or freelancer? Join Doorbly, receive work opportunities and earn by providing services to customers.',
      buttonText: 'Become a Partner',
      url: doorblyConfig.urls.partnerApp,
      icon: Briefcase,
      accentGlow: 'bg-emerald-400/20 group-hover:bg-emerald-400/30',
    },
    {
      id: 'careers-recruitment',
      cardType: 'CAREERS & JOINING PASS',
      title: 'Join Our Team',
      badge: 'OPPORTUNITIES ACROSS 11 DEPARTMENTS',
      description: "Become a part of Doorbly's growing organisation. Apply for opportunities in management, operations, customer support, partner management, finance, sales and administration.",
      buttonText: 'Apply for a Job',
      url: doorblyConfig.urls.candidateJoiningPortal,
      icon: Users,
      accentGlow: 'bg-teal-300/20 group-hover:bg-teal-300/30',
    },
  ];

  return (
    <section id="portals" className="py-12 lg:py-16 bg-[#F7FAF9] border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DDF4ED] text-[#0F766E] text-[11px] font-medium uppercase tracking-wider mb-2.5 shadow-xs border border-[#0F766E]/15">
            <ShieldCheck size={13} className="text-[#0F766E]" />
            <span>Digital Access Cards</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#172B2A] tracking-tight font-display">
            Welcome to Doorbly
          </h2>
          <p className="mt-1.5 text-sm text-slate-600 leading-relaxed max-w-xl mx-auto font-normal">
            Choose your destination and become a part of our growing service ecosystem across Odisha.
          </p>
        </div>

        {/* 3-Card Responsive Grid - Clean, Reduced Font Size, Zero Bold Fonts, No Chips */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${isCompact ? 'gap-4 sm:gap-5' : 'gap-5 lg:gap-6'} max-w-5xl mx-auto`}>
          {cards.map((card, idx) => {
            const IconComponent = card.icon;

            return (
              <div
                key={card.id}
                className={`relative rounded-2xl ${
                  isCompact ? 'p-3.5 sm:p-4 min-h-[185px]' : 'p-4 sm:p-5 min-h-[195px]'
                } text-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group bg-gradient-to-br from-[#142C29] via-[#0E443F] to-[#0A2321] border border-[#2DD4BF]/25 hover:border-[#2DD4BF]/50 ring-1 ring-inset ring-white/10 ${
                  idx === 2 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* 1. Subtle Radial Micro-Grid Matrix Overlay */}
                <div 
                  className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#5EEAD4_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" 
                  aria-hidden="true"
                />

                {/* 2. Ambient Metallic Glow */}
                <div 
                  className={`absolute -top-14 -right-14 w-36 h-36 rounded-full ${card.accentGlow} blur-2xl pointer-events-none transition-all duration-500`}
                  aria-hidden="true"
                />

                {/* 3. Top Edge: Issuer Brand, Pass Type & Category Icon (No chips, no bold fonts) */}
                <div className="relative z-10 flex items-center justify-between pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="font-normal text-xs sm:text-sm tracking-tight text-white">
                      Door<span className="text-[#DDF4ED]">bly</span>
                    </span>
                    <span className="text-[9px] font-normal tracking-widest uppercase text-[#DDF4ED]/90">
                      {card.cardType}
                    </span>
                  </div>

                  <div className="w-6 h-6 rounded-md bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-[#DDF4ED] group-hover:scale-105 transition-transform shadow-xs">
                    <IconComponent size={13} />
                  </div>
                </div>

                {/* 4. Middle Content: Reduced Title & Description (No Chips, No Bold Fonts) */}
                <div className="relative z-10 my-2.5 space-y-1">
                  <h3 className="text-sm sm:text-[15px] font-normal text-white tracking-normal leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-[11px] font-normal text-slate-200/90 leading-relaxed line-clamp-3">
                    {card.description}
                  </p>
                </div>

                {/* 5. Bottom Edge: Eligibility & Action Button (Reduced Font, No Bold Fonts) */}
                <div className="relative z-10 pt-2.5 border-t border-teal-500/20 flex items-center justify-between gap-2.5">
                  <div className="truncate">
                    <div className="text-[8px] font-normal uppercase tracking-wider text-slate-300/80 leading-none mb-1">
                      Eligibility
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-normal text-[#DDF4ED] tracking-normal truncate">
                      {card.badge}
                    </div>
                  </div>

                  {/* Reduced Font Action Button - Zero Bold Font */}
                  <div className="shrink-0">
                    <a
                      href={card.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-3 py-1.5 text-[11px] font-normal text-[#0F766E] bg-white hover:bg-[#DDF4ED] active:bg-white/90 rounded-lg transition-all shadow-xs hover:shadow-sm group/btn whitespace-nowrap cursor-pointer hover:scale-[1.01] active:scale-100"
                    >
                      <span>{card.buttonText}</span>
                      <ExternalLink size={11} className="ml-1 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
