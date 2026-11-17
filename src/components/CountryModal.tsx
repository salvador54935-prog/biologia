/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { getCountryGeographicProfile, getStatistics } from '../utils/filters';
import { getDisciplinas, getDisciplineStyle } from '../utils/disciplines';
import { CircularFlag } from './CircularFlag';
import { X, MapPin, Briefcase, Filter } from 'lucide-react';

interface CountryModalProps {
  country: string | null;
  onClose: () => void;
  onOpenScientist: (id: string) => void;
}

type CountryLayer = 'direct' | 'bornIn' | 'workedIn';

export const CountryModal: React.FC<CountryModalProps> = ({
  country,
  onClose,
  onOpenScientist,
}) => {
  const [selectedField, setSelectedField] = useState<string>('Todos');
  const [activeLayer, setActiveLayer] = useState<CountryLayer>('direct');

  useEffect(() => {
    setSelectedField('Todos');
    setActiveLayer('direct');
  }, [country]);

  const stats = getStatistics();

  const profile = useMemo(() => {
    if (!country) return null;
    return getCountryGeographicProfile(country);
  }, [country]);

  const activeScientists = useMemo(() => {
    if (!profile) return [];
    if (activeLayer === 'bornIn') return profile.bornIn;
    if (activeLayer === 'workedIn') return profile.workedIn;
    return profile.direct;
  }, [profile, activeLayer]);

  const fieldsInCountry = useMemo(() => {
    const fields = new Set<string>();
    activeScientists.forEach(s => fields.add(s.campo));
    return Array.from(fields).sort((a, b) => a.localeCompare(b, 'es'));
  }, [activeScientists]);

  const filtered = useMemo(() => {
    if (selectedField === 'Todos') return activeScientists;
    return activeScientists.filter(s => s.campo === selectedField);
  }, [activeScientists, selectedField]);

  if (!country || !profile) return null;

  const continent =
    profile.direct[0]?.continente ||
    profile.totalUnique[0]?.continente ||
    'Territorio documentado';
  const hasAnyRecords = profile.totalUnique.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in text-[#142e20] dark:text-[#f4f1ea]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="country-modal-title"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#fcfbf7] dark:bg-[#0e2217] border border-[#234734]/30 dark:border-[#2d563e]/60 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-[#f7f5ed] dark:bg-[#0c1c13] border-b border-[#234734]/20 dark:border-[#2d563e] flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#234734] dark:text-[#a3c9b3] uppercase tracking-wider mb-1 font-semibold">
              <CircularFlag country={country} size="sm" />
              <span>Registro Territorial Documentado • {continent}</span>
            </div>
            <h2 id="country-modal-title" className="text-2xl sm:text-3xl font-bold text-[#0f2419] dark:text-[#f4f1ea] tracking-tight font-serif flex items-center gap-3">
              <CircularFlag country={country} size="xl" />
              <span>{country}</span>
            </h2>
            <p className="text-xs text-[#52796f] dark:text-[#8ba898] mt-1 font-medium">
              {hasAnyRecords
                ? `${profile.direct.length} por adscripción principal · ${profile.totalUnique.length} con vínculo geográfico (adscripción, nacimiento o centros de trabajo)`
                : 'Sin registros específicos en la delimitación actual'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#52796f] hover:text-[#0f2419] bg-[#fcfbf7] hover:bg-[#e8e2d4] dark:bg-[#14291e] dark:text-[#a3c9b3] dark:hover:text-white rounded-xl border border-[#234734]/20 dark:border-[#2d563e] transition-colors cursor-pointer"
            aria-label="Cerrar ficha de país"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {!hasAnyRecords ? (
            <div className="p-6 bg-[#f4efe3] dark:bg-[#12241a] rounded-xl border border-[#234734]/20 text-center space-y-3">
              <p className="text-sm font-semibold text-[#0f2419] dark:text-white">
                No hay registros directos para este país en la colección actual.
              </p>
              <p className="text-xs text-[#52796f] dark:text-[#9bb7a5] max-w-lg mx-auto leading-relaxed">
                BIOATLAS comprende {stats.totalCientificos} científicos verificados en {stats.totalPaises} naciones y los cinco continentes.
                La ausencia de una nación no presupone ausencia de ciencia en su historia territorial.
              </p>
            </div>
          ) : (
            <>
              {/* Geographic Dimension Tabs */}
              <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#f4efe3] dark:bg-[#12241a] rounded-xl border border-[#234734]/20 dark:border-[#2d563e]" role="tablist" aria-label="Dimensión geográfica del país">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeLayer === 'direct'}
                  onClick={() => {
                    setActiveLayer('direct');
                    setSelectedField('Todos');
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    activeLayer === 'direct'
                      ? 'bg-[#1b3a2b] text-[#fcfbf7] font-semibold shadow-xs dark:bg-[#2d563e]'
                      : 'text-[#41604a] dark:text-[#a3c9b3] hover:text-[#0f2419] dark:hover:text-white'
                  }`}
                >
                  Asociados al país ({profile.direct.length})
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeLayer === 'bornIn'}
                  onClick={() => {
                    setActiveLayer('bornIn');
                    setSelectedField('Todos');
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    activeLayer === 'bornIn'
                      ? 'bg-[#1b3a2b] text-[#fcfbf7] font-semibold shadow-xs dark:bg-[#2d563e]'
                      : 'text-[#41604a] dark:text-[#a3c9b3] hover:text-[#0f2419] dark:hover:text-white'
                  }`}
                >
                  Nacidos aquí ({profile.bornIn.length})
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeLayer === 'workedIn'}
                  onClick={() => {
                    setActiveLayer('workedIn');
                    setSelectedField('Todos');
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    activeLayer === 'workedIn'
                      ? 'bg-[#1b3a2b] text-[#fcfbf7] font-semibold shadow-xs dark:bg-[#2d563e]'
                      : 'text-[#41604a] dark:text-[#a3c9b3] hover:text-[#0f2419] dark:hover:text-white'
                  }`}
                >
                  Trabajaron aquí ({profile.workedIn.length})
                </button>
              </div>

              {/* Summary Stats Strip */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-[#f4efe3] dark:bg-[#12241a] rounded-xl border border-[#234734]/20 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#52796f] dark:text-[#8ba898] block">En esta vista</span>
                  <span className="text-xl font-mono font-bold text-[#0f2419] dark:text-white">{activeScientists.length}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#52796f] dark:text-[#8ba898] block">Especialidades</span>
                  <span className="text-xl font-mono font-bold text-[#1b3a2b] dark:text-[#a3c9b3]">{fieldsInCountry.length}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#52796f] dark:text-[#8ba898] block">Rango de aportes</span>
                  <span className="text-xs font-mono font-semibold text-[#8c6b2d] dark:text-[#d4af37] block mt-1">
                    {activeScientists.length > 0
                      ? `${activeScientists[0]?.aportePeriodo} — ${activeScientists[activeScientists.length - 1]?.aportePeriodo}`
                      : '—'}
                  </span>
                </div>
              </div>

              {/* Filter by field */}
              {fieldsInCountry.length > 1 && (
                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-[#52796f] dark:text-[#8ba898]" />
                  <span className="text-xs text-[#52796f] dark:text-[#8ba898] font-medium">Filtrar por campo:</span>
                  <select
                    value={selectedField}
                    onChange={e => setSelectedField(e.target.value)}
                    className="px-2.5 py-1 bg-[#fcfbf7] dark:bg-[#12241a] border border-[#234734]/25 rounded-lg text-xs text-[#142e20] dark:text-[#f4f1ea] focus:outline-none focus:ring-1 focus:ring-[#1b3a2b] cursor-pointer"
                  >
                    <option value="Todos">Todos ({activeScientists.length})</option>
                    {fieldsInCountry.map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Scientists List */}
              {filtered.length === 0 ? (
                <div className="p-6 bg-[#f4efe3]/60 dark:bg-[#12241a] rounded-xl border border-[#234734]/15 text-center text-xs text-[#52796f] dark:text-[#9bb7a5]">
                  No hay científicos registrados en esta capa territorial para {country}.
                </div>
              ) : (
                <div className="space-y-3">
                  {filtered.map(s => {
                    const disciplinas = getDisciplinas(s);

                    return (
                      <div
                        key={s.id}
                        onClick={() => {
                          onClose();
                          onOpenScientist(s.id);
                        }}
                        role="button"
                        tabIndex={0}
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            onClose();
                            onOpenScientist(s.id);
                          }
                        }}
                        className="p-4 bg-[#ffffff] hover:bg-[#f7f5ed] dark:bg-[#12241a] dark:hover:bg-[#162d20] border border-[#234734]/15 hover:border-[#234734]/40 dark:border-[#2d563e]/40 rounded-xl transition-all cursor-pointer group shadow-2xs"
                      >
                        <div className="flex items-baseline justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-bold text-[#0f2419] dark:text-[#f4f1ea] group-hover:text-[#1b3a2b] dark:group-hover:text-[#a3c9b3] transition-colors font-serif">
                              {s.nombre}
                            </h3>
                            {s.pais !== country && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#234734]/10 text-[#1b3a2b] dark:text-[#a3c9b3] text-[10px] font-medium">
                                <CircularFlag country={s.pais} size="xs" />
                                <span>Adscrito a {s.pais}</span>
                              </span>
                            )}
                            {s.esPionera && (
                              <span className="px-1.5 py-0.2 rounded bg-[#8c2d4e]/10 border border-[#8c2d4e]/30 text-[#8c2d4e] text-[9px] font-semibold">
                                Pionera
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-mono font-bold text-[#8c6b2d] dark:text-[#d4af37] shrink-0">
                            {s.aportePeriodo}
                          </span>
                        </div>

                        {/* Subtítulo de aporte */}
                        <p className="mt-1 text-xs font-medium text-[#2d563e] dark:text-[#a3c9b3]">
                          {s.subtituloAporte || `${s.nombre} — Investigador en ${s.campo}; ${s.aporteDescripcion}`}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#52796f] dark:text-[#8ba898] mt-2">
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
                          <span>·</span>
                          <span>Vida: {s.vida}</span>
                        </div>

                        <p className="text-xs text-[#243d2c] dark:text-[#d7e6dc] mt-2 leading-relaxed line-clamp-2">
                          {s.aporteDescripcion}
                        </p>

                        {/* Birth and work place */}
                        <div className="mt-3 pt-2 border-t border-[#234734]/10 flex flex-wrap gap-4 text-[11px] text-[#52796f] dark:text-[#8ba898]">
                          {s.nacimientoLugar && s.nacimientoLugar !== 'No especificado en el documento' && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#356e4e]" />
                              <span>Nacimiento: {s.nacimientoLugar}</span>
                            </span>
                          )}
                          {s.lugaresTrabajo && s.lugaresTrabajo !== 'No especificado en el documento' && (
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-3 h-3 text-[#356e4e]" />
                              <span>Lugares de trabajo: {s.lugaresTrabajo}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f7f5ed] dark:bg-[#0c1c13] border-t border-[#234734]/20 dark:border-[#2d563e] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#1b3a2b] hover:bg-[#234734] text-xs font-semibold text-[#fcfbf7] rounded-lg transition-colors cursor-pointer dark:bg-[#2d563e]"
          >
            Cerrar ficha territorial
          </button>
        </div>
      </div>
    </div>
  );
};
