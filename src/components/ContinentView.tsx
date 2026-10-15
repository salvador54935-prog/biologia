import React, { useState, useMemo } from 'react';
import { ContinentId, Scientist } from '../types';
import { CONTINENTS_INFO } from '../data/continents';
import {
  getScientistsByContinent,
  getCountriesForContinent,
  filterScientists,
} from '../utils/filters';
import {
  ArrowLeft,
  Search,
  Filter,
  MapPin,
  Calendar,
  Briefcase,
  BookOpen,
  Award,
  Globe,
  Info,
} from 'lucide-react';

interface ContinentViewProps {
  continent: ContinentId;
  onBackToWorldMap: () => void;
  onOpenScientist: (id: string) => void;
  onSelectCountry: (country: string) => void;
}

export const ContinentView: React.FC<ContinentViewProps> = ({
  continent,
  onBackToWorldMap,
  onOpenScientist,
  onSelectCountry,
}) => {
  const continentInfo = CONTINENTS_INFO[continent];
  const allContinentScientists = useMemo(
    () => getScientistsByContinent(continent),
    [continent]
  );
  const countriesInContinent = useMemo(
    () => getCountriesForContinent(continent),
    [continent]
  );

  const [selectedCountry, setSelectedCountry] = useState<string>('Todos');
  const [selectedField, setSelectedField] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract all distinct fields present in this continent
  const fieldsInContinent = useMemo(() => {
    const fields = new Set<string>();
    allContinentScientists.forEach(s => fields.add(s.campo));
    return Array.from(fields).sort((a, b) => a.localeCompare(b, 'es'));
  }, [allContinentScientists]);

  // Filter scientists within this continent
  const filteredScientists = useMemo(() => {
    return allContinentScientists.filter(s => {
      if (selectedCountry !== 'Todos' && s.pais !== selectedCountry) {
        return false;
      }
      if (selectedField !== 'Todos' && s.campo !== selectedField) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const mName = s.nombre.toLowerCase().includes(q);
        const mDesc = s.aporteDescripcion.toLowerCase().includes(q);
        const mCountry = s.pais.toLowerCase().includes(q);
        const mField = s.campo.toLowerCase().includes(q);
        const mWork = s.lugaresTrabajo.toLowerCase().includes(q);
        const mBirth = s.nacimientoLugar.toLowerCase().includes(q);
        if (!mName && !mDesc && !mCountry && !mField && !mWork && !mBirth) {
          return false;
        }
      }
      return true;
    });
  }, [allContinentScientists, selectedCountry, selectedField, searchQuery]);

  // Earliest and latest contribution in this continent
  const firstScientist = allContinentScientists[0];
  const lastScientist = allContinentScientists[allContinentScientists.length - 1];

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToWorldMap}
          className="flex items-center gap-2 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded px-2 py-1"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Regresar al mapa mundial</span>
        </button>

        <span className="text-xs font-mono text-slate-400">
          BIOATLAS / {continent.toUpperCase()}
        </span>
      </div>

      {/* Continent Hero Banner */}
      <div className="relative bg-[#091224] rounded-2xl border border-slate-800 p-6 sm:p-8 overflow-hidden shadow-xl">
        <div
          className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: continentInfo.color }}
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2.5 mb-2">
              <span
                className="w-3.5 h-3.5 rounded-full"
                style={{ backgroundColor: continentInfo.color }}
              />
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Continente Histórico Documentado
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {continentInfo.nombre}
            </h1>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              {continentInfo.descripcion}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-slate-900/80 rounded-xl border border-slate-800/80 shrink-0">
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block">
                Científicos
              </span>
              <span className="text-2xl font-mono font-bold text-white tabular-nums">
                {allContinentScientists.length}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block">
                Países PDF
              </span>
              <span className="text-2xl font-mono font-bold text-cyan-400 tabular-nums">
                {countriesInContinent.length}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block">
                Periodo
              </span>
              <span className="text-xs font-mono font-semibold text-amber-400 block mt-1.5">
                {firstScientist?.aportePeriodo} — {lastScientist?.aportePeriodo}
              </span>
            </div>
          </div>
        </div>

        {/* Note on methodology */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-400">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p>
            {continent === 'África' || continent === 'Oceanía'
              ? 'Nota documental del PDF: Las listas de África y Oceanía en el documento se construyeron a partir de quienes nacieron en la región, no por falta de ciencia en estos territorios.'
              : 'Nota documental del PDF: Cada científico está clasificado bajo el continente del país con el que se identifica en la fuente histórica. Si nació en otra región, se detalla específicamente en su ficha.'}
          </p>
        </div>
      </div>

      {/* Countries Grid Bar */}
      <div className="bg-[#091224] rounded-xl border border-slate-800 p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>Países Representados en {continent} ({countriesInContinent.length})</span>
          </h2>
          <span className="text-xs text-slate-400">
            Haz clic en un país para filtrar sus científicos
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCountry('Todos')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              selectedCountry === 'Todos'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Todos ({allContinentScientists.length})
          </button>

          {countriesInContinent.map(country => {
            const count = allContinentScientists.filter(s => s.pais === country).length;
            const isSelected = selectedCountry === country;
            return (
              <button
                key={country}
                onClick={() => {
                  setSelectedCountry(isSelected ? 'Todos' : country);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <span>{country}</span>
                <span className={`text-[10px] font-mono px-1 rounded ${
                  isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-900 text-cyan-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {selectedCountry !== 'Todos' && (
          <div className="mt-4 p-3 bg-slate-900/90 rounded-lg border border-cyan-500/30 flex items-center justify-between text-xs">
            <span className="text-slate-300">
              Mostrando científicos identificados con <strong className="text-cyan-300">{selectedCountry}</strong>:
            </span>
            <button
              onClick={() => onSelectCountry(selectedCountry)}
              className="text-cyan-400 hover:text-cyan-300 underline font-medium cursor-pointer"
            >
              Abrir vista detallada de {selectedCountry} →
            </button>
          </div>
        )}
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={`Buscar en ${continent} por científico, aporte o ciudad...`}
            className="w-full pl-9 pr-4 py-2 bg-[#091224] border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Field filter dropdown */}
        <div className="w-full sm:w-auto shrink-0 flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedField}
            onChange={e => setSelectedField(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-[#091224] border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
            aria-label="Filtrar por campo científico"
          >
            <option value="Todos">Todos los campos ({fieldsInContinent.length})</option>
            {fieldsInContinent.map(f => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Scientists Results List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono text-slate-400">
            {filteredScientists.length} de {allContinentScientists.length} científicos
          </span>
          <span className="text-xs text-slate-500">
            Orden cronológico por año del aporte
          </span>
        </div>

        {filteredScientists.length === 0 ? (
          <div className="bg-[#091224] border border-slate-800 rounded-xl p-10 text-center space-y-3">
            <p className="text-slate-300 text-sm">
              No se encontraron registros que coincidan con los filtros en {continent}.
            </p>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Recuerda que si buscas un país específico que no aparece en la lista, el documento PDF no incluyó registros para esa nación, lo cual no presupone ausencia de ciencia en su historia.
            </p>
            <button
              onClick={() => {
                setSelectedCountry('Todos');
                setSelectedField('Todos');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-white rounded-lg transition-colors cursor-pointer"
            >
              Restablecer todos los filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredScientists.map(s => (
              <article
                key={s.id}
                onClick={() => onOpenScientist(s.id)}
                className="bg-[#091224] hover:bg-[#0c1830] border border-slate-800 hover:border-cyan-500/40 rounded-xl p-5 flex flex-col justify-between transition-colors group cursor-pointer"
                tabIndex={0}
                role="button"
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') onOpenScientist(s.id);
                }}
                aria-label={`Ver detalles de ${s.nombre}`}
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

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {s.nombre}
                  </h3>

                  {/* Identification vs Birth vs Work Differentiation */}
                  <div className="mt-2 space-y-1 text-xs text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>País de identificación: <strong>{s.pais}</strong></span>
                    </div>

                    {s.nacimientoLugar !== 'No especificado en el documento' && (
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>{s.nacimientoLugar}</span>
                      </div>
                    )}

                    {s.lugaresTrabajo !== 'No especificado en el documento' && (
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Briefcase className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>Trabajó en: {s.lugaresTrabajo}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-800/80">
                    <span className="text-xs font-semibold text-cyan-400 block mb-1">
                      {s.campo}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {s.aporteDescripcion}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-mono">Vida: {s.vida}</span>
                  <span className="text-cyan-400 font-medium group-hover:underline">
                    Ver ficha completa →
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
