import { OutreachFormState } from '../types';

export interface PresetScenario {
  id: string;
  badge: string;
  title: string;
  description: string;
  data: OutreachFormState;
}

export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'fintech-cfo',
    badge: 'Fintech / Finance',
    title: 'Finance Director: Automated Reconciliation',
    description: 'Targeting UK Mid-Market CFO dealing with tedious month-end closing and manual spreadsheets.',
    data: {
      companyName: 'Lombard Global Ltd',
      prospectName: 'Alastair',
      prospectRole: 'Finance Director',
      industry: 'Financial Services & Asset Management',
      offer: 'automated multi-currency reconciliation software that cuts month-end close from 9 days down to 2',
      painPoint: 'Finance teams spending 25+ manual hours each week matching transaction lines across disparate banking portals',
      valueAsset: 'a 2-minute video breakdown showing how a similar London asset manager automated their cross-border reconciliations',
      senderName: 'Edward Vance',
      senderRole: 'Enterprise Specialist',
      toneNuance: 'Executive & Understated',
      customNotes: 'Lombard recently expanded their European operations according to Companies House filings.',
    },
  },
  {
    id: 'saas-sales-vp',
    badge: 'B2B SaaS',
    title: 'VP Sales: Inbound Lead Qualification',
    description: 'Targeting a Head of Sales whose reps waste hours following up with unqualified demo requests.',
    data: {
      companyName: 'Beacon Analytics',
      prospectName: 'Fiona',
      prospectRole: 'VP of Commercial Sales',
      industry: 'Enterprise B2B Software',
      offer: 'an asynchronous lead enrichment & routing engine that qualifies buyers before meetings are booked',
      painPoint: 'AEs sitting in 15+ calls a week with tire-kickers who lack budget or technical authority',
      valueAsset: 'a 90-second teardown of Beacon’s current demo booking workflow and two friction points spotted',
      senderName: 'Charlotte Hughes',
      senderRole: 'Sales Strategy Lead',
      toneNuance: 'Direct & Concise',
      customNotes: 'They are aggressively hiring SDRs in London and Manchester right now.',
    },
  },
  {
    id: 'logistics-ops',
    badge: 'Supply Chain',
    title: 'COO: Fleet Route Optimisation',
    description: 'Targeting haulage & freight operators burdened by dead mileage and volatile UK fuel surcharges.',
    data: {
      companyName: 'Meridian Haulage',
      prospectName: 'Rupert',
      prospectRole: 'Chief Operating Officer',
      industry: 'UK Freight & Logistics',
      offer: 'dynamic multi-drop route scheduling that eliminates 14% of empty backhaul miles',
      painPoint: 'Rising diesel duties and drivers stuck in bottlenecks causing SLA penalty fines on regional retail deliveries',
      valueAsset: 'a 1-page fuel savings benchmark comparing M6 corridor delivery routes',
      senderName: 'Archie Sterling',
      senderRole: 'Logistics Advisor',
      toneNuance: 'Polite & Pragmatic',
      customNotes: 'Recently renewed regional distribution contracts.',
    },
  },
  {
    id: 'cybersecurity-ciso',
    badge: 'Cybersecurity',
    title: 'CISO: Supply Chain Vendor Risk',
    description: 'Targeting an Information Security leader wrestling with DORA and UK NIS2 vendor compliance.',
    data: {
      companyName: 'Apex Healthtech',
      prospectName: 'Dr. Helen',
      prospectRole: 'Chief Information Security Officer',
      industry: 'Health & Life Sciences Tech',
      offer: 'continuous automated 3rd-party vendor risk scoring without 60-page manual vendor questionnaires',
      painPoint: 'SecOps teams bogged down manually reviewing 40+ vendor compliance assessments every quarter',
      valueAsset: 'a quick 2-page vendor risk audit template tailored to UK health data regulations',
      senderName: 'Marcus Bell',
      senderRole: 'Information Security Advisor',
      toneNuance: 'Executive & Understated',
      customNotes: 'Apex handles NHS digital integrations and patient records.',
    },
  },
];
