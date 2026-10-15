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
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white">
              <Globe2 className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold tracking-tight text-sm">BIOATLAS</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Atlas Interactivo de la Historia de la Biología. Transformación digital del documento
            documental «Línea del tiempo de la biología» con 209 científicos y aportes de 2650 a. C. a 2012.
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
                className="hover:text-cyan-400 transition-colors cursor-pointer"
              >
                Lobby Mundial
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('continentes')}
                className="hover:text-cyan-400 transition-colors cursor-pointer"
              >
                Exploración de Continentes
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('linea-tiempo')}
                className="hover:text-cyan-400 transition-colors cursor-pointer"
              >
                Línea del Tiempo Global
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('cientificos')}
                className="hover:text-cyan-400 transition-colors cursor-pointer"
              >
                Catálogo de Científicos (209)
              </button>
            </li>
          </ul>
        </div>

        {/* Continents Col */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-semibold block">
            Continentes en el PDF
          </span>
          <ul className="space-y-1.5 text-[11px] font-mono">
            <li>Europa: <span className="text-slate-300">100 científicos</span></li>
            <li>América: <span className="text-slate-300">55 científicos</span></li>
            <li>Asia: <span className="text-slate-300">30 científicos</span></li>
            <li>África: <span className="text-slate-300">13 científicos</span></li>
            <li>Oceanía: <span className="text-slate-300">11 científicos</span></li>
          </ul>
        </div>

        {/* Source Citation Col */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-semibold block">
            Cita de Fuente y Rigor
          </span>
          <p className="text-[11px] leading-relaxed text-slate-400">
            Basado íntegramente en las 20 páginas de la <em>«Línea del tiempo de la biología»</em>.
            Los datos históricos respetan aproximaciones cronológicas («c.») y se sugiere contrastar con fuentes académicas para investigaciones formales.
          </p>
          <div className="pt-1">
            <button
              onClick={() => onSelectTab('acerca')}
              className="text-cyan-400 hover:text-cyan-300 text-[11px] underline cursor-pointer"
            >
              Consultar metodología completa →
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
        <span>BIOATLAS · Atlas Interactivo de la Historia de la Biología</span>
        <span className="font-mono text-slate-400">209 Registros · c. 2650 a. C. – 2012</span>
      </div>
    </footer>
  );
};
