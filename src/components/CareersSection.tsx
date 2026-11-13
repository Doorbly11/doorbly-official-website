/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Doorbly Careers Section (Section 9)
 */

import React from 'react';
import { doorblyConfig, DepartmentInfo } from '../config/doorblyConfig.ts';
import { 
  Building, 
  ArrowUpRight, 
  Briefcase, 
  Sparkles,
  MapPin,
  ChevronRight
} from 'lucide-react';

interface CareersSectionProps {
  onSelectDepartment: (deptName: string) => void;
  onOpenRecruitment: () => void;
}

export const CareersSection: React.FC<CareersSectionProps> = ({
  onSelectDepartment,
  onOpenRecruitment,
}) => {
  return (
    <section id="careers" className="py-16 lg:py-24 bg-gradient-to-b from-white via-[#F7FAF9] to-white border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#DDF4ED] text-[#0F766E] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles size={14} />
            <span>Opportunities in Odisha</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#172B2A] tracking-tight font-display">
            Build Your Career. Grow With Doorbly.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            We are building an organisation that connects people, services and opportunities. Join our team and contribute to the growth of Doorbly across Odisha.
          </p>
        </div>

        {/* 11 Departments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {doorblyConfig.departments.map((dept) => (
            <div
              key={dept.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-[#0F766E]/50 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F7FAF9] text-[#0F766E] flex items-center justify-center group-hover:bg-[#0F766E] group-hover:text-white transition-colors">
                    <Building size={18} />
                  </div>
                  <span className="text-[11px] font-semibold text-[#0F766E] bg-[#DDF4ED] px-2.5 py-0.5 rounded-md">
                    Opportunities
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#172B2A] mb-2 group-hover:text-[#0F766E] transition-colors font-display">
                  {dept.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {dept.description}
                </p>

                {/* Department Roles */}
                <div className="space-y-1 mb-4">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Department Roles:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {dept.positions.map((pos) => (
                      <span key={pos} className="text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200/70 px-2 py-0.5 rounded">
                        {pos}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <a
                  href={doorblyConfig.urls.candidateJoiningPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-between text-xs font-bold text-[#0F766E] hover:text-[#115E59] py-1 cursor-pointer"
                >
                  <span>Apply for this department</span>
                  <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Big Careers CTA */}
        <div className="text-center">
          <a
            href={doorblyConfig.urls.candidateJoiningPortal}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-[#0F766E] hover:bg-[#115E59] active:bg-[#0D5F58] rounded-xl shadow-xs hover:shadow-md transition-all group whitespace-nowrap cursor-pointer"
          >
            <span>Apply for a Job</span>
            <ArrowUpRight size={18} className="ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <p className="text-xs text-slate-500 mt-2.5">
            Opens the official Doorbly Candidate Joining & Role Portal
          </p>
        </div>
      </div>
    </section>
  );
};
