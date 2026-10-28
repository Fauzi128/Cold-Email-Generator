import React, { useState } from 'react';
import {
  Copy,
  Check,
  Mail,
  Clock,
  Sparkles,
  ShieldCheck,
  MessageSquare,
  Repeat,
  ExternalLink,
  Edit3,
  Eye,
  Send,
  HelpCircle,
  FileText,
} from 'lucide-react';
import { OutreachOption } from '../types';
import { auditPitch } from '../utils/audit';

interface PitchCardProps {
  option: OutreachOption;
  index: number;
  onUpdate: (updated: OutreachOption) => void;
  onSaveToLibrary: () => void;
}

export const PitchCard: React.FC<PitchCardProps> = ({
  option,
  index,
  onUpdate,
  onSaveToLibrary,
}) => {
  const [copiedField, setCopiedField] = useState<'subject' | 'body' | 'all' | null>(null);
  const [activeTab, setActiveTab] = useState<'email' | 'followup' | 'linkedin'>('email');
  const [isEditing, setIsEditing] = useState(false);

  const audit = auditPitch(option);

  const copyToClipboard = (text: string, field: 'subject' | 'body' | 'all') => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const copyFullEmail = () => {
    const fullText = `Subject: ${option.subject}\n\n${option.body}`;
    copyToClipboard(fullText, 'all');
  };

  const openMailto = () => {
    const subject = encodeURIComponent(option.subject);
    const body = encodeURIComponent(option.body);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  // Card theme styling based on option type
  const typeConfig: Record<
    string,
    {
      pillColor: string;
      pillText: string;
      desc: string;
      borderColor: string;
      headerBg: string;
    }
  > = {
    'Short & Direct': {
      pillColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      pillText: 'Under 70 words • High response',
      desc: 'Concise, straight to the point, respects their time in 20 seconds or less.',
      borderColor: 'border-emerald-200/80 hover:border-emerald-400',
      headerBg: 'bg-gradient-to-r from-emerald-50/50 to-transparent',
    },
    'Value-First': {
      pillColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      pillText: 'Audit & Insight • Advisory posture',
      desc: 'Provides immediate practical value or teardown before asking for anything.',
      borderColor: 'border-indigo-200/80 hover:border-indigo-400',
      headerBg: 'bg-gradient-to-r from-indigo-50/50 to-transparent',
    },
    'Problem-Solution': {
      pillColor: 'bg-amber-50 text-amber-800 border-amber-200',
      pillText: 'PAS Framework • Pain reliever',
      desc: 'Highlights specific industry friction and frames the offer as direct relief.',
      borderColor: 'border-amber-200/80 hover:border-amber-400',
      headerBg: 'bg-gradient-to-r from-amber-50/50 to-transparent',
    },
  };

  const config = typeConfig[option.type] || typeConfig['Short & Direct'];

  return (
    <div
      className={`bg-white rounded-2xl border ${config.borderColor} shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden`}
    >
      <div>
        {/* Card Header */}
        <div className={`p-5 pb-4 border-b border-slate-100 ${config.headerBg}`}>
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Option {index + 1}
              </span>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                {option.type}
              </h3>
            </div>
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-medium border ${config.pillColor}`}
            >
              {config.pillText}
            </span>
          </div>
          <p className="text-xs text-slate-600 line-clamp-2">{config.desc}</p>

          {/* Audit Metrics row */}
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-100/80">
            {/* Word count */}
            <div
              className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded ${
                option.type === 'Short & Direct'
                  ? audit.isUnderLimitForShortDirect
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                  : 'bg-slate-100 text-slate-700 border border-slate-200'
              }`}
              title="Word count of the email body"
            >
              <span>{audit.wordCount} words</span>
              {option.type === 'Short & Direct' && (
                <span>{audit.isUnderLimitForShortDirect ? '(✓ <70 limit)' : '(Exceeds 70)'}</span>
              )}
            </div>

            {/* Read Time */}
            <div className="inline-flex items-center gap-1 text-[11px] text-slate-500 bg-slate-100/70 border border-slate-200 px-2 py-0.5 rounded">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>~{audit.readTimeSeconds}s read</span>
            </div>

            {/* Buzzword Check */}
            <div
              className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded border ${
                audit.hasProhibitedBuzzwords
                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}
              title={
                audit.hasProhibitedBuzzwords
                  ? `Contains: ${audit.foundBuzzwords.join(', ')}`
                  : 'No overused sales buzzwords detected'
              }
            >
              <ShieldCheck className="w-3 h-3" />
              <span>{audit.hasProhibitedBuzzwords ? 'Buzzword Found' : 'Buzzword Free'}</span>
            </div>

            {/* UK British English */}
            <div className="inline-flex items-center gap-1 text-[11px] text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
              <span>UK English</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation (Email vs Follow-up vs LinkedIn) */}
        <div className="flex items-center border-b border-slate-100 px-5 bg-slate-50/50">
          <button
            onClick={() => setActiveTab('email')}
            className={`py-2 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'email'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Cold Email</span>
          </button>

          {option.followUp && (
            <button
              onClick={() => setActiveTab('followup')}
              className={`py-2 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'followup'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <Repeat className="w-3.5 h-3.5" />
              <span>Day 3 Follow-Up</span>
            </button>
          )}

          {option.linkedInVariant && (
            <button
              onClick={() => setActiveTab('linkedin')}
              className={`py-2 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'linkedin'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>LinkedIn InMail</span>
            </button>
          )}

          <div className="ml-auto flex items-center gap-1">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`text-xs px-2 py-1 rounded flex items-center gap-1 transition-colors ${
                isEditing
                  ? 'bg-indigo-100 text-indigo-700 font-medium'
                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
              }`}
              title="Toggle in-place edit mode"
            >
              {isEditing ? <Eye className="w-3 h-3" /> : <Edit3 className="w-3 h-3" />}
              <span>{isEditing ? 'Done' : 'Edit'}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Cold Email Content */}
        {activeTab === 'email' && (
          <div className="p-5 space-y-4">
            {/* Subject Line */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  Subject Line:
                </span>
                <button
                  onClick={() => copyToClipboard(option.subject, 'subject')}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 transition-colors"
                >
                  {copiedField === 'subject' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-600">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Subject</span>
                    </>
                  )}
                </button>
              </div>

              {isEditing ? (
                <input
                  type="text"
                  value={option.subject}
                  onChange={(e) => onUpdate({ ...option, subject: e.target.value })}
                  className="w-full text-sm font-medium text-slate-900 bg-white border border-slate-300 rounded px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              ) : (
                <div className="text-sm font-semibold text-slate-800 tracking-tight font-mono select-all">
                  {option.subject}
                </div>
              )}
            </div>

            {/* Email Body */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Email Body:
                </span>
                <span className="text-[11px] text-slate-400">Low-friction British cadence</span>
              </div>

              {isEditing ? (
                <textarea
                  rows={8}
                  value={option.body}
                  onChange={(e) => onUpdate({ ...option, body: e.target.value })}
                  className="w-full text-sm text-slate-800 bg-white border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 font-sans leading-relaxed"
                />
              ) : (
                <div className="bg-slate-50/60 rounded-xl p-4 border border-slate-200/60 text-sm text-slate-800 whitespace-pre-wrap leading-relaxed select-text font-sans">
                  {option.body}
                </div>
              )}
            </div>

            {/* CTA callout */}
            {option.cta && (
              <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-3 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                <div>
                  <div className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider">
                    Low-Friction Closing Ask:
                  </div>
                  <div className="text-xs text-indigo-800 italic mt-0.5 font-medium">
                    "{option.cta}"
                  </div>
                </div>
              </div>
            )}

            {/* Strategy Insight */}
            {option.strategyInsight && (
              <div className="text-xs text-slate-500 bg-slate-50 rounded-lg p-2.5 border border-slate-100 flex items-start gap-2">
                <HelpCircle className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                <span className="leading-snug">{option.strategyInsight}</span>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Follow-up sequence */}
        {activeTab === 'followup' && option.followUp && (
          <div className="p-5 space-y-4">
            <div className="bg-amber-50/70 border border-amber-200/70 rounded-xl p-3.5 text-xs text-amber-900 flex items-start gap-2">
              <Repeat className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold block mb-0.5">Day 3 Gentle British Nudge</span>
                <span>
                  High response rates in the UK come from courteous, low-pressure bumps that don't
                  guilt-trip the recipient.
                </span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Subject:
              </div>
              <div className="text-xs font-mono font-medium text-slate-800">
                {option.followUp.subject}
              </div>
            </div>

            <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200 text-sm text-slate-800 whitespace-pre-wrap leading-relaxed font-sans">
              {option.followUp.body}
            </div>

            <button
              onClick={() => {
                const text = `Subject: ${option.followUp?.subject}\n\n${option.followUp?.body}`;
                copyToClipboard(text, 'body');
              }}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1.5"
            >
              {copiedField === 'body' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Follow-up Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Follow-Up Pitch</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Tab 3: LinkedIn InMail Variant */}
        {activeTab === 'linkedin' && option.linkedInVariant && (
          <div className="p-5 space-y-4">
            <div className="bg-sky-50/70 border border-sky-200/70 rounded-xl p-3.5 text-xs text-sky-900 flex items-start gap-2">
              <MessageSquare className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold block mb-0.5">LinkedIn Multi-Channel Variant</span>
                <span>
                  Keep it under 50 words for LinkedIn messages or connection request notes.
                </span>
              </div>
            </div>

            <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200 text-sm text-slate-800 whitespace-pre-wrap leading-relaxed font-sans">
              {option.linkedInVariant}
            </div>

            <button
              onClick={() => copyToClipboard(option.linkedInVariant || '', 'body')}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1.5"
            >
              {copiedField === 'body' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">LinkedIn Note Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy LinkedIn Note</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Card Action Footer */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/80 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={openMailto}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors"
            title="Open in your default email client (Outlook, Apple Mail, etc.)"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            <span>Open in Mail</span>
          </button>

          <button
            onClick={onSaveToLibrary}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors"
            title="Save to your local library"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>Save</span>
          </button>
        </div>

        <button
          onClick={copyFullEmail}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-sm transition-all"
        >
          {copiedField === 'all' ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Full Email</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
