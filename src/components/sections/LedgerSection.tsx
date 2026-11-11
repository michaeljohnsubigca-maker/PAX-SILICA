import React, { useState } from 'react';
import { Newspaper, Milestone, SlidersHorizontal } from 'lucide-react';
import DispatchesFeed from '../ledger/DispatchesFeed';
import MilestonesTimeline from '../ledger/MilestonesTimeline';

export const LedgerSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dispatches' | 'milestones'>('dispatches');

  return (
    <section id="ledger" className="py-16 sm:py-24 border-t border-sandMuted/40 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-saharaTerracotta-500/30 bg-saharaTerracotta-500/10 text-saharaTerracotta-600 dark:text-saharaTerracotta-400 text-xs font-mono mb-4">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Verified Dispatches &amp; Execution Timeline</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-stone-900 dark:text-stone-50 tracking-tight leading-tight mb-4">
              Intelligence Dispatches &amp; Project Ledger
            </h2>
            <p className="text-stone-700 dark:text-stone-300 text-base sm:text-lg leading-relaxed">
              Real-time verified updates from Philippine regulatory agencies, allied trilateral partners, and industry consortia, accompanied by the master execution milestone tracker.
            </p>
          </div>

          {/* Segmented Tab Switcher */}
          <div className="inline-flex p-1.5 rounded-xl bg-sandSurface/80 dark:bg-panelDark border border-sandMuted/60 dark:border-stone-800 shrink-0">
            <button
              onClick={() => setActiveTab('dispatches')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'dispatches'
                  ? 'bg-saharaTerracotta-500 text-white shadow-sahara-soft'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>Intelligence Dispatches</span>
            </button>
            <button
              onClick={() => setActiveTab('milestones')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'milestones'
                  ? 'bg-saharaTerracotta-500 text-white shadow-sahara-soft'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              <Milestone className="w-4 h-4" />
              <span>Milestones Ledger</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'dispatches' ? <DispatchesFeed /> : <MilestonesTimeline />}
      </div>
    </section>
  );
};

export default LedgerSection;
