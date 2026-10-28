import React from 'react';
import { X, Trash2, ArrowRight, BookOpen, Clock, FileText } from 'lucide-react';
import { SavedPitch, OutreachOption } from '../types';

interface SavedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedPitches: SavedPitch[];
  onLoadPitch: (pitch: SavedPitch) => void;
  onDeletePitch: (id: string) => void;
  onClearAll: () => void;
}

export const SavedDrawer: React.FC<SavedDrawerProps> = ({
  isOpen,
  onClose,
  savedPitches,
  onLoadPitch,
  onDeletePitch,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-slideLeft">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-sm">Saved Outreach Campaigns</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {savedPitches.length === 0 ? (
            <div className="text-center py-12 px-4 text-slate-400">
              <FileText className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium text-slate-600">No saved pitches yet</p>
              <p className="text-xs mt-1">
                Click "Save" on any generated pitch to store it locally for your sequences.
              </p>
            </div>
          ) : (
            savedPitches.map((pitch) => (
              <div
                key={pitch.id}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-indigo-300 transition-all bg-slate-50/50 hover:bg-white group"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {pitch.targetCompany}
                    </h4>
                    <span className="text-xs text-slate-500">
                      Prospect: {pitch.prospectName}
                    </span>
                  </div>
                  <button
                    onClick={() => onDeletePitch(pitch.id)}
                    className="text-slate-300 hover:text-rose-600 p-1 rounded transition-colors"
                    title="Delete saved pitch"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center gap-1 mb-2.5">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(pitch.createdAt).toLocaleDateString()}</span>
                  <span>• {pitch.options.length} options</span>
                </div>

                <button
                  onClick={() => {
                    onLoadPitch(pitch);
                    onClose();
                  }}
                  className="w-full text-xs font-semibold py-1.5 px-3 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-1"
                >
                  <span>Restore Pitch Suite</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {savedPitches.length > 0 && (
          <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <span className="text-xs text-slate-500">{savedPitches.length} campaigns saved</span>
            <button
              onClick={onClearAll}
              className="text-xs text-rose-600 hover:text-rose-800 font-medium"
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
