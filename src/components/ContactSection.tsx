/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Doorbly Contact Section (Section 11)
 * Uses centralized configurable contact settings from doorblyConfig.
 */

import React, { useState } from 'react';
import { doorblyConfig } from '../config/doorblyConfig.ts';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Service Inquiry');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please provide your name.';
    if (!mobile.trim() || mobile.replace(/\D/g, '').length < 10) {
      errs.mobile = 'Please enter a valid 10-digit mobile number.';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!message.trim() || message.trim().length < 10) {
      errs.message = 'Please provide a message with at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError('');

    const supabaseUrl = localStorage.getItem('doorbly_supabase_url') || import.meta.env.VITE_SUPABASE_URL || doorblyConfig.supabase.url;
    const supabaseKey = localStorage.getItem('doorbly_supabase_anon_key') || import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || doorblyConfig.supabase.anonKey;

    if (!supabaseUrl || !supabaseKey) {
      setIsSubmitting(false);
      setSubmitError(`Database endpoint is pending configuration. Please email your inquiry directly to ${doorblyConfig.contact.email}`);
      return;
    }

    try {
      const cleanUrl = supabaseUrl.trim().replace(/\/$/, '');
      const response = await fetch(`${cleanUrl}/rest/v1/contact_inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          name: name.trim(),
          mobile: mobile.trim(),
          email: email.trim(),
          subject,
          message: message.trim(),
          created_at: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const errText = await response.text();
        setSubmitError(errText || `Unable to send message to database. Please email us directly at ${doorblyConfig.contact.email}`);
      }
    } catch (err: any) {
      setSubmitError(err.message || `Network error. Please email us directly at ${doorblyConfig.contact.email}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-[#F7FAF9] border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0F766E] mb-2">
            Get in Touch
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#172B2A] tracking-tight font-display">
            Contact Doorbly
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Have a question about booking doorstep services, becoming a partner, or corporate alliances in Odisha?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Official Contact Settings from doorblyConfig */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <h3 className="text-xl font-bold text-[#172B2A] font-display">
                Corporate Headquarters & Support
              </h3>

              <div className="space-y-4">
                {/* Office Location */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#DDF4ED] text-[#0F766E] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Odisha Technology Hub</div>
                    <div className="text-sm font-medium text-slate-800 leading-relaxed mt-0.5">
                      {doorblyConfig.contact.corporateOffice.addressLine1},<br />
                      {doorblyConfig.contact.corporateOffice.city}, {doorblyConfig.contact.corporateOffice.state} – {doorblyConfig.contact.corporateOffice.postalCode}, {doorblyConfig.contact.corporateOffice.country}
                    </div>
                  </div>
                </div>

                {/* Email Support */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#DDF4ED] text-[#0F766E] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Official Email</div>
                    <div className="text-sm font-medium text-slate-800 mt-0.5">
                      <a href={`mailto:${doorblyConfig.contact.email}`} className="text-[#0F766E] hover:underline">
                        {doorblyConfig.contact.email}
                      </a>
                    </div>
                    <div className="text-xs text-slate-500">
                      Support: {doorblyConfig.contact.supportEmail}
                    </div>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#DDF4ED] text-[#0F766E] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Helpline & Desk</div>
                    <div className="text-sm font-semibold text-slate-800 mt-0.5">
                      {doorblyConfig.contact.phone}
                    </div>
                    <div className="text-xs text-slate-500">
                      Toll-Free: {doorblyConfig.contact.tollFree}
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#DDF4ED] text-[#0F766E] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Operational Hours</div>
                    <div className="text-sm text-slate-700 mt-0.5">
                      {doorblyConfig.contact.supportHours}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#DDF4ED] text-[#0F766E] flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-bold text-[#172B2A] font-display">
                  Message Dispatched
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-slate-800">{name}</span>. Your message has been logged with Doorbly Support. Our team will get back to you at <span className="font-semibold text-slate-800">{email}</span> shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setMobile('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="px-5 py-2.5 text-xs font-semibold text-[#0F766E] bg-[#DDF4ED] hover:bg-[#DDF4ED]/70 rounded-xl transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-[#172B2A] mb-4 font-display">
                  Send a Direct Message
                </h3>

                {submitError && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Name & Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E] transition-all ${
                        errors.name ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                      }`}
                    />
                    {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="Enter 10-digit mobile number"
                      maxLength={12}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E] transition-all ${
                        errors.mobile ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                      }`}
                    />
                    {errors.mobile && <p className="text-[11px] text-red-500 mt-1">{errors.mobile}</p>}
                  </div>
                </div>

                {/* Email & Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E] transition-all ${
                        errors.email ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                    >
                      <option value="Service Inquiry">Customer Service Inquiry</option>
                      <option value="Partner Onboarding">Partner Onboarding Question</option>
                      <option value="Corporate Alliance">Corporate / B2B Partnership</option>
                      <option value="Careers Inquiry">Recruitment / Careers Inquiry</option>
                      <option value="Media & Press">Media & General Inquiry</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe how we can assist you..."
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E] transition-all resize-none ${
                      errors.message ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                    }`}
                  />
                  {errors.message && <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>}
                </div>

                {/* Submit button */}
                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center px-7 py-3 text-sm font-semibold text-white bg-[#0F766E] hover:bg-[#115E59] active:bg-[#0D5F58] rounded-xl shadow-xs transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <Send size={15} className="mr-2" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
