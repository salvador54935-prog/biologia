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
import { getDisciplineStyle } from '../utils/disciplines';
import { CircularFlag } from './CircularFlag';

export interface ShowcaseScientist {
  id: string;
  nombre: string;
  pais: string;
  continente: string;
  vida: string;
  periodo: string;
  disciplinas: string[];
  subtituloAporte: string;
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
    subtituloAporte: 'Pionero de la física moderna; formuló la teoría de la relatividad y explicó el efecto fotoeléctrico.',
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
    subtituloAporte: 'Pionero de la física clásica; formuló las leyes del movimiento y la gravitación universal.',
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
    subtituloAporte: 'Pionera de la investigación sobre la radiactividad; descubrió el polonio y el radio.',
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
    subtituloAporte: 'Pionero de la biología evolutiva; formuló la teoría de la evolución por selección natural.',
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
    subtituloAporte: 'Pionero de la astronomía observacional y la cinemática; confirmó el heliocentrismo copernicano.',
    citaClave: 'El gran libro de la naturaleza está escrito con símbolos matemáticos.',
    aporteCorto: 'Observación telescópica de las lunas de Júpiter, fases de Venus, cráteres lunares y cinemática del movimiento.',
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
    subtituloAporte: 'Pionero de la microbiología médica; desarrolló la pasteurización y las vacunas contra la rabia y el carbunco.',
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
    subtituloAporte: 'Pionera de la informática teórica; concibió el primer algoritmo para una máquina de cálculo universal.',
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
    subtituloAporte: 'Pionero de la ingeniería electromagnética; desarrolló el sistema de corriente alterna polifásica y el motor de inducción.',
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
    subtituloAporte: 'Pionero de la óptica moderna; fundamentó el método experimental y demostró la física de la visión.',
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
    subtituloAporte: 'Pionera de la mecánica orbital; calculó las trayectorias espaciales críticas de los proyectos Mercury y Apolo.',
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
      className="relative overflow-hidden rounded-2xl border border-[#234734]/20 bg-gradient-to-b from-[#f7f5ed] via-[#f2ede0] to-[#eae3d2] shadow-lg dark:border-[#2d563e]/40 dark:from-[#112419] dark:via-[#162d20] dark:to-[#0d1e15]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Pabellón de 10 Grandes Científicos de la Historia"
    >
      {/* Barra de progreso de rotación de 10 segundos */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#234734]/10 dark:bg-[#2d563e]/30 z-30">
        <div 
          className="h-full bg-gradient-to-r from-[#234734] via-[#356e4e] to-[#8c6b2d] transition-all duration-100 ease-linear dark:from-[#3d7a57] dark:to-[#d4af37]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="relative z-10 px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-8">
        {/* Encabezado editorial superior */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[#234734]/15 pb-3.5 dark:border-[#2d563e]/30">
          <div className="flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1b3a2b] text-[11px] font-bold text-[#fcfbf7] shadow-xs dark:bg-[#2d563e]">
              {currentIndex + 1}
            </span>
            <span className="text-xs font-bold tracking-wider uppercase text-[#1b3a2b] dark:text-[#a3c9b3]">
              Pabellón de Grandes Científicos • {currentIndex + 1} de {SHOWCASE_SCIENTISTS.length}
            </span>
          </div>

          {/* Controles de reproducción y avance manual */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-[#234734]/20 bg-[#fcfbf7]/90 text-[#1b3a2b] transition-all hover:bg-[#1b3a2b] hover:text-[#fcfbf7] dark:border-[#2d563e] dark:bg-[#14291e] dark:text-[#a3c9b3] dark:hover:bg-[#2d563e] dark:hover:text-white"
              title={isPlaying ? "Pausar rotación automática (10s)" : "Reanudar rotación automática (10s)"}
              aria-label={isPlaying ? "Pausar" : "Reproducir"}
            >
              {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 translate-x-0.5" />}
            </button>
            <button
              onClick={goToPrev}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-[#234734]/20 bg-[#fcfbf7]/90 text-[#1b3a2b] transition-all hover:bg-[#1b3a2b] hover:text-[#fcfbf7] dark:border-[#2d563e] dark:bg-[#14291e] dark:text-[#a3c9b3] dark:hover:bg-[#2d563e] dark:hover:text-white"
              title="Científico anterior"
              aria-label="Científico anterior"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={goToNext}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-[#234734]/20 bg-[#fcfbf7]/90 text-[#1b3a2b] transition-all hover:bg-[#1b3a2b] hover:text-[#fcfbf7] dark:border-[#2d563e] dark:bg-[#14291e] dark:text-[#a3c9b3] dark:hover:bg-[#2d563e] dark:hover:text-white"
              title="Siguiente científico"
              aria-label="Siguiente científico"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Contenido principal del científico destacado */}
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Columna Izquierda: Información Editorial */}
          <div className="space-y-4 lg:col-span-7">
            {/* Etiquetas de país con bandera circular oficial y disciplinas */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#234734]/20 bg-[#fcfbf7] px-2.5 py-0.5 text-xs font-medium text-[#142e20] shadow-2xs dark:border-[#2d563e] dark:bg-[#14291e] dark:text-[#e4efe8]">
                <CircularFlag country={current.pais} size="sm" />
                <span>{current.pais}</span>
                <span className="text-[#234734]/40 dark:text-white/30">•</span>
                <span>{current.continente}</span>
              </span>

              {current.disciplinas.map((disc) => {
                const style = getDisciplineStyle(disc);
                return (
                  <span
                    key={disc}
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide ${style.bg} ${style.text} ${style.border}`}
                  >
                    {disc}
                  </span>
                );
              })}

              <span className="rounded-full bg-[#234734]/5 px-2 py-0.5 text-xs font-mono font-medium text-[#234734]/80 dark:bg-white/5 dark:text-[#a3c9b3]">
                {current.vida}
              </span>
            </div>

            {/* Nombre y subtítulo de aporte clave */}
            <div>
              <h2 className="font-serif text-2xl font-extrabold tracking-tight text-[#0f2419] sm:text-3xl lg:text-4xl dark:text-[#f4f1ea]">
                {current.nombre}
              </h2>
              {/* Identificación de sus aportes junto al nombre */}
              <p className="mt-1 text-xs sm:text-sm font-medium text-[#234734] dark:text-[#b4d8c2] leading-snug">
                {current.subtituloAporte}
              </p>
            </div>

            {/* Cita célebre inspiradora */}
            <blockquote className="relative border-l-2 border-[#8c6b2d] pl-3 italic text-[#243d2c] text-xs sm:text-sm leading-relaxed dark:border-[#d4af37] dark:text-[#d3e3d8]">
              "{current.citaClave}"
            </blockquote>

            {/* Síntesis del descubrimiento e impacto */}
            <div className="space-y-1.5 rounded-xl border border-[#234734]/15 bg-[#fcfbf7]/80 p-3.5 backdrop-blur-xs dark:border-[#2d563e]/40 dark:bg-[#12241a]/70">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#1b3a2b] dark:text-[#a3c9b3]">
                Mayor aporte científico:
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-[#142e20] dark:text-[#e4efe8]">
                {current.aporteCorto}
              </p>
              <p className="text-xs font-medium text-[#41604a] dark:text-[#9bb7a5]">
                <strong className="text-[#142e20] dark:text-[#cde4d6]">Trascendencia:</strong> {current.impacto}
              </p>
            </div>

            {/* Acciones principales */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                onClick={() => onOpenScientist(current.id)}
                className="inline-flex items-center gap-2 rounded-lg bg-[#1b3a2b] px-4 py-2 text-xs sm:text-sm font-semibold text-[#fcfbf7] shadow-sm transition-all hover:bg-[#254f3a] active:scale-98 dark:bg-[#2d563e] dark:hover:bg-[#397a5b]"
              >
                <span>Ver ficha completa documentada</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={onExploreMap}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#234734]/25 bg-[#fcfbf7] px-3.5 py-2 text-xs sm:text-sm font-medium text-[#1b3a2b] shadow-2xs transition-all hover:bg-[#234734]/5 active:scale-98 dark:border-[#2d563e] dark:bg-[#14291e] dark:text-[#d3e3d8] dark:hover:bg-[#234734]/30"
              >
                <Compass className="h-3.5 w-3.5 text-[#8c6b2d] dark:text-[#d4af37]" />
                <span>Ver en mapa</span>
              </button>

              <button
                onClick={onExploreTimeline}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#234734]/25 bg-[#fcfbf7] px-3.5 py-2 text-xs sm:text-sm font-medium text-[#1b3a2b] shadow-2xs transition-all hover:bg-[#234734]/5 active:scale-98 dark:border-[#2d563e] dark:bg-[#14291e] dark:text-[#d3e3d8] dark:hover:bg-[#234734]/30"
              >
                <BookOpen className="h-3.5 w-3.5 text-[#1b3a2b] dark:text-[#a3c9b3]" />
                <span>Cronología</span>
              </button>
            </div>
          </div>

          {/* Columna Derecha: Retrato Histórico Real con marco editorial */}
          <div className="flex flex-col items-center justify-center lg:col-span-5">
            <div className="group relative w-full max-w-[280px] sm:max-w-[320px]">
              {/* Marco fotográfico con paspartú */}
              <div className="relative overflow-hidden rounded-xl border-3 border-[#fcfbf7] bg-[#f4efe3] p-1.5 shadow-xl transition-all duration-300 dark:border-[#1e3b2b] dark:bg-[#0f1f17]">
                <div className="relative aspect-4/5 w-full overflow-hidden rounded-lg bg-[#1a2d21]">
                  <img
                    src={current.retratoUrl}
                    alt={`Retrato histórico de ${current.nombre}`}
                    className="h-full w-full object-cover object-center filter grayscale-[10%] contrast-[105%] transition-transform duration-500 group-hover:scale-103"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white">
                    <span className="text-xs font-serif font-semibold tracking-wide drop-shadow-md">
                      {current.nombre}
                    </span>
                    <span className="rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-mono backdrop-blur-xs">
                      {current.periodo}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-center gap-1.5 text-[11px] font-medium text-[#41604a] dark:text-[#9bb7a5]">
                <Sparkles className="h-3 w-3 text-[#8c6b2d] dark:text-[#d4af37]" />
                <span>Retrato histórico verificado de archivo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Miniaturas de selección directa de los 10 científicos */}
        <div className="mt-6 border-t border-[#234734]/15 pt-4 dark:border-[#2d563e]/30">
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
            {SHOWCASE_SCIENTISTS.map((sci, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={sci.id}
                  onClick={() => goToIndex(idx)}
                  className={`group relative flex flex-col items-center rounded-lg p-1.5 text-center transition-all ${
                    isActive
                      ? 'bg-[#1b3a2b] text-[#fcfbf7] shadow-sm dark:bg-[#2d563e]'
                      : 'bg-[#fcfbf7]/60 text-[#243d2c] hover:bg-[#234734]/10 dark:bg-[#14291e]/50 dark:text-[#a3c9b3] dark:hover:bg-[#234734]/40'
                  }`}
                  title={`${sci.nombre} — ${sci.subtituloAporte}`}
                  aria-label={`Ver ${sci.nombre}`}
                >
                  <div className="relative mb-1 h-7 w-7 overflow-hidden rounded-full border border-current shadow-2xs">
                    <img 
                      src={sci.retratoUrl} 
                      alt={sci.nombre} 
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <span className="line-clamp-1 text-[10px] font-semibold leading-tight">
                    {sci.nombre.split(' ').slice(-1)[0]}
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
