/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * About Doorbly Section (Section 10)
 * Authentic company philosophy, mission, vision, commitment, and business model.
 * Adheres strictly to: "Do not invent company establishment dates, achievements or statistics."
 */

import React, { useState } from 'react';
import { Target, Eye, ShieldCheck, Cpu, ArrowUpRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'commitment' | 'model'>('mission');

  const pillars = [
    {
      id: 'mission',
      title: 'Our Mission',
      icon: Target,
      tagline: 'Bridging Homes and Trusted Hands',
      content:
        'To organize and elevate local doorstep services across Odisha by connecting households and enterprises with vetted, dependable professionals, while empowering tradespeople with regular work opportunities and economic dignity.',
      points: [
        'Accessible, transparent doorstep booking across urban and district centers',
        'Transparent pricing models with zero hidden markups',
        'Standardized service safety, background verification, and quality checklists',
      ],
    },
    {
      id: 'vision',
      title: 'Our Vision',
      icon: Eye,
      tagline: 'Odisha’s Premier Service & Work Ecosystem',
      content:
        'To establish Doorbly as the benchmark service network in eastern India, where any resident can access quality assistance within an hour and every skilled technician finds continuous, respectable livelihood.',
      points: [
        'Comprehensive grassroots coverage across all 30 districts of Odisha',
        'Empowerment of youth and vocational institute graduates through structured skilling',
        'Digital-first service orchestration tailored to regional languages and local needs',
      ],
    },
    {
      id: 'commitment',
      title: 'Our Commitment',
      icon: ShieldCheck,
      tagline: 'Reliability, Safety and Accountability',
      content:
        'We stand behind every service completed through our network. From customer grievance resolution to fair, timely compensation for service partners, integrity governs every interaction.',
      points: [
        'Rigorous identity verification for all service professionals',
        'Prompt grievance escalation and transparent dispute settlement',
        'Timely, direct-to-bank weekly payouts for registered gig partners',
      ],
    },
    {
      id: 'model',
      title: 'Our Business Model',
      icon: Cpu,
      tagline: 'Sustainably Shared Value Creation',
      content:
        'Doorbly operates as a technology-enabled marketplace aligning customer convenience with worker prosperity. We generate revenue through nominal platform facilitation fees, enabling reinvestment into partner training, technology infrastructure, and regional hubs.',
      points: [
        'Zero registration barrier for entry-level skilled workers and freelancers',
        'Transparent fee structure that maximizes take-home earnings for partners',
        'Enterprise facility management and institutional service contracts for predictable revenue',
      ],
    },
  ];

  const currentPillar = pillars.find((p) => p.id === activeTab) || pillars[0];
  const IconComponent = currentPillar.icon;

  return (
    <section id="about" className="py-16 lg:py-24 bg-white border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0F766E] mb-2">
            Company Overview
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#172B2A] tracking-tight font-display">
            Connecting People, Services and Opportunities.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Doorbly is building a connected service ecosystem designed to make everyday services accessible and create earning and employment opportunities for people throughout Odisha.
          </p>
        </div>

        {/* 4 Pillars Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tab Navigation List */}
          <div className="lg:col-span-4 flex flex-col gap-2.5">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              const isSelected = pillar.id === activeTab;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActiveTab(pillar.id as any)}
                  className={`p-4 rounded-xl text-left transition-all border flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#0F766E] text-white border-[#0F766E] shadow-sm'
                      : 'bg-[#F7FAF9] text-slate-700 border-slate-200/80 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                  aria-selected={isSelected}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-white text-[#0F766E]'
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <span className="font-bold text-sm font-display tracking-wide">{pillar.title}</span>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className={`transition-transform ${isSelected ? 'text-white' : 'text-slate-400'}`}
                  />
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          <div className="lg:col-span-8 bg-[#F7FAF9] rounded-2xl border border-slate-200/80 p-8 sm:p-10 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#0F766E] text-white flex items-center justify-center">
                <IconComponent size={24} />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                  Core Foundation
                </span>
                <h3 className="text-2xl font-bold text-[#172B2A] font-display">
                  {currentPillar.title}
                </h3>
              </div>
            </div>

            <div className="text-base font-semibold text-slate-800 mb-3">
              {currentPillar.tagline}
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
              {currentPillar.content}
            </p>

            <div className="pt-5 border-t border-slate-200/80 space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Key Strategic Commitments:
              </div>
              <ul className="space-y-2">
                {currentPillar.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0F766E] shrink-0 mt-2" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
