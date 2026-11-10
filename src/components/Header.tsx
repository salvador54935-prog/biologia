/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ActiveTab } from '../types';
import { Search, Globe2, BookOpen, Compass, Clock, Info } from 'lucide-react';
import { SCIENTISTS_DATA } from '../data/scientists';

interface HeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenSearch,
}) => {
  const totalCount = SCIENTISTS_DATA.length;

  return (
    <header className="sticky top-0 z-40 bg-[#fcfbf7]/95 dark:bg-[#0c1811]/95 backdrop-blur-md border-b border-[#1b3a2b]/15 dark:border-[#234734]/40 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Brand Wordmark */}
        <button
          onClick={() => onSelectTab('inicio')}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b3a2b] rounded-lg py-1"
          aria-label="Ir a inicio de BIOATLAS"
        >
          <div className="w-9 h-9 rounded-xl bg-[#1b3a2b] flex items-center justify-center text-[#fcfbf7] shadow-sm shadow-[#1b3a2b]/20 group-hover:bg-[#254f3a] transition-all dark:bg-[#2d6148] dark:group-hover:bg-[#397a5b]">
            <Compass className="w-5 h-5 text-[#fcfbf7]" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-[#14231b] dark:text-[#f4f1ea] font-serif leading-none">
              BIOATLAS
            </span>
            <span className="text-[10px] text-[#7a6438] dark:text-[#d4af37] uppercase tracking-widest font-mono mt-1 font-semibold">
              Atlas Universal de la Ciencia
            </span>
          </div>
        </button>

        {/* Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-6 text-sm font-medium"
          aria-label="Navegación principal"
        >
          <button
            onClick={() => onSelectTab('inicio')}
            className={`whitespace-nowrap transition-all py-1 px-1 cursor-pointer focus:outline-none rounded ${
              activeTab === 'inicio'
                ? 'text-[#1b3a2b] dark:text-[#a3c9b3] font-bold border-b-2 border-[#1b3a2b] dark:border-[#a3c9b3]'
                : 'text-[#445b4c] dark:text-[#b4cbbe] hover:text-[#14231b] dark:hover:text-white'
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => onSelectTab('continentes')}
            className={`whitespace-nowrap transition-all py-1 px-1 cursor-pointer focus:outline-none rounded ${
              activeTab === 'continentes'
                ? 'text-[#1b3a2b] dark:text-[#a3c9b3] font-bold border-b-2 border-[#1b3a2b] dark:border-[#a3c9b3]'
                : 'text-[#445b4c] dark:text-[#b4cbbe] hover:text-[#14231b] dark:hover:text-white'
            }`}
          >
            Explorar continentes
          </button>
          <button
            onClick={() => onSelectTab('linea-tiempo')}
            className={`whitespace-nowrap transition-all py-1 px-1 cursor-pointer focus:outline-none rounded ${
              activeTab === 'linea-tiempo'
                ? 'text-[#1b3a2b] dark:text-[#a3c9b3] font-bold border-b-2 border-[#1b3a2b] dark:border-[#a3c9b3]'
                : 'text-[#445b4c] dark:text-[#b4cbbe] hover:text-[#14231b] dark:hover:text-white'
            }`}
          >
            Línea del tiempo
          </button>
          <button
            onClick={() => onSelectTab('cientificos')}
            className={`whitespace-nowrap transition-all py-1 px-1 cursor-pointer focus:outline-none rounded ${
              activeTab === 'cientificos'
                ? 'text-[#1b3a2b] dark:text-[#a3c9b3] font-bold border-b-2 border-[#1b3a2b] dark:border-[#a3c9b3]'
                : 'text-[#445b4c] dark:text-[#b4cbbe] hover:text-[#14231b] dark:hover:text-white'
            }`}
          >
            Científicos ({totalCount})
          </button>
          <button
            onClick={() => onSelectTab('acerca')}
            className={`whitespace-nowrap transition-all py-1 px-1 cursor-pointer focus:outline-none rounded ${
              activeTab === 'acerca'
                ? 'text-[#1b3a2b] dark:text-[#a3c9b3] font-bold border-b-2 border-[#1b3a2b] dark:border-[#a3c9b3]'
                : 'text-[#445b4c] dark:text-[#b4cbbe] hover:text-[#14231b] dark:hover:text-white'
            }`}
          >
            Acerca del proyecto
          </button>
        </nav>

        {/* Primary Action (Quick Search) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-[#1b3a2b] bg-[#f4f1ea] hover:bg-[#eae4d5] dark:bg-[#14291e] dark:text-[#e4efe8] dark:hover:bg-[#1b3a2b] border border-[#1b3a2b]/20 dark:border-[#234734] rounded-xl transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b3a2b] whitespace-nowrap shadow-xs"
            aria-label="Abrir buscador global"
          >
            <Search className="w-3.5 h-3.5 text-[#b89047] dark:text-[#d4af37]" />
            <span className="hidden sm:inline">Buscar científicos...</span>
            <kbd className="hidden lg:inline-block ml-1 px-1.5 py-0.5 text-[10px] font-mono text-[#5c6e62] bg-[#fcfbf7] border border-[#1b3a2b]/20 dark:bg-[#0c1811] dark:border-[#234734] dark:text-[#a3c9b3] rounded">
              ⌘K
            </kbd>
          </button>
        </div>
      </div>

      {/* Mobile navigation row */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 bg-[#f4f1ea] dark:bg-[#0e2016] border-t border-[#1b3a2b]/10 dark:border-[#234734]/40 overflow-x-auto text-xs font-medium text-[#2d4034] dark:text-[#d3e3d8]">
        <button
          onClick={() => onSelectTab('inicio')}
          className={`px-2.5 py-1 rounded-lg whitespace-nowrap cursor-pointer ${
            activeTab === 'inicio' ? 'text-[#fcfbf7] font-bold bg-[#1b3a2b] dark:bg-[#2d6148]' : ''
          }`}
        >
          Inicio
        </button>
        <button
          onClick={() => onSelectTab('continentes')}
          className={`px-2.5 py-1 rounded-lg whitespace-nowrap cursor-pointer ${
            activeTab === 'continentes' ? 'text-[#fcfbf7] font-bold bg-[#1b3a2b] dark:bg-[#2d6148]' : ''
          }`}
        >
          Continentes
        </button>
        <button
          onClick={() => onSelectTab('linea-tiempo')}
          className={`px-2.5 py-1 rounded-lg whitespace-nowrap cursor-pointer ${
            activeTab === 'linea-tiempo' ? 'text-[#fcfbf7] font-bold bg-[#1b3a2b] dark:bg-[#2d6148]' : ''
          }`}
        >
          Cronología
        </button>
        <button
          onClick={() => onSelectTab('cientificos')}
          className={`px-2.5 py-1 rounded-lg whitespace-nowrap cursor-pointer ${
            activeTab === 'cientificos' ? 'text-[#fcfbf7] font-bold bg-[#1b3a2b] dark:bg-[#2d6148]' : ''
          }`}
        >
          Catálogo ({totalCount})
        </button>
        <button
          onClick={() => onSelectTab('acerca')}
          className={`px-2.5 py-1 rounded-lg whitespace-nowrap cursor-pointer ${
            activeTab === 'acerca' ? 'text-[#fcfbf7] font-bold bg-[#1b3a2b] dark:bg-[#2d6148]' : ''
          }`}
        >
          Acerca
        </button>
      </div>
    </header>
  );
};
