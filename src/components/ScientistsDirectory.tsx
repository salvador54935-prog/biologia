/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { ContinentId } from '../types';
import { SCIENTISTS_DATA } from '../data/scientists';
import { getAllCountries, filterScientists } from '../utils/filters';
import { getDisciplinas, getDisciplineStyle } from '../utils/disciplines';
import { CircularFlag } from './CircularFlag';
import {
  Search,
  BookOpen,
  Sparkles,
  ArrowUpDown,
  Filter,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

interface ScientistsDirectoryProps {
  onOpenScientist: (id: string) => void;
  onSelectCountry: (country: string) => void;
}

const DISCIPLINES_LIST = [
  'Todas',
  'Física',
  'Química',
  'Biología',
  'Matemáticas',
  'Astronomía',
  'Medicina',
  'Informática',
  'Ingeniería',
  'Geología',
  'Geografía',
  'Neurociencia',
  'Paleontología',
  'Ciencias ambientales'
];

export const ScientistsDirectory: React.FC<ScientistsDirectoryProps> = ({
  onOpenScientist,
  onSelectCountry,
}) => {
  const [query, setQuery] = useState('');
  const [continent, setContinent] = useState<ContinentId | 'Todos'>('Todos');
  const [country, setCountry] = useState<string>('Todos');
  const [disciplineFilter, setDisciplineFilter] = useState<string>('Todas');
  const [showPioneersOnly, setShowPioneersOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'chrono-asc' | 'chrono-desc' | 'alpha-asc'>('chrono-asc');

  const allCountries = useMemo(() => getAllCountries(), []);

  const results = useMemo(() => {
    let list = filterScientists({
      query,
      continente: continent,
      pais: country,
    });

    if (disciplineFilter !== 'Todas') {
      list = list.filter(s => getDisciplinas(s).includes(disciplineFilter));
    }

    if (showPioneersOnly) {
      list = list.filter(s => s.esPionera);
    }

    if (sortBy === 'chrono-desc') {
      list = [...list].sort((a, b) => b.anioNumerico - a.anioNumerico);
    } else if (sortBy === 'alpha-asc') {
      list = [...list].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
    } else {
      list = [...list].sort((a, b) => a.anioNumerico - b.anioNumerico);
    }

    return list;
  }, [query, continent, country, disciplineFilter, showPioneersOnly, sortBy]);

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 text-[#14231b] dark:text-[#f4f1ea]">
      {/* Directory Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#1b3a2b] dark:text-[#a3c9b3] uppercase tracking-wider font-semibold">
            <BookOpen className="w-4 h-4" />
            <span>Directorio Científico Universal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#14231b] dark:text-[#f4f1ea] tracking-tight mt-1 font-serif">
            Catálogo General de Científicos ({SCIENTISTS_DATA.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#5c6e62] dark:text-[#9bb7a5] mt-0.5">
            Colección completa multidisciplinaria con fichas biográficas desarrolladas, banderas oficiales e identificación de aportes históricos.
          </p>
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
            <span>Ver solo Pioneras de la Ciencia</span>
          </button>
        </div>
      </div>

      {/* Global Filter Bar */}
      <div className="bg-[#f5f0e4] dark:bg-[#102419] rounded-2xl border border-[#1b3a2b]/15 dark:border-[#234734]/50 p-4 space-y-3 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Query input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7a6438] dark:text-[#d4af37]" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Buscar científico, aporte, ciudad o país..."
              className="w-full pl-9 pr-3 py-2 bg-[#fcfbf7] dark:bg-[#0c1811] border border-[#1b3a2b]/20 dark:border-[#234734] rounded-xl text-xs text-[#14231b] dark:text-[#f4f1ea] placeholder-[#5c6e62] dark:placeholder-[#7a9383] focus:outline-none focus:ring-2 focus:ring-[#1b3a2b] dark:focus:ring-[#2d6148]"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#5c6e62] hover:text-[#14231b] dark:hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Continente */}
          <div>
            <select
              value={continent}
              onChange={e => setContinent(e.target.value as any)}
              className="w-full px-3 py-2 bg-[#fcfbf7] dark:bg-[#0c1811] border border-[#1b3a2b]/20 dark:border-[#234734] rounded-xl text-xs text-[#14231b] dark:text-[#f4f1ea] focus:outline-none focus:ring-2 focus:ring-[#1b3a2b]"
            >
              <option value="Todos">Todos los continentes (5)</option>
              <option value="Europa">Europa</option>
              <option value="América">América</option>
              <option value="Asia">Asia</option>
              <option value="África">África</option>
              <option value="Oceanía">Oceanía</option>
            </select>
          </div>

          {/* Disciplina */}
          <div>
            <select
              value={disciplineFilter}
              onChange={e => setDisciplineFilter(e.target.value)}
              className="w-full px-3 py-2 bg-[#fcfbf7] dark:bg-[#0c1811] border border-[#1b3a2b]/20 dark:border-[#234734] rounded-xl text-xs text-[#14231b] dark:text-[#f4f1ea] focus:outline-none focus:ring-2 focus:ring-[#1b3a2b]"
            >
              {DISCIPLINES_LIST.map(d => (
                <option key={d} value={d}>
                  {d === 'Todas' ? 'Todas las disciplinas (14)' : d}
                </option>
              ))}
            </select>
          </div>

          {/* País */}
          <div>
            <select
              value={country}
              onChange={e => setCountry(e.target.value)}
              className="w-full px-3 py-2 bg-[#fcfbf7] dark:bg-[#0c1811] border border-[#1b3a2b]/20 dark:border-[#234734] rounded-xl text-xs text-[#14231b] dark:text-[#f4f1ea] focus:outline-none focus:ring-2 focus:ring-[#1b3a2b]"
            >
              <option value="Todos">Todos los países ({allCountries.length})</option>
              {allCountries.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Barra secundaria: Contador y Orden */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-[#1b3a2b]/10 dark:border-[#234734]/30 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-medium text-[#5c6e62] dark:text-[#9bb7a5]">
              Mostrando <strong className="text-[#14231b] dark:text-[#f4f1ea] font-mono">{results.length}</strong> de {SCIENTISTS_DATA.length} científicos
            </span>
            {(query || continent !== 'Todos' || country !== 'Todos' || disciplineFilter !== 'Todas' || showPioneersOnly) && (
              <button
                onClick={() => {
                  setQuery('');
                  setContinent('Todos');
                  setCountry('Todos');
                  setDisciplineFilter('Todas');
                  setShowPioneersOnly(false);
                }}
                className="text-[11px] text-[#8c5028] dark:text-[#f4caa8] underline hover:no-underline cursor-pointer"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#5c6e62] dark:text-[#9bb7a5] flex items-center gap-1">
              <ArrowUpDown className="w-3 h-3" /> Ordenar:
            </span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-[#fcfbf7] dark:bg-[#0c1811] border border-[#1b3a2b]/20 dark:border-[#234734] rounded-lg px-2 py-1 text-xs text-[#14231b] dark:text-[#f4f1ea] focus:outline-none"
            >
              <option value="chrono-asc">Cronológico (antiguo a reciente)</option>
              <option value="chrono-desc">Cronológico (reciente a antiguo)</option>
              <option value="alpha-asc">Alfabético por nombre (A – Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid de Científicos */}
      {results.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#1b3a2b]/20 bg-[#f4efe3]/50 p-12 text-center text-[#5c6e62] dark:border-[#234734] dark:bg-[#12241a]/50 dark:text-[#a3c9b3]">
          <p className="text-base font-semibold">No se encontraron científicos con los filtros seleccionados.</p>
          <p className="text-xs mt-1">Prueba cambiando el término de búsqueda o restableciendo los filtros activos.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {results.map(s => {
            const disciplinas = getDisciplinas(s);

            return (
              <article
                key={s.id}
                onClick={() => onOpenScientist(s.id)}
                className="bg-[#fcfbf7] hover:bg-[#ffffff] dark:bg-[#12241a] dark:hover:bg-[#162d21] border border-[#1b3a2b]/15 hover:border-[#1b3a2b]/40 dark:border-[#234734]/50 dark:hover:border-[#387859] rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all group cursor-pointer shadow-xs hover:shadow-md"
                tabIndex={0}
                role="button"
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') onOpenScientist(s.id);
                }}
                aria-label={`Ver biografía documentada de ${s.nombre}`}
              >
                <div>
                  {/* Encabezado: Periodo y Etiquetas de Disciplina */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-[#8c6b2d] dark:text-[#d4af37] bg-[#8c6b2d]/10 dark:bg-[#d4af37]/15 px-2 py-0.5 rounded-md">
                      {s.aportePeriodo}
                    </span>

                    {/* Disciplinas */}
                    <div className="flex flex-wrap justify-end gap-1">
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
                  </div>

                  {/* Retrato opcional si existe o Insignia Nacional + Nombre */}
                  <div className="flex items-start gap-3 mt-1.5">
                    {s.retratoUrl ? (
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-[#1b3a2b]/25 shadow-xs dark:border-[#234734] bg-[#f0ebd9] dark:bg-[#14291e]">
                        <img
                          src={s.retratoUrl}
                          alt={s.nombre}
                          className="h-full w-full object-cover object-top"
                          loading="lazy"
                        />
                        <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-[#fcfbf7] dark:bg-[#12241a] shadow-xs">
                          <CircularFlag country={s.pais} size="xs" />
                        </div>
                      </div>
                    ) : (
                      <div className="h-12 w-12 shrink-0 rounded-xl border border-[#234734]/25 bg-gradient-to-b from-[#efe9d8]/80 to-[#e4dcbe]/50 dark:from-[#14291e] dark:to-[#0d1e14] flex items-center justify-center shadow-2xs">
                        <CircularFlag country={s.pais} size="lg" />
                      </div>
                    )}
                    <div>
                      <h2 className="text-base font-bold text-[#14231b] group-hover:text-[#1b3a2b] dark:text-[#f4f1ea] dark:group-hover:text-[#78c09a] transition-colors font-serif leading-snug">
                        {s.nombre}
                      </h2>
                      <div className="text-[11px] font-mono text-[#5c6e62] dark:text-[#9bb7a5]">
                        {s.vida}
                      </div>
                    </div>
                  </div>

                  {/* Identificación de sus aportes junto al nombre */}
                  <p className="mt-2 text-xs font-medium text-[#2d563e] dark:text-[#a3c9b3] line-clamp-2 leading-snug">
                    {s.subtituloAporte || `${s.nombre} — Pionero en ${s.campo}; ${s.aporteDescripcion}`}
                  </p>

                  {/* País con bandera circular oficial y continente */}
                  <div className="flex items-center gap-1.5 text-xs text-[#5c6e62] dark:text-[#9bb7a5] mt-2">
                    <CircularFlag country={s.pais} size="sm" />
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onSelectCountry(s.pais);
                      }}
                      className="font-medium text-[#14231b] dark:text-[#e4efe8] hover:underline"
                    >
                      {s.pais}
                    </button>
                    <span>·</span>
                    <span>{s.continente}</span>
                  </div>

                  {/* Descripción del aporte sintética */}
                  <p className="text-xs text-[#33463a] dark:text-[#c4d4c8] line-clamp-2 mt-2 leading-relaxed">
                    {s.aporteDescripcion}
                  </p>
                </div>

                {/* Pie de tarjeta con trazabilidad académica */}
                <div className="pt-3 mt-3 border-t border-[#1b3a2b]/10 dark:border-[#234734]/30 flex items-center justify-between text-[11px] text-[#5c6e62] dark:text-[#9bb7a5]">
                  <span className="line-clamp-1 text-[10px] font-mono">
                    {s.esPionera ? 'Pionera científica' : `Especialidad: ${s.campo}`}
                  </span>

                  <span className="text-xs font-semibold text-[#1b3a2b] dark:text-[#78c09a] group-hover:translate-x-0.5 transition-transform">
                    Ver biografía →
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
