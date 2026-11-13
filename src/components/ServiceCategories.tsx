/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Doorbly Service Categories Section (Section 6) - Lighter & Streamlined
 */

import React from 'react';
import { doorblyConfig } from '../config/doorblyConfig.ts';
import { 
  Zap, 
  Droplets, 
  Sparkles, 
  Wrench, 
  Cpu, 
  Hammer, 
  Paintbrush, 
  ShieldAlert, 
  HeartHandshake, 
  Laptop, 
  Truck, 
  Building2, 
  Briefcase, 
  Grid,
  ArrowRight
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Zap,
  Droplets,
  Sparkles,
  Wrench,
  Cpu,
  Hammer,
  Paintbrush,
  ShieldAlert,
  HeartHandshake,
  Laptop,
  Truck,
  Building2,
  Briefcase,
  Grid,
};

export const ServiceCategories: React.FC = () => {
  return (
    <section id="services" className="py-14 lg:py-20 bg-[#F7FAF9] border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0F766E] mb-2">
            Service Verticals
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172B2A] tracking-tight font-display">
            Everything You Need, All in One Place
          </h2>
          <p className="mt-2.5 text-base text-slate-600 leading-relaxed">
            Professional doorstep services available across homes and businesses in Odisha.
          </p>
        </div>

        {/* Streamlined Categories Grid (14 categories) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3.5 mb-10">
          {doorblyConfig.categories.map((cat) => {
            const IconComponent = iconMap[cat.iconName] || Grid;

            return (
              <a
                key={cat.id}
                href={doorblyConfig.urls.customerApp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 sm:p-4 rounded-xl border border-slate-200/80 bg-white hover:border-[#0F766E] hover:shadow-xs transition-all flex flex-col items-center justify-center text-center gap-2 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#F7FAF9] text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white flex items-center justify-center transition-colors">
                  <IconComponent size={20} />
                </div>
                <span className="text-xs sm:text-[13px] font-semibold text-slate-800 group-hover:text-[#0F766E] transition-colors leading-tight line-clamp-2">
                  {cat.name}
                </span>
              </a>
            );
          })}
        </div>

        {/* Explore All Services CTA */}
        <div className="text-center">
          <a
            href={doorblyConfig.urls.customerApp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-white bg-[#0F766E] hover:bg-[#115E59] active:bg-[#0D5F58] rounded-xl shadow-xs hover:shadow transition-all group whitespace-nowrap"
          >
            <span>Explore All Services</span>
            <ArrowRight size={17} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
