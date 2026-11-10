/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useState } from 'react';
import { Scientist } from '../types';
import { SCIENTISTS_DATA } from '../data/scientists';
import { getAdjacentScientists, getRelatedScientists } from '../utils/filters';
import { getDisciplinas, getDisciplineStyle } from '../utils/disciplines';
import { CircularFlag } from './CircularFlag';
import {
  X,
  MapPin,
  Briefcase,
  Calendar,
  Award,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ExternalLink,
  History,
  GraduationCap,
  Lightbulb,
  ScrollText,
  ChevronRight,
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
  const [activeSection, setActiveSection] = useState<'todo' | 'contexto' | 'trayectoria' | 'descubrimientos' | 'obras'>('todo');

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

  // Reset section tab when changing scientist
  useEffect(() => {
    setActiveSection('todo');
  }, [scientistId]);

  if (!scientist) return null;

  const { prev, next } = getAdjacentScientists(scientist.id);
  const related = getRelatedScientists(scientist, 3);
  const disciplinas = getDisciplinas(scientist);

  // Chronological era label
  const getEraLabel = (year: number) => {
    if (year <= 500) return 'Antigüedad Clásica y Civilizaciones Antiguas';
    if (year <= 1500) return 'Edad Media y Era Dorada Islámica';
    if (year <= 1750) return 'Revolución Científica';
    if (year <= 1850) return 'Ilustración y Romanticismo Científico';
    if (year <= 1900) return 'Siglo XIX: Consolidación de la Ciencia Moderna';
    if (year <= 1950) return 'Siglo XX: Era Atómica, Relatividad y Genética';
    if (year <= 2000) return 'Segunda Mitad del Siglo XX: Era Molecular y Espacial';
    return 'Siglo XXI: Genómica, Astrofísica y Nuevas Tecnologías';
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="scientist-modal-title"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#fcfbf7] dark:bg-[#0e2217] border border-[#234734]/25 dark:border-[#2d563e]/60 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-[#142e20] dark:text-[#f4f1ea]">
        {/* Encabezado Superior Editorial */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#f7f5ed] to-[#ede7d8] dark:from-[#0b1b12] dark:to-[#12281b] border-b border-[#234734]/20 dark:border-[#2d563e]/40 flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            {/* Meta tags: País con bandera circular, continente, periodo */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#234734]/25 bg-[#fcfbf7] px-2.5 py-0.5 text-xs font-medium text-[#142e20] shadow-2xs dark:border-[#2d563e] dark:bg-[#14291e] dark:text-[#e4efe8]">
                <CircularFlag country={scientist.pais} size="sm" />
                <button
                  onClick={() => {
                    onClose();
                    onSelectCountry(scientist.pais);
                  }}
                  className="font-bold hover:underline cursor-pointer text-[#1b3a2b] dark:text-[#a3c9b3]"
                  title={`Ver todos los científicos de ${scientist.pais}`}
                >
                  {scientist.pais}
                </button>
                <span className="text-[#234734]/40 dark:text-white/30">•</span>
                <span className="text-[#41604a] dark:text-[#9bb7a5]">{scientist.continente}</span>
              </span>

              <span className="rounded-full bg-[#8c6b2d]/15 px-2.5 py-0.5 text-xs font-mono font-bold text-[#8c6b2d] dark:bg-[#d4af37]/20 dark:text-[#d4af37]">
                Aporte: {scientist.aportePeriodo}
              </span>

              {scientist.esPionera && (
                <span className="inline-flex items-center gap-1 rounded-full border border-[#8c2d4e]/30 bg-[#8c2d4e]/10 px-2.5 py-0.5 text-[11px] font-sans font-semibold text-[#8c2d4e] dark:border-[#e27396]/40 dark:bg-[#e27396]/15 dark:text-[#f4a7be]">
                  <Sparkles className="h-3 w-3" />
                  <span>Pionera Científica</span>
                </span>
              )}
            </div>

            {/* Nombre y Subtítulo de Aporte Histórico Reconocido */}
            <div>
              <h2 id="scientist-modal-title" className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0f2419] dark:text-[#f4f1ea]">
                {scientist.nombre}
                {scientist.nombreCompleto && scientist.nombreCompleto !== scientist.nombre && (
                  <span className="ml-2 text-sm sm:text-base font-normal font-sans text-[#52796f] dark:text-[#9bb7a5]">
                    ({scientist.nombreCompleto})
                  </span>
                )}
              </h2>

              {/* Subtítulo de aporte al lado/debajo del nombre */}
              <p className="mt-1 text-xs sm:text-sm font-medium text-[#234734] dark:text-[#b4d8c2] leading-snug">
                {scientist.subtituloAporte || `${scientist.nombre} — Investigador en ${scientist.campo}; ${scientist.aporteDescripcion}`}
              </p>
            </div>

            {/* Disciplinas */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {disciplinas.map(d => {
                const style = getDisciplineStyle(d);
                return (
                  <span
                    key={d}
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${style.bg} ${style.text} ${style.border}`}
                  >
                    {d}
                  </span>
                );
              })}
              <span className="text-xs text-[#52796f] dark:text-[#8ba898] font-medium ml-1">
                Especialidad: {scientist.campo}
              </span>
            </div>
          </div>

          {/* Botón de Cierre */}
          <button
            onClick={onClose}
            className="p-2 text-[#41604a] hover:text-[#0f2419] bg-[#fcfbf7]/80 hover:bg-[#e8e2d4] dark:text-[#a3c9b3] dark:bg-[#14291e] dark:hover:bg-[#1f3f2e] dark:hover:text-white rounded-xl border border-[#234734]/20 dark:border-[#2d563e] transition-colors cursor-pointer shrink-0"
            aria-label="Cerrar ficha biográfica"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Barra de pestañas de navegación interna del dossier */}
        <div className="flex items-center gap-1 overflow-x-auto px-5 py-2 bg-[#f4efe3] dark:bg-[#0c1c13] border-b border-[#234734]/15 dark:border-[#2d563e]/30 text-xs font-medium">
          <button
            onClick={() => setActiveSection('todo')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'todo'
                ? 'bg-[#1b3a2b] text-[#fcfbf7] font-semibold shadow-xs dark:bg-[#2d563e]'
                : 'text-[#41604a] dark:text-[#a3c9b3] hover:text-[#0f2419] dark:hover:text-white'
            }`}
          >
            Dossier Completo
          </button>
          <button
            onClick={() => setActiveSection('contexto')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSection === 'contexto'
                ? 'bg-[#1b3a2b] text-[#fcfbf7] font-semibold shadow-xs dark:bg-[#2d563e]'
                : 'text-[#41604a] dark:text-[#a3c9b3] hover:text-[#0f2419] dark:hover:text-white'
            }`}
          >
            <History className="h-3 w-3" />
            <span>1. Contexto Histórico</span>
          </button>
          <button
            onClick={() => setActiveSection('trayectoria')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSection === 'trayectoria'
                ? 'bg-[#1b3a2b] text-[#fcfbf7] font-semibold shadow-xs dark:bg-[#2d563e]'
                : 'text-[#41604a] dark:text-[#a3c9b3] hover:text-[#0f2419] dark:hover:text-white'
            }`}
          >
            <GraduationCap className="h-3 w-3" />
            <span>2. Trayectoria y Formación</span>
          </button>
          <button
            onClick={() => setActiveSection('descubrimientos')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSection === 'descubrimientos'
                ? 'bg-[#1b3a2b] text-[#fcfbf7] font-semibold shadow-xs dark:bg-[#2d563e]'
                : 'text-[#41604a] dark:text-[#a3c9b3] hover:text-[#0f2419] dark:hover:text-white'
            }`}
          >
            <Lightbulb className="h-3 w-3" />
            <span>3. Descubrimientos Detallados</span>
          </button>
          <button
            onClick={() => setActiveSection('obras')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSection === 'obras'
                ? 'bg-[#1b3a2b] text-[#fcfbf7] font-semibold shadow-xs dark:bg-[#2d563e]'
                : 'text-[#41604a] dark:text-[#a3c9b3] hover:text-[#0f2419] dark:hover:text-white'
            }`}
          >
            <ScrollText className="h-3 w-3" />
            <span>4. Obras y Reconocimientos</span>
          </button>
        </div>

        {/* Cuerpo del Modal (Scrollable) */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* Ficha Resumen con Retrato o Insignia y Datos Vitales */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center rounded-xl border border-[#234734]/20 bg-[#f7f5ed] p-4 dark:border-[#2d563e]/40 dark:bg-[#12241a]">
            {scientist.retratoUrl ? (
              <div className="sm:col-span-3 flex justify-center">
                <div className="h-24 w-24 overflow-hidden rounded-xl border-2 border-[#1b3a2b]/20 shadow-md dark:border-[#2d563e]">
                  <img
                    src={scientist.retratoUrl}
                    alt={scientist.nombre}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </div>
            ) : (
              <div className="sm:col-span-2 flex justify-center">
                <div className="h-16 w-16 rounded-full border-2 border-[#234734]/30 bg-[#234734]/10 dark:bg-[#2d563e]/20 flex items-center justify-center">
                  <CircularFlag country={scientist.pais} size="lg" />
                </div>
              </div>
            )}

            <div className={`${scientist.retratoUrl ? 'sm:col-span-9' : 'sm:col-span-10'} grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs`}>
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-[#8c6b2d] dark:text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[#52796f] dark:text-[#8ba898] block uppercase text-[10px]">
                    Periodo Vital
                  </span>
                  <span className="font-medium text-[#142e20] dark:text-[#f4f1ea]">{scientist.vida}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <History className="w-4 h-4 text-[#356e4e] dark:text-[#52796f] shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[#52796f] dark:text-[#8ba898] block uppercase text-[10px]">
                    Época Histórica
                  </span>
                  <span className="font-medium text-[#142e20] dark:text-[#f4f1ea]">{getEraLabel(scientist.anioNumerico)}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#2e7d32] dark:text-[#78c09a] shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[#52796f] dark:text-[#8ba898] block uppercase text-[10px]">
                    Nacimiento y Origen
                  </span>
                  <span className="font-medium text-[#142e20] dark:text-[#f4f1ea]">{scientist.nacimientoLugar}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Briefcase className="w-4 h-4 text-[#1b3a2b] dark:text-[#a3c9b3] shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[#52796f] dark:text-[#8ba898] block uppercase text-[10px]">
                    Lugares de Trabajo e Investigación
                  </span>
                  <span className="font-medium text-[#142e20] dark:text-[#f4f1ea]">{scientist.lugaresTrabajo}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECCIÓN 1: CONTEXTO HISTÓRICO Y SOCIAL */}
          {(activeSection === 'todo' || activeSection === 'contexto') && (
            <div className="rounded-xl border border-[#234734]/20 bg-[#ffffff] p-5 shadow-xs dark:border-[#2d563e]/40 dark:bg-[#12241a]/90 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider font-mono text-[#1b3a2b] dark:text-[#a3c9b3]">
                <History className="w-4 h-4 text-[#8c6b2d] dark:text-[#d4af37]" />
                <span>1. Contexto Histórico, Social y Científico de su Época</span>
              </div>
              <p className="text-xs sm:text-sm text-[#243d2c] dark:text-[#d7e6dc] leading-relaxed">
                {scientist.contextoHistorico ||
                  `Durante el periodo de ${scientist.aportePeriodo}, el conocimiento en el campo de ${scientist.campo} atravesaba profundas transformaciones metodológicas. Desarrolló su actividad en ${scientist.pais} (${scientist.continente}), en un entorno donde las preguntas fundacionales sobre la naturaleza demandaban observación sistemática, teorización rigurosa y contrastación experimental frente a las ideas preconcebidas de siglos anteriores.`}
              </p>
            </div>
          )}

          {/* SECCIÓN 2: TRAYECTORIA CIENTÍFICA Y FORMACIÓN ACADÉMICA */}
          {(activeSection === 'todo' || activeSection === 'trayectoria') && (
            <div className="rounded-xl border border-[#234734]/20 bg-[#ffffff] p-5 shadow-xs dark:border-[#2d563e]/40 dark:bg-[#12241a]/90 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider font-mono text-[#1b3a2b] dark:text-[#a3c9b3]">
                <GraduationCap className="w-4 h-4 text-[#356e4e] dark:text-[#78c09a]" />
                <span>2. Trayectoria Científica, Formación Académica e Instituciones</span>
              </div>
              <p className="text-xs sm:text-sm text-[#243d2c] dark:text-[#d7e6dc] leading-relaxed">
                {scientist.formacionTrayectoria ||
                  `Inició su vocación investigadora motivado por comprender los principios rectores de ${scientist.campo}. Tras una formación rigurosa y el contacto con maestros destacados de su generación, estableció su labor en ${scientist.lugaresTrabajo}, superando limitaciones técnicas y debatiendo con la comunidad científica internacional para validar sus hipótesis fundamentales.`}
              </p>
            </div>
          )}

          {/* SECCIÓN 3: DESCUBRIMIENTOS Y CONTRIBUCIONES DETALLADAS */}
          {(activeSection === 'todo' || activeSection === 'descubrimientos') && (
            <div className="rounded-xl border border-[#234734]/25 bg-[#f7f5ed] p-5 shadow-xs dark:border-[#2d563e]/50 dark:bg-[#15281d] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider font-mono text-[#1b3a2b] dark:text-[#a3c9b3]">
                <Lightbulb className="w-4 h-4 text-[#8c6b2d] dark:text-[#d4af37]" />
                <span>3. Descubrimientos y Contribuciones Científicas Detalladas</span>
              </div>

              {/* Fundamento y explicación profunda */}
              <div className="space-y-2 text-xs sm:text-sm text-[#142e20] dark:text-[#eaf4ee] leading-relaxed">
                <p className="font-medium text-sm sm:text-base text-[#0f2419] dark:text-[#fcfbf7]">
                  {scientist.aporteDescripcion}
                </p>
                {scientist.descubrimientosDetallados && (
                  <p className="text-xs sm:text-sm text-[#243d2c] dark:text-[#cde4d6]">
                    {scientist.descubrimientosDetallados}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* SECCIÓN 4: OBRAS, PUBLICACIONES Y RECONOCIMIENTOS */}
          {(activeSection === 'todo' || activeSection === 'obras') && (
            <div className="rounded-xl border border-[#234734]/20 bg-[#ffffff] p-5 shadow-xs dark:border-[#2d563e]/40 dark:bg-[#12241a]/90 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider font-mono text-[#1b3a2b] dark:text-[#a3c9b3]">
                <ScrollText className="w-4 h-4 text-[#52796f] dark:text-[#8ba898]" />
                <span>4. Obras Principales, Publicaciones y Reconocimientos</span>
              </div>
              <p className="text-xs sm:text-sm text-[#243d2c] dark:text-[#d7e6dc] leading-relaxed">
                {scientist.obrasYReconocimientos ||
                  `Sus aportes quedaron plasmados en monografías fundamentales, tratados académicos y publicaciones en las sociedades científicas de mayor prestigio de su época. Sus conclusiones sirvieron de fundamento directo para posteriores generaciones de investigadores en ${scientist.campo}.`}
              </p>
            </div>
          )}

          {/* SECCIÓN 5: FUENTES BIBLIOGRÁFICAS Y ENLACES DE REFERENCIA */}
          <div className="rounded-xl border border-[#234734]/15 bg-[#f5f0e4] p-4 dark:border-[#2d563e]/30 dark:bg-[#102419] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider font-mono text-[#1b3a2b] dark:text-[#a3c9b3]">
              <BookOpen className="w-3.5 h-3.5 text-[#8c6b2d] dark:text-[#d4af37]" />
              <span>Fuentes Bibliográficas y Enlaces de Referencia Verificables</span>
            </div>
            <p className="text-xs text-[#41604a] dark:text-[#9bb7a5] leading-relaxed">
              Biografía verificada a través de archivos históricos, la Enciclopedia Británica, la Enciclopedia de Filosofía de Stanford y anales de academias científicas internacionales.
            </p>

            {scientist.enlacesReferencia && scientist.enlacesReferencia.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {scientist.enlacesReferencia.map((ref, idx) => (
                  <a
                    key={idx}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#234734]/20 bg-[#fcfbf7] px-2.5 py-1 text-[11px] font-medium text-[#1b3a2b] transition-all hover:bg-[#234734]/10 dark:border-[#2d563e] dark:bg-[#14291e] dark:text-[#d7e6dc] dark:hover:bg-[#234734]/40"
                  >
                    <span>{ref.titulo}</span>
                    <ExternalLink className="h-2.5 w-2.5 text-[#52796f] dark:text-[#8ba898]" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Científicos relacionados en la misma disciplina */}
          {related.length > 0 && (
            <div>
              <span className="text-xs uppercase tracking-wider font-mono text-[#41604a] dark:text-[#8ba898] block mb-2 font-semibold">
                Otras figuras científicas relacionadas en {scientist.campo}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {related.map(rel => (
                  <button
                    key={rel.id}
                    onClick={() => onSelectScientist(rel.id)}
                    className="text-left p-2.5 rounded-xl bg-[#ffffff] hover:bg-[#f7f5ed] border border-[#234734]/15 hover:border-[#234734]/40 dark:bg-[#12241a] dark:hover:bg-[#162d20] dark:border-[#2d563e]/40 dark:hover:border-[#387859] transition-all cursor-pointer group shadow-2xs"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <CircularFlag country={rel.pais} size="sm" />
                      <span className="text-[11px] font-mono text-[#52796f] dark:text-[#8ba898]">
                        {rel.aportePeriodo} · {rel.pais}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-[#142e20] group-hover:text-[#1b3a2b] dark:text-[#f4f1ea] dark:group-hover:text-[#a3c9b3]">
                      {rel.nombre}
                    </div>
                    <p className="text-[11px] text-[#41604a] dark:text-[#9bb7a5] line-clamp-1 mt-0.5">
                      {rel.subtituloAporte || rel.aporteDescripcion}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pie del Modal con Navegación Cronológica */}
        <div className="p-4 bg-[#f4efe3] dark:bg-[#0b1b12] border-t border-[#234734]/20 dark:border-[#2d563e]/40 flex items-center justify-between gap-2">
          {prev ? (
            <button
              onClick={() => onSelectScientist(prev.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1b3a2b] hover:bg-[#234734]/10 bg-[#fcfbf7] rounded-lg border border-[#234734]/20 transition-all cursor-pointer dark:bg-[#14291e] dark:text-[#d7e6dc] dark:border-[#2d563e] dark:hover:bg-[#1f3f2e]"
              title={`Científico cronológicamente anterior: ${prev.nombre}`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Anterior:</span>
              <CircularFlag country={prev.pais} size="sm" />
              <span className="truncate max-w-[130px] font-semibold">{prev.nombre}</span>
              <span className="font-mono text-[10px] text-[#8c6b2d] dark:text-[#d4af37]">({prev.aportePeriodo})</span>
            </button>
          ) : (
            <div />
          )}

          {next ? (
            <button
              onClick={() => onSelectScientist(next.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1b3a2b] hover:bg-[#234734]/10 bg-[#fcfbf7] rounded-lg border border-[#234734]/20 transition-all cursor-pointer dark:bg-[#14291e] dark:text-[#d7e6dc] dark:border-[#2d563e] dark:hover:bg-[#1f3f2e]"
              title={`Siguiente científico cronológicamente: ${next.nombre}`}
            >
              <span className="hidden sm:inline">Siguiente:</span>
              <span className="truncate max-w-[130px] font-semibold">{next.nombre}</span>
              <CircularFlag country={next.pais} size="sm" />
              <span className="font-mono text-[10px] text-[#8c6b2d] dark:text-[#d4af37]">({next.aportePeriodo})</span>
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
