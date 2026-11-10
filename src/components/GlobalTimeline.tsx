/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { ContinentId } from '../types';
import { SCIENTISTS_DATA } from '../data/scientists';
import {
  getAllFields,
  getAllCountries,
  filterScientists,
} from '../utils/filters';
import { getDisciplinas, getDisciplineStyle } from '../utils/disciplines';
import { CircularFlag } from './CircularFlag';
import {
  Clock,
  Search,
  List,
  Columns,
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
  const [showPioneersOnly, setShowPioneersOnly] = useState<boolean>(false);

  const allFields = useMemo(() => getAllFields(), []);
  const allCountries = useMemo(() => getAllCountries(), []);

  // Defined historical eras
  const ERAS = [
    { id: 'Todos', label: `Toda la historia (${SCIENTISTS_DATA.length})`, range: 'c. 2650 a. C. — 2024' },
    { id: 'antiguedad', label: 'Antigüedad', range: 'c. 2650 a. C. — 500 d. C.' },
    { id: 'medieval', label: 'Medievo e Islam Clásico', range: '500 — 1500' },
    { id: 'moderna', label: 'Renacimiento e Ilustración', range: '1501 — 1800' },
    { id: 'siglo19', label: 'Siglo XIX', range: '1801 — 1900' },
    { id: 'siglo20_1', label: 'Siglo XX (1.ª mitad)', range: '1901 — 1950' },
    { id: 'siglo20_2', label: 'Siglo XX (2.ª mitad)', range: '1951 — 2000' },
    { id: 'siglo21', label: 'Siglo XXI', range: '2001 — 2024' },
  ];

  const filteredScientists = useMemo(() => {
    let list = filterScientists({
      query: searchQuery,
      continente: selectedContinent,
      pais: selectedCountry,
      campo: selectedField,
      periodo: selectedPeriod,
    });

    if (showPioneersOnly) {
      list = list.filter(s => s.esPionera);
    }

    return list;
  }, [searchQuery, selectedContinent, selectedCountry, selectedField, selectedPeriod, showPioneersOnly]);

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
    return 'Siglo XXI (2001–2024)';
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 text-[#142e20] dark:text-[#f4f1ea]">
      {/* Title & Introduction */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#234734] dark:text-[#a3c9b3] uppercase tracking-wider font-semibold">
          <Clock className="w-4 h-4 text-[#8c6b2d] dark:text-[#d4af37]" />
          <span>Cronología Histórica Universal</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-1">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0f2419] dark:text-[#f4f1ea] tracking-tight font-serif">
              Línea del Tiempo Global del Conocimiento Científico
            </h1>
            <p className="text-xs sm:text-sm text-[#41604a] dark:text-[#9bb7a5] mt-0.5">
              Los {SCIENTISTS_DATA.length} científicos documentados en estricto orden cronológico por año de su aporte fundamental.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 p-1 bg-[#f4efe3] dark:bg-[#12241a] border border-[#234734]/20 dark:border-[#2d563e] rounded-xl shrink-0">
            <button
              onClick={() => setViewMode('timeline')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                viewMode === 'timeline'
                  ? 'bg-[#1b3a2b] text-[#fcfbf7] font-semibold shadow-xs dark:bg-[#2d563e]'
                  : 'text-[#41604a] dark:text-[#a3c9b3] hover:text-[#0f2419] dark:hover:text-white'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Cronograma</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-[#1b3a2b] text-[#fcfbf7] font-semibold shadow-xs dark:bg-[#2d563e]'
                  : 'text-[#41604a] dark:text-[#a3c9b3] hover:text-[#0f2419] dark:hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Tabla de Datos</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Pioneers Filter Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowPioneersOnly(!showPioneersOnly)}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs ${
            showPioneersOnly
              ? 'bg-[#8c2d4e] border-[#8c2d4e] text-white font-semibold'
              : 'border-[#234734]/20 bg-[#fcfbf7] text-[#14231b] hover:bg-[#f2ede0] dark:border-[#2d563e] dark:bg-[#14291e] dark:text-[#e4efe8]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Ver solo Pioneras Científicas</span>
        </button>
      </div>

      {/* Historical Era Zoom Tabs */}
      <div className="overflow-x-auto pb-1">
        <div className="flex items-center gap-1.5 min-w-max p-1.5 bg-[#f4efe3] dark:bg-[#12241a] rounded-xl border border-[#234734]/20 dark:border-[#2d563e]">
          {ERAS.map(era => {
            const isSelected = selectedPeriod === era.id;
            return (
              <button
                key={era.id}
                onClick={() => setSelectedPeriod(era.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#1b3a2b] text-[#fcfbf7] font-semibold shadow-xs dark:bg-[#2d563e]'
                    : 'text-[#41604a] dark:text-[#a3c9b3] hover:bg-[#234734]/10 dark:hover:bg-[#1f3f2e] hover:text-[#0f2419] dark:hover:text-white'
                }`}
              >
                <span>{era.label}</span>
                <span className={`ml-1 text-[10px] font-mono ${isSelected ? 'text-[#e4efe8]' : 'text-[#52796f] dark:text-[#8ba898]'}`}>
                  ({era.range})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Comprehensive Filter Ribbon */}
      <div className="bg-[#f5f0e4] dark:bg-[#102419] rounded-xl border border-[#234734]/20 dark:border-[#2d563e] p-4 space-y-3 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Query input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#52796f] dark:text-[#8ba898]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar científico, aporte, libro..."
              className="w-full pl-9 pr-3 py-2 bg-[#fcfbf7] dark:bg-[#0c1811] border border-[#234734]/25 dark:border-[#2d563e] rounded-xl text-xs text-[#142e20] dark:text-[#f4f1ea] placeholder-[#5c6e62] focus:outline-none focus:ring-2 focus:ring-[#1b3a2b]"
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
              className="w-full px-3 py-2 bg-[#fcfbf7] dark:bg-[#0c1811] border border-[#234734]/25 dark:border-[#2d563e] rounded-xl text-xs text-[#142e20] dark:text-[#f4f1ea] focus:outline-none focus:ring-2 focus:ring-[#1b3a2b] cursor-pointer"
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

          {/* Country Filter */}
          <div>
            <select
              value={selectedCountry}
              onChange={e => setSelectedCountry(e.target.value)}
              className="w-full px-3 py-2 bg-[#fcfbf7] dark:bg-[#0c1811] border border-[#234734]/25 dark:border-[#2d563e] rounded-xl text-xs text-[#142e20] dark:text-[#f4f1ea] focus:outline-none focus:ring-2 focus:ring-[#1b3a2b] cursor-pointer"
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
              className="w-full px-3 py-2 bg-[#fcfbf7] dark:bg-[#0c1811] border border-[#234734]/25 dark:border-[#2d563e] rounded-xl text-xs text-[#142e20] dark:text-[#f4f1ea] focus:outline-none focus:ring-2 focus:ring-[#1b3a2b] cursor-pointer"
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
        <div className="flex items-center justify-between text-xs text-[#52796f] dark:text-[#8ba898] pt-2 border-t border-[#234734]/15">
          <span className="font-mono">
            {filteredScientists.length} de {SCIENTISTS_DATA.length} científicos mostrados
          </span>
          {(searchQuery || selectedContinent !== 'Todos' || selectedCountry !== 'Todos' || selectedField !== 'Todos' || selectedPeriod !== 'Todos' || showPioneersOnly) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedContinent('Todos');
                setSelectedCountry('Todos');
                setSelectedField('Todos');
                setSelectedPeriod('Todos');
                setShowPioneersOnly(false);
              }}
              className="text-[#8c5028] dark:text-[#f4caa8] hover:underline font-medium cursor-pointer"
            >
              Restablecer filtros
            </button>
          )}
        </div>
      </div>

      {/* Main View Mode: Timeline Stream */}
      {viewMode === 'timeline' ? (
        <div className="relative pl-4 sm:pl-8 border-l-2 border-[#234734]/30 space-y-6">
          {filteredScientists.length === 0 ? (
            <div className="bg-[#fcfbf7] dark:bg-[#12241a] border border-[#234734]/20 rounded-xl p-8 text-center text-[#52796f] dark:text-[#9bb7a5] text-xs">
              No hay descubrimientos que coincidan con estos criterios. Prueba restableciendo los filtros.
            </div>
          ) : (
            filteredScientists.map((s, idx) => {
              const prevItem = filteredScientists[idx - 1];
              const showCenturyHeader =
                !prevItem || getCenturyMarker(prevItem.anioNumerico) !== getCenturyMarker(s.anioNumerico);
              const disciplinas = getDisciplinas(s);

              return (
                <React.Fragment key={s.id}>
                  {showCenturyHeader && (
                    <div className="relative -left-4 sm:-left-8 pt-4 pb-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b3a2b] text-[#fcfbf7] text-xs font-mono font-bold shadow-sm dark:bg-[#2d563e]">
                        <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>{getCenturyMarker(s.anioNumerico)}</span>
                      </div>
                    </div>
                  )}

                  <div className="relative group">
                    {/* Timeline Node Point */}
                    <div className="absolute -left-[21px] sm:-left-[37px] top-4 w-3.5 h-3.5 rounded-full bg-[#fcfbf7] border-2 border-[#1b3a2b] group-hover:scale-125 group-hover:border-[#8c6b2d] transition-transform dark:bg-[#0e2217] dark:border-[#a3c9b3]" />

                    {/* Timeline Scientist Card */}
                    <article
                      onClick={() => onOpenScientist(s.id)}
                      className="bg-[#fcfbf7] hover:bg-[#ffffff] dark:bg-[#12241a] dark:hover:bg-[#162d21] border border-[#234734]/20 hover:border-[#234734]/50 dark:border-[#2d563e]/40 rounded-xl p-4 sm:p-5 transition-all cursor-pointer shadow-2xs hover:shadow-sm"
                      tabIndex={0}
                      role="button"
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') onOpenScientist(s.id);
                      }}
                      aria-label={`Ver aporte de ${s.nombre}`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                        <div className="flex items-baseline gap-2.5">
                          <span className="font-mono text-xs sm:text-sm font-bold text-[#8c6b2d] dark:text-[#d4af37]">
                            {s.aportePeriodo}
                          </span>
                          <h3 className="text-base font-bold text-[#0f2419] dark:text-[#f4f1ea] group-hover:text-[#1b3a2b] dark:group-hover:text-[#a3c9b3] transition-colors font-serif">
                            {s.nombre}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-mono text-[#52796f] dark:text-[#8ba898]">
                          <CircularFlag country={s.pais} size="sm" />
                          <span className="font-semibold text-[#142e20] dark:text-[#e4efe8]">{s.pais}</span>
                          <span>·</span>
                          <span>{s.continente}</span>
                          {s.esPionera && (
                            <span className="px-1.5 py-0.5 rounded bg-[#8c2d4e]/10 border border-[#8c2d4e]/30 text-[#8c2d4e] text-[10px] font-sans font-semibold">
                              Pionera
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Subtítulo de aporte histórico */}
                      <p className="text-xs font-medium text-[#2d563e] dark:text-[#a3c9b3] mb-1.5">
                        {s.subtituloAporte || `${s.nombre} — Investigador en ${s.campo}; ${s.aporteDescripcion}`}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-2">
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

                      <p className="text-xs text-[#243d2c] dark:text-[#d7e6dc] leading-relaxed">
                        {s.aporteDescripcion}
                      </p>

                      <div className="mt-3 pt-2.5 border-t border-[#234734]/15 flex flex-wrap items-center justify-between text-[11px] text-[#52796f] dark:text-[#8ba898] gap-2">
                        <span>Vida: {s.vida}</span>
                        {s.lugaresTrabajo && s.lugaresTrabajo !== 'No especificado en el documento' && (
                          <span>Trabajó en: {s.lugaresTrabajo}</span>
                        )}
                        <span className="text-[#1b3a2b] dark:text-[#a3c9b3] font-medium group-hover:underline flex items-center gap-1">
                          Ver ficha documentada <ArrowRight className="w-3 h-3" />
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
        <div className="bg-[#fcfbf7] dark:bg-[#12241a] rounded-xl border border-[#234734]/20 overflow-x-auto shadow-xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#f4efe3] dark:bg-[#0c1811] border-b border-[#234734]/20 text-[11px] font-mono text-[#41604a] dark:text-[#a3c9b3] uppercase tracking-wider">
                <th className="py-3 px-4">Periodo</th>
                <th className="py-3 px-4">Científico</th>
                <th className="py-3 px-4">País</th>
                <th className="py-3 px-4">Continente</th>
                <th className="py-3 px-4">Especialidad</th>
                <th className="py-3 px-4">Descripción del Aporte</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#234734]/10 text-[#142e20] dark:text-[#e4efe8]">
              {filteredScientists.map(s => (
                <tr
                  key={s.id}
                  onClick={() => onOpenScientist(s.id)}
                  className="hover:bg-[#f2ede0] dark:hover:bg-[#162d20] cursor-pointer transition-colors group"
                >
                  <td className="py-3 px-4 font-mono font-bold text-[#8c6b2d] dark:text-[#d4af37] whitespace-nowrap">
                    {s.aportePeriodo}
                  </td>
                  <td className="py-3 px-4 font-bold text-[#0f2419] dark:text-[#fcfbf7] group-hover:text-[#1b3a2b] dark:group-hover:text-[#a3c9b3] whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span>{s.nombre}</span>
                      {s.esPionera && (
                        <span className="px-1.5 py-0.2 rounded bg-[#8c2d4e]/10 border border-[#8c2d4e]/30 text-[#8c2d4e] text-[9px] font-normal">
                          Pionera
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-[#142e20] dark:text-[#e4efe8]">
                    <div className="flex items-center gap-1.5">
                      <CircularFlag country={s.pais} size="sm" />
                      <span>{s.pais}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap font-mono text-[#52796f] dark:text-[#8ba898]">
                    {s.continente}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-[#2d563e] dark:text-[#a3c9b3] font-medium">
                    {s.campo}
                  </td>
                  <td className="py-3 px-4 max-w-md text-[#243d2c] dark:text-[#d7e6dc] leading-snug">
                    {s.subtituloAporte || s.aporteDescripcion}
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
