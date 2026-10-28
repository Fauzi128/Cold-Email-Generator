import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Send,
  AlertCircle,
  FileCode,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Clock,
  Layers,
  Zap,
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { InputForm } from './components/InputForm';
import { PitchCard } from './components/PitchCard';
import { JsonModal } from './components/JsonModal';
import { PresetsModal } from './components/PresetsModal';
import { SavedDrawer } from './components/SavedDrawer';
import { StrategyMatrix } from './components/StrategyMatrix';
import { PRESET_SCENARIOS, PresetScenario } from './data/presets';
import { OutreachFormState, OutreachOption, SavedPitch } from './types';
import { auditPitch } from './utils/audit';

// Initial pre-populated state for immediate high-impact presentation
const INITIAL_FORM_STATE: OutreachFormState = PRESET_SCENARIOS[0].data;

const INITIAL_PITCHES: OutreachOption[] = [
  {
    type: 'Short & Direct',
    subject: 'quick question regarding Lombard Global',
    body: `Hi Alastair,\n\nNoticed Lombard's recent European growth. Most mid-market finance teams find that month-end reconciliations consume upwards of 20 manual hours each week.\n\nWe built an automated matching engine that reduces that closing window to under 48 hours.\n\nWould you be open to a 2-minute video breakdown of how peers in London automated this?\n\nKind regards,\nEdward Vance`,
    wordCount: 57,
    cta: 'Would you be open to a 2-minute video breakdown of how peers in London automated this?',
    strategyInsight: 'Strictly 57 words (well below the 70-word limit). Written in understated British cadence that respects an executive’s time.',
    followUp: {
      subject: 'Re: quick question regarding Lombard Global',
      body: `Hi Alastair,\n\nAppreciate you are likely in the middle of a busy sprint. Just curious if cross-border reconciliation is on your radar this quarter, or if the current setup is working well?\n\nHappy to share the 2-minute breakdown whenever convenient, or feel free to say no.\n\nCheers,\nEdward`,
    },
    linkedInVariant: `Hi Alastair, saw Lombard's recent expansion. We built an automated reconciliation engine that cut month-end close for London finance teams from 9 days down to 2. Open to a 90-second video teardown, or bad timing?`,
  },
  {
    type: 'Value-First',
    subject: 'idea for Lombard Global',
    body: `Hi Alastair,\n\nI was looking into how mid-tier London asset managers manage high-volume cross-border reconciliations, and spotted an area where teams frequently lose 15+ hours each month-end.\n\nSpecifically, mismatched bank format feeds usually force analysts into manual VLOOKUP reconciliations across separate portals.\n\nWe put together a brief 2-minute teardown showing how a similar finance team automated those feeds directly into their ledger, removing 90% of manual exceptions.\n\nWould you be open to taking a look at the video breakdown? Happy to send it across if useful.\n\nBest regards,\nEdward Vance\nSolutions Specialist`,
    wordCount: 94,
    cta: 'Would you be open to taking a look at the video breakdown? Happy to send it across if useful.',
    strategyInsight: 'Value-first posture: diagnoses a technical headache before proposing any pitch, leading with a non-invasive 2-minute teardown.',
    followUp: {
      subject: 'Re: idea for Lombard Global',
      body: `Hi Alastair,\n\nFollowing up briefly in case the earlier note was buried under month-end tasks. No rush at all—if you'd rather I leave you in peace, just let me know.\n\nOtherwise, the 2-minute teardown remains at your disposal.\n\nWarm regards,\nEdward`,
    },
    linkedInVariant: `Alastair, noticed your team's expansion. We put together a brief teardown showing how mid-market finance teams eliminate manual VLOOKUPs across disparate bank feeds. Worth sending across, or bad timing at present?`,
  },
  {
    type: 'Problem-Solution',
    subject: 'question for Alastair',
    body: `Hi Alastair,\n\nAs transaction volumes scale across European borders, most Finance Directors find that manual ledger reconciliation turns every month-end into a high-stress scramble. Discrepant currencies and delayed statements often keep senior analysts chained to spreadsheets late on Friday evenings.\n\nWe designed our reconciliation engine specifically to solve this bottleneck. It automatically ingests banking feeds, detects discrepancy patterns, and posts reconciled batches into your ledger in real time.\n\nWould you be open to a 2-minute video breakdown demonstrating how this works in practice, or is this not a priority at present?\n\nKind regards,\nEdward Vance\nSolutions Specialist`,
    wordCount: 97,
    cta: 'Would you be open to a 2-minute video breakdown demonstrating how this works in practice, or is this not a priority at present?',
    strategyInsight: 'Problem-Agitation-Solution: Names the high-stress scramble of month-end reconciliations and positions automated matching as the direct operational fix.',
    followUp: {
      subject: 'Re: question for Alastair',
      body: `Hi Alastair,\n\nUnderstood you must be occupied with broader operational priorities. If manual reconciliation isn't currently a bottleneck at Lombard Global, feel free to dismiss this.\n\nShould you ever want a look at the walkthrough, simply let me know.\n\nBest regards,\nEdward`,
    },
    linkedInVariant: `Hi Alastair, scaling transaction volumes often turns month-end ledger reconciliation into a bottleneck. We built an engine that automates multi-currency matching in real time. Open to seeing a 2-minute walkthrough?`,
  },
];

export default function App() {
  const [formData, setFormData] = useState<OutreachFormState>(INITIAL_FORM_STATE);
  const [options, setOptions] = useState<OutreachOption[]>(INITIAL_PITCHES);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modals & Drawers
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [isPresetsModalOpen, setIsPresetsModalOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [savedPitches, setSavedPitches] = useState<SavedPitch[]>([]);

  // Load saved pitches from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('pitchcraft_saved_pitches');
      if (stored) {
        setSavedPitches(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Could not load saved pitches', e);
    }
  }, []);

  const savePitchToLibrary = (indexToSave?: number) => {
    const newEntry: SavedPitch = {
      id: `pitch-${Date.now()}`,
      createdAt: new Date().toISOString(),
      targetCompany: formData.companyName,
      prospectName: formData.prospectName,
      options: options,
    };
    const updated = [newEntry, ...savedPitches];
    setSavedPitches(updated);
    try {
      localStorage.setItem('pitchcraft_saved_pitches', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
    setIsSavedDrawerOpen(true);
  };

  const handleUpdateOption = (index: number, updated: OutreachOption) => {
    const next = [...options];
    next[index] = updated;
    setOptions(next);
  };

  const handleFieldChange = (field: keyof OutreachFormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectPreset = (preset: PresetScenario) => {
    setFormData(preset.data);
  };

  const handleReset = () => {
    setFormData({
      companyName: '',
      prospectName: '',
      prospectRole: '',
      industry: '',
      offer: '',
      painPoint: '',
      valueAsset: '',
      senderName: 'James Thornton',
      senderRole: 'Specialist',
      toneNuance: 'Executive & Understated',
      customNotes: '',
    });
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.prospectName || !formData.offer) {
      setError('Please provide Target Company, Prospect Name, and your Offer.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with ${response.status}`);
      }

      const data = await response.json();
      if (!data.options || !Array.isArray(data.options) || data.options.length === 0) {
        throw new Error('Received invalid outreach options format from server');
      }

      setOptions(data.options);
      // Auto-scroll down smoothly to pitches on mobile
      const el = document.getElementById('pitches-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (err: any) {
      console.error('Failed to generate outreach pitches:', err);
      setError(err.message || 'An error occurred while generating pitches. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col">
      {/* Navigation */}
      <Navbar
        onOpenJson={() => setIsJsonModalOpen(true)}
        onOpenPresets={() => setIsPresetsModalOpen(true)}
        savedCount={savedPitches.length}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-medium">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>B2B Sales Strategy & Outreach Assistant</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              High-Converting Cold Outreach,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-200 to-emerald-300">
                Crafted in British English.
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Generate 3 distinct psychological outreach options for any prospect:
              <strong className="text-white"> Short & Direct (&lt;70w)</strong>,{' '}
              <strong className="text-white">Value-First</strong>, and{' '}
              <strong className="text-white">Problem-Solution (PAS)</strong>. Strictly free of overused buzzwords with low-pressure CTAs.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/80">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Zero Sales Buzzwords
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/80">
                <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
                Option 1 Strictly &lt;70 Words
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/80">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                Low-Friction Closing Asks
              </span>
            </div>
          </div>

          {/* Decorative ambient elements */}
          <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-indigo-600/10 to-transparent pointer-events-none" />
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Error notification if any */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start gap-3 animate-fadeIn">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-bold text-rose-900">Generation Error</h4>
              <p className="text-xs text-rose-700 mt-0.5">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-xs font-semibold text-rose-800 hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Input Form Section */}
        <InputForm
          formData={formData}
          onChange={handleFieldChange}
          onSelectPreset={handleSelectPreset}
          onReset={handleReset}
          onSubmit={handleGenerate}
          isLoading={isLoading}
        />

        {/* Pitches Section */}
        <div id="pitches-section" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Generated Outreach Pitch Suite
                </h2>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {options.length} Options
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Targeting <strong className="text-slate-700">{formData.prospectName}</strong> at{' '}
                <strong className="text-slate-700">{formData.companyName}</strong>. Tailored for
                high reply rates.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsJsonModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                <FileCode className="w-3.5 h-3.5 text-indigo-600" />
                <span>Export JSON (Rule #3)</span>
              </button>

              <button
                onClick={() => savePitchToLibrary()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 text-slate-600" />
                <span>Save All to Library</span>
              </button>
            </div>
          </div>

          {/* 3 Distinct Options Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {options.map((option, index) => (
              <PitchCard
                key={`${option.type}-${index}`}
                option={option}
                index={index}
                onUpdate={(updated) => handleUpdateOption(index, updated)}
                onSaveToLibrary={() => savePitchToLibrary(index)}
              />
            ))}
          </div>
        </div>

        {/* Strategy Matrix Section */}
        <StrategyMatrix />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            PitchCraft B2B • Built strictly adhering to low-friction British English sales protocol
          </span>
          <span className="text-slate-400">
            Powered by Gemini 3.8 Flash • Zero-Buzzword Verification
          </span>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <JsonModal
        isOpen={isJsonModalOpen}
        onClose={() => setIsJsonModalOpen(false)}
        options={options}
      />

      <PresetsModal
        isOpen={isPresetsModalOpen}
        onClose={() => setIsPresetsModalOpen(false)}
        onSelect={(p) => setFormData(p.data)}
      />

      <SavedDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedPitches={savedPitches}
        onLoadPitch={(p) => {
          setFormData((prev) => ({
            ...prev,
            companyName: p.targetCompany,
            prospectName: p.prospectName,
          }));
          setOptions(p.options);
        }}
        onDeletePitch={(id) => {
          const filtered = savedPitches.filter((p) => p.id !== id);
          setSavedPitches(filtered);
          localStorage.setItem('pitchcraft_saved_pitches', JSON.stringify(filtered));
        }}
        onClearAll={() => {
          setSavedPitches([]);
          localStorage.removeItem('pitchcraft_saved_pitches');
        }}
      />
    </div>
  );
}
