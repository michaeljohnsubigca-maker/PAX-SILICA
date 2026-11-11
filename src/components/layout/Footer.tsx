import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-sandMuted/60 dark:border-stone-800 bg-sandSurface/60 dark:bg-panelDark/80 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Mission Branding */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-saharaTerracotta-500 flex items-center justify-center text-white shadow-sahara-soft">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="font-serif text-xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
                PAX SILICA // PHILIPPINES
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-md mb-4">
              Public education, verified intelligence, and geospatial monitoring for the Luzon Economic Corridor and allied semiconductor supply chain initiatives in the Republic of the Philippines.
            </p>
            <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
              Operated in compliance with Republic Act No. 7227 and Philippine Constitutional Sovereignty Directives.
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-stone-900 dark:text-stone-100 font-semibold mb-3">
              Navigation
            </div>
            <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
              <li>
                <a href="#explainer" className="hover:text-saharaTerracotta-500 transition-colors">
                  Foundational Overview
                </a>
              </li>
              <li>
                <a href="#myths" className="hover:text-saharaTerracotta-500 transition-colors">
                  Myth vs. Reality Checks
                </a>
              </li>
              <li>
                <a href="#supply-chain" className="hover:text-saharaTerracotta-500 transition-colors">
                  4-Stage Supply Chain
                </a>
              </li>
              <li>
                <a href="#atlas" className="hover:text-saharaTerracotta-500 transition-colors">
                  Interactive Corridor Atlas
                </a>
              </li>
              <li>
                <a href="#ledger" className="hover:text-saharaTerracotta-500 transition-colors">
                  Intelligence Dispatches
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Official References */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-stone-900 dark:text-stone-100 font-semibold mb-3">
              Official Portals
            </div>
            <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
              <li>
                <a
                  href="https://bcda.gov.ph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-saharaTerracotta-500 transition-colors"
                >
                  <span>BCDA Philippines</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://dti.gov.ph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-saharaTerracotta-500 transition-colors"
                >
                  <span>Department of Trade &amp; Industry</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://peza.gov.ph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-saharaTerracotta-500 transition-colors"
                >
                  <span>PEZA Economic Zones</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://dost.gov.ph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-saharaTerracotta-500 transition-colors"
                >
                  <span>DOST Advanced Manufacturing</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Attribution */}
        <div className="pt-8 border-t border-sandMuted/40 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400">
          <div>
            &copy; 2026 Pax Silica Philippines Atlas. All rights reserved. Open public intelligence resource.
          </div>
          <div className="flex items-center gap-1">
            <span>Built for Filipino technological sovereignty</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
