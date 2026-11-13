/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Doorbly Global Configuration
 * Centralized administrative configuration for URLs, contact details,
 * service categories, departments, Odisha districts, and brand metadata.
 */

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  iconName: string;
  highlight?: string;
  popular?: boolean;
}

export interface DepartmentInfo {
  id: string;
  name: string;
  description: string;
  positions: string[];
}

export interface ContactConfig {
  email: string;
  supportEmail: string;
  phone: string;
  tollFree: string;
  corporateOffice: {
    addressLine1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  supportHours: string;
}

export interface SocialLinks {
  linkedin: string;
  twitter: string;
  instagram: string;
  facebook: string;
  youtube: string;
}

export interface DoorblyConfiguration {
  companyName: string;
  tagline: string;
  officialDomain: string;
  officialLogoUrl: string;
  urls: {
    customerApp: string;
    partnerApp: string;
    candidateJoiningPortal: string;
    officialLogin: string;
  };
  contact: ContactConfig;
  socials: SocialLinks;
  categories: ServiceCategory[];
  departments: DepartmentInfo[];
  odishaDistricts: string[];
  supabase: {
    url: string;
    anonKey: string;
  };
  supabaseStatus: {
    isConfigured: boolean;
    notice: string;
  };
}

export const doorblyConfig: DoorblyConfiguration = {
  companyName: "Doorbly",
  tagline: "Everyday Services. Endless Opportunities.",
  officialDomain: "https://doorbly.com",
  officialLogoUrl: "https://rzmayjergtzxgfhohwju.supabase.co/storage/v1/object/sign/official%20logo/Glossy%20Teal%20Connected%20Loop%20Emblem.png?token=eyJraWQiOiIyMjI3ZmFjYi0xY2E5LTQyYTEtOTZlOS04OTAzNmY1OWI1NDIiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJvZmZpY2lhbCBsb2dvL0dsb3NzeSBUZWFsIENvbm5lY3RlZCBMb29wIEVtYmxlbS5wbmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzkzNTQ4MTQwLCJleHAiOjE4MjUwODQxNDB9.tMvTlYzbZ2b9XD0NIlAcbQGGrDAe4iSr4yj7ZPEkm4SlpB_XOn_h6b8wXwqpP8kCJwNMtYYKXIfsqbbnQRpDvg",
  urls: {
    // Exact URLs from user specifications
    customerApp: import.meta.env.VITE_CUSTOMER_APP_URL || "https://doorbly-customer-booking-app.vercel.app/",
    partnerApp: import.meta.env.VITE_PARTNER_APP_URL || "https://doorbly-partner-app-4rhr.vercel.app/",
    candidateJoiningPortal: import.meta.env.VITE_CANDIDATE_JOINING_PORTAL_URL || "https://doorbly-candidate-joining-role-port.vercel.app/",
    officialLogin: import.meta.env.VITE_DOORBLY_OFFICIAL_LOGIN_URL || import.meta.env.VITE_DOORBLY_STAFF_PORTAL_URL || "https://doorbly-official-staff-workstation.vercel.app/",
  },
  contact: {
    email: "contact@doorbly.com",
    supportEmail: "support@doorbly.com",
    phone: "+91 674 296 0147",
    tollFree: "1800-889-3667",
    corporateOffice: {
      addressLine1: "Doorbly Technology Hub, Infocity Road, Patia",
      city: "Bhubaneswar",
      state: "Odisha",
      postalCode: "751024",
      country: "India",
    },
    supportHours: "Monday – Saturday: 8:00 AM – 8:00 PM IST",
  },
  socials: {
    linkedin: "https://www.linkedin.com/company/doorbly",
    twitter: "https://twitter.com/doorbly_in",
    instagram: "https://instagram.com/doorbly.official",
    facebook: "https://facebook.com/doorbly.services",
    youtube: "https://youtube.com/@doorbly",
  },
  categories: [
    {
      id: "electrical",
      name: "Electrical Services",
      description: "Wiring, switchboard fixes, fixture installations, and fault inspection by certified technicians.",
      iconName: "Zap",
      popular: true,
      highlight: "Quick 60-min response",
    },
    {
      id: "plumbing",
      name: "Plumbing Services",
      description: "Leak repairs, pipe fitting, sanitary fixture setup, bathroom installations, and water tank cleaning.",
      iconName: "Droplets",
      popular: true,
      highlight: "Reliable & clean work",
    },
    {
      id: "home-cleaning",
      name: "Home Cleaning",
      description: "Deep house cleaning, kitchen scrubbing, bathroom sanitization, sofa and carpet shampooing.",
      iconName: "Sparkles",
      popular: true,
      highlight: "Eco-friendly chemicals",
    },
    {
      id: "home-repair",
      name: "Home Repair & Maintenance",
      description: "General handyman repairs, masonry touch-ups, door handles, lock replacements, and preventative maintenance.",
      iconName: "Wrench",
    },
    {
      id: "ac-appliance",
      name: "AC & Appliance Services",
      description: "AC filter cleaning, gas refill, refrigerator repair, washing machine servicing, and microwave diagnostics.",
      iconName: "Cpu",
      popular: true,
      highlight: "Standard warranty",
    },
    {
      id: "carpentry",
      name: "Carpentry",
      description: "Custom furniture repair, shelf installation, modular kitchen fittings, door alignments, and wood polishing.",
      iconName: "Hammer",
    },
    {
      id: "painting-interior",
      name: "Painting & Interior",
      description: "Fresh interior and exterior painting, waterproof coating, wallpaper application, and texture finishing.",
      iconName: "Paintbrush",
    },
    {
      id: "pest-control",
      name: "Pest Control",
      description: "Anti-termite treatment, mosquito fogging, cockroach gel application, rodent management, and bedbug control.",
      iconName: "ShieldAlert",
    },
    {
      id: "beauty-personal-care",
      name: "Beauty & Personal Care",
      description: "At-home salon, hair styling, skin treatments, bridal grooming, and massage therapies by verified beauticians.",
      iconName: "HeartHandshake",
    },
    {
      id: "computer-it",
      name: "Computer & IT Services",
      description: "Laptop hardware repair, OS troubleshooting, home Wi-Fi and router configuration, data backup, and printer setup.",
      iconName: "Laptop",
    },
    {
      id: "transportation-delivery",
      name: "Transportation & Delivery",
      description: "Local goods shifting, two-wheeler parcel dispatch, intracity cargo, and prompt on-demand logistics.",
      iconName: "Truck",
    },
    {
      id: "business-corporate",
      name: "Business & Corporate Services",
      description: "Facility facility management, office sanitization, workstation maintenance, and corporate service contracts.",
      iconName: "Building2",
    },
    {
      id: "freelance-services",
      name: "Freelance Services",
      description: "Local content creators, event photography, graphic design, translation, and skilled gig specialists.",
      iconName: "Briefcase",
    },
    {
      id: "other-local",
      name: "Other Local Services",
      description: "Specialized doorstep assistance, local errands, appliance rentals, and community support tasks.",
      iconName: "Grid",
    },
  ],
  departments: [
    {
      id: "district-mgmt",
      name: "District Management",
      description: "Lead regional hub operations, district expansion, community partnerships, and service quality across Odisha districts.",
      positions: ["District Operations Lead", "City Expansion Manager", "Field Area Supervisor"],
    },
    {
      id: "operations",
      name: "Operations",
      description: "Manage day-to-day service fulfillment, partner dispatch, SLA adherence, and doorstep customer satisfaction.",
      positions: ["Operations Executive", "Fulfillment Coordinator", "Logistics Specialist"],
    },
    {
      id: "customer-support",
      name: "Customer Support",
      description: "Deliver responsive, empathetic customer care, real-time ticket resolution, and service escalation handling in English, Odia & Hindi.",
      positions: ["Customer Success Representative", "Helpdesk Associate", "Escalation Specialist"],
    },
    {
      id: "partner-mgmt",
      name: "Partner Management",
      description: "Onboard, verify, skill-train, and support local service professionals and gig workers entering the platform.",
      positions: ["Partner Onboarding Executive", "Vendor Relations Manager", "Partner Training Officer"],
    },
    {
      id: "business-dev",
      name: "Business Development",
      description: "Establish strategic enterprise tie-ups, residential society accounts, commercial real estate partnerships, and bulk vendor contracts.",
      positions: ["B2B Sales Manager", "Corporate Partnership Associate", "Institutional Growth Lead"],
    },
    {
      id: "corporate-calling",
      name: "Corporate Calling",
      description: "Engage B2B clients, corporate offices, and property management firms with tailored enterprise doorstep packages.",
      positions: ["Corporate Tele-Sales Specialist", "B2B Account Executive"],
    },
    {
      id: "residential-calling",
      name: "Residential Calling",
      description: "Reach residential welfare associations (RWAs), housing societies, and apartment complexes with localized seasonal packages.",
      positions: ["Outbound Support Representative", "Residential Outreach Officer"],
    },
    {
      id: "finance",
      name: "Finance",
      description: "Oversee partner payout reconciliation, taxation, accounts payable, invoicing, and prudent financial reporting.",
      positions: ["Accounts Executive", "Billing & Payout Specialist", "Financial Analyst"],
    },
    {
      id: "hr-admin",
      name: "HR & Administration",
      description: "Drive talent acquisition, employee welfare, workplace policies, onboarding, and internal corporate governance.",
      positions: ["Human Resources Generalist", "Recruiter", "Office Administration Manager"],
    },
    {
      id: "tech-support",
      name: "Technology Support",
      description: "Maintain web portals, partner apps, staff tools, IT helpdesk, system monitoring, and hardware workstations.",
      positions: ["Full-Stack Engineer", "IT Infrastructure Support", "QA & Systems Tester"],
    },
    {
      id: "mis-data",
      name: "MIS & Data Management",
      description: "Synthesize platform operational metrics, service completion rates, district demand heatmaps, and executive dashboards.",
      positions: ["MIS Executive", "Data Operations Analyst", "Reporting Specialist"],
    },
  ],
  odishaDistricts: [
    "Angul",
    "Balangir (Bolangir)",
    "Balasore (Baleswar)",
    "Bargarh",
    "Bhadrak",
    "Boudh",
    "Cuttack",
    "Deogarh",
    "Dhenkanal",
    "Gajapati",
    "Ganjam",
    "Jagatsinghpur",
    "Jajpur",
    "Jharsuguda",
    "Kalahandi",
    "Kandhamal",
    "Kendrapara",
    "Kendujhar (Keonjhar)",
    "Khordha (Bhubaneswar)",
    "Koraput",
    "Malkangiri",
    "Mayurbhanj",
    "Nabarangpur",
    "Nayagarh",
    "Nuapada",
    "Puri",
    "Rayagada",
    "Sambalpur",
    "Subarnapur (Sonepur)",
    "Sundargarh",
  ],
  supabase: {
    url: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || "https://nnrreqvakdhlveqfmdgq.supabase.co",
    anonKey: (typeof import.meta !== 'undefined' && (import.meta.env?.VITE_SUPABASE_ANON_KEY || import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY)) || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ucnJlcXZha2RobHZlcWZtZGdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQwNzE2NTUsImV4cCI6MjEwOTY0NzY1NX0.ZNPFX2XOYmCrRPmarJff1_Oszg1Yyd-l9VTSNT_GVZg",
  },
  supabaseStatus: {
    isConfigured: true,
    notice: "Candidate job application submissions connected to Supabase database (https://nnrreqvakdhlveqfmdgq.supabase.co).",
  },
};
