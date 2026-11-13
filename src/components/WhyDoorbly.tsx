/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Why Doorbly? Feature Section (Section 8)
 */

import React from 'react';
import { 
  Compass, 
  UserCheck2, 
  Coins, 
  Smartphone, 
  Layers, 
  MapPin, 
  Clock, 
  GraduationCap 
} from 'lucide-react';

export const WhyDoorbly: React.FC = () => {
  const features = [
    {
      title: 'Convenient Service Discovery',
      desc: 'Browse, compare, and schedule doorstep solutions tailored to your schedule without endless phone calls.',
      icon: Compass,
    },
    {
      title: 'Local Service Professionals',
      desc: 'Connect with verified, background-checked specialists residing right within your district and community.',
      icon: UserCheck2,
    },
    {
      title: 'Flexible Earning Opportunities',
      desc: 'Gig partners and tradespeople take complete control of their work hours, accepted jobs, and revenue.',
      icon: Coins,
    },
    {
      title: 'Digital Booking Experience',
      desc: 'Real-time booking statuses, transparent billing, and digital transaction receipts from start to finish.',
      icon: Smartphone,
    },
    {
      title: 'Multiple Service Categories',
      desc: 'From essential electrical fixes to corporate facility management, access 14+ specialized service verticals.',
      icon: Layers,
    },
    {
      title: 'Growing Odisha Network',
      desc: 'Building grassroots presence across coastal cities, industrial zones, and rural district headquarters.',
      icon: MapPin,
    },
    {
      title: 'Customer Convenience',
      desc: 'Timely doorstep arrivals, standard transparent rates, and responsive customer grievance resolution.',
      icon: Clock,
    },
    {
      title: 'Professional Development',
      desc: 'Structured skill enrichment, trade safety protocols, and digital literacy training for our partner workforce.',
      icon: GraduationCap,
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0F766E] mb-2">
            The Doorbly Advantage
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#172B2A] tracking-tight font-display">
            Why Doorbly?
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Empowering Odisha's families with dependable services while elevating the livelihood of skilled local workers.
          </p>
        </div>

        {/* 8 Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-[#F7FAF9] border border-slate-200/70 hover:border-[#0F766E]/50 transition-all hover:shadow-xs group"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/80 text-[#0F766E] flex items-center justify-center mb-5 group-hover:bg-[#0F766E] group-hover:text-white transition-colors">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-[#172B2A] mb-2 leading-snug font-display">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
