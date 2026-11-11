import React from 'react';
import { Sun, Moon, ShieldCheck } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-40 bg-sandLinen/90 dark:bg-deepNavy/90 backdrop-blur-md border-b border-sandMuted/40 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-saharaTerracotta-500 flex items-center justify-center text-white shadow-sahara-soft">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <a href="#" className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-100 hover:text-saharaTerracotta-600 transition-colors">
                PAX SILICA
              </a>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-mono tracking-widest uppercase text-stone-600 dark:text-stone-400 border border-sandMuted dark:border-stone-800 px-1.5 py-0.5 rounded">
                Philippines Atlas
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <a href="#explainer" className="text-stone-700 dark:text-stone-300 hover:text-saharaTerracotta-500 transition-colors">
              Overview
            </a>
            <a href="#myths" className="text-stone-700 dark:text-stone-300 hover:text-saharaTerracotta-500 transition-colors">
              Myth-Buster
            </a>
            <a href="#supply-chain" className="text-stone-700 dark:text-stone-300 hover:text-saharaTerracotta-500 transition-colors">
              Supply Chain
            </a>
            <a href="#atlas" className="text-stone-700 dark:text-stone-300 hover:text-saharaTerracotta-500 transition-colors">
              Corridor Atlas
            </a>
            <a href="#ledger" className="text-stone-700 dark:text-stone-300 hover:text-saharaTerracotta-500 transition-colors">
              Dispatches
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg border border-sandMuted/60 dark:border-stone-800 bg-sandSurface/80 dark:bg-panelDark hover:border-saharaTerracotta-400 text-stone-700 dark:text-stone-300 transition-all shadow-sahara-soft"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-700" />}
            </button>
            <a
              href="#atlas"
              className="hidden sm:inline-flex items-center px-4 py-2 text-xs font-semibold rounded-lg bg-saharaTerracotta-500 hover:bg-saharaTerracotta-600 text-white shadow-sahara-soft transition-colors"
            >
              Explore Corridor
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
