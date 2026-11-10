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
            {/* 1º Título y Presentación de BIOATLAS + 2º Introducción del Propósito */}
            <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
              <div className="relative overflow-hidden rounded-2xl border border-[#234734]/25 bg-gradient-to-br from-[#f7f5ed] via-[#f2ede0] to-[#e8e1cf] p-6 sm:p-10 shadow-sm dark:border-[#2d563e]/40 dark:from-[#0f2419] dark:via-[#142e20] dark:to-[#0c1811]">
                {/* Micro ornamento superior */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-[#234734] dark:text-[#a3c9b3] mb-3">
                  <span className="flex h-2 w-2 rounded-full bg-[#356e4e] animate-pulse" />
                  <span>Atlas Cartográfico Universal del Conocimiento Científico</span>
                  <span className="text-[#234734]/30 dark:text-white/20">•</span>
                  <span>759 Científicos Documentados</span>
                </div>

                {/* Título Principal */}
                <div className="max-w-4xl space-y-3">
                  <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0f2419] dark:text-[#f4f1ea] leading-[1.08]">
                    BIOATLAS
                  </h1>
                  <p className="font-serif text-lg sm:text-2xl font-medium text-[#2d563e] dark:text-[#b4d8c2] leading-snug">
                    El Mapa Vivo de los Descubrimientos que Transformaron la Historia Humana
                  </p>
                </div>

                {/* 2º Breve Introducción explicando el propósito de la plataforma */}
                <div className="mt-5 max-w-3xl border-t border-[#234734]/15 pt-5 dark:border-[#2d563e]/30">
                  <p className="text-sm sm:text-base leading-relaxed text-[#1e3b2b] dark:text-[#d7e6dc]">
                    Bienvenido a <strong>BIOATLAS</strong>, una expedición interactiva a través de más de cuatro milenios de avances científicos.
                    Explora las vidas, investigaciones, métodos experimentales y descubrimientos trascendentales de <strong>759 científicos y pensadores</strong> de
                    los cinco continentes: desde la medicina del Egipto faraónico y la Grecia clásica hasta la física cuántica, la biología molecular,
                    la astronomía telescópica, la computación algorítmica y la ingeniería moderna.
                  </p>
                </div>

                {/* Métricas destacadas de presentación */}
                <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-medium">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-[#234734]/20 bg-[#fcfbf7]/90 px-3 py-1 text-[#142e20] shadow-2xs dark:border-[#2d563e] dark:bg-[#14291e] dark:text-[#e4efe8]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#2e7d32]" />
                    <strong className="font-bold">759</strong> Biografías Exhaustivas
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-[#234734]/20 bg-[#fcfbf7]/90 px-3 py-1 text-[#142e20] shadow-2xs dark:border-[#2d563e] dark:bg-[#14291e] dark:text-[#e4efe8]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#8c6b2d]" />
                    <strong className="font-bold">71</strong> Naciones con Bandera Oficial (100%)
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-[#234734]/20 bg-[#fcfbf7]/90 px-3 py-1 text-[#142e20] shadow-2xs dark:border-[#2d563e] dark:bg-[#14291e] dark:text-[#e4efe8]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#52796f]" />
                    <strong className="font-bold">14</strong> Ramas del Saber Científico
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-[#234734]/20 bg-[#fcfbf7]/90 px-3 py-1 text-[#142e20] shadow-2xs dark:border-[#2d563e] dark:bg-[#14291e] dark:text-[#e4efe8]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#234734]" />
                    <strong className="font-bold">c. 2650 a. C. — 2024</strong>
                  </div>
                </div>
              </div>
            </header>

            {/* 3º Sección Especial: Pabellón de 10 Figuras Trascendentales (NO a pantalla completa) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-[#234734] dark:text-[#a3c9b3]">
                  <Sparkles className="h-3.5 w-3.5 text-[#8c6b2d] dark:text-[#d4af37]" />
                  <span>Pabellón de Honor • 10 Científicos Trascendentales</span>
                </div>
                <span className="text-xs text-[#52796f] dark:text-[#8ba898] font-medium hidden sm:inline">
                  Rotación de 10 segundos con retrato histórico verificado
                </span>
              </div>
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
