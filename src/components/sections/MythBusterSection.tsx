import React from 'react';
import { ShieldCheck, HelpCircle } from 'lucide-react';
import { MYTH_PROVISIONS } from '../../data/myths';
import MythCard from '../ui/MythCard';

export const MythBusterSection: React.FC = () => {
  return (
    <section id="myths" className="py-16 sm:py-24 border-t border-sandMuted/40 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dustyRose/30 bg-dustyRose/10 text-dustyRose dark:text-rose-400 text-xs font-mono mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Counter-Disinformation &amp; Sovereignty Safeguards</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-stone-900 dark:text-stone-50 tracking-tight leading-tight mb-4">
            Myth vs. Reality: Protecting Philippine Interests
          </h2>
          <p className="text-stone-700 dark:text-stone-300 text-base sm:text-lg leading-relaxed">
            Public debate around major tech infrastructure is often clouded by rumors. Here are the official verified facts directly sourced from constitutional records, the Bases Conversion and Development Authority (BCDA), and the Department of Trade and Industry (DTI).
          </p>
        </div>

        {/* Myth Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {MYTH_PROVISIONS.map((myth) => (
            <MythCard key={myth.id} myth={myth} />
          ))}
        </div>

        {/* Inquiry Note */}
        <div className="mt-10 p-5 rounded-xl border border-sandMuted/60 dark:border-stone-800 bg-sandSurface/40 dark:bg-panelDark/40 flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-saharaTerracotta-500 shrink-0 mt-0.5" />
          <div className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            <span className="font-semibold text-stone-800 dark:text-stone-200">Notice for researchers and media: </span>
            All fact-checking citations reflect the November 2026 vetted regulatory guidelines. Subic, Clark, Batangas, and Manila operations remain 100% under civilian commercial jurisdiction of the Republic of the Philippines.
          </div>
        </div>
      </div>
    </section>
  );
};

export default MythBusterSection;
