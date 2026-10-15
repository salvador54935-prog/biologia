import React, { useState, useMemo } from 'react';
import { ContinentId, Scientist } from '../types';
import { SCIENTISTS_DATA } from '../data/scientists';
import { getAllFields, getAllCountries, filterScientists } from '../utils/filters';
import {
  Search,
  Filter,
  ArrowUpDown,
  BookOpen,
  MapPin,
  Briefcase,
  Globe,
  Award,
  Sparkles,
} from 'lucide-react';

interface ScientistsDirectoryProps {
  onOpenScientist: (id: string) => void;
  onSelectCountry: (country: string) => void;
}

export const ScientistsDirectory: React.FC<ScientistsDirectoryProps> = ({
  onOpenScientist,
  onSelectCountry,
}) => {
  const [query, setQuery] = useState('');
  const [continent, setContinent] = useState<ContinentId | 'Todos'>('Todos');
  const [country, setCountry] = useState<string>('Todos');
  const [field, setField] = useState<string>('Todos');
  const [sortBy, setSortBy] = useState<'chrono-asc' | 'chrono-desc' | 'alpha-asc'>('chrono-asc');

  const allFields = useMemo(() => getAllFields(), []);
  const allCountries = useMemo(() => getAllCountries(), []);

  const results = useMemo(() => {
    let list = filterScientists({
      query,
      continente: continent,
      pais: country,
      campo: field,
    });

    if (sortBy === 'chrono-desc') {
      list = [...list].sort((a, b) => b.anioNumerico - a.anioNumerico);
    } else if (sortBy === 'alpha-asc') {
      list = [...list].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
    }

    return list;
  }, [query, continent, country, field, sortBy]);

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Directory Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Directorio Biográfico Documental</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
          Catálogo General de Científicos (209)
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Fichas completas extraídas del documento histórico «Línea del tiempo de la biología».
        </p>
      </div>

      {/* Global Filter Bar */}
      <div className="bg-[#091224] rounded-xl border border-slate-800 p-4 space-y-3 shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Query input */}
          <div className="lg:col-span-2 relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Buscar por nombre, aporte, ciudad o concepto..."
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Continent */}
          <div>
            <select
              value={continent}
              onChange={e => {
                setContinent(e.target.value as ContinentId | 'Todos');
                setCountry('Todos');
              }}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
              aria-label="Filtrar por continente"
            >
              <option value="Todos">Todos los continentes (5)</option>
              <option value="Europa">Europa (100)</option>
              <option value="América">América (55)</option>
              <option value="Asia">Asia (30)</option>
              <option value="África">África (13)</option>
              <option value="Oceanía">Oceanía (11)</option>
            </select>
          </div>

          {/* Field */}
          <div>
            <select
              value={field}
              onChange={e => setField(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
              aria-label="Filtrar por campo científico"
            >
              <option value="Todos">Todos los campos ({allFields.length})</option>
              {allFields.map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Sort order */}
          <div>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
              aria-label="Ordenar resultados"
            >
              <option value="chrono-asc">Cronológico (antiguo → reciente)</option>
              <option value="chrono-desc">Cronológico (reciente → antiguo)</option>
              <option value="alpha-asc">Alfabético por nombre (A–Z)</option>
            </select>
          </div>
        </div>

        {/* Status / Active filters indicators */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
          <span className="font-mono">
            {results.length} científicos encontrados
          </span>

          {(query || continent !== 'Todos' || country !== 'Todos' || field !== 'Todos') && (
            <button
              onClick={() => {
                setQuery('');
                setContinent('Todos');
                setCountry('Todos');
                setField('Todos');
              }}
              className="text-cyan-400 hover:text-cyan-300 underline font-medium cursor-pointer"
            >
              Restablecer filtros
            </button>
          )}
        </div>
      </div>

      {/* Results Grid */}
      {results.length === 0 ? (
        <div className="bg-[#091224] border border-slate-800 rounded-xl p-12 text-center space-y-3">
          <p className="text-slate-200 font-medium text-sm">
            No se encontraron científicos con los filtros seleccionados.
          </p>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Verifica la ortografía o intenta buscar por términos más generales (ej: «genética», «microscopio», «vacuna», «ADN»).
          </p>
          <button
            onClick={() => {
              setQuery('');
              setContinent('Todos');
              setCountry('Todos');
              setField('Todos');
            }}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-white rounded-lg transition-colors cursor-pointer"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map(s => (
            <article
              key={s.id}
              onClick={() => onOpenScientist(s.id)}
              className="bg-[#091224] hover:bg-[#0c1830] border border-slate-800 hover:border-cyan-500/40 rounded-xl p-4 sm:p-5 flex flex-col justify-between transition-colors group cursor-pointer shadow-sm hover:shadow-cyan-500/10"
              tabIndex={0}
              role="button"
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') onOpenScientist(s.id);
              }}
              aria-label={`Ver ficha de ${s.nombre}`}
            >
              <div>
                <div className="flex items-baseline justify-between gap-2 mb-1.5">
                  <span className="font-mono text-xs font-bold text-amber-400">
                    {s.aportePeriodo}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Pág. {s.paginaPDF}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {s.nombre}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-medium mt-0.5">
                  <span>{s.campo}</span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                  <span>{s.continente}</span>
                  <span>·</span>
                  <span className="text-slate-300 font-medium">{s.pais}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mt-2.5 line-clamp-3">
                  {s.aporteDescripcion}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-mono">Vida: {s.vida}</span>
                <span className="text-cyan-400 font-medium group-hover:underline">
                  Ver detalle →
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
