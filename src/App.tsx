import React, { useState, useEffect } from 'react';
import { ActiveTab, ContinentId } from './types';
import { Header } from './components/Header';
import { StatsBar } from './components/StatsBar';
import { WorldMap } from './components/WorldMap';
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
    <div className="min-h-screen bg-[#070d18] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
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
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-8 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Text Zone */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Atlas Universal · 459 Científicos y Pioneras</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight text-balance font-serif">
                    VITA MUNDI
                    <span className="block text-xl sm:text-2xl font-normal text-emerald-300/90 font-sans mt-2">
                      Historia Universal de la Biología y la Vida
                    </span>
                  </h1>

                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                    Un viaje interactivo y cartográfico por más de 4.660 años de descubrimientos
                    biológicos: desde los papiros quirúrgicos de Imhotep (c. 2650 a. C.) hasta
                    las fronteras de la genómica moderna y la edición CRISPR-Cas9.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setActiveTab('continentes');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-lg shadow-emerald-600/20 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    >
                      <Globe2 className="w-4 h-4" />
                      <span>Explorar 5 continentes</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('linea-tiempo');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex items-center gap-2 px-4 py-2.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 font-medium text-xs sm:text-sm rounded-lg transition-colors cursor-pointer"
                    >
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span>Cronología completa</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('cientificos');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex items-center gap-2 px-4 py-2.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 font-medium text-xs sm:text-sm rounded-lg transition-colors cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-emerald-400" />
                      <span>Catálogo (459)</span>
                    </button>
                  </div>
                </div>

                {/* Right Visual Stage with High-Fidelity Asset */}
                <div className="lg:col-span-5 relative">
                  <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group">
                    <img
                      src="/src/assets/images/hero_biology_atlas_1792030347681.jpg"
                      alt="Laboratorio histórico y moderno de biología, manuscritos botánicos y doble hélice de ADN"
                      referrerPolicy="no-referrer"
                      className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070d18] via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-3 left-3 right-3 p-3 bg-slate-950/85 backdrop-blur-md rounded-xl border border-slate-800 text-xs">
                      <div className="flex items-center justify-between text-[11px] font-mono text-emerald-300">
                        <span>HISTORIA NATURAL · GENÓMICA · EVOLUCIÓN</span>
                        <span>4.662 AÑOS</span>
                      </div>
                      <p className="text-slate-300 text-[11px] mt-0.5 line-clamp-1">
                        De la observación anatómica clásica al desciframiento del código de la vida.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

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
