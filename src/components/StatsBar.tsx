/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { getStatistics } from '../utils/filters';

export const StatsBar: React.FC = () => {
  const stats = getStatistics();

  return (
    <section className="border-y border-[#1b3a2b]/15 bg-[#f5f1e6] dark:bg-[#102419] py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#1b3a2b]/15 dark:divide-[#234734]/50">
          {/* Stat 1: Total Científicos */}
          <div className="flex flex-col pt-3 md:pt-0">
            <span className="text-xs uppercase tracking-wider font-mono text-[#5c6e62] dark:text-[#a3c9b3] font-semibold">
              Total Científicos
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-3xl font-mono font-bold text-[#14231b] dark:text-[#f4f1ea] tabular-nums">
                {stats.totalCientificos}
              </span>
              <span className="text-xs text-[#1b3a2b] dark:text-[#78c09a] font-mono font-semibold">biografías</span>
            </div>
            <span className="text-[11px] text-[#5c6e62] dark:text-[#9bb7a5] mt-1">
              209 PDF + 250 ampl. + 300 multidisc.
            </span>
          </div>

          {/* Stat 2: Continentes */}
          <div className="flex flex-col pt-3 md:pt-0 md:pl-6">
            <span className="text-xs uppercase tracking-wider font-mono text-[#5c6e62] dark:text-[#a3c9b3] font-semibold">
              Continentes
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-3xl font-mono font-bold text-[#14231b] dark:text-[#f4f1ea] tabular-nums">
                {stats.totalContinentes}
              </span>
              <span className="text-xs text-[#2d6148] dark:text-[#78c09a] font-mono font-semibold">regiones</span>
            </div>
            <span className="text-[11px] text-[#5c6e62] dark:text-[#9bb7a5] mt-1">
              Europa, América, Asia, África, Oceanía
            </span>
          </div>

          {/* Stat 3: Periodo Histórico */}
          <div className="flex flex-col pt-3 md:pt-0 md:pl-6 col-span-2 md:col-span-1">
            <span className="text-xs uppercase tracking-wider font-mono text-[#5c6e62] dark:text-[#a3c9b3] font-semibold">
              Periodo Histórico
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-xl sm:text-2xl font-mono font-bold text-[#8c6b2d] dark:text-[#d4af37] tabular-nums">
                4.670+
              </span>
              <span className="text-xs text-[#8c6b2d]/80 dark:text-[#d4af37]/80 font-mono font-semibold">años</span>
            </div>
            <span className="text-[11px] text-[#5c6e62] dark:text-[#9bb7a5] mt-1 font-mono">
              c. 2650 a. C. — Presente
            </span>
          </div>

          {/* Stat 4: Países Documentados */}
          <div className="flex flex-col pt-3 md:pt-0 md:pl-6">
            <span className="text-xs uppercase tracking-wider font-mono text-[#5c6e62] dark:text-[#a3c9b3] font-semibold">
              Países Identificados
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-3xl font-mono font-bold text-[#14231b] dark:text-[#f4f1ea] tabular-nums">
                {stats.totalPaises}
              </span>
              <span className="text-xs text-[#1b3a2b] dark:text-[#78c09a] font-mono font-semibold">naciones</span>
            </div>
            <span className="text-[11px] text-[#5c6e62] dark:text-[#9bb7a5] mt-1">
              Cartografía global completa
            </span>
          </div>

          {/* Stat 5: Campos Científicos */}
          <div className="flex flex-col pt-3 md:pt-0 md:pl-6">
            <span className="text-xs uppercase tracking-wider font-mono text-[#5c6e62] dark:text-[#a3c9b3] font-semibold">
              Ramas del Saber
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-3xl font-mono font-bold text-[#14231b] dark:text-[#f4f1ea] tabular-nums">
                14+
              </span>
              <span className="text-xs text-[#8c5028] dark:text-[#f4caa8] font-mono font-semibold">disciplinas</span>
            </div>
            <span className="text-[11px] text-[#5c6e62] dark:text-[#9bb7a5] mt-1">
              Física, Biología, Química, Computación...
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
