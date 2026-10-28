import { OutreachOption } from '../types';

export const PROHIBITED_BUZZWORDS = [
  'game-changer',
  'game changer',
  'synergy',
  'synergies',
  'unleash',
  'unleashing',
  'skyrocket',
  'skyrocketing',
  'revolutionary',
  'revolutionize',
  'revolutionise',
  'supercharge',
  'disrupt',
  'disruptive',
  '10x',
  'paradigm',
  'guru',
  'secret sauce',
];

export const BRITISH_SPELLINGS: { uk: string; us: string }[] = [
  { uk: 'optimise', us: 'optimize' },
  { uk: 'programme', us: 'program' },
  { uk: 'favour', us: 'favor' },
  { uk: 'whilst', us: 'while' },
  { uk: 'specialised', us: 'specialized' },
  { uk: 'prioritise', us: 'prioritize' },
  { uk: 'analysing', us: 'analyzing' },
  { uk: 'endeavour', us: 'endeavor' },
  { uk: 'behaviour', us: 'behavior' },
  { uk: 'honour', us: 'honor' },
];

export interface AuditResult {
  wordCount: number;
  readTimeSeconds: number;
  hasProhibitedBuzzwords: boolean;
  foundBuzzwords: string[];
  isBritishEnglishCompliant: boolean;
  britishSpellingMatches: string[];
  isUnderLimitForShortDirect: boolean;
  hasLowPressureCTA: boolean;
}

export function auditPitch(option: OutreachOption): AuditResult {
  const text = `${option.subject} ${option.body}`.toLowerCase();
  const words = option.body.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const readTimeSeconds = Math.max(5, Math.round((wordCount / 200) * 60));

  // Buzzword check
  const foundBuzzwords: string[] = [];
  for (const bw of PROHIBITED_BUZZWORDS) {
    if (text.includes(bw)) {
      foundBuzzwords.push(bw);
    }
  }

  // British spelling check
  const britishSpellingMatches: string[] = [];
  for (const pair of BRITISH_SPELLINGS) {
    if (text.includes(pair.uk)) {
      britishSpellingMatches.push(pair.uk);
    }
  }

  // Check for low pressure CTA patterns
  const lowPressureCtaPhrases = [
    'video breakdown',
    'open to',
    'worth a',
    'bad timing',
    '1-page',
    'quick look',
    'mind if i send',
    'helpful to see',
    'teardown',
    'brief audit',
    'curious if',
    'feel free to say no',
  ];
  const hasLowPressureCTA = lowPressureCtaPhrases.some((phrase) => text.includes(phrase));

  return {
    wordCount,
    readTimeSeconds,
    hasProhibitedBuzzwords: foundBuzzwords.length > 0,
    foundBuzzwords,
    isBritishEnglishCompliant: britishSpellingMatches.length > 0 || !text.includes('optimize'),
    britishSpellingMatches,
    isUnderLimitForShortDirect: option.type === 'Short & Direct' ? wordCount <= 70 : true,
    hasLowPressureCTA,
  };
}

export function formatAsCleanPromptJSON(options: OutreachOption[]): string {
  const clean = {
    options: options.map((opt) => ({
      type: opt.type,
      subject: opt.subject,
      body: opt.body,
    })),
  };
  return JSON.stringify(clean, null, 2);
}
