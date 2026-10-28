import React from 'react';
import { X, Sparkles, ArrowRight, Building, CheckCircle2 } from 'lucide-react';
import { PRESET_SCENARIOS, PresetScenario } from '../data/presets';

interface PresetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (preset: PresetScenario) => void;
}

export const PresetsModal: React.FC<PresetsModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Curated B2B Outbound Scenarios
              </h3>
              <p className="text-xs text-slate-500">
                Pre-configured high-impact buyer personas with realistic UK enterprise context
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-5 overflow-y-auto space-y-3">
          {PRESET_SCENARIOS.map((preset) => (
            <div
              key={preset.id}
              onClick={() => {
                onSelect(preset);
                onClose();
              }}
              className="p-4 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/30 transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {preset.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {preset.data.companyName}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-sm">
                  {preset.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {preset.description}
                </p>
                <div className="text-[11px] text-slate-400 pt-1">
                  Pain: <span className="text-slate-600 italic">"{preset.data.painPoint.slice(0, 75)}..."</span>
                </div>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 group-hover:text-indigo-700 shrink-0 self-end sm:self-center"
              >
                <span>Load Scenario</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
