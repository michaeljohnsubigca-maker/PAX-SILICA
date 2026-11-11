import React from 'react';
import { ArrowRight, Sparkles, MapPin, CheckCircle } from 'lucide-react';
import { EXPLAINER_CONTENT } from '../../data/explainer';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-saharaTerracotta-500/30 bg-saharaTerracotta-500/10 text-saharaTerracotta-600 dark:text-saharaTerracotta-400 text-xs font-mono mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Multilateral Declaration // Signed {EXPLAINER_CONTENT.declarationDate}</span>
          </div>

          {/* Headline in EB Garamond */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-stone-900 dark:text-stone-50 leading-[1.08] mb-6">
            Pax Silica &amp; the Luzon Economic Corridor
          </h1>

          {/* Subtitle in Manrope */}
          <p className="text-lg sm:text-xl text-stone-700 dark:text-stone-300 font-normal leading-relaxed mb-10 max-w-3xl">
            {EXPLAINER_CONTENT.heroSummary}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-16">
            <a
              href="#explainer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-saharaTerracotta-500 hover:bg-saharaTerracotta-600 text-white font-medium text-sm shadow-sahara-card transition-colors"
            >
              <span>Learn What Pax Silica Means</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#myths"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-sandMuted dark:border-stone-800 bg-sandSurface/80 dark:bg-panelDark hover:border-saharaTerracotta-400 text-stone-800 dark:text-stone-200 font-medium text-sm transition-colors"
            >
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Read Myth vs Reality Facts</span>
            </a>
          </div>

          {/* Key Stat Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-sandSurface/60 dark:bg-panelDark/60 border border-sandMuted/50 dark:border-stone-800/80 shadow-sahara-soft">
            <div className="p-3">
              <div className="font-serif text-2xl sm:text-3xl font-medium text-saharaTerracotta-600 dark:text-saharaTerracotta-400 mb-1">
                1,620 Hectares
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-stone-400">
                Capas Silicon Zone
              </div>
            </div>

            <div className="p-3 border-l border-sandMuted/40 dark:border-stone-800">
              <div className="font-serif text-2xl sm:text-3xl font-medium text-saharaTerracotta-600 dark:text-saharaTerracotta-400 mb-1">
                13 Allied Nations
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-stone-400">
                Multilateral Coalition
              </div>
            </div>

            <div className="p-3 border-l sm:border-l border-sandMuted/40 dark:border-stone-800">
              <div className="font-serif text-2xl sm:text-3xl font-medium text-saharaTerracotta-600 dark:text-saharaTerracotta-400 mb-1">
                50+ Global Suitors
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-stone-400">
                Semiconductor Partners
              </div>
            </div>

            <div className="p-3 border-l border-sandMuted/40 dark:border-stone-800">
              <div className="font-serif text-2xl sm:text-3xl font-medium text-saharaTerracotta-600 dark:text-saharaTerracotta-400 mb-1">
                5 Strategic Nodes
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-stone-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-stone-500" />
                <span>Central to South Luzon</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
