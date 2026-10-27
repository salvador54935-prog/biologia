import React, { useState, useMemo } from 'react';
import { Scientist } from '../types';
import { getScientistsByCountry, getAllFields } from '../utils/filters';
import { X, MapPin, Globe, Briefcase, Calendar, Filter, Award } from 'lucide-react';

interface CountryModalProps {
  country: string | null;
  onClose: () => void;
  onOpenScientist: (id: string) => void;
}

export const CountryModal: React.FC<CountryModalProps> = ({
  country,
  onClose,
  onOpenScientist,
}) => {
  if (!country) return null;

  const scientists = useMemo(() => getScientistsByCountry(country), [country]);
  const [selectedField, setSelectedField] = useState<string>('Todos');

  const fieldsInCountry = useMemo(() => {
    const fields = new Set<string>();
    scientists.forEach(s => fields.add(s.campo));
    return Array.from(fields);
  }, [scientists]);

  const filtered = useMemo(() => {
    if (selectedField === 'Todos') return scientists;
    return scientists.filter(s => s.campo === selectedField);
  }, [scientists, selectedField]);

  const continent = scientists[0]?.continente || 'Continente no registrado';
  const hasRecords = scientists.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="country-modal-title"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#091224] border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-[#070d18] border-b border-slate-800 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
              <Globe className="w-3.5 h-3.5" />
              <span>Registro Nacional Documentado · {continent}</span>
            </div>
            <h2 id="country-modal-title" className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {country}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {hasRecords
                ? `${scientists.length} científico${scientists.length > 1 ? 's' : ''} registrado${scientists.length > 1 ? 's' : ''} (${scientists.filter(s => !s.esComplementario).length} del PDF + ${scientists.filter(s => s.esComplementario).length} ampliación)`
                : 'Sin registros específicos en la delimitación bibliográfica'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            aria-label="Cerrar ficha de país"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {!hasRecords ? (
            <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 text-center space-y-3">
              <p className="text-sm text-slate-200 font-medium">
                No hay registros para este país en la colección actual del atlas.
              </p>
              <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
                El atlas comprende 459 científicos documentados (209 procedentes del documento histórico 'Línea del tiempo de la biología' y 250 de la ampliación complementaria).
                La ausencia de una nación en esta lista no implica que no haya habido contribuciones científicas históricas en su territorio, sino que responde a la delimitación bibliográfica de las fuentes consultadas.
              </p>
            </div>
          ) : (
            <>
              {/* Summary Stats Strip */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Total Registrados</span>
                  <span className="text-xl font-mono font-bold text-white">{scientists.length}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Campos</span>
                  <span className="text-xl font-mono font-bold text-cyan-400">{fieldsInCountry.length}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Rango de aportes</span>
                  <span className="text-xs font-mono font-semibold text-amber-400 block mt-1">
                    {scientists[0]?.aportePeriodo} — {scientists[scientists.length - 1]?.aportePeriodo}
                  </span>
                </div>
              </div>

              {/* Filter by field */}
              {fieldsInCountry.length > 1 && (
                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs text-slate-400">Filtrar por campo:</span>
                  <select
                    value={selectedField}
                    onChange={e => setSelectedField(e.target.value)}
                    className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded text-xs text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="Todos">Todos ({scientists.length})</option>
                    {fieldsInCountry.map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Scientists List */}
              <div className="space-y-4">
                {filtered.map(s => (
                  <div
                    key={s.id}
                    onClick={() => {
                      onClose();
                      onOpenScientist(s.id);
                    }}
                    className="p-4 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/40 rounded-xl transition-all cursor-pointer group"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {s.nombre}
                        </h3>
                        {s.esPionera && (
                          <span className="px-1.5 py-0.2 rounded bg-rose-950/80 border border-rose-500/50 text-rose-300 text-[9px]">
                            Pionera
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono font-bold text-amber-400">
                        {s.aportePeriodo}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 mt-1">
                      <span className="text-cyan-400 font-medium">{s.campo}</span>
                      <span>·</span>
                      <span>Vida: {s.vida}</span>
                      <span>·</span>
                      {s.paginaPDF ? (
                        <span className="text-blue-300 bg-blue-950/60 px-1.5 py-0.5 rounded text-[10px] font-mono">
                          PDF Pág. {s.paginaPDF}
                        </span>
                      ) : (
                        <span className="text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded text-[10px] font-mono">
                          Ampliación
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {s.aporteDescripcion}
                    </p>

                    {/* Birth and work place differentiation */}
                    <div className="mt-3 pt-2 border-t border-slate-800/60 flex flex-wrap gap-4 text-[11px] text-slate-400">
                      {s.nacimientoLugar !== 'No especificado en el documento' && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span>Nacimiento: {s.nacimientoLugar}</span>
                        </span>
                      )}
                      {s.lugaresTrabajo !== 'No especificado en el documento' && (
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-3 h-3 text-slate-500" />
                          <span>Trabajó en: {s.lugaresTrabajo}</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#070d18] border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-white rounded-lg transition-colors cursor-pointer"
          >
            Cerrar ficha
          </button>
        </div>
      </div>
    </div>
  );
};
