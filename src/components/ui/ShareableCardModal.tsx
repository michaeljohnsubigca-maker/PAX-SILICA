import React, { useState } from 'react';
import { X, Copy, Check, ShieldCheck, Share2 } from 'lucide-react';
import { IntelligenceDispatch } from '../../types/domain';

interface ShareableCardModalProps {
  dispatch: IntelligenceDispatch | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareableCardModal: React.FC<ShareableCardModalProps> = ({
  dispatch,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !dispatch) return null;

  const cardShareText = `PAX SILICA // VERIFIED DISPATCH\nSource: ${dispatch.source} (${dispatch.date})\nHeadline: ${dispatch.headline}\nSummary: ${dispatch.summary}\n\nRead the Luzon Corridor Atlas at https://paxsilica.ph`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cardShareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn"
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-sandLinen dark:bg-deepNavy border border-sandMuted/80 dark:border-stone-800 p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close share card"
          className="absolute top-4 right-4 p-2 rounded-lg text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-sandSurface dark:hover:bg-panelDark transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Card Header */}
        <div className="flex items-center gap-2 mb-4 text-xs font-mono text-saharaTerracotta-600 dark:text-saharaTerracotta-400">
          <ShieldCheck className="w-4 h-4" />
          <span>VERIFIED INTELLIGENCE BRIEF // {dispatch.date}</span>
        </div>

        {/* Card Content Preview Box */}
        <div className="p-6 rounded-xl bg-sandSurface/80 dark:bg-panelDark/80 border border-sandMuted/60 dark:border-stone-800 shadow-sahara-soft mb-6">
          <div className="text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
            {dispatch.source} • {dispatch.stakeholder}
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-stone-900 dark:text-stone-100 leading-snug mb-3">
            {dispatch.headline}
          </h3>
          <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed mb-4">
            {dispatch.summary}
          </p>
          <div className="pt-3 border-t border-sandMuted/40 dark:border-stone-800 text-[10px] font-mono text-stone-500 flex items-center justify-between">
            <span>CORRIDOR NODE: {dispatch.nodeLabel.toUpperCase()}</span>
            <span>PAX SILICA // PHILIPPINES</span>
          </div>
        </div>

        {/* Copy Action */}
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-stone-600 dark:text-stone-400">
            Formatted for news briefs, social platforms, and research citations.
          </span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-saharaTerracotta-500 hover:bg-saharaTerracotta-600 text-white font-medium text-xs shadow-sahara-soft transition-colors shrink-0"
          >
            {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied' : 'Copy Brief'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareableCardModal;
