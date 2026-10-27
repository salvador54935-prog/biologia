import React, { useState, useEffect, useRef, useMemo } from 'react';
import { filterScientists } from '../utils/filters';
import { Search, X, ArrowRight, Clock, Globe } from 'lucide-react';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScientist: (id: string) => void;
}

export const SearchDialog: React.FC<SearchDialogProps> = ({
  isOpen,
  onClose,
  onSelectScientist,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Global keyboard shortcut Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // open handled by parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return filterScientists({ query }).slice(0, 8);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-[#091224] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="relative border-b border-slate-800 flex items-center px-4 py-3 bg-[#070d18]">
          <Search className="w-5 h-5 text-cyan-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar por científico, teoría, bacteria, ADN, ciudad, país..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-white text-xs mr-2 cursor-pointer"
            >
              Borrar
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded cursor-pointer"
            aria-label="Cerrar diálogo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Stream */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {!query.trim() ? (
            <div className="p-8 text-center text-xs text-slate-400 space-y-2">
              <p className="text-slate-300 font-medium">Búsqueda global instantánea en los 459 registros</p>
              <p>Prueba con: «penicilina», «Darwin», «Egipto», «vacuna», «mitosis», «CRISPR», «gen», «Chagas»</p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No se encontraron coincidencias para «{query}».
            </div>
          ) : (
            <div className="space-y-1">
              {results.map(s => (
                <button
                  key={s.id}
                  onClick={() => {
                    onClose();
                    onSelectScientist(s.id);
                  }}
                  className="w-full text-left p-3 rounded-lg hover:bg-slate-800/80 transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {s.nombre}
                      </span>
                      <span className="text-[10px] font-mono text-amber-400 font-semibold">
                        {s.aportePeriodo}
                      </span>
                      {s.esPionera && (
                        <span className="px-1.5 py-0.2 rounded bg-rose-950/80 border border-rose-500/50 text-rose-300 text-[9px]">
                          Pionera
                        </span>
                      )}
                      {s.paginaPDF ? (
                        <span className="text-[10px] font-mono text-blue-300 bg-blue-950/60 px-1 rounded">
                          PDF pág. {s.paginaPDF}
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-amber-300 bg-amber-950/60 px-1 rounded">
                          Ampliación
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="text-cyan-400">{s.campo}</span>
                      <span>·</span>
                      <span>{s.pais}</span>
                      <span>·</span>
                      <span className="line-clamp-1 text-slate-300 max-w-md">{s.aporteDescripcion}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>{results.length} resultados</span>
          <span>Presiona ESC para salir</span>
        </div>
      </div>
    </div>
  );
};
