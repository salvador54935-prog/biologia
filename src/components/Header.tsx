import React from 'react';
import { ActiveTab } from '../types';
import { Search, Globe2, Compass } from 'lucide-react';

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
  return (
    <header className="sticky top-0 z-40 bg-[#070d18]/95 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => onSelectTab('inicio')}
          className="flex items-center gap-2.5 text-left text-white group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md py-1"
          aria-label="Ir a inicio de VITA MUNDI"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow">
            <Globe2 className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white whitespace-nowrap font-serif">
              VITA MUNDI
            </span>
            <span className="text-[10px] text-emerald-300/90 uppercase tracking-widest font-mono">
              Atlas de la Historia Biológica
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (4-5 single-line concise text links) */}
        <nav
          className="hidden md:flex items-center gap-7 text-sm font-medium"
          aria-label="Navegación principal"
        >
          <button
            onClick={() => onSelectTab('inicio')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 rounded ${
              activeTab === 'inicio'
                ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => onSelectTab('continentes')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 rounded ${
              activeTab === 'continentes'
                ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Explorar continentes
          </button>
          <button
            onClick={() => onSelectTab('linea-tiempo')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 rounded ${
              activeTab === 'linea-tiempo'
                ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Línea del tiempo
          </button>
          <button
            onClick={() => onSelectTab('cientificos')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 rounded ${
              activeTab === 'cientificos'
                ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Científicos (459)
          </button>
          <button
            onClick={() => onSelectTab('acerca')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 rounded ${
              activeTab === 'acerca'
                ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Acerca del proyecto
          </button>
        </nav>

        {/* Zone 3: Primary Action (Quick Search) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 rounded-lg transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 whitespace-nowrap"
            aria-label="Abrir buscador global"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Buscar científicos...</span>
            <kbd className="hidden lg:inline-block ml-1 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-700 rounded">
              ⌘K
            </kbd>
          </button>
        </div>
      </div>

      {/* Mobile navigation row */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 bg-[#091122] border-t border-slate-800/60 overflow-x-auto text-xs font-medium text-slate-300">
        <button
          onClick={() => onSelectTab('inicio')}
          className={`px-2.5 py-1 rounded whitespace-nowrap cursor-pointer ${
            activeTab === 'inicio' ? 'text-cyan-400 font-bold bg-slate-800' : ''
          }`}
        >
          Inicio
        </button>
        <button
          onClick={() => onSelectTab('continentes')}
          className={`px-2.5 py-1 rounded whitespace-nowrap cursor-pointer ${
            activeTab === 'continentes' ? 'text-cyan-400 font-bold bg-slate-800' : ''
          }`}
        >
          Continentes
        </button>
        <button
          onClick={() => onSelectTab('linea-tiempo')}
          className={`px-2.5 py-1 rounded whitespace-nowrap cursor-pointer ${
            activeTab === 'linea-tiempo' ? 'text-cyan-400 font-bold bg-slate-800' : ''
          }`}
        >
          Cronología
        </button>
        <button
          onClick={() => onSelectTab('cientificos')}
          className={`px-2.5 py-1 rounded whitespace-nowrap cursor-pointer ${
            activeTab === 'cientificos' ? 'text-cyan-400 font-bold bg-slate-800' : ''
          }`}
        >
          Científicos
        </button>
        <button
          onClick={() => onSelectTab('acerca')}
          className={`px-2.5 py-1 rounded whitespace-nowrap cursor-pointer ${
            activeTab === 'acerca' ? 'text-cyan-400 font-bold bg-slate-800' : ''
          }`}
        >
          Acerca
        </button>
      </div>
    </header>
  );
};
