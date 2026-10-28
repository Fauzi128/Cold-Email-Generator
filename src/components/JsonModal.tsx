import React, { useState } from 'react';
import { X, Copy, Check, Download, FileCode, CheckCircle2 } from 'lucide-react';
import { OutreachOption } from '../types';
import { formatAsCleanPromptJSON } from '../utils/audit';

interface JsonModalProps {
  isOpen: boolean;
  onClose: () => void;
  options: OutreachOption[];
}

export const JsonModal: React.FC<JsonModalProps> = ({
  isOpen,
  onClose,
  options,
}) => {
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<'strict' | 'full'>('strict');

  if (!isOpen) return null;

  const strictJsonString = formatAsCleanPromptJSON(options);
  const fullJsonString = JSON.stringify({ options }, null, 2);
  const activeJson = mode === 'strict' ? strictJsonString : fullJsonString;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `b2b-outreach-${mode}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <FileCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                JSON Outreach Output
              </h3>
              <p className="text-xs text-slate-500">
                Verified against Critical Instruction #3 JSON structure
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-slate-200/70 p-0.5 rounded-lg text-xs font-medium">
              <button
                onClick={() => setMode('strict')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  mode === 'strict' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                Strict Prompt Schema
              </button>
              <button
                onClick={() => setMode('full')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  mode === 'full' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                Full Details
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* JSON Code view */}
        <div className="p-4 flex-1 overflow-auto bg-slate-950 text-slate-200 font-mono text-xs leading-relaxed">
          <pre>{activeJson}</pre>
        </div>

        {/* Footer controls */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {options.length} outreach options generated
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .json</span>
            </button>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied JSON</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy JSON</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
