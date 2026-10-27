import React from 'react';
import { ActiveTab } from '../types';
import { Globe2, BookOpen, Compass, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: ActiveTab) => void;
  onOpenSearch: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenSearch }) => {
  return (
    <footer className="bg-[#050912] border-t border-slate-800/80 text-slate-400 text-xs py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Col */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2 text-white">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 flex items-center justify-center text-white">
              <Globe2 className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold tracking-tight text-sm font-serif">VITA MUNDI</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Atlas Universal de la Historia de la Biología. Transformación digital del documento
            «Línea del tiempo de la biología» con los 209 científicos originales más 250 biografías
            complementarias verificadas (459 en total, desde c. 2650 a. C. hasta la actualidad).
          </p>
        </div>

        {/* Navigation Col */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-semibold block">
            Navegación
          </span>
          <ul className="space-y-1.5 text-[11px]">
            <li>
              <button
                onClick={() => onSelectTab('inicio')}
                className="hover:text-emerald-400 transition-colors cursor-pointer"
              >
                Lobby Mundial
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('continentes')}
                className="hover:text-emerald-400 transition-colors cursor-pointer"
              >
                Exploración de Continentes
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('linea-tiempo')}
                className="hover:text-emerald-400 transition-colors cursor-pointer"
              >
                Línea del Tiempo Global
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('cientificos')}
                className="hover:text-emerald-400 transition-colors cursor-pointer"
              >
                Catálogo de Científicos (459)
              </button>
            </li>
          </ul>
        </div>

        {/* Continents Col */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-semibold block">
            Colecciones en el Atlas
          </span>
          <ul className="space-y-1.5 text-[11px] font-mono">
            <li>PDF Original: <span className="text-slate-300">209 científicos</span></li>
            <li>Colección Ampliada: <span className="text-slate-300">250 científicos</span></li>
            <li>Total Histórico: <span className="text-emerald-300 font-bold">459 científicos</span></li>
            <li>Continentes: <span className="text-slate-300">5 continentes</span></li>
            <li>Países Mapeados: <span className="text-slate-300">64 naciones</span></li>
          </ul>
        </div>

        {/* Source Citation Col */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-semibold block">
            Cita de Fuente y Rigor
          </span>
          <p className="text-[11px] leading-relaxed text-slate-400">
            Los 209 científicos iniciales provienen con estricta fidelidad del documento <em>«Línea del tiempo de la biología»</em>.
            Las 250 adiciones complementarias están rigurosamente sustentadas en fuentes históricas, premios Nobel y academias científicas internacionales.
          </p>
          <div className="pt-1">
            <button
              onClick={() => onSelectTab('acerca')}
              className="text-emerald-400 hover:text-emerald-300 text-[11px] underline cursor-pointer"
            >
              Consultar metodología completa →
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
        <span>VITA MUNDI · Atlas Universal de la Historia de la Biología</span>
        <span className="font-mono text-slate-400">459 Registros Verificados · c. 2650 a. C. – Actualidad</span>
      </div>
    </footer>
  );
};
