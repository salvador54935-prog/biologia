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
  Users,
  Compass,
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
  const [collectionFilter, setCollectionFilter] = useState<'all' | 'pdf' | 'supplementary' | 'pioneras'>('all');
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

    if (collectionFilter === 'pdf') {
      list = list.filter(s => s.paginaPDF !== null && s.paginaPDF !== undefined);
    } else if (collectionFilter === 'supplementary') {
      list = list.filter(s => s.esComplementario);
    } else if (collectionFilter === 'pioneras') {
      list = list.filter(s => s.esPionera);
    }

    if (sortBy === 'chrono-desc') {
      list = [...list].sort((a, b) => b.anioNumerico - a.anioNumerico);
    } else if (sortBy === 'alpha-asc') {
      list = [...list].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
    }

    return list;
  }, [query, continent, country, field, collectionFilter, sortBy]);

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 text-slate-100">
      {/* Directory Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Directorio Biográfico Universal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1 font-serif">
            Catálogo General de Científicos ({SCIENTISTS_DATA.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            209 biografías fundacionales del documento histórico más 250 biografías complementarias verificadas.
          </p>
        </div>

        {/* Collection Filter Quick Chips */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
          <button
            onClick={() => setCollectionFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              collectionFilter === 'all'
                ? 'bg-emerald-600 text-white font-semibold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Todos (459)
          </button>
          <button
            onClick={() => setCollectionFilter('pdf')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              collectionFilter === 'pdf'
                ? 'bg-emerald-600 text-white font-semibold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            PDF Original (209)
          </button>
          <button
            onClick={() => setCollectionFilter('supplementary')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              collectionFilter === 'supplementary'
                ? 'bg-emerald-600 text-white font-semibold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Ampliación (250)
          </button>
          <button
            onClick={() => setCollectionFilter('pioneras')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
              collectionFilter === 'pioneras'
                ? 'bg-fuchsia-600 text-white font-semibold shadow'
                : 'text-fuchsia-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Pioneras</span>
          </button>
        </div>
      </div>

      {/* Global Filter Bar */}
      <div className="bg-[#09152b] rounded-xl border border-slate-800 p-4 space-y-3 shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Query input */}
          <div className="lg:col-span-2 relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Buscar por científico, aporte, ciudad o concepto..."
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
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
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
              aria-label="Filtrar por continente"
            >
              <option value="Todos">Todos los continentes (5)</option>
              <option value="Europa">Europa</option>
              <option value="América">América</option>
              <option value="Asia">Asia</option>
              <option value="África">África</option>
              <option value="Oceanía">Oceanía</option>
            </select>
          </div>

          {/* Field */}
          <div>
            <select
              value={field}
              onChange={e => setField(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
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
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
              aria-label="Ordenar resultados"
            >
              <option value="chrono-asc">Cronológico (antiguo → reciente)</option>
              <option value="chrono-desc">Cronológico (reciente → antiguo)</option>
              <option value="alpha-asc">Alfabético por nombre (A–Z)</option>
            </select>
          </div>
        </div>

        {/* Status / Active filters indicators */}
        <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-800">
          <span className="font-mono">
            {results.length} científicos listados
          </span>

          {(query || continent !== 'Todos' || country !== 'Todos' || field !== 'Todos' || collectionFilter !== 'all') && (
            <button
              onClick={() => {
                setQuery('');
                setContinent('Todos');
                setCountry('Todos');
                setField('Todos');
                setCollectionFilter('all');
              }}
              className="text-emerald-400 hover:text-emerald-300 underline font-medium cursor-pointer"
            >
              Restablecer filtros
            </button>
          )}
        </div>
      </div>

      {/* Results Grid */}
      {results.length === 0 ? (
        <div className="bg-[#09152b] border border-slate-800 rounded-xl p-12 text-center space-y-3">
          <p className="text-slate-200 font-medium text-sm">
            No se encontraron científicos con los filtros seleccionados.
          </p>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Verifica la búsqueda o prueba con términos como «microscopía», «genética», «ADN», «vacuna» o «botánica».
          </p>
          <button
            onClick={() => {
              setQuery('');
              setContinent('Todos');
              setCountry('Todos');
              setField('Todos');
              setCollectionFilter('all');
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
              className="bg-[#0a1832] hover:bg-[#0e2145] border border-slate-700/60 hover:border-emerald-500/50 rounded-xl p-4 sm:p-5 flex flex-col justify-between transition-colors group cursor-pointer shadow-sm hover:shadow-emerald-500/10"
              tabIndex={0}
              role="button"
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') onOpenScientist(s.id);
              }}
              aria-label={`Ver ficha de ${s.nombre}`}
            >
              <div>
                <div className="flex items-baseline justify-between gap-2 mb-1.5">
                  <span className="font-mono text-xs font-bold text-amber-300">
                    {s.aportePeriodo}
                  </span>
                  
                  {s.paginaPDF ? (
                    <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/70 px-1.5 py-0.5 rounded border border-cyan-800/50">
                      PDF Pág. {s.paginaPDF}
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/70 px-1.5 py-0.5 rounded border border-emerald-800/50">
                      Ampliación
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors font-serif">
                    {s.nombre}
                  </h3>
                  {s.esPionera && (
                    <span className="px-1.5 py-0.2 text-[9px] font-mono bg-fuchsia-950/80 text-fuchsia-300 border border-fuchsia-800/60 rounded shrink-0">
                      Pionera
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium mt-0.5">
                  <span>{s.campo}</span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-300 mt-1">
                  <span className="text-slate-400">{s.continente}</span>
                  <span>·</span>
                  <span className="text-amber-200 font-medium">{s.pais}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mt-2.5 line-clamp-3">
                  {s.aporteDescripcion}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-mono text-slate-300">Vida: {s.vida}</span>
                <span className="text-emerald-400 font-medium group-hover:underline">
                  Ver biografía →
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
