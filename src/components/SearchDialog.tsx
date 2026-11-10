/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { filterScientists } from '../utils/filters';
import { CircularFlag } from './CircularFlag';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

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
    return filterScientists({ query }).slice(0, 10);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/80 backdrop-blur-sm text-[#142e20] dark:text-[#f4f1ea]"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-[#fcfbf7] dark:bg-[#0e2217] border border-[#234734]/30 dark:border-[#2d563e]/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="relative border-b border-[#234734]/20 dark:border-[#2d563e]/40 flex items-center px-4 py-3 bg-[#f7f5ed] dark:bg-[#0c1c13]">
          <Search className="w-5 h-5 text-[#8c6b2d] dark:text-[#d4af37] shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar por científico, teoría, bacteria, ADN, física, ciudad, país..."
            className="w-full bg-transparent text-sm text-[#0f2419] dark:text-white placeholder-[#52796f] dark:placeholder-[#8ba898] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#52796f] hover:text-[#0f2419] dark:hover:text-white text-xs mr-2 cursor-pointer"
            >
              Borrar
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-[#52796f] hover:text-[#0f2419] dark:hover:text-white rounded cursor-pointer"
            aria-label="Cerrar diálogo de búsqueda"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Stream */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {!query.trim() ? (
            <div className="p-8 text-center text-xs text-[#52796f] dark:text-[#8ba898] space-y-2">
              <p className="text-[#142e20] dark:text-[#f4f1ea] font-medium text-sm">Búsqueda universal instantánea en los 759 científicos</p>
              <p>Prueba con: «relatividad», «Newton», «Pasteur», «vacuna», «ADN», «CRISPR», «genética», «álgebra»</p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#52796f] dark:text-[#8ba898]">
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
                  className="w-full text-left p-3 rounded-xl hover:bg-[#f2ede0] dark:hover:bg-[#162d20] transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <div className="space-y-0.5 pr-2">
                    <div className="flex items-center gap-2">
                      <CircularFlag country={s.pais} size="sm" />
                      <span className="text-sm font-bold text-[#0f2419] dark:text-white group-hover:text-[#1b3a2b] dark:group-hover:text-[#a3c9b3] transition-colors font-serif">
                        {s.nombre}
                      </span>
                      <span className="text-[10px] font-mono text-[#8c6b2d] dark:text-[#d4af37] font-semibold">
                        {s.aportePeriodo}
                      </span>
                      {s.esPionera && (
                        <span className="px-1.5 py-0.2 rounded bg-[#8c2d4e]/10 border border-[#8c2d4e]/30 text-[#8c2d4e] text-[9px] font-semibold">
                          Pionera
                        </span>
                      )}
                    </div>

                    {/* Subtítulo de aporte */}
                    <div className="text-xs font-medium text-[#2d563e] dark:text-[#a3c9b3] line-clamp-1">
                      {s.subtituloAporte || `${s.nombre} — ${s.campo}; ${s.aporteDescripcion}`}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#52796f] dark:text-[#8ba898]">
                      <span>{s.pais}</span>
                      <span>·</span>
                      <span>{s.continente}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#52796f] group-hover:text-[#1b3a2b] dark:group-hover:text-[#a3c9b3] shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-[#f7f5ed] dark:bg-[#0c1c13] border-t border-[#234734]/15 dark:border-[#2d563e]/40 flex items-center justify-between text-[11px] text-[#52796f] dark:text-[#8ba898] font-mono">
          <span>{results.length} coincidencias encontradas</span>
          <span>Presiona ESC para cerrar</span>
        </div>
      </div>
    </div>
  );
};
