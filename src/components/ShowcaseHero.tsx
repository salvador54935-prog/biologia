/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  ArrowRight, 
  Compass, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { getCountryFlag, getDisciplineStyle } from '../utils/disciplines';

export interface ShowcaseScientist {
  id: string;
  nombre: string;
  pais: string;
  continente: string;
  vida: string;
  periodo: string;
  disciplinas: string[];
  citaClave: string;
  aporteCorto: string;
  retratoUrl: string;
  impacto: string;
}

export const SHOWCASE_SCIENTISTS: ShowcaseScientist[] = [
  {
    id: 'albert-einstein',
    nombre: 'Albert Einstein',
    pais: 'Alemania',
    continente: 'Europa',
    vida: '1879 – 1955',
    periodo: '1905 – 1915',
    disciplinas: ['Física'],
    citaClave: 'La imaginación es más importante que el conocimiento; el conocimiento es limitado, mientras que la imaginación abarca el universo entero.',
    aporteCorto: 'Teorías de la Relatividad Especial y General, efecto fotoeléctrico y la equivalencia masa-energía (E = mc²).',
    retratoUrl: '/portraits/albert-einstein.jpg',
    impacto: 'Redefinió el concepto de espacio, tiempo y gravitación universal.'
  },
  {
    id: 'isaac-newton',
    nombre: 'Isaac Newton',
    pais: 'Reino Unido',
    continente: 'Europa',
    vida: '1643 – 1727',
    periodo: '1687',
    disciplinas: ['Física', 'Matemáticas'],
    citaClave: 'Si he visto más lejos que otros, es poniéndome sobre los hombros de gigantes.',
    aporteCorto: 'Leyes del movimiento, ley de la gravitación universal, cálculo infinitesimal y óptica del prisma.',
    retratoUrl: '/portraits/isaac-newton.jpg',
    impacto: 'Estableció las bases matemáticas de la física clásica durante dos siglos.'
  },
  {
    id: 'marie-curie',
    nombre: 'Marie Curie',
    pais: 'Polonia',
    continente: 'Europa',
    vida: '1867 – 1934',
    periodo: '1898 – 1911',
    disciplinas: ['Física', 'Química'],
    citaClave: 'Nada en la vida debe ser temido, solo debe ser entendido. Ahora es el momento de entender más para temer menos.',
    aporteCorto: 'Descubrimiento del polonio y radio, e investigaciones pioneras sobre la radiactividad espontánea.',
    retratoUrl: '/portraits/marie-curie.jpg',
    impacto: 'Primera persona en recibir dos Premios Nobel en disciplinas científicas diferentes.'
  },
  {
    id: 'charles-darwin',
    nombre: 'Charles Darwin',
    pais: 'Reino Unido',
    continente: 'Europa',
    vida: '1809 – 1882',
    periodo: '1859',
    disciplinas: ['Biología'],
    citaClave: 'No es la especie más fuerte la que sobrevive, ni la más inteligente, sino la que responde mejor al cambio.',
    aporteCorto: 'Teoría de la evolución biológica de las especies por selección natural expuesta en El origen de las especies.',
    retratoUrl: '/portraits/charles-darwin.jpg',
    impacto: 'Transformó radicalmente la comprensión del origen y la diversidad de los seres vivos.'
  },
  {
    id: 'galileo-galilei',
    nombre: 'Galileo Galilei',
    pais: 'Italia',
    continente: 'Europa',
    vida: '1564 – 1642',
    periodo: '1609 – 1610',
    disciplinas: ['Astronomía', 'Física'],
    citaClave: 'El gran libro de la naturaleza está escrito con símbolos matemáticos.',
    aporteCorto: 'Observación telescópica de las lunas de Júpiter, fases de Venus, cráteres lunares y cinemática del movimiento uniformemente acelerado.',
    retratoUrl: '/portraits/galileo-galilei.jpg',
    impacto: 'Padre de la ciencia observacional moderna y defensor pionero del heliocentrismo copernicano.'
  },
  {
    id: 'louis-pasteur',
    nombre: 'Louis Pasteur',
    pais: 'Francia',
    continente: 'Europa',
    vida: '1822 – 1895',
    periodo: '1862 – 1885',
    disciplinas: ['Medicina', 'Biología'],
    citaClave: 'En los campos de la observación, el azar favorece únicamente a la mente que está preparada.',
    aporteCorto: 'Refutación de la generación espontánea, invención de la pasteurización y desarrollo de vacunas contra la rabia y el carbunco.',
    retratoUrl: '/portraits/louis-pasteur.jpg',
    impacto: 'Fundador de la microbiología clínica moderna e impulsor de la higiene médica hospitalaria.'
  },
  {
    id: 'ada-lovelace',
    nombre: 'Ada Lovelace',
    pais: 'Reino Unido',
    continente: 'Europa',
    vida: '1815 – 1852',
    periodo: '1843',
    disciplinas: ['Informática', 'Matemáticas'],
    citaClave: 'La máquina analítica teje patrones algebraicos del mismo modo que el telar de Jacquard teje flores y hojas.',
    aporteCorto: 'Primer algoritmo informático diseñado para ser ejecutado por una máquina de cálculo universal programable.',
    retratoUrl: '/portraits/ada-lovelace.jpg',
    impacto: 'Primera programadora de computadoras de la historia y visionaria de la computación simbólica.'
  },
  {
    id: 'nikola-tesla',
    nombre: 'Nikola Tesla',
    pais: 'Serbia',
    continente: 'Europa',
    vida: '1856 – 1943',
    periodo: '1888 – 1893',
    disciplinas: ['Ingeniería', 'Física'],
    citaClave: 'El presente es de ellos; el futuro, por el que realmente he trabajado, es mío.',
    aporteCorto: 'Sistema de corriente alterna polifásica, motor de inducción magnética, bobina de Tesla y transmisión inalámbrica.',
    retratoUrl: '/portraits/nikola-tesla.jpg',
    impacto: 'Padre de la red eléctrica contemporánea y de la electrificación industrial global.'
  },
  {
    id: 'ibn-al-haytham',
    nombre: 'Ibn al-Haytham',
    pais: 'Irak',
    continente: 'Asia',
    vida: 'c. 965 – c. 1040',
    periodo: '1021',
    disciplinas: ['Física', 'Astronomía', 'Medicina'],
    citaClave: 'El deber del buscador de la verdad no es depositar su fe en los escritos de los antiguos, sino contrastarlos con pruebas.',
    aporteCorto: 'Fundamentos de la óptica moderna demostrando que los rayos luminosos entran en el ojo, e invención de la cámara oscura.',
    retratoUrl: '/portraits/ibn-al-haytham.jpg',
    impacto: 'Padre indiscutible de la óptica y precursor del método científico experimental riguroso.'
  },
  {
    id: 'katherine-johnson',
    nombre: 'Katherine Johnson',
    pais: 'Estados Unidos',
    continente: 'América',
    vida: '1918 – 2020',
    periodo: '1961 – 1969',
    disciplinas: ['Matemáticas', 'Astronomía'],
    citaClave: 'Me gustaba contar. Contaba los pasos hacia el camino, los platos y las estrellas. Todo lo que pudiera ser contado.',
    aporteCorto: 'Cálculos de mecánica orbital y trayectorias críticas para el primer vuelo orbital de John Glenn y la misión Apolo 11 a la Luna.',
    retratoUrl: '/portraits/katherine-johnson.jpg',
    impacto: 'Pionera matemática aeroespacial que abrió el camino a los alunizajes tripulados de la NASA.'
  }
];

interface ShowcaseHeroProps {
  onOpenScientist: (id: string) => void;
  onExploreMap: () => void;
  onExploreTimeline: () => void;
}

export const ShowcaseHero: React.FC<ShowcaseHeroProps> = ({
  onOpenScientist,
  onExploreMap,
  onExploreTimeline,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const durationMs = 10000; // 10 segundos obligatorios
  const stepInterval = 100;
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const current = SHOWCASE_SCIENTISTS[currentIndex];

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SHOWCASE_SCIENTISTS.length);
    setProgress(0);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SHOWCASE_SCIENTISTS.length) % SHOWCASE_SCIENTISTS.length);
    setProgress(0);
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  useEffect(() => {
    if (!isPlaying || isHovered) {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      return;
    }

    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (stepInterval / durationMs) * 100;
        if (next >= 100) {
          goToNext();
          return 0;
        }
        return next;
      });
    }, stepInterval);

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isPlaying, isHovered, currentIndex]);

  return (
    <section 
      className="relative mb-10 overflow-hidden rounded-3xl border border-[#1b3a2b]/15 bg-gradient-to-b from-[#fbf9f4] via-[#f7f3e8] to-[#f2ecdc] shadow-xl dark:border-[#234734]/40 dark:from-[#0d1c14] dark:via-[#13261c] dark:to-[#0a1710]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Pabellón de Grandes Científicos de la Historia"
    >
      {/* Barra de progreso de rotación de 10 segundos */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#1b3a2b]/10 dark:bg-[#234734]/30 z-30">
        <div 
          className="h-full bg-gradient-to-r from-[#1b3a2b] via-[#2d6148] to-[#b89047] transition-all duration-100 ease-linear dark:from-[#347858] dark:to-[#d4af37]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Marca de agua decorativa sutil */}
      <div className="pointer-events-none absolute -right-20 -bottom-24 select-none opacity-[0.03] dark:opacity-[0.05]">
        <span className="text-[280px] font-serif font-black tracking-tighter text-[#1b3a2b] dark:text-[#a8d5c4]">
          X
        </span>
      </div>

      <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
        {/* Encabezado editorial superior */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#1b3a2b]/10 pb-4 dark:border-[#234734]/30">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1b3a2b] text-xs font-semibold text-[#fcfbf7] shadow-sm dark:bg-[#2d6148]">
              {currentIndex + 1}
            </span>
            <span className="text-xs font-semibold tracking-wider uppercase text-[#1b3a2b]/80 dark:text-[#a3c9b3]">
              Pabellón de Grandes Científicos • {currentIndex + 1} de {SHOWCASE_SCIENTISTS.length}
            </span>
          </div>

          {/* Controles de reproducción y avance manual */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1b3a2b]/20 bg-[#fcfbf7]/80 text-[#1b3a2b] backdrop-blur-sm transition-all hover:bg-[#1b3a2b] hover:text-[#fcfbf7] dark:border-[#234734] dark:bg-[#14291e] dark:text-[#a3c9b3] dark:hover:bg-[#2d6148] dark:hover:text-white"
              title={isPlaying ? "Pausar rotación automática (10s)" : "Reanudar rotación automática (10s)"}
              aria-label={isPlaying ? "Pausar" : "Reproducir"}
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 translate-x-0.5" />}
            </button>
            <button
              onClick={goToPrev}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1b3a2b]/20 bg-[#fcfbf7]/80 text-[#1b3a2b] backdrop-blur-sm transition-all hover:bg-[#1b3a2b] hover:text-[#fcfbf7] dark:border-[#234734] dark:bg-[#14291e] dark:text-[#a3c9b3] dark:hover:bg-[#2d6148] dark:hover:text-white"
              title="Científico anterior"
              aria-label="Científico anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={goToNext}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1b3a2b]/20 bg-[#fcfbf7]/80 text-[#1b3a2b] backdrop-blur-sm transition-all hover:bg-[#1b3a2b] hover:text-[#fcfbf7] dark:border-[#234734] dark:bg-[#14291e] dark:text-[#a3c9b3] dark:hover:bg-[#2d6148] dark:hover:text-white"
              title="Siguiente científico"
              aria-label="Siguiente científico"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Contenido principal del científico destacado */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Columna Izquierda: Información Editorial */}
          <div className="space-y-5 lg:col-span-7">
            {/* Etiquetas de país, bandera circular y disciplinas */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1b3a2b]/20 bg-[#fcfbf7] px-3 py-1 text-xs font-medium text-[#1b3a2b] shadow-xs dark:border-[#234734] dark:bg-[#14291e] dark:text-[#e4efe8]">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1b3a2b]/10 text-xs dark:bg-white/10">
                  {getCountryFlag(current.pais)}
                </span>
                <span>{current.pais}</span>
                <span className="text-[#1b3a2b]/40 dark:text-white/30">•</span>
                <span>{current.continente}</span>
              </span>

              {current.disciplinas.map((disc) => {
                const style = getDisciplineStyle(disc);
                return (
                  <span
                    key={disc}
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${style.bg} ${style.text} ${style.border}`}
                  >
                    {disc}
                  </span>
                );
              })}

              <span className="rounded-full bg-[#1b3a2b]/5 px-2.5 py-1 text-xs font-mono font-medium text-[#1b3a2b]/70 dark:bg-white/5 dark:text-[#a3c9b3]">
                {current.vida}
              </span>
            </div>

            {/* Nombre y época */}
            <div>
              <h1 className="font-serif text-3xl font-extrabold tracking-tight text-[#14231b] sm:text-4xl lg:text-5xl dark:text-[#f4f1ea]">
                {current.nombre}
              </h1>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#7a6438] dark:text-[#d4af37]">
                Hito histórico: {current.periodo}
              </p>
            </div>

            {/* Cita célebre inspiradora */}
            <blockquote className="relative border-l-3 border-[#b89047] pl-4 italic text-[#2d4034] text-sm sm:text-base leading-relaxed dark:border-[#d4af37] dark:text-[#d3e3d8]">
              "{current.citaClave}"
            </blockquote>

            {/* Síntesis del descubrimiento e impacto */}
            <div className="space-y-2 rounded-2xl border border-[#1b3a2b]/10 bg-[#fcfbf7]/80 p-4 backdrop-blur-xs dark:border-[#234734]/40 dark:bg-[#12241a]/70">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#1b3a2b] dark:text-[#a3c9b3]">
                Descubrimiento central:
              </div>
              <p className="text-sm leading-relaxed text-[#1e3327] dark:text-[#e4efe8]">
                {current.aporteCorto}
              </p>
              <p className="text-xs font-medium text-[#5c6e62] dark:text-[#9bb7a5]">
                <strong className="text-[#1b3a2b] dark:text-[#cde4d6]">Trascendencia:</strong> {current.impacto}
              </p>
            </div>

            {/* Acciones principales */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onOpenScientist(current.id)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#1b3a2b] px-5 py-2.5 text-sm font-semibold text-[#fcfbf7] shadow-md transition-all hover:bg-[#244c38] hover:shadow-lg active:scale-98 dark:bg-[#2d6148] dark:hover:bg-[#387859]"
              >
                <span>Explorar biografía completa</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={onExploreMap}
                className="inline-flex items-center gap-2 rounded-xl border border-[#1b3a2b]/20 bg-[#fcfbf7] px-4 py-2.5 text-sm font-medium text-[#1b3a2b] shadow-xs transition-all hover:bg-[#1b3a2b]/5 active:scale-98 dark:border-[#234734] dark:bg-[#14291e] dark:text-[#d3e3d8] dark:hover:bg-[#1b3a2b]/30"
              >
                <Compass className="h-4 w-4 text-[#b89047] dark:text-[#d4af37]" />
                <span>Ver en mapa</span>
              </button>

              <button
                onClick={onExploreTimeline}
                className="inline-flex items-center gap-2 rounded-xl border border-[#1b3a2b]/20 bg-[#fcfbf7] px-4 py-2.5 text-sm font-medium text-[#1b3a2b] shadow-xs transition-all hover:bg-[#1b3a2b]/5 active:scale-98 dark:border-[#234734] dark:bg-[#14291e] dark:text-[#d3e3d8] dark:hover:bg-[#1b3a2b]/30"
              >
                <BookOpen className="h-4 w-4 text-[#1b3a2b] dark:text-[#a3c9b3]" />
                <span>Línea del tiempo</span>
              </button>
            </div>
          </div>

          {/* Columna Derecha: Retrato Histórico Real con marco editorial */}
          <div className="flex flex-col items-center justify-center lg:col-span-5">
            <div className="group relative w-full max-w-[340px] sm:max-w-[380px]">
              {/* Resplandor suave decorativo */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#1b3a2b]/20 via-[#b89047]/15 to-transparent blur-xl transition-all duration-500 group-hover:scale-102 dark:from-[#2d6148]/30 dark:via-[#d4af37]/20" />

              {/* Contenedor del retrato con acabado de paspartú editorial */}
              <div className="relative overflow-hidden rounded-2xl border-4 border-[#fcfbf7] bg-[#f4efe3] p-2 shadow-2xl transition-all duration-300 dark:border-[#1e3b2b] dark:bg-[#0f1f17]">
                <div className="relative aspect-4/5 w-full overflow-hidden rounded-xl bg-[#233529]">
                  <img
                    src={current.retratoUrl}
                    alt={`Retrato histórico de ${current.nombre}`}
                    className="h-full w-full object-cover object-center filter grayscale-[15%] contrast-[105%] transition-transform duration-700 ease-out group-hover:scale-104 group-hover:grayscale-0"
                    loading="eager"
                  />
                  {/* Gradiente sutil en base del retrato */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Pie de foto integrado */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <span className="text-xs font-serif font-semibold tracking-wide drop-shadow-md">
                      {current.nombre}
                    </span>
                    <span className="rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-mono backdrop-blur-xs">
                      {current.vida}
                    </span>
                  </div>
                </div>
              </div>

              {/* Distintivo de autenticidad documental */}
              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] font-medium text-[#5c6e62] dark:text-[#9bb7a5]">
                <Sparkles className="h-3 w-3 text-[#b89047] dark:text-[#d4af37]" />
                <span>Retrato histórico verificado de archivo científico</span>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de 10 indicadores en miniatura interactivos */}
        <div className="mt-8 border-t border-[#1b3a2b]/10 pt-6 dark:border-[#234734]/30">
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 scrollbar-none">
            {SHOWCASE_SCIENTISTS.map((sci, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={sci.id}
                  onClick={() => goToIndex(idx)}
                  className={`group relative flex flex-1 min-w-[70px] sm:min-w-[90px] flex-col items-center rounded-xl p-2 text-center transition-all ${
                    isActive
                      ? 'bg-[#1b3a2b] text-[#fcfbf7] shadow-md dark:bg-[#2d6148]'
                      : 'bg-[#fcfbf7]/60 text-[#2d4034] hover:bg-[#1b3a2b]/10 dark:bg-[#14291e]/50 dark:text-[#a3c9b3] dark:hover:bg-[#234734]/40'
                  }`}
                  title={`${sci.nombre} (${sci.disciplinas[0]})`}
                  aria-label={`Ver ${sci.nombre}`}
                >
                  <div className="relative mb-1 h-8 w-8 overflow-hidden rounded-full border border-current shadow-xs">
                    <img 
                      src={sci.retratoUrl} 
                      alt={sci.nombre} 
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <span className="line-clamp-1 text-[11px] font-semibold">
                    {sci.nombre.split(' ').slice(-1)[0]}
                  </span>
                  <span className="text-[9px] opacity-75 font-mono">
                    {sci.disciplinas[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
