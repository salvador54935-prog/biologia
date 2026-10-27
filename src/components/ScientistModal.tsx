import React, { useEffect, useMemo } from 'react';
import { Scientist } from '../types';
import { SCIENTISTS_DATA } from '../data/scientists';
import { getAdjacentScientists, getRelatedScientists } from '../utils/filters';
import {
  X,
  MapPin,
  Briefcase,
  Calendar,
  Globe,
  Award,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Info,
  Clock,
  Sparkles,
} from 'lucide-react';

interface ScientistModalProps {
  scientistId: string | null;
  onClose: () => void;
  onSelectScientist: (id: string) => void;
  onSelectCountry: (country: string) => void;
}

export const ScientistModal: React.FC<ScientistModalProps> = ({
  scientistId,
  onClose,
  onSelectScientist,
  onSelectCountry,
}) => {
  const scientist = useMemo(
    () => SCIENTISTS_DATA.find(s => s.id === scientistId),
    [scientistId]
  );

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!scientist) return null;

  const { prev, next } = getAdjacentScientists(scientist.id);
  const related = getRelatedScientists(scientist, 3);

  // Determine chronological era label
  const getEraLabel = (year: number) => {
    if (year <= 500) return 'Antigüedad clásica';
    if (year <= 1500) return 'Edad Media y Era de Oro Islámica';
    if (year <= 1800) return 'Revolución Científica e Ilustración';
    if (year <= 1900) return 'Siglo XIX: Nacimiento de la Biología Moderna';
    if (year <= 1950) return 'Siglo XX: Genética y Bioquímica Clásica';
    if (year <= 2000) return 'Siglo XX: Biología Molecular y Biotecnología';
    return 'Siglo XXI: Genómica y Edición Genética';
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="scientist-modal-title"
    >
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-[#09152b] border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header Bar */}
        <div className="p-5 sm:p-6 bg-[#061021] border-b border-slate-800 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-emerald-400 mb-1.5">
              <span className="font-semibold text-slate-300">{scientist.continente}</span>
              <span>·</span>
              <button
                onClick={() => {
                  onClose();
                  onSelectCountry(scientist.pais);
                }}
                className="hover:underline text-emerald-300 cursor-pointer font-bold"
              >
                {scientist.pais}
              </button>
              <span>·</span>
              <span className="text-amber-300 font-bold">{scientist.aportePeriodo}</span>

              {scientist.esPionera && (
                <span className="px-2 py-0.5 text-[10px] font-mono bg-fuchsia-950 text-fuchsia-300 border border-fuchsia-800 rounded-full flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>Pionera</span>
                </span>
              )}

              {scientist.paginaPDF ? (
                <span className="px-2 py-0.5 text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800 rounded-full">
                  PDF Pág. {scientist.paginaPDF}
                </span>
              ) : (
                <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-full">
                  Colección Ampliada
                </span>
              )}
            </div>

            <h2 id="scientist-modal-title" className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-serif">
              {scientist.nombre}
            </h2>

            <div className="text-xs sm:text-sm text-emerald-400 font-medium mt-1">
              {scientist.campo}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            aria-label="Cerrar ficha"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* Main Contribution Card */}
          <div className="p-5 bg-slate-900/90 rounded-xl border border-emerald-500/30 space-y-2">
            <span className="text-xs uppercase tracking-wider font-mono text-emerald-400 block font-semibold">
              Descripción del Aporte Científico
            </span>
            <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-normal">
              {scientist.aporteDescripcion}
            </p>
          </div>

          {/* Structured Historical Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Fechas de Vida */}
            <div className="p-3.5 bg-slate-900/60 rounded-lg border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 uppercase block mb-1">
                Periodo Vital (Nacimiento – Muerte)
              </span>
              <div className="flex items-center gap-2 text-slate-200 font-medium">
                <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{scientist.vida}</span>
              </div>
            </div>

            {/* Contexto Cronológico */}
            <div className="p-3.5 bg-slate-900/60 rounded-lg border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 uppercase block mb-1">
                Contexto Cronológico
              </span>
              <div className="flex items-center gap-2 text-slate-200 font-medium">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{getEraLabel(scientist.anioNumerico)}</span>
              </div>
            </div>

            {/* Lugar de Nacimiento (Diferenciado) */}
            <div className="p-3.5 bg-slate-900/60 rounded-lg border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 uppercase block mb-1">
                Lugar de Nacimiento
              </span>
              <div className="flex items-center gap-2 text-slate-200 font-medium">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{scientist.nacimientoLugar}</span>
              </div>
            </div>

            {/* Lugares de Trabajo (Diferenciado) */}
            <div className="p-3.5 bg-slate-900/60 rounded-lg border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 uppercase block mb-1">
                Lugares donde Trabajó
              </span>
              <div className="flex items-center gap-2 text-slate-200 font-medium">
                <Briefcase className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{scientist.lugaresTrabajo}</span>
              </div>
            </div>
          </div>

          {/* Document Reference Citation */}
          <div className="p-4 bg-slate-900/70 rounded-lg border border-slate-800 flex items-start gap-3">
            <BookOpen className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 space-y-1">
              <div>
                <strong>Referencia de Fuente:</strong>{' '}
                {scientist.paginaPDF ? (
                  <span>
                    Página <strong>{scientist.paginaPDF}</strong> del documento original <em>“Línea del tiempo de la biología”</em>.
                  </span>
                ) : (
                  <span>
                    Colección complementaria verificada — <em>{scientist.fuenteReferencia}</em>.
                  </span>
                )}
              </div>
              <p className="text-slate-400">
                Registro adscrito a <strong>{scientist.continente}</strong> con país de identificación <strong>{scientist.pais}</strong>.
              </p>
            </div>
          </div>

          {/* Academic Contrast Notice */}
          <div className="flex items-start gap-2.5 text-xs text-slate-400 bg-slate-950/40 p-3 rounded-lg border border-slate-800/80">
            <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <p>
              Nota histórica: El año de aporte corresponde al del descubrimiento o publicación más reconocido. Las fechas con «c.» representan estimaciones históricas aproximadas («circa») y se aconseja contrastar con literatura especializada para investigaciones formales.
            </p>
          </div>

          {/* Related Scientists in Same Field */}
          {related.length > 0 && (
            <div>
              <span className="text-xs uppercase tracking-wider font-mono text-slate-400 block mb-2 font-semibold">
                Otros científicos en el campo de {scientist.campo}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {related.map(rel => (
                  <button
                    key={rel.id}
                    onClick={() => onSelectScientist(rel.id)}
                    className="text-left p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 border border-slate-800/80 hover:border-emerald-500/40 transition-colors cursor-pointer group"
                  >
                    <div className="text-xs font-semibold text-white group-hover:text-emerald-300">
                      {rel.nombre}
                    </div>
                    <div className="text-[11px] font-mono text-amber-400">
                      {rel.aportePeriodo} · {rel.pais}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Chronological Navigation */}
        <div className="p-4 bg-[#061021] border-t border-slate-800 flex items-center justify-between gap-2">
          {prev ? (
            <button
              onClick={() => onSelectScientist(prev.id)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Anterior:</span>
              <span className="truncate max-w-[120px]">{prev.nombre}</span>
              <span className="font-mono text-[10px] text-amber-300">({prev.aportePeriodo})</span>
            </button>
          ) : (
            <div />
          )}

          {next ? (
            <button
              onClick={() => onSelectScientist(next.id)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <span className="hidden sm:inline">Siguiente:</span>
              <span className="truncate max-w-[120px]">{next.nombre}</span>
              <span className="font-mono text-[10px] text-amber-300">({next.aportePeriodo})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};
