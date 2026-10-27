import React from 'react';
import { SCIENTISTS_DATA } from '../data/scientists';
import { Sparkles, ArrowRight, BookOpen, Clock, MapPin, Award } from 'lucide-react';

interface FeaturedDiscoveriesProps {
  onOpenScientist: (id: string) => void;
  onExploreAll: () => void;
}

export const FeaturedDiscoveries: React.FC<FeaturedDiscoveriesProps> = ({
  onOpenScientist,
  onExploreAll,
}) => {
  // Curated prominent scientists from distinct continents and eras
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
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Hitos Fundacionales</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Descubrimientos que Transformaron la Comprensión de la Vida
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Selección transversal a través de más de cuatro milenios documentados en el atlas,
            desde los primeros tratados quirúrgicos hasta la genética molecular contemporánea.
          </p>
        </div>

        <button
          onClick={onExploreAll}
          className="flex items-center gap-2 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors whitespace-nowrap cursor-pointer"
        >
          <span>Ver catálogo completo ({SCIENTISTS_DATA.length})</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid of featured scientist cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {featured.map(s => {
          if (!s) return null;
          return (
            <article
              key={s.id}
              onClick={() => onOpenScientist(s.id)}
              className="bg-[#091224] hover:bg-[#0c1830] border border-slate-800 hover:border-cyan-500/40 rounded-xl p-5 flex flex-col justify-between transition-all duration-200 group cursor-pointer shadow-sm hover:shadow-cyan-500/10"
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
                  <span className="font-mono text-xs font-bold text-amber-400">
                    {s.aportePeriodo}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-300">
                    <span>{s.continente} · {s.pais}</span>
                    {s.esPionera && (
                      <span className="px-1.5 py-0.2 rounded bg-rose-950/80 border border-rose-500/50 text-rose-300 text-[9px] font-sans">
                        Pionera
                      </span>
                    )}
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight">
                  {s.nombre}
                </h3>

                {/* Discipline */}
                <div className="text-xs font-medium text-cyan-400/90 mt-0.5">
                  {s.campo}
                </div>

                {/* Contribution */}
                <p className="text-xs text-slate-300 leading-relaxed mt-3 line-clamp-3">
                  {s.aporteDescripcion}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-mono text-[10px]">
                  {s.paginaPDF ? `Pág. ${s.paginaPDF} del PDF` : 'Colección complementaria'}
                </span>
                <span className="text-cyan-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform font-medium">
                  Ver ficha <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
