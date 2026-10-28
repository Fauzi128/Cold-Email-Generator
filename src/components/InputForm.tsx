import React, { useState } from 'react';
import {
  Send,
  Building2,
  User,
  Briefcase,
  Target,
  AlertCircle,
  Gift,
  HelpCircle,
  Sliders,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { OutreachFormState } from '../types';
import { PRESET_SCENARIOS } from '../data/presets';

interface InputFormProps {
  formData: OutreachFormState;
  onChange: (field: keyof OutreachFormState, value: string) => void;
  onSelectPreset: (preset: (typeof PRESET_SCENARIOS)[0]) => void;
  onReset: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({
  formData,
  onChange,
  onSelectPreset,
  onReset,
  onSubmit,
  isLoading,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-6">
      {/* Top Header & Presets banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" />
            Outreach Campaign Inputs
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Fuel the B2B copywriter with prospect context and your low-friction value asset.
          </p>
        </div>

        {/* Quick Scenario Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-[11px] font-medium text-slate-400 shrink-0 mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> Presets:
          </span>
          {PRESET_SCENARIOS.slice(0, 3).map((scenario) => (
            <button
              key={scenario.id}
              type="button"
              onClick={() => onSelectPreset(scenario)}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 font-medium transition-colors border border-slate-200/60 shrink-0"
            >
              {scenario.badge.split('/')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Target Prospect Details */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-indigo-500" />
          1. Target Prospect
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Company Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.companyName}
              onChange={(e) => onChange('companyName', e.target.value)}
              placeholder="e.g. Lombard Global Ltd"
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all bg-slate-50/50 hover:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Industry / Sector
            </label>
            <input
              type="text"
              value={formData.industry}
              onChange={(e) => onChange('industry', e.target.value)}
              placeholder="e.g. Asset Management & Fintech"
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all bg-slate-50/50 hover:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Prospect First Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.prospectName}
              onChange={(e) => onChange('prospectName', e.target.value)}
              placeholder="e.g. Alastair"
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all bg-slate-50/50 hover:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Prospect Role / Title
            </label>
            <input
              type="text"
              value={formData.prospectRole}
              onChange={(e) => onChange('prospectRole', e.target.value)}
              placeholder="e.g. Finance Director / CFO"
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all bg-slate-50/50 hover:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Offer & Pain Point */}
      <div className="space-y-3 pt-1">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
          2. The Value Proposition & Pain Point
        </label>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            What do you offer / solve? <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.offer}
            onChange={(e) => onChange('offer', e.target.value)}
            placeholder="e.g. automated reconciliation engine that cuts month-end close from 9 days down to 2"
            className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all bg-slate-50/50 hover:bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Specific Pain Point or Bottleneck <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows={2}
            required
            value={formData.painPoint}
            onChange={(e) => onChange('painPoint', e.target.value)}
            placeholder="e.g. Finance team spending 25+ manual hours each week matching ledger lines across disparate banking portals"
            className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all bg-slate-50/50 hover:bg-white resize-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
              <Gift className="w-3.5 h-3.5 text-emerald-600" />
              Low-Friction Value Asset / Offer <span className="text-rose-500">*</span>
            </label>
            <span className="text-[11px] text-slate-400">Soft hook rather than a 30m call</span>
          </div>
          <input
            type="text"
            required
            value={formData.valueAsset}
            onChange={(e) => onChange('valueAsset', e.target.value)}
            placeholder="e.g. a 2-minute video breakdown showing how peers automated cross-border reconciliations"
            className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all bg-slate-50/50 hover:bg-white"
          />
        </div>
      </div>

      {/* Advanced / Sender Details Toggle */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
        >
          <Sliders className="w-3.5 h-3.5 text-slate-400" />
          <span>Sender Details & Tone Settings</span>
          {showAdvanced ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>

        {showAdvanced && (
          <div className="mt-3 p-4 bg-slate-50/80 rounded-xl border border-slate-200/70 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Sender Name
                </label>
                <input
                  type="text"
                  value={formData.senderName}
                  onChange={(e) => onChange('senderName', e.target.value)}
                  placeholder="e.g. Edward Vance"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Sender Role / Title
                </label>
                <input
                  type="text"
                  value={formData.senderRole}
                  onChange={(e) => onChange('senderRole', e.target.value)}
                  placeholder="e.g. Enterprise Specialist"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  British Tone Nuance
                </label>
                <select
                  value={formData.toneNuance}
                  onChange={(e) => onChange('toneNuance', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-800"
                >
                  <option value="Executive & Understated">Executive & Understated (Calm, respectful, senior)</option>
                  <option value="Direct & Concise">Direct & Concise (Zero pleasantries, straight to point)</option>
                  <option value="Polite & Advisory">Polite & Advisory (Helpful consultant posture)</option>
                  <option value="Warm & Conversational">Warm & Conversational (Friendly, collegiate)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Custom Hook / Observation
                </label>
                <input
                  type="text"
                  value={formData.customNotes}
                  onChange={(e) => onChange('customNotes', e.target.value)}
                  placeholder="e.g. Saw your recent expansion on LinkedIn / hiring 3 SDRs"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Rules Notice Badge */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
        <div className="text-[11px] leading-relaxed text-slate-600 space-y-0.5">
          <div className="font-semibold text-slate-800">Enforced Copywriting Protocol:</div>
          <div>
            1. <strong>Option 1 (Short & Direct):</strong> Strictly &lt;70 words.
            <br />
            2. <strong>Option 2 (Value-First):</strong> Delivers quick audit finding / tip.
            <br />
            3. <strong>Option 3 (Problem-Solution):</strong> Agitates industry friction.
            <br />
            4. <strong>Persuasive Rules:</strong> Natural British English, zero hype buzzwords, and low-friction CTA.
          </div>
        </div>
      </div>

      {/* Submit & Reset actions */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-700 rounded-lg transition-colors hover:bg-slate-100"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Form</span>
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm shadow-md shadow-indigo-600/20 hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Generating Pitches...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Generate 3 Outreach Pitches</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
