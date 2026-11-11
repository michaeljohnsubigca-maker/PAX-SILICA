import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/sections/HeroSection';
import ExplainerSection from './components/sections/ExplainerSection';
import MythBusterSection from './components/sections/MythBusterSection';
import SupplyChainSection from './components/sections/SupplyChainSection';
import CorridorAtlasSection from './components/sections/CorridorAtlasSection';
import LedgerSection from './components/sections/LedgerSection';
import Footer from './components/layout/Footer';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-sandLinen text-stone-900 dark:bg-deepNavy dark:text-stone-100 transition-colors duration-200">
        <Navbar />
        <main>
          <HeroSection />
          <ExplainerSection />
          <MythBusterSection />
          <SupplyChainSection />
          <CorridorAtlasSection />
          <LedgerSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
