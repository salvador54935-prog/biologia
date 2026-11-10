/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { ContinentId } from '../types';
import { CONTINENTS_INFO } from '../data/continents';
import {
  getScientistsByContinent,
  getCountriesForContinent,
} from '../utils/filters';
import { getDisciplinas, getDisciplineStyle } from '../utils/disciplines';
import { CircularFlag } from './CircularFlag';
import {
  ArrowLeft,
  Search,
  Filter,
  MapPin,
  Briefcase,
  Globe,
  Sparkles,
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
        const mSub = (s.subtituloAporte || '').toLowerCase().includes(q);
        const mDesc = s.aporteDescripcion.toLowerCase().includes(q);
        const mCountry = s.pais.toLowerCase().includes(q);
        const mField = s.campo.toLowerCase().includes(q);
        const mWork = s.lugaresTrabajo.toLowerCase().includes(q);
        const mBirth = s.nacimientoLugar.toLowerCase().includes(q);
        if (!mName && !mSub && !mDesc && !mCountry && !mField && !mWork && !mBirth) {
          return false;
        }
      }
      return true;
    });
  }, [allContinentScientists, selectedCountry, selectedField, searchQuery]);

  const firstScientist = allContinentScientists[0];
  const lastScientist = allContinentScientists[allContinentScientists.length - 1];

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 text-[#142e20] dark:text-[#f4f1ea]">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToWorldMap}
          className="flex items-center gap-2 text-xs font-semibold text-[#1b3a2b] hover:text-[#2d563e] dark:text-[#a3c9b3] dark:hover:text-white transition-colors cursor-pointer group focus:outline-none rounded px-2.5 py-1.5 bg-[#f4efe3] dark:bg-[#12241a] border border-[#234734]/20 dark:border-[#2d563e]"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Regresar al mapa interactivo</span>
        </button>

        <span className="text-xs font-mono text-[#52796f] dark:text-[#8ba898] font-medium">
          BIOATLAS / {continent.toUpperCase()}
        </span>
      </div>

      {/* Continent Hero Banner */}
      <div className="relative bg-[#f7f5ed] dark:bg-[#0e2217] rounded-2xl border border-[#234734]/25 dark:border-[#2d563e]/60 p-6 sm:p-8 overflow-hidden shadow-sm">
        <div
          className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: continentInfo.color }}
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2.5 mb-2">
              <span
                className="w-3.5 h-3.5 rounded-full shadow-xs"
                style={{ backgroundColor: continentInfo.color }}
              />
              <span className="text-xs font-mono uppercase tracking-wider text-[#52796f] dark:text-[#8ba898] font-semibold">
                Continente Histórico Documentado
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0f2419] dark:text-[#f4f1ea] tracking-tight font-serif">
              {continentInfo.nombre}
            </h1>
            <p className="text-sm text-[#243d2c] dark:text-[#d7e6dc] mt-2 leading-relaxed">
              {continentInfo.descripcion}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-[#fcfbf7] dark:bg-[#14291e] rounded-xl border border-[#234734]/20 dark:border-[#2d563e] shrink-0 text-center">
            <div>
              <span className="text-[10px] uppercase font-mono text-[#52796f] dark:text-[#8ba898] block">
                Científicos
              </span>
              <span className="text-2xl font-mono font-bold text-[#0f2419] dark:text-white tabular-nums">
                {allContinentScientists.length}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-[#52796f] dark:text-[#8ba898] block">
                Países
              </span>
              <span className="text-2xl font-mono font-bold text-[#1b3a2b] dark:text-[#a3c9b3] tabular-nums">
                {countriesInContinent.length}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-[#52796f] dark:text-[#8ba898] block">
                Periodo
              </span>
              <span className="text-xs font-mono font-semibold text-[#8c6b2d] dark:text-[#d4af37] block mt-1.5">
                {firstScientist?.aportePeriodo} — {lastScientist?.aportePeriodo}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Countries Grid Bar */}
      <div className="bg-[#f5f0e4] dark:bg-[#102419] rounded-xl border border-[#234734]/20 dark:border-[#2d563e] p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-[#0f2419] dark:text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#8c6b2d] dark:text-[#d4af37]" />
            <span>Países Representados en {continent} ({countriesInContinent.length})</span>
          </h2>
          <span className="text-xs text-[#52796f] dark:text-[#8ba898]">
            Selecciona un país para ver sus científicos
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCountry('Todos')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              selectedCountry === 'Todos'
                ? 'bg-[#1b3a2b] text-[#fcfbf7] font-semibold shadow-xs dark:bg-[#2d563e]'
                : 'bg-[#fcfbf7] text-[#243d2c] hover:bg-[#eae3d2] dark:bg-[#14291e] dark:text-[#d7e6dc] dark:hover:bg-[#1f3f2e]'
            }`}
          >
            Todos ({allContinentScientists.length})
          </button>

          {countriesInContinent.map(c => {
            const count = allContinentScientists.filter(s => s.pais === c).length;
            const isSelected = selectedCountry === c;
            return (
              <button
                key={c}
                onClick={() => {
                  setSelectedCountry(isSelected ? 'Todos' : c);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#1b3a2b] border-[#1b3a2b] text-[#fcfbf7] font-semibold shadow-xs dark:bg-[#2d563e] dark:border-[#356e4e]'
                    : 'bg-[#fcfbf7] border-[#234734]/15 text-[#243d2c] hover:bg-[#eae3d2] dark:bg-[#14291e] dark:border-[#2d563e] dark:text-[#d7e6dc] dark:hover:bg-[#1f3f2e]'
                }`}
              >
                <CircularFlag country={c} size="sm" />
                <span>{c}</span>
                <span className={`text-[10px] font-mono px-1 rounded ${
                  isSelected ? 'bg-black/20 text-[#fcfbf7]' : 'bg-[#234734]/10 dark:bg-white/10 text-[#1b3a2b] dark:text-[#a3c9b3]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {selectedCountry !== 'Todos' && (
          <div className="mt-4 p-3 bg-[#fcfbf7] dark:bg-[#14291e] rounded-lg border border-[#234734]/20 flex items-center justify-between text-xs">
            <span className="text-[#243d2c] dark:text-[#d7e6dc]">
              Mostrando científicos de <strong className="text-[#1b3a2b] dark:text-[#a3c9b3]">{selectedCountry}</strong>:
            </span>
            <button
              onClick={() => onSelectCountry(selectedCountry)}
              className="text-[#1b3a2b] dark:text-[#a3c9b3] hover:underline font-semibold cursor-pointer"
            >
              Abrir ficha territorial de {selectedCountry} →
            </button>
          </div>
        )}
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#52796f] dark:text-[#8ba898]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={`Buscar en ${continent} por científico, aporte o ciudad...`}
            className="w-full pl-9 pr-4 py-2 bg-[#fcfbf7] dark:bg-[#102419] border border-[#234734]/20 rounded-xl text-xs text-[#142e20] dark:text-[#f4f1ea] placeholder-[#5c6e62] focus:outline-none focus:ring-2 focus:ring-[#1b3a2b] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#52796f] hover:text-[#0f2419]"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Field filter dropdown */}
        <div className="w-full sm:w-auto shrink-0 flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-[#52796f] dark:text-[#8ba898]" />
          <select
            value={selectedField}
            onChange={e => setSelectedField(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-[#fcfbf7] dark:bg-[#102419] border border-[#234734]/20 rounded-xl text-xs text-[#142e20] dark:text-[#f4f1ea] focus:outline-none focus:ring-2 focus:ring-[#1b3a2b] cursor-pointer"
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
          <span className="text-xs font-mono text-[#52796f] dark:text-[#8ba898]">
            {filteredScientists.length} de {allContinentScientists.length} científicos
          </span>
          <span className="text-xs text-[#52796f] dark:text-[#8ba898]">
            Orden cronológico por año del aporte
          </span>
        </div>

        {filteredScientists.length === 0 ? (
          <div className="bg-[#fcfbf7] dark:bg-[#102419] border border-[#234734]/20 rounded-xl p-10 text-center space-y-3">
            <p className="text-[#142e20] dark:text-[#f4f1ea] text-sm font-semibold">
              No se encontraron registros que coincidan con los filtros en {continent}.
            </p>
            <button
              onClick={() => {
                setSelectedCountry('Todos');
                setSelectedField('Todos');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#1b3a2b] text-[#fcfbf7] text-xs font-medium rounded-lg cursor-pointer"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredScientists.map(s => {
              const disciplinas = getDisciplinas(s);

              return (
                <article
                  key={s.id}
                  onClick={() => onOpenScientist(s.id)}
                  className="bg-[#fcfbf7] hover:bg-[#ffffff] dark:bg-[#12241a] dark:hover:bg-[#162d21] border border-[#234734]/20 hover:border-[#234734]/50 dark:border-[#2d563e]/40 rounded-xl p-5 flex flex-col justify-between transition-all group cursor-pointer shadow-2xs hover:shadow-sm"
                  tabIndex={0}
                  role="button"
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') onOpenScientist(s.id);
                  }}
                  aria-label={`Ver detalles de ${s.nombre}`}
                >
                  <div>
                    <div className="flex items-baseline justify-between gap-2 mb-1.5">
                      <span className="font-mono text-xs font-bold text-[#8c6b2d] dark:text-[#d4af37]">
                        {s.aportePeriodo}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {s.esPionera && (
                          <span className="px-1.5 py-0.5 rounded bg-[#8c2d4e]/10 border border-[#8c2d4e]/30 text-[#8c2d4e] text-[10px] font-sans font-semibold">
                            Pionera
                          </span>
                        )}
                        <CircularFlag country={s.pais} size="sm" />
                        <span className="text-xs font-medium text-[#142e20] dark:text-[#e4efe8]">{s.pais}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-[#0f2419] dark:text-[#f4f1ea] group-hover:text-[#1b3a2b] dark:group-hover:text-[#a3c9b3] transition-colors font-serif">
                      {s.nombre}
                    </h3>

                    {/* Subtítulo de aporte */}
                    <p className="mt-1 text-xs font-medium text-[#2d563e] dark:text-[#a3c9b3] leading-snug">
                      {s.subtituloAporte || `${s.nombre} — Investigador en ${s.campo}; ${s.aporteDescripcion}`}
                    </p>

                    <div className="flex flex-wrap gap-1 mt-2">
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

                    <div className="mt-2 space-y-1 text-xs text-[#41604a] dark:text-[#9bb7a5]">
                      {s.nacimientoLugar && s.nacimientoLugar !== 'No especificado en el documento' && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#52796f] shrink-0" />
                          <span>Nacimiento: {s.nacimientoLugar}</span>
                        </div>
                      )}
                      {s.lugaresTrabajo && s.lugaresTrabajo !== 'No especificado en el documento' && (
                        <div className="flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-[#52796f] shrink-0" />
                          <span>Trabajó en: {s.lugaresTrabajo}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-[#243d2c] dark:text-[#d7e6dc] leading-relaxed line-clamp-3 mt-3">
                      {s.aporteDescripcion}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#234734]/15 flex items-center justify-between text-[11px]">
                    <span className="text-[#52796f] dark:text-[#8ba898] font-mono">Vida: {s.vida}</span>
                    <span className="text-[#1b3a2b] dark:text-[#a3c9b3] font-medium group-hover:underline">
                      Ver ficha documentada →
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
