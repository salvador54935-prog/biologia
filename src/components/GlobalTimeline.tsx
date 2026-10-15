import React, { useState, useMemo } from 'react';
import { ContinentId, Scientist } from '../types';
import { SCIENTISTS_DATA } from '../data/scientists';
import {
  getAllFields,
  getAllCountries,
  filterScientists,
} from '../utils/filters';
import {
  Clock,
  Filter,
  Search,
  Globe,
  List,
  Columns,
  BookOpen,
  Calendar,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface GlobalTimelineProps {
  onOpenScientist: (id: string) => void;
  onSelectCountry: (country: string) => void;
}

export const GlobalTimeline: React.FC<GlobalTimelineProps> = ({
  onOpenScientist,
  onSelectCountry,
}) => {
  const [selectedContinent, setSelectedContinent] = useState<ContinentId | 'Todos'>('Todos');
  const [selectedCountry, setSelectedCountry] = useState<string>('Todos');
  const [selectedField, setSelectedField] = useState<string>('Todos');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'timeline' | 'table'>('timeline');

  const allFields = useMemo(() => getAllFields(), []);
  const allCountries = useMemo(() => getAllCountries(), []);

  // Defined historical eras for zooming and jump filtering
  const ERAS = [
    { id: 'Todos', label: 'Toda la historia (209)', range: 'c. 2650 a. C. — 2012' },
    { id: 'antiguedad', label: 'Antigüedad', range: 'c. 2650 a. C. — 500 d. C.' },
    { id: 'medieval', label: 'Medievo e Islam Clásico', range: '500 — 1500' },
    { id: 'moderna', label: 'Renacimiento e Ilustración', range: '1501 — 1800' },
    { id: 'siglo19', label: 'Siglo XIX', range: '1801 — 1900' },
    { id: 'siglo20_1', label: 'Siglo XX (1.ª mitad)', range: '1901 — 1950' },
    { id: 'siglo20_2', label: 'Siglo XX (2.ª mitad)', range: '1951 — 2000' },
    { id: 'siglo21', label: 'Siglo XXI', range: '2001 — 2012' },
  ];

  const filteredScientists = useMemo(() => {
    return filterScientists({
      query: searchQuery,
      continente: selectedContinent,
      pais: selectedCountry,
      campo: selectedField,
      periodo: selectedPeriod,
    });
  }, [searchQuery, selectedContinent, selectedCountry, selectedField, selectedPeriod]);

  // Group filtered scientists by century / era for visual markers
  const getCenturyMarker = (year: number) => {
    if (year < 0) return 'Antigüedad a. C.';
    if (year <= 1000) return 'Siglos I – X';
    if (year <= 1500) return 'Siglos XI – XV';
    if (year <= 1600) return 'Siglo XVI (1501–1600)';
    if (year <= 1700) return 'Siglo XVII (1601–1700)';
    if (year <= 1800) return 'Siglo XVIII (1701–1800)';
    if (year <= 1850) return 'Primera mitad Siglo XIX (1801–1850)';
    if (year <= 1900) return 'Segunda mitad Siglo XIX (1851–1900)';
    if (year <= 1925) return '1901 – 1925';
    if (year <= 1950) return '1926 – 1950';
    if (year <= 1975) return '1951 – 1975';
    if (year <= 2000) return '1976 – 2000';
    return 'Siglo XXI (2001–2012)';
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Title & Introduction */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
          <Clock className="w-4 h-4" />
          <span>Cronología Documentada Completa</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-1">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Línea del Tiempo Global de la Biología
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Los 209 científicos documentados en estricto orden cronológico por el año de su descubrimiento o aporte.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg shrink-0">
            <button
              onClick={() => setViewMode('timeline')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                viewMode === 'timeline'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Cronograma</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Tabla de Datos</span>
            </button>
          </div>
        </div>
      </div>

      {/* Historical Era Zoom Tabs */}
      <div className="overflow-x-auto pb-1">
        <div className="flex items-center gap-1.5 min-w-max p-1 bg-[#091224] rounded-xl border border-slate-800">
          {ERAS.map(era => {
            const isSelected = selectedPeriod === era.id;
            return (
              <button
                key={era.id}
                onClick={() => setSelectedPeriod(era.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span>{era.label}</span>
                <span className={`ml-1 text-[10px] font-mono ${isSelected ? 'text-slate-900' : 'text-slate-400'}`}>
                  ({era.range})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Comprehensive Filter Ribbon */}
      <div className="bg-[#091224] rounded-xl border border-slate-800 p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Query input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar científico, aporte, libro..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Continent Filter */}
          <div>
            <select
              value={selectedContinent}
              onChange={e => {
                setSelectedContinent(e.target.value as ContinentId | 'Todos');
                setSelectedCountry('Todos');
              }}
              className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
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

          {/* Country Filter */}
          <div>
            <select
              value={selectedCountry}
              onChange={e => setSelectedCountry(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
              aria-label="Filtrar por país"
            >
              <option value="Todos">Todos los países ({allCountries.length})</option>
              {allCountries.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Field Filter */}
          <div>
            <select
              value={selectedField}
              onChange={e => setSelectedField(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
              aria-label="Filtrar por campo científico"
            >
              <option value="Todos">Todos los campos ({allFields.length})</option>
              {allFields.map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results counter and reset */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
          <span className="font-mono">
            {filteredScientists.length} de {SCIENTISTS_DATA.length} científicos mostrados
          </span>
          {(searchQuery || selectedContinent !== 'Todos' || selectedCountry !== 'Todos' || selectedField !== 'Todos' || selectedPeriod !== 'Todos') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedContinent('Todos');
                setSelectedCountry('Todos');
                setSelectedField('Todos');
                setSelectedPeriod('Todos');
              }}
              className="text-cyan-400 hover:text-cyan-300 underline font-medium cursor-pointer"
            >
              Restablecer filtros
            </button>
          )}
        </div>
      </div>

      {/* Main View Mode: Timeline Stream */}
      {viewMode === 'timeline' ? (
        <div className="relative pl-4 sm:pl-8 border-l border-slate-800 space-y-6">
          {filteredScientists.length === 0 ? (
            <div className="bg-[#091224] border border-slate-800 rounded-xl p-8 text-center text-slate-400 text-xs">
              No hay descubrimientos que coincidan con estos criterios. Prueba restableciendo los filtros.
            </div>
          ) : (
            filteredScientists.map((s, idx) => {
              const prevItem = filteredScientists[idx - 1];
              const showCenturyHeader =
                !prevItem || getCenturyMarker(prevItem.anioNumerico) !== getCenturyMarker(s.anioNumerico);

              return (
                <React.Fragment key={s.id}>
                  {showCenturyHeader && (
                    <div className="relative -left-4 sm:-left-8 pt-4 pb-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/40 text-xs font-mono text-cyan-300 font-bold shadow-md">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{getCenturyMarker(s.anioNumerico)}</span>
                      </div>
                    </div>
                  )}

                  <div className="relative group">
                    {/* Timeline Node Point */}
                    <div className="absolute -left-[21px] sm:-left-[37px] top-4 w-3 h-3 rounded-full bg-slate-900 border-2 border-cyan-400 group-hover:scale-125 group-hover:border-amber-400 transition-transform" />

                    {/* Timeline Scientist Card */}
                    <article
                      onClick={() => onOpenScientist(s.id)}
                      className="bg-[#091224] hover:bg-[#0c1830] border border-slate-800 hover:border-cyan-500/40 rounded-xl p-4 sm:p-5 transition-all cursor-pointer shadow-sm group-hover:shadow-cyan-500/10"
                      tabIndex={0}
                      role="button"
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') onOpenScientist(s.id);
                      }}
                      aria-label={`Ver aporte de ${s.nombre}`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                        <div className="flex items-baseline gap-2.5">
                          <span className="font-mono text-xs sm:text-sm font-bold text-amber-400">
                            {s.aportePeriodo}
                          </span>
                          <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {s.nombre}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                          <span>{s.continente}</span>
                          <span>·</span>
                          <span className="text-slate-300">{s.pais}</span>
                          <span>·</span>
                          <span>Pág. {s.paginaPDF}</span>
                        </div>
                      </div>

                      <div className="text-xs font-medium text-cyan-400 mb-2">
                        {s.campo}
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {s.aporteDescripcion}
                      </p>

                      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
                        <span>Vida: {s.vida}</span>
                        {s.lugaresTrabajo !== 'No especificado en el documento' && (
                          <span>Trabajó en: {s.lugaresTrabajo}</span>
                        )}
                        <span className="text-cyan-400 font-medium group-hover:underline flex items-center gap-1">
                          Ver ficha completa <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </article>
                  </div>
                </React.Fragment>
              );
            })
          )}
        </div>
      ) : (
        /* Structured Data Table View */
        <div className="bg-[#091224] rounded-xl border border-slate-800 overflow-x-auto shadow-md">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Aporte</th>
                <th className="py-3 px-4">Científico</th>
                <th className="py-3 px-4">País</th>
                <th className="py-3 px-4">Continente</th>
                <th className="py-3 px-4">Campo</th>
                <th className="py-3 px-4">Descripción del Aporte</th>
                <th className="py-3 px-4 text-center">Pág.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {filteredScientists.map(s => (
                <tr
                  key={s.id}
                  onClick={() => onOpenScientist(s.id)}
                  className="hover:bg-slate-800/60 cursor-pointer transition-colors group"
                >
                  <td className="py-3 px-4 font-mono font-bold text-amber-400 whitespace-nowrap">
                    {s.aportePeriodo}
                  </td>
                  <td className="py-3 px-4 font-bold text-white group-hover:text-cyan-300 whitespace-nowrap">
                    {s.nombre}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-slate-300">
                    {s.pais}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap font-mono text-slate-400">
                    {s.continente}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-cyan-400 font-medium">
                    {s.campo}
                  </td>
                  <td className="py-3 px-4 max-w-md text-slate-300 leading-snug">
                    {s.aporteDescripcion}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-400 text-center">
                    {s.paginaPDF}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
