import React from 'react';
import { Layers, Zap, Gift, Target, CheckCircle2 } from 'lucide-react';

export const StrategyMatrix: React.FC = () => {
  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            The 3 High-Converting B2B Outbound Frameworks
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Why British B2B buyers respond to these three distinct psychological angles
          </p>
        </div>
        <div className="text-[11px] font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-full self-start">
          Zero-Spam & Low-Pressure Architecture
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {/* Short & Direct */}
        <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/60 space-y-2.5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
              1
            </div>
            <span className="font-bold text-white text-sm">Short & Direct</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Respects inbox scarcity. Written in under 70 words so an executive reads the entire
            pitch on mobile without scrolling.
          </p>
          <div className="pt-2 border-t border-slate-700/60 text-[11px] space-y-1 text-slate-400">
            <div>
              <strong className="text-slate-300">Target Buyer:</strong> C-suite, Founders, Time-poor VPs
            </div>
            <div>
              <strong className="text-slate-300">Word Count:</strong> &lt; 70 words
            </div>
            <div>
              <strong className="text-slate-300">Cognitive Load:</strong> Ultra-low (15s scan)
            </div>
          </div>
        </div>

        {/* Value-First */}
        <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/60 space-y-2.5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
              2
            </div>
            <span className="font-bold text-white text-sm">Value-First</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Delivers a free benchmark, quick audit finding, or tactical observation up front.
            Positions you as a peer advisor rather than a cold salesperson.
          </p>
          <div className="pt-2 border-t border-slate-700/60 text-[11px] space-y-1 text-slate-400">
            <div>
              <strong className="text-slate-300">Target Buyer:</strong> Heads of Dept, Directors, Ops
            </div>
            <div>
              <strong className="text-slate-300">Word Count:</strong> 80 - 110 words
            </div>
            <div>
              <strong className="text-slate-300">Value Hook:</strong> 2-min breakdown / Audit finding
            </div>
          </div>
        </div>

        {/* Problem-Solution (PAS) */}
        <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/60 space-y-2.5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
              3
            </div>
            <span className="font-bold text-white text-sm">Problem-Agitation-Solution</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Pins down latent industry pain, agitates the hidden cost (hours/fines/churn), and
            frames your solution as the straightforward relief.
          </p>
          <div className="pt-2 border-t border-slate-700/60 text-[11px] space-y-1 text-slate-400">
            <div>
              <strong className="text-slate-300">Target Buyer:</strong> Technical Leads, Finance, Risk
            </div>
            <div>
              <strong className="text-slate-300">Word Count:</strong> 90 - 130 words
            </div>
            <div>
              <strong className="text-slate-300">Emotional Hook:</strong> Operational relief & peace of mind
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
