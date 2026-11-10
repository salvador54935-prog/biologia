/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SCIENTISTS_DATA } from '../data/scientists';
import { getDisciplinas, getDisciplineStyle } from '../utils/disciplines';
import { CircularFlag } from './CircularFlag';
import { Sparkles, ArrowRight } from 'lucide-react';

interface FeaturedDiscoveriesProps {
  onOpenScientist: (id: string) => void;
  onExploreAll: () => void;
}

export const FeaturedDiscoveries: React.FC<FeaturedDiscoveriesProps> = ({
  onOpenScientist,
  onExploreAll,
}) => {
  // Prominent scientists from distinct continents and eras
  const featuredIds = [
    'imhotep',
    'aristoteles',
    'abulcasis',
    'antonie-van-leeuwenhoek',
    'carlos-linneo',
    'charles-darwin',
    'gregor-mendel',
    'santiago-ramon-y-cajal',
    'carlos-chagas',
    'rosalind-franklin',
    'tu-youyou',
    'wangari-maathai',
  ];

  const featured = featuredIds
    .map(id => SCIENTISTS_DATA.find(s => s.id === id))
    .filter(Boolean);

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-[#142e20] dark:text-[#f4f1ea]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#8c6b2d] dark:text-[#d4af37] uppercase tracking-wider font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Hitos Fundacionales de la Ciencia</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f2419] dark:text-[#f4f1ea] tracking-tight mt-1 font-serif">
            Descubrimientos que Transformaron la Comprensión de la Vida y la Materia
          </h2>
          <p className="text-sm text-[#52796f] dark:text-[#9bb7a5] mt-1 max-w-2xl">
            Selección transversal a través de más de cuatro milenios: desde los primeros tratados médicos en el Antiguo Egipto hasta la biología molecular y la genética contemporánea.
          </p>
        </div>

        <button
          onClick={onExploreAll}
          className="flex items-center gap-2 text-xs font-semibold text-[#1b3a2b] hover:text-[#2d563e] dark:text-[#a3c9b3] dark:hover:text-white transition-colors whitespace-nowrap cursor-pointer"
        >
          <span>Ver catálogo completo ({SCIENTISTS_DATA.length})</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid of featured scientist cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {featured.map(s => {
          if (!s) return null;
          const disciplinas = getDisciplinas(s);

          return (
            <article
              key={s.id}
              onClick={() => onOpenScientist(s.id)}
              className="bg-[#fcfbf7] hover:bg-[#ffffff] dark:bg-[#12241a] dark:hover:bg-[#162d21] border border-[#234734]/20 hover:border-[#234734]/50 dark:border-[#2d563e]/40 rounded-xl p-5 flex flex-col justify-between transition-all duration-200 group cursor-pointer shadow-2xs hover:shadow-sm"
              tabIndex={0}
              role="button"
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') onOpenScientist(s.id);
              }}
              aria-label={`Ficha de ${s.nombre}`}
            >
              <div>
                {/* Header: Period & Continent */}
                <div className="flex items-baseline justify-between gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-[#8c6b2d] dark:text-[#d4af37] bg-[#8c6b2d]/10 dark:bg-[#d4af37]/15 px-2 py-0.5 rounded-md">
                    {s.aportePeriodo}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#52796f] dark:text-[#8ba898]">
                    <CircularFlag country={s.pais} size="sm" />
                    <span>{s.pais}</span>
                    {s.esPionera && (
                      <span className="px-1.5 py-0.2 rounded bg-[#8c2d4e]/10 border border-[#8c2d4e]/30 text-[#8c2d4e] text-[9px] font-semibold">
                        Pionera
                      </span>
                    )}
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold text-[#0f2419] dark:text-[#f4f1ea] group-hover:text-[#1b3a2b] dark:group-hover:text-[#a3c9b3] transition-colors tracking-tight font-serif">
                  {s.nombre}
                </h3>

                {/* Subtítulo de aporte */}
                <p className="mt-1 text-xs font-medium text-[#2d563e] dark:text-[#a3c9b3] line-clamp-2 leading-snug">
                  {s.subtituloAporte || `${s.nombre} — ${s.campo}; ${s.aporteDescripcion}`}
                </p>

                {/* Discipline chips */}
                <div className="flex flex-wrap gap-1 mt-2.5">
                  {disciplinas.slice(0, 2).map(disc => {
                    const style = getDisciplineStyle(disc);
                    return (
                      <span
                        key={disc}
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${style.bg} ${style.text} ${style.border}`}
                      >
                        {disc}
                      </span>
                    );
                  })}
                </div>

                {/* Contribution */}
                <p className="text-xs text-[#243d2c] dark:text-[#d7e6dc] leading-relaxed mt-3 line-clamp-3">
                  {s.aporteDescripcion}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-4 pt-3 border-t border-[#234734]/15 flex items-center justify-between text-[11px] text-[#52796f] dark:text-[#8ba898]">
                <span>Vida: {s.vida}</span>
                <span className="text-[#1b3a2b] dark:text-[#a3c9b3] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform font-medium">
                  Ver biografía <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
