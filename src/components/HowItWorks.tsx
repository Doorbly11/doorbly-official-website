/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Doorbly Workflows (Section 7)
 * - Single particular ATM card design for all workflow cards
 * - Background images removed completely
 * - Deep emerald-obsidian gradient with metallic accents & subtle security micro-patterns
 * - No chip symbols, no card numbers
 * - Clean responsive grid with zero card overlap
 */

import React, { useState } from 'react';
import { doorblyConfig } from '../config/doorblyConfig.ts';
import { useResponsive } from '../context/ResponsiveContext.tsx';
import { 
  UserCheck, 
  Briefcase, 
  Search, 
  Layers, 
  CalendarCheck, 
  ShieldCheck, 
  Award,
  ExternalLink,
  UserPlus,
  BadgeCheck,
  Bell,
  Wrench,
  Wallet
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'customer' | 'partner'>('customer');
  const { effectiveDensity } = useResponsive();
  const isCompact = effectiveDensity === 'compact';

  const customerSteps = [
    {
      num: '01',
      title: 'Discover the service',
      tag: 'STEP 01 OF 05',
      phase: 'LOCAL DISCOVERY',
      desc: 'Browse through electrical, plumbing, appliance care, cleaning, and more across your locality.',
      highlight: '30 Odisha Districts Covered',
      actionText: 'Browse Now',
      icon: Search,
    },
    {
      num: '02',
      title: 'Select the service you need',
      tag: 'STEP 02 OF 05',
      phase: 'PACKAGE SELECTION',
      desc: 'Pick standard packages or custom job requests with clear, transparent upfront pricing.',
      highlight: 'Zero Hidden Fees',
      actionText: 'Select Package',
      icon: Layers,
    },
    {
      num: '03',
      title: 'Submit your booking',
      tag: 'STEP 03 OF 05',
      phase: 'INSTANT SCHEDULING',
      desc: 'Choose your preferred date, time slot, and doorstep address in just a few taps.',
      highlight: 'Same-Day & Scheduled',
      actionText: 'Book Slot',
      icon: CalendarCheck,
    },
    {
      num: '04',
      title: 'Connect with the service provider',
      tag: 'STEP 04 OF 05',
      phase: 'PRO DISPATCH',
      desc: 'A verified local professional is assigned who confirms details and arrives punctually.',
      highlight: 'Background Verified Pro',
      actionText: 'Direct Connect',
      icon: ShieldCheck,
    },
    {
      num: '05',
      title: 'Complete the service',
      tag: 'STEP 05 OF 05',
      phase: 'QUALITY SETTLEMENT',
      desc: 'Inspect the completed work, pay seamlessly via digital methods, and share your feedback.',
      highlight: 'Digital Pay & Guarantee',
      actionText: 'Quality Assured',
      icon: Award,
    },
  ];

  const partnerSteps = [
    {
      num: '01',
      title: 'Register as a partner',
      tag: 'STEP 01 OF 05',
      phase: 'PARTNER ENROLMENT',
      desc: 'Submit your basic identity credentials, phone number, and primary skill trade.',
      highlight: 'Zero Onboarding Fee',
      actionText: 'Register Free',
      icon: UserPlus,
    },
    {
      num: '02',
      title: 'Complete your profile',
      tag: 'STEP 02 OF 05',
      phase: 'SKILL VERIFICATION',
      desc: 'Verify identity documents, select your operating district, and set your availability.',
      highlight: 'Verified Pro Badge',
      actionText: 'Verify Profile',
      icon: BadgeCheck,
    },
    {
      num: '03',
      title: 'Receive work opportunities',
      tag: 'STEP 03 OF 05',
      phase: 'REAL-TIME LEADS',
      desc: 'Get notified in real-time when customers in your local area request services.',
      highlight: 'Hyper-Local Service Leads',
      actionText: 'Instant Alerts',
      icon: Bell,
    },
    {
      num: '04',
      title: 'Accept and complete assigned work',
      tag: 'STEP 04 OF 05',
      phase: 'DOORSTEP EXECUTION',
      desc: 'Reach customer premises, deliver quality service, and mark job completion.',
      highlight: 'Transparent Work Records',
      actionText: 'Deliver Care',
      icon: Wrench,
    },
    {
      num: '05',
      title: 'Earn from completed services',
      tag: 'STEP 05 OF 05',
      phase: 'DIRECT SETTLEMENT',
      desc: 'Receive direct, transparent payouts straight to your bank account with complete records.',
      highlight: 'Prompt Bank Payouts',
      actionText: 'Earn Direct',
      icon: Wallet,
    },
  ];

  const currentSteps = activeTab === 'customer' ? customerSteps : partnerSteps;
  const targetAppUrl = activeTab === 'customer' ? doorblyConfig.urls.customerApp : doorblyConfig.urls.partnerApp;

  return (
    <section id="workflow" className="py-16 lg:py-24 bg-[#F7FAF9] border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#DDF4ED] text-[#0F766E] text-[11px] font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck size={13} />
            <span>Clear, 5-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172B2A] tracking-tight font-display">
            How Doorbly Works
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            Designed for effortless doorstep booking for customers and reliable, dignified earnings for skilled professionals.
          </p>

          {/* Workflow Selector Tabs */}
          <div className="mt-7 inline-flex flex-col sm:flex-row p-1.5 bg-white border border-slate-200/80 rounded-xl shadow-xs max-w-full">
            <button
              onClick={() => setActiveTab('customer')}
              className={`px-3.5 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'customer'
                  ? 'bg-[#0F766E] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#172B2A]'
              }`}
            >
              <UserCheck size={15} />
              <span>For Customers (5 Steps)</span>
            </button>
            <button
              onClick={() => setActiveTab('partner')}
              className={`px-3.5 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'partner'
                  ? 'bg-[#0F766E] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#172B2A]'
              }`}
            >
              <Briefcase size={15} />
              <span>For Service Partners (5 Steps)</span>
            </button>
          </div>
        </div>

        {/* 5 ATM-Style Step Cards - Unified Particular Design (No Background Images) */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${isCompact ? 'gap-3.5 sm:gap-4' : 'gap-5'} max-w-5xl mx-auto mb-10`}>
          {currentSteps.map((step, idx) => {
            const IconComponent = step.icon;
            // On md screens (2 cols), 5th card spans both columns for clean symmetry
            const gridSpanClass = idx === 4 ? 'md:col-span-2 lg:col-span-1' : '';

            return (
              <div
                key={step.num}
                className={`relative rounded-2xl ${
                  isCompact ? 'p-3.5 sm:p-4 min-h-[200px] sm:min-h-[210px]' : 'p-4 sm:p-5 min-h-[220px] sm:min-h-[230px]'
                } text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group bg-gradient-to-br from-[#142C29] via-[#0E443F] to-[#0A2321] border border-[#2DD4BF]/25 ring-1 ring-inset ring-white/10 ${gridSpanClass}`}
              >
                {/* 1. Subtle Card Micro-Grid Pattern Overlay (No Background Photo) */}
                <div 
                  className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#5EEAD4_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" 
                  aria-hidden="true"
                />

                {/* 2. Ambient Metallic Hologram Top-Right Glow */}
                <div 
                  className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-[#14B8A6]/15 blur-2xl pointer-events-none group-hover:bg-[#14B8A6]/25 transition-all duration-500" 
                  aria-hidden="true"
                />

                {/* 3. Top Edge: Issuer Brand & Pass Tag (No chip, no card number) */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-base tracking-tight font-display text-white">
                      Door<span className="text-[#DDF4ED]">bly</span>
                    </span>
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-[#DDF4ED] bg-white/10 backdrop-blur-md px-2 py-0.5 rounded border border-white/20">
                      {step.tag}
                    </span>
                  </div>

                  <div className="w-7 h-7 rounded-lg bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-[#DDF4ED] group-hover:scale-105 transition-transform">
                    <IconComponent size={14} />
                  </div>
                </div>

                {/* 4. Middle Content: Stage Indicator, Step Title & Description */}
                <div className="relative z-10 my-3">
                  <div className="text-[10px] font-bold text-[#5EEAD4] uppercase tracking-wider mb-0.5">
                    Stage {step.num} • {step.phase}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold font-display text-white tracking-tight leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-200/90 leading-relaxed mt-1 line-clamp-3">
                    {step.desc}
                  </p>
                </div>

                {/* 5. Bottom Edge: Key Milestone & Compact Action Button */}
                <div className="relative z-10 pt-2.5 border-t border-teal-500/25 flex items-center justify-between gap-2.5">
                  <div className="truncate">
                    <div className="text-[8px] uppercase tracking-wider text-slate-300 font-semibold leading-none mb-0.5">Key Milestone</div>
                    <div className="text-[11px] font-bold text-[#DDF4ED] tracking-wide truncate">
                      {step.highlight}
                    </div>
                  </div>

                  {/* Compact Action Link */}
                  <a
                    href={targetAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center justify-center px-3 py-1.5 text-xs font-semibold text-[#0F766E] bg-white hover:bg-[#DDF4ED] active:bg-white/90 rounded-lg transition-all shadow-xs group/btn whitespace-nowrap cursor-pointer"
                  >
                    <span>{step.actionText}</span>
                    <ExternalLink size={11} className="ml-1 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Workflow Action Footnote */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto shadow-xs">
          <div>
            <div className="text-sm font-bold text-[#172B2A]">
              {activeTab === 'customer'
                ? 'Ready to experience professional doorstep service in Odisha?'
                : 'Ready to build a reliable income stream with verified local work?'}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              {activeTab === 'customer'
                ? 'Instant booking, verified technicians, and upfront transparent pricing.'
                : 'No registration fees, direct bank settlements, and full flexible autonomy.'}
            </div>
          </div>

          <a
            href={targetAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#0F766E] hover:bg-[#115E59] rounded-xl transition-all shadow-xs"
          >
            <span>{activeTab === 'customer' ? 'Open Customer Portal' : 'Join as Partner'}</span>
            <ExternalLink size={14} className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};
