import React, { useState, useEffect } from 'react';
import { ActiveTab, ContinentId } from './types';
import { Header } from './components/Header';
import { StatsBar } from './components/StatsBar';
import { WorldMap } from './components/WorldMap';
import { ShowcaseHero } from './components/ShowcaseHero';
import { FeaturedDiscoveries } from './components/FeaturedDiscoveries';
import { ContinentView } from './components/ContinentView';
import { GlobalTimeline } from './components/GlobalTimeline';
import { ScientistsDirectory } from './components/ScientistsDirectory';
import { AboutSection } from './components/AboutModal';
import { ScientistModal } from './components/ScientistModal';
import { CountryModal } from './components/CountryModal';
import { SearchDialog } from './components/SearchDialog';
import { Footer } from './components/Footer';
import {
  Compass,
  Clock,
  BookOpen,
  ArrowRight,
  Globe2,
  Sparkles,
  Award,
  Layers,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('inicio');
  const [selectedContinent, setSelectedContinent] = useState<ContinentId>('Europa');
  const [selectedScientistId, setSelectedScientistId] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Keyboard shortcut listener for Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectContinentFromMap = (continent: ContinentId) => {
    setSelectedContinent(continent);
    setActiveTab('continentes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fcfbf7] text-[#14231b] flex flex-col font-sans selection:bg-[#1b3a2b]/20 selection:text-[#1b3a2b] dark:bg-[#0c1811] dark:text-[#f4f1ea]">
      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={tab => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* VIEW 1: INICIO / LOBBY MUNDIAL */}
        {activeTab === 'inicio' && (
          <div className="space-y-10 pb-16">
            {/* Hero Section: Showcase de 10 Grandes Científicos */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
              <ShowcaseHero
                onOpenScientist={id => setSelectedScientistId(id)}
                onExploreMap={() => {
                  setActiveTab('continentes');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onExploreTimeline={() => {
                  setActiveTab('linea-tiempo');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>

            {/* Stats Bar */}
            <StatsBar />

            {/* Central Interactive World Map */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <WorldMap
                onSelectContinent={handleSelectContinentFromMap}
                onOpenScientist={id => setSelectedScientistId(id)}
                onSelectCountry={country => setSelectedCountry(country)}
              />
            </section>

            {/* Featured Discoveries Showcase */}
            <FeaturedDiscoveries
              onOpenScientist={id => setSelectedScientistId(id)}
              onExploreAll={() => {
                setActiveTab('cientificos');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* VIEW 2: CONTINENTES */}
        {activeTab === 'continentes' && (
          <ContinentView
            continent={selectedContinent}
            onBackToWorldMap={() => {
              setActiveTab('inicio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenScientist={id => setSelectedScientistId(id)}
            onSelectCountry={country => setSelectedCountry(country)}
          />
        )}

        {/* VIEW 3: LÍNEA DEL TIEMPO GLOBAL */}
        {activeTab === 'linea-tiempo' && (
          <GlobalTimeline
            onOpenScientist={id => setSelectedScientistId(id)}
            onSelectCountry={country => setSelectedCountry(country)}
          />
        )}

        {/* VIEW 4: CATÁLOGO DE CIENTÍFICOS */}
        {activeTab === 'cientificos' && (
          <ScientistsDirectory
            onOpenScientist={id => setSelectedScientistId(id)}
            onSelectCountry={country => setSelectedCountry(country)}
          />
        )}

        {/* VIEW 5: ACERCA DEL PROYECTO */}
        {activeTab === 'acerca' && (
          <AboutSection
            onBackToHome={() => {
              setActiveTab('inicio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Global Modals & Dialogs */}
      <ScientistModal
        scientistId={selectedScientistId}
        onClose={() => setSelectedScientistId(null)}
        onSelectScientist={id => setSelectedScientistId(id)}
        onSelectCountry={country => setSelectedCountry(country)}
      />

      <CountryModal
        country={selectedCountry}
        onClose={() => setSelectedCountry(null)}
        onOpenScientist={id => setSelectedScientistId(id)}
      />

      <SearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectScientist={id => setSelectedScientistId(id)}
      />

      {/* Global Footer */}
      <Footer
        onSelectTab={tab => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
    </div>
  );
}
