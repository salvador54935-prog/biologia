/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ActiveTab } from '../types';
import { Compass, BookOpen, Globe2, ShieldCheck, Sparkles } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: ActiveTab) => void;
  onOpenSearch: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenSearch }) => {
  return (
    <footer className="bg-[#0f2419] border-t border-[#234734]/60 text-[#a3c9b3] text-xs py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Col */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2 text-[#fcfbf7]">
            <div className="w-7 h-7 rounded-lg bg-[#234734] border border-[#356e4e] flex items-center justify-center text-[#d4af37] shadow-xs">
              <Compass className="w-4 h-4" />
            </div>
            <span className="font-bold tracking-tight text-base font-serif">BIOATLAS</span>
          </div>
          <p className="text-[#b4d8c2] text-[11px] leading-relaxed">
            Atlas Universal del Conocimiento Científico. Plataforma interactiva con 759 científicos verificados en física, química, biología, matemáticas, astronomía, medicina, ingeniería y computación, desde c. 2650 a. C. hasta la actualidad.
          </p>
        </div>

        {/* Navigation Col */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#fcfbf7] font-semibold block">
            Navegación del Atlas
          </span>
          <ul className="space-y-1.5 text-[11px]">
            <li>
              <button
                onClick={() => onSelectTab('inicio')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Página de Inicio y Pabellón
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('continentes')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Exploración por Continentes
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('linea-tiempo')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Línea del Tiempo Global
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectTab('cientificos')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Catálogo General (759)
              </button>
            </li>
          </ul>
        </div>

        {/* Continents Col */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#fcfbf7] font-semibold block">
            Colección Documental
          </span>
          <ul className="space-y-1.5 text-[11px] font-mono text-[#b4d8c2]">
            <li>Total Científicos: <span className="text-white font-bold">759 biografías</span></li>
            <li>Naciones con Bandera: <span className="text-white">42 países</span></li>
            <li>Continentes: <span className="text-white">5 continentes</span></li>
            <li>Disciplinas: <span className="text-white">14 ramas de la ciencia</span></li>
            <li>Rango Temporal: <span className="text-[#d4af37]">c. 2650 a. C. – 2024</span></li>
          </ul>
        </div>

        {/* Source Citation Col */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#fcfbf7] font-semibold block">
            Rigor y Fuentes
          </span>
          <p className="text-[11px] leading-relaxed text-[#b4d8c2]">
            Todas las fichas biográficas cuentan con estructura contrastada de contexto histórico, trayectoria académica, aportes científicos detallados y fuentes verificables.
          </p>
          <div className="pt-1">
            <button
              onClick={() => onSelectTab('acerca')}
              className="text-[#d4af37] hover:underline text-[11px] cursor-pointer"
            >
              Consultar metodología y criterios →
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-[#234734]/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8ba898] gap-2">
        <span>BIOATLAS • Atlas Universal del Conocimiento Científico</span>
        <span className="font-mono text-[#a3c9b3]">759 Registros Verificados • 42 Banderas Oficiales</span>
      </div>
    </footer>
  );
};
