import React from 'react';
import { Mail, Sparkles, BookOpen, FileCode, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  onOpenJson: () => void;
  onOpenPresets: () => void;
  savedCount: number;
  onOpenSaved: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenJson,
  onOpenPresets,
  savedCount,
  onOpenSaved,
}) => {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-800 flex items-center justify-center text-white shadow-md shadow-slate-900/10">
            <Mail className="w-5 h-5 text-indigo-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-lg tracking-tight">
                PitchCraft <span className="text-indigo-600 font-semibold">B2B</span>
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                UK British English
              </span>
            </div>
            <p className="text-xs text-slate-500 font-normal hidden sm:block">
              High-converting cold email & outreach strategy engine
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenPresets}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-indigo-600 bg-slate-100/80 hover:bg-slate-200/60 rounded-lg transition-colors"
            title="Load sample B2B buyer scenarios"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="hidden md:inline">Example Scenarios</span>
            <span className="md:hidden">Presets</span>
          </button>

          <button
            onClick={onOpenJson}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-indigo-600 bg-slate-100/80 hover:bg-slate-200/60 rounded-lg transition-colors"
            title="View raw JSON format"
          >
            <FileCode className="w-4 h-4 text-indigo-500" />
            <span>JSON Output</span>
          </button>

          <button
            onClick={onOpenSaved}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-indigo-600 bg-slate-100/80 hover:bg-slate-200/60 rounded-lg transition-colors"
            title="View saved outreach pitches"
          >
            <BookOpen className="w-4 h-4 text-slate-500" />
            <span>Saved ({savedCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
};
