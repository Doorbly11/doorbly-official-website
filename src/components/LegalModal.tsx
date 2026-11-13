/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Doorbly Legal Modals (Privacy Policy & Terms and Conditions)
 */

import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[85vh] flex flex-col"
        role="dialog"
      >
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-[#DDF4ED]">
              {isPrivacy ? <ShieldCheck size={20} /> : <FileText size={20} />}
            </div>
            <div>
              <h2 className="text-xl font-bold font-display text-white">
                {isPrivacy ? 'Privacy Policy' : 'Terms and Conditions'}
              </h2>
              <div className="text-xs text-slate-400">Official Policy · Updated 2026 · Doorbly Technologies</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Legal Text Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          {isPrivacy ? (
            <>
              <p>
                <strong>1. Commitment to Privacy:</strong> Doorbly Technologies ("Doorbly", "we", "us", or "our") respects the privacy of customers, service partners, job applicants, and staff across Odisha. This policy details how personal information is handled when using doorbly.com and associated applications.
              </p>
              <p>
                <strong>2. Information Collected:</strong> We collect necessary identification data including names, phone numbers, email addresses, service locations within Odisha districts, and service history strictly to fulfill requested bookings and process professional partner onboarding.
              </p>
              <p>
                <strong>3. Use of Information:</strong> Personal data is utilized exclusively for service coordination, technician dispatch, safety verification, invoice generation, customer support resolution, and employment candidate evaluation.
              </p>
              <p>
                <strong>4. Data Protection & Sharing:</strong> We do not sell, rent, or trade your personal data. Data is shared with assigned service professionals solely to the extent necessary to deliver booked doorstep services.
              </p>
              <p>
                <strong>5. Contact:</strong> For inquiries regarding your privacy rights or data removal, contact our data privacy officer at <span className="text-[#0F766E] font-medium">privacy@doorbly.com</span>.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>1. Acceptance of Terms:</strong> By accessing Doorbly’s website, booking applications, or partner portals, you agree to comply with and be bound by these official terms and conditions.
              </p>
              <p>
                <strong>2. Service Marketplace:</strong> Doorbly provides a technology platform connecting independent service professionals and households. Service execution adheres to platform quality benchmarks and standard pricing schedules.
              </p>
              <p>
                <strong>3. Partner Engagement:</strong> Independent service professionals must complete background verification and adhere to customer safety standards. Partner earnings are settled in accordance with official commission schedules.
              </p>
              <p>
                <strong>4. Governing Law:</strong> These terms shall be governed by and interpreted in accordance with the laws of the State of Odisha and the Republic of India. Jurisdiction resides with courts in Bhubaneswar, Odisha.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#0F766E] hover:bg-[#115E59] rounded-lg transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
