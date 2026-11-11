import React from 'react';
import { BookOpen, Cpu, Globe2, Award } from 'lucide-react';
import { EXPLAINER_CONTENT } from '../../data/explainer';

export const ExplainerSection: React.FC = () => {
  const getPillarIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Cpu className="w-5 h-5 text-saharaTerracotta-500" />;
      case 1:
        return <Globe2 className="w-5 h-5 text-amber-500" />;
      case 2:
        return <Award className="w-5 h-5 text-emerald-600" />;
      default:
        return <BookOpen className="w-5 h-5 text-saharaTerracotta-500" />;
    }
  };

  return (
    <section id="explainer" className="py-16 sm:py-24 border-t border-sandMuted/40 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-saharaTerracotta-500/30 bg-saharaTerracotta-500/10 text-saharaTerracotta-600 dark:text-saharaTerracotta-400 text-xs font-mono mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Foundational Overview</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-stone-900 dark:text-stone-50 tracking-tight leading-tight mb-4">
            Understanding Pax Silica: Microchips, Security &amp; Sovereignty
          </h2>
          <p className="text-stone-700 dark:text-stone-300 text-base sm:text-lg leading-relaxed">
            Microchips are the foundation of modern civilization. From medical devices to transport and clean power, reliable semiconductor supply is now vital to national defense and economic freedom.
          </p>
        </div>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EXPLAINER_CONTENT.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-7 bg-sandSurface/60 dark:bg-panelDark/70 border border-sandMuted/50 dark:border-stone-800 flex flex-col justify-between shadow-sahara-soft hover:border-saharaTerracotta-400 transition-colors"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-sandLinen dark:bg-deepNavy border border-sandMuted/50 dark:border-stone-800 flex items-center justify-center mb-6 shadow-sm">
                  {getPillarIcon(idx)}
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-saharaTerracotta-600 dark:text-saharaTerracotta-400 mb-2">
                  Pillar 0{idx + 1} // {pillar.title}
                </div>
                <h3 className="font-serif text-2xl font-normal text-stone-900 dark:text-stone-100 mb-4 leading-snug">
                  {pillar.question}
                </h3>
                <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed mb-6">
                  {pillar.answer}
                </p>
              </div>

              <div className="pt-5 border-t border-sandMuted/40 dark:border-stone-800/80">
                <div className="font-serif text-3xl font-medium text-stone-900 dark:text-stone-100">
                  {pillar.keyStat}
                </div>
                <div className="text-xs font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wider mt-0.5">
                  {pillar.statLabel}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExplainerSection;
