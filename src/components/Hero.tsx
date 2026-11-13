/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Doorbly Hero Section - Light & Modern
 */

import React from 'react';
import { doorblyConfig } from '../config/doorblyConfig.ts';
import { ArrowRight, MapPin, CheckCircle2, Shield } from 'lucide-react';

interface HeroProps {
  onExploreServices: () => void;
  onJoinDoorbly: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreServices,
  onJoinDoorbly,
}) => {
  return (
    <section id="home" className="relative pt-6 pb-14 lg:pt-10 lg:pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tagline kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#DDF4ED] text-[#0F766E] text-xs font-semibold tracking-wide">
              <MapPin size={13} className="shrink-0 text-[#0F766E]" />
              <span>Everyday Services. Endless Opportunities.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-extrabold tracking-tight text-[#172B2A] leading-[1.15] text-balance font-display">
              Everything You Need.{' '}
              <span className="text-[#0F766E] block sm:inline">Right at Your Doorstep.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Doorbly connects customers with local service professionals and creates flexible earning and career opportunities for people across Odisha.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a
                href={doorblyConfig.urls.customerApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-[#0F766E] hover:bg-[#115E59] active:bg-[#0D5F58] rounded-xl shadow-xs hover:shadow transition-all group whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
              >
                <span>Explore Services</span>
                <ArrowRight size={17} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#portals"
                onClick={(e) => {
                  e.preventDefault();
                  onJoinDoorbly();
                }}
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-[#0F766E] bg-white hover:bg-[#DDF4ED]/30 border border-[#0F766E]/30 hover:border-[#0F766E] rounded-xl transition-all whitespace-nowrap"
              >
                <span>Join Doorbly</span>
              </a>
            </div>

            {/* Quiet Trust Footnote */}
            <div className="pt-3 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#0F766E]" />
                <span>Verified Local Technicians</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield size={15} className="text-[#0F766E]" />
                <span>Transparent Upfront Pricing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={15} className="text-[#0F766E]" />
                <span>Across All 30 Districts</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Hero Image */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-[#F7FAF9]">
                <img
                  src="/images/doorbly_hero_technician.jpg"
                  alt="Doorbly verified doorstep service specialist"
                  className="w-full h-[360px] sm:h-[400px] lg:h-[430px] object-cover object-top"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
