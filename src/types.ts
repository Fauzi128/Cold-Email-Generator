export type OutreachType = 'Short & Direct' | 'Value-First' | 'Problem-Solution';

export interface FollowUpSequence {
  subject: string;
  body: string;
}

export interface OutreachOption {
  type: OutreachType;
  subject: string;
  body: string;
  wordCount?: number;
  cta?: string;
  strategyInsight?: string;
  followUp?: FollowUpSequence;
  linkedInVariant?: string;
}

export interface GenerationResponse {
  options: OutreachOption[];
}

export interface OutreachFormState {
  companyName: string;
  prospectName: string;
  prospectRole: string;
  industry: string;
  offer: string;
  painPoint: string;
  valueAsset: string;
  senderName: string;
  senderRole: string;
  toneNuance: string;
  customNotes: string;
}

export interface SavedPitch {
  id: string;
  createdAt: string;
  targetCompany: string;
  prospectName: string;
  options: OutreachOption[];
}
