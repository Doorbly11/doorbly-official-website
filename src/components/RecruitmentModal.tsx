/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Doorbly Official Staff Recruitment Form (Section 5 Card 3 & Section 9)
 * Full 11-field application form connected to Supabase validation.
 * Displays honest backend status if Supabase is unconfigured.
 */

import React, { useState, useEffect } from 'react';
import { doorblyConfig } from '../config/doorblyConfig.ts';
import { 
  X, 
  UploadCloud, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  Briefcase, 
  ShieldAlert,
  Loader2,
  Trash2,
  Send
} from 'lucide-react';

interface RecruitmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDepartment?: string;
}

export const RecruitmentModal: React.FC<RecruitmentModalProps> = ({
  isOpen,
  onClose,
  preselectedDepartment,
}) => {
  // Form fields (11 required fields)
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const [district, setDistrict] = useState(doorblyConfig.odishaDistricts[18]); // Khordha (Bhubaneswar) default
  const [department, setDepartment] = useState(preselectedDepartment || doorblyConfig.departments[0].name);
  const [position, setPosition] = useState('');
  const [qualification, setQualification] = useState('Graduation');
  const [experience, setExperience] = useState('1 - 2 Years');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [whyJoin, setWhyJoin] = useState('');

  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'backend_unconfigured' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Check if Supabase backend is configured in environment or configuration
  const supabaseUrl = localStorage.getItem('doorbly_supabase_url') || import.meta.env.VITE_SUPABASE_URL || doorblyConfig.supabase.url;
  const supabaseKey = localStorage.getItem('doorbly_supabase_anon_key') || import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || doorblyConfig.supabase.anonKey;
  const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

  useEffect(() => {
    if (preselectedDepartment) {
      setDepartment(preselectedDepartment);
      // Find matching positions
      const matched = doorblyConfig.departments.find(d => d.name === preselectedDepartment);
      if (matched && matched.positions.length > 0) {
        setPosition(matched.positions[0]);
      }
    }
  }, [preselectedDepartment]);

  if (!isOpen) return null;

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setErrors(prev => ({ ...prev, resume: 'Please upload your resume in PDF format only.' }));
        setResumeFile(null);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, resume: 'File size exceeds 5MB limit.' }));
        setResumeFile(null);
        return;
      }
      setResumeFile(file);
      setErrors(prev => {
        const copy = { ...prev };
        delete copy.resume;
        return copy;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 3) {
      newErrors.fullName = 'Please enter your full legal name.';
    }
    const phoneClean = mobileNumber.replace(/\D/g, '');
    if (!phoneClean || phoneClean.length < 10) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number.';
    }
    if (!emailAddress.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
      newErrors.emailAddress = 'Please enter a valid email address.';
    }
    if (!currentAddress.trim() || currentAddress.trim().length < 5) {
      newErrors.currentAddress = 'Please enter your current residential address.';
    }
    if (!district) {
      newErrors.district = 'Please select your operating district in Odisha.';
    }
    if (!department) {
      newErrors.department = 'Please choose your preferred department.';
    }
    if (!position.trim()) {
      newErrors.position = 'Please specify your preferred position or role.';
    }
    if (!qualification) {
      newErrors.qualification = 'Please select your educational qualification.';
    }
    if (!experience) {
      newErrors.experience = 'Please indicate your work experience.';
    }
    if (!resumeFile) {
      newErrors.resume = 'Resume in PDF format is required.';
    }
    if (!whyJoin.trim() || whyJoin.trim().length < 15) {
      newErrors.whyJoin = 'Please provide a brief statement (at least 15 characters) on why you want to join Doorbly.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmissionStatus('idle');

    // Rule: "Do not simulate successful submissions. Connect the application form to Supabase using secure server-side submission and database validation. If the backend is not configured, clearly display that the application service is not yet available."
    if (!isSupabaseConfigured) {
      // Backend Supabase is not configured
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmissionStatus('backend_unconfigured');
        setStatusMessage(
          'Notice: Supabase Recruitment Database is not yet configured on this instance. The online submission service is currently unavailable. Please email your application and resume directly to careers@doorbly.com.'
        );
      }, 500);
      return;
    }

    try {
      // Real Supabase submission attempt with configured endpoint
      const response = await fetch(`${supabaseUrl}/rest/v1/recruitment_applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          full_name: fullName.trim(),
          mobile_number: mobileNumber.trim(),
          email: emailAddress.trim(),
          address: currentAddress.trim(),
          district,
          department,
          preferred_position: position.trim(),
          educational_qualification: qualification,
          work_experience: experience,
          why_join: whyJoin.trim(),
          resume_filename: resumeFile?.name,
          created_at: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSubmissionStatus('success');
        setStatusMessage('Your application has been received. Our HR & Administration team will review your qualifications and contact you.');
      } else {
        const errText = await response.text();
        setSubmissionStatus('error');
        setStatusMessage(`Submission failed: ${errText || 'Unable to store application in database.'}`);
      }
    } catch (err: any) {
      setSubmissionStatus('error');
      setStatusMessage(`Submission error: ${err.message || 'Database network error.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFullName('');
    setMobileNumber('');
    setEmailAddress('');
    setCurrentAddress('');
    setPosition('');
    setWhyJoin('');
    setResumeFile(null);
    setSubmissionStatus('idle');
    setErrors({});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        role="dialog"
        aria-labelledby="recruitment-title"
      >
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-[#0F766E] to-[#115E59] text-white flex items-center justify-between shrink-0">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#DDF4ED] uppercase tracking-wider mb-1">
              <Briefcase size={14} />
              <span>Official Careers & Job Application</span>
            </div>
            <h2 id="recruitment-title" className="text-xl sm:text-2xl font-bold font-display text-white">
              Apply to Join Doorbly
            </h2>
            <p className="text-xs sm:text-sm text-white/80 mt-0.5">
              Explore opportunities across Odisha in operations, management, calling, tech & support.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X size={22} />
          </button>
        </div>

        {/* Backend Configuration Warning / Status Banner */}
        {!isSupabaseConfigured && (
          <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 text-xs text-amber-900 flex items-start gap-2.5 shrink-0">
            <ShieldAlert size={16} className="text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Backend Integration Notice: </span>
              Supabase database configuration (<code className="bg-amber-100 px-1 py-0.5 rounded text-[11px]">VITE_SUPABASE_URL</code>) is pending. Applications are validated client-side and official email forwarding is available.
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {submissionStatus === 'success' ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#DDF4ED] text-[#0F766E] flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl font-bold text-[#172B2A] font-display">
                Application Submitted Successfully
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                {statusMessage}
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => {
                    resetForm();
                    onClose();
                  }}
                  className="px-6 py-2.5 text-sm font-semibold text-white bg-[#0F766E] hover:bg-[#115E59] rounded-xl transition-all"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : submissionStatus === 'backend_unconfigured' ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                <AlertCircle size={36} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#172B2A] font-display">
                Online Application Service Unavailable
              </h3>
              <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                {statusMessage}
              </p>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-left max-w-md mx-auto space-y-2 text-xs text-slate-700">
                <div className="font-bold text-[#172B2A] text-sm">Direct Application Channel:</div>
                <div><span className="font-semibold">Email:</span> careers@doorbly.com / hr@doorbly.com</div>
                <div><span className="font-semibold">Subject line:</span> Application for {position || department} - {fullName || 'Applicant'}</div>
                <div><span className="font-semibold">Office:</span> Infocity Road, Patia, Bhubaneswar, Odisha 751024</div>
              </div>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => setSubmissionStatus('idle')}
                  className="px-5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
                >
                  Edit Application Details
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#0F766E] hover:bg-[#115E59] rounded-lg"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {submissionStatus === 'error' && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {/* 1. Full Name & 2. Mobile Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    1. Full Legal Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full legal name"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E] transition-all ${
                      errors.fullName ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                    }`}
                  />
                  {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    2. Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    maxLength={13}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E] transition-all ${
                      errors.mobileNumber ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                    }`}
                  />
                  {errors.mobileNumber && <p className="text-[11px] text-red-500 mt-1">{errors.mobileNumber}</p>}
                </div>
              </div>

              {/* 3. Email Address & 4. Current Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    3. Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    placeholder="Enter your email address"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E] transition-all ${
                      errors.emailAddress ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                    }`}
                  />
                  {errors.emailAddress && <p className="text-[11px] text-red-500 mt-1">{errors.emailAddress}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    4. Current Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={currentAddress}
                    onChange={(e) => setCurrentAddress(e.target.value)}
                    placeholder="Enter street, locality, city/town"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E] transition-all ${
                      errors.currentAddress ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                    }`}
                  />
                  {errors.currentAddress && <p className="text-[11px] text-red-500 mt-1">{errors.currentAddress}</p>}
                </div>
              </div>

              {/* 5. District & 6. Preferred Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    5. District (Odisha) <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E] transition-all"
                  >
                    {doorblyConfig.odishaDistricts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    6. Preferred Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={department}
                    onChange={(e) => {
                      setDepartment(e.target.value);
                      const deptObj = doorblyConfig.departments.find(d => d.name === e.target.value);
                      if (deptObj && deptObj.positions.length > 0) {
                        setPosition(deptObj.positions[0]);
                      }
                    }}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E] transition-all"
                  >
                    {doorblyConfig.departments.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 7. Preferred Position & 8. Educational Qualification */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    7. Preferred Position <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="Enter preferred position"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E] transition-all ${
                      errors.position ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                    }`}
                  />
                  {errors.position && <p className="text-[11px] text-red-500 mt-1">{errors.position}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    8. Educational Qualification <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E] transition-all"
                  >
                    <option value="10th Standard / Matriculation">10th Standard / Matriculation</option>
                    <option value="12th Standard / Intermediate">12th Standard / Intermediate</option>
                    <option value="Diploma / ITI Certification">Diploma / ITI Certification</option>
                    <option value="Bachelor's Degree (BA, B.Com, B.Sc, B.Tech, BBA)">Bachelor's Degree (Graduation)</option>
                    <option value="Master's Degree (MA, M.Com, M.Sc, M.Tech, MBA)">Master's Degree (Post-Graduation)</option>
                    <option value="Other Professional Qualification">Other Professional Qualification</option>
                  </select>
                </div>
              </div>

              {/* 9. Work Experience */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  9. Work Experience <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Fresher', '1 - 2 Years', '3 - 5 Years', '5+ Years'].map((exp) => (
                    <button
                      type="button"
                      key={exp}
                      onClick={() => setExperience(exp)}
                      className={`px-3 py-2 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                        experience === exp
                          ? 'bg-[#0F766E] text-white border-[#0F766E]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {exp}
                    </button>
                  ))}
                </div>
              </div>

              {/* 10. Resume Upload (PDF) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  10. Resume Upload (PDF only, max 5MB) <span className="text-red-500">*</span>
                </label>
                {resumeFile ? (
                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-emerald-300 bg-emerald-50/40">
                    <div className="flex items-center gap-2.5 truncate">
                      <FileText size={20} className="text-[#0F766E] shrink-0" />
                      <div className="truncate">
                        <div className="text-xs font-bold text-slate-800 truncate">{resumeFile.name}</div>
                        <div className="text-[11px] text-slate-500">{(resumeFile.size / 1024).toFixed(1)} KB · PDF</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setResumeFile(null)}
                      className="p-1.5 text-slate-500 hover:text-red-500 rounded-lg hover:bg-white"
                      title="Remove file"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ) : (
                  <label className={`border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                    errors.resume ? 'border-red-400 bg-red-50/20' : 'border-slate-300 hover:border-[#0F766E] bg-slate-50/50'
                  }`}>
                    <UploadCloud size={24} className="text-[#0F766E] mb-1.5" />
                    <span className="text-xs font-semibold text-slate-700">Click to choose PDF file or drag and drop</span>
                    <span className="text-[11px] text-slate-500 mt-0.5">PDF documents only (max 5MB)</span>
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handleResumeChange}
                      className="hidden"
                    />
                  </label>
                )}
                {errors.resume && <p className="text-[11px] text-red-500 mt-1">{errors.resume}</p>}
              </div>

              {/* 11. Why do you want to join Doorbly? */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  11. Why do you want to join Doorbly? <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={whyJoin}
                  onChange={(e) => setWhyJoin(e.target.value)}
                  placeholder="Tell us about your background, motivation, and how you want to contribute to Doorbly across Odisha..."
                  className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E] transition-all resize-none ${
                    errors.whyJoin ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                  }`}
                />
                {errors.whyJoin && <p className="text-[11px] text-red-500 mt-1">{errors.whyJoin}</p>}
              </div>

              {/* Submit Application Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-[#0F766E] hover:bg-[#115E59] active:bg-[#0D5F58] rounded-xl transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      <span>Validating & Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} className="mr-2" />
                      <span>Submit Application</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
