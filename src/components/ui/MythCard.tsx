import React, { useState } from 'react';
import { AlertCircle, ChevronDown, ChevronUp, Scale, CheckCircle2, ExternalLink } from 'lucide-react';
import { MythProvision } from '../../types/domain';

interface MythCardProps {
  myth: MythProvision;
}

export const MythCard: React.FC<MythCardProps> = ({ myth }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getVerdictStyle = (type: MythProvision['verdictType']) => {
    switch (type) {
      case 'rose':
        return 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/30';
      case 'amber':
        return 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30';
      case 'emerald':
        return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-stone-500/10 text-stone-700 dark:text-stone-400 border-stone-500/30';
    }
  };

  return (
    <div className="rounded-2xl p-6 sm:p-7 bg-sandSurface/70 dark:bg-panelDark/80 border border-sandMuted/50 dark:border-stone-800 transition-all duration-200 hover:border-saharaTerracotta-400 shadow-sahara-soft flex flex-col justify-between">
      <div>
        {/* Verdict Badge */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border ${getVerdictStyle(myth.verdictType)}`}>
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{myth.verdict}</span>
          </div>
          <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wider">
            Fact Check #{myth.id}
          </span>
        </div>

        {/* Claim */}
        <h3 className="font-serif text-xl sm:text-2xl font-normal text-stone-900 dark:text-stone-100 leading-snug mb-4">
          &ldquo;{myth.claim}&rdquo;
        </h3>

        {/* Fact Explanation */}
        <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed mb-4">
          {myth.explanation}
        </p>
      </div>

      {/* Expandable Legal Basis & Authority */}
      <div className="pt-4 border-t border-sandMuted/40 dark:border-stone-800/80">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          className="flex items-center justify-between w-full text-left text-xs font-medium text-saharaTerracotta-600 dark:text-saharaTerracotta-400 hover:text-saharaTerracotta-700 transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5" />
            <span>View legal basis &amp; authority citation</span>
          </span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isExpanded && (
          <div className="mt-3 p-3 rounded-lg bg-sandLinen/80 dark:bg-deepNavy/80 border border-sandMuted/40 dark:border-stone-800 text-xs space-y-1.5 animate-fadeIn">
            <div>
              <span className="font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wider">Authority: </span>
              <span className="text-stone-800 dark:text-stone-200 font-medium">{myth.authority}</span>
            </div>
            <div>
              <span className="font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wider">Legal Framework: </span>
              <span className="text-stone-800 dark:text-stone-200">{myth.legalRef}</span>
            </div>
            {myth.citationUrl && (
              <div className="pt-1">
                <a
                  href={myth.citationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-saharaTerracotta-600 dark:text-saharaTerracotta-400 hover:underline"
                >
                  <span>Verify official authority source</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
            <div className="pt-1 flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-3 h-3" />
              <span>Verified against Official Gazette and Republic Acts</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MythCard;
