import React from 'react';
import { getStatistics } from '../utils/filters';

export const StatsBar: React.FC = () => {
  const stats = getStatistics();

  return (
    <section className="border-y border-slate-800/80 bg-[#091224]/70 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-800/60">
          {/* Stat 1: Total Científicos */}
          <div className="flex flex-col pt-3 md:pt-0">
            <span className="text-xs uppercase tracking-wider font-mono text-slate-400">
              Total Científicos
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-3xl font-mono font-bold text-white tabular-nums">
                {stats.totalCientificos}
              </span>
              <span className="text-xs text-cyan-400 font-mono">registros</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1">
              209 del PDF + 250 ampliación
            </span>
          </div>

          {/* Stat 2: Continentes */}
          <div className="flex flex-col pt-3 md:pt-0 md:pl-6">
            <span className="text-xs uppercase tracking-wider font-mono text-slate-400">
              Continentes
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-3xl font-mono font-bold text-white tabular-nums">
                {stats.totalContinentes}
              </span>
              <span className="text-xs text-emerald-400 font-mono">regiones</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1">
              Europa, América, Asia, África, Oceanía
            </span>
          </div>

          {/* Stat 3: Periodo Histórico */}
          <div className="flex flex-col pt-3 md:pt-0 md:pl-6 col-span-2 md:col-span-1">
            <span className="text-xs uppercase tracking-wider font-mono text-slate-400">
              Periodo Histórico
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-xl sm:text-2xl font-mono font-bold text-amber-300 tabular-nums">
                4.662
              </span>
              <span className="text-xs text-amber-400/80 font-mono">años</span>
            </div>
            <span className="text-[11px] text-slate-300 mt-1 font-mono">
              c. 2650 a. C. — 2012
            </span>
          </div>

          {/* Stat 4: Países Documentados */}
          <div className="flex flex-col pt-3 md:pt-0 md:pl-6">
            <span className="text-xs uppercase tracking-wider font-mono text-slate-400">
              Países Identificados
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-3xl font-mono font-bold text-white tabular-nums">
                {stats.totalPaises}
              </span>
              <span className="text-xs text-cyan-400 font-mono">naciones</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1">
              Origen, nacimiento y labor
            </span>
          </div>

          {/* Stat 5: Campos Científicos */}
          <div className="flex flex-col pt-3 md:pt-0 md:pl-6">
            <span className="text-xs uppercase tracking-wider font-mono text-slate-400">
              Campos Científicos
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-3xl font-mono font-bold text-white tabular-nums">
                {stats.totalCampos}
              </span>
              <span className="text-xs text-indigo-400 font-mono">disciplinas</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1">
              Genética, evolución, histología...
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
