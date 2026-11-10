/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ContinentId } from '../types';
import { CONTINENTS_INFO } from '../data/continents';
import { WORLD_COUNTRIES, MapCountryFeature } from '../data/worldMapData';
import { getStatistics, getScientistsByContinent } from '../utils/filters';
import { CircularFlag } from './CircularFlag';
import {
  Compass,
  ArrowRight,
  Award,
  Sparkles,
  MapPin,
  Globe2,
} from 'lucide-react';

interface WorldMapProps {
  onSelectContinent: (continente: ContinentId) => void;
  onOpenScientist: (scientistId: string) => void;
  onSelectCountry?: (country: string) => void;
}

export const WorldMap: React.FC<WorldMapProps> = ({
  onSelectContinent,
  onOpenScientist,
  onSelectCountry,
}) => {
  const [hoveredContinent, setHoveredContinent] = useState<ContinentId | null>('Europa');
  const [hoveredCountry, setHoveredCountry] = useState<MapCountryFeature | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const stats = getStatistics();
  const activeContinent = hoveredContinent || 'Europa';
  const continentData = CONTINENTS_INFO[activeContinent];
  const allScientistsInContinent = getScientistsByContinent(activeContinent);

  const representativeScientists = allScientistsInContinent
    .filter(s => s.destacado || s.esPionera)
    .slice(0, 3);

  // Time span summary for each continent
  const continentSpans: Record<ContinentId, { first: string; last: string }> = {
    Europa: { first: 'c. 400 a. C.', last: '2024' },
    América: { first: '1752', last: '2024' },
    Asia: { first: 'c. 600 a. C.', last: '2024' },
    África: { first: 'c. 2650 a. C.', last: '2024' },
    Oceanía: { first: '1915', last: '2024' },
  };

  // Naturalist palette inspired by the user reference map:
  // América: warm golden amber / ochre (#d99b26)
  // África: fresh olive / botanical sage green (#4d8b55)
  // Europa: deep forest emerald (#2d6a4f)
  // Asia: mineral bronze / sienna (#a47148)
  // Oceanía: soft terracotta / warm cedar (#b85d43)
  const continentFillColor: Record<ContinentId, string> = {
    Europa: '#2d6a4f',
    América: '#d99b26',
    África: '#4d8b55',
    Asia: '#a47148',
    Oceanía: '#b85d43',
  };

  const getCountryFill = (country: MapCountryFeature) => {
    const isContinentActive = country.continent === activeContinent;
    const isCountryHovered = hoveredCountry?.id === country.id;

    if (isCountryHovered) {
      return '#fef08a'; // Bright gold hover accent
    }

    if (country.continent) {
      if (isContinentActive) {
        return continentFillColor[country.continent];
      }
      // Non-active continent country: soft muted tint
      return country.hasRecords ? '#1c3626' : '#14251b';
    }

    // Default neutral land
    return '#0e1c14';
  };

  const getCountryStroke = (country: MapCountryFeature) => {
    if (hoveredCountry?.id === country.id) {
      return '#ffffff';
    }
    if (country.continent === activeContinent) {
      return 'rgba(255, 255, 255, 0.55)';
    }
    return 'rgba(255, 255, 255, 0.2)';
  };

  const handleCountryMouseMove = (e: React.MouseEvent, country: MapCountryFeature) => {
    const rect = e.currentTarget.closest('svg')?.getBoundingClientRect();
    if (rect) {
      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    setHoveredCountry(country);
    if (country.continent) {
      setHoveredContinent(country.continent);
    }
  };

  return (
    <div className="w-full bg-[#0e2217] rounded-2xl border border-[#234734]/40 p-4 sm:p-6 lg:p-8 relative overflow-hidden shadow-2xl text-[#f4f1ea]">
      {/* Background subtle botanical ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-[#356e4e]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-[#8c6b2d]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Map Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#a3c9b3] uppercase tracking-wider font-semibold">
            <Compass className="w-4 h-4 text-[#d4af37]" />
            <span>Cartografía Científica Universal • Proyección Natural Earth</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#fcfbf7] tracking-tight mt-1 font-serif">
            Atlas Cartográfico de Científicos y Descubrimientos
          </h2>
          <p className="text-xs sm:text-sm text-[#b4d8c2] mt-0.5">
            Límites territoriales nítidos y paleta cromática minimalista de naturalista para explorar {stats.totalCientificos} biografías.
          </p>
        </div>

        {/* Total Badge */}
        <div className="flex items-center gap-2 bg-[#142e20] px-3 py-1.5 rounded-xl border border-[#2d563e] self-start sm:self-auto text-xs font-mono font-medium text-[#e4efe8]">
          <Globe2 className="h-4 w-4 text-[#d4af37]" />
          <span>759 Científicos en 5 Continentes</span>
        </div>
      </div>

      {/* Quick Continent Selector Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-6 p-1.5 bg-[#142e20]/80 rounded-xl border border-[#234734]/60">
        {(['Europa', 'América', 'Asia', 'África', 'Oceanía'] as ContinentId[]).map(cId => {
          const isSelected = activeContinent === cId;
          const count = stats.porContinente[cId];

          return (
            <button
              key={cId}
              onClick={() => setHoveredContinent(cId)}
              onMouseEnter={() => setHoveredContinent(cId)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                isSelected
                  ? 'bg-[#234734] text-white shadow-sm border border-[#356e4e] ring-1 ring-[#356e4e]/50'
                  : 'text-[#a3c9b3] hover:text-white hover:bg-[#1a3827]'
              }`}
              aria-label={`Seleccionar continente ${cId}`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs"
                style={{ backgroundColor: continentFillColor[cId] }}
              />
              <span className="font-semibold">{cId}</span>
              <span className="font-mono text-[11px] text-[#c4e0ce]">
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid: Interactive SVG World Map + Continent Live Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SVG World Map Surface (8 Columns on desktop) */}
        <div className="lg:col-span-8 bg-[#091710] rounded-xl border border-[#234734]/70 p-2 sm:p-4 relative overflow-hidden group">
          {/* Map coordinate badge */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-[10px] font-mono text-[#a3c9b3] bg-[#142e20]/90 px-2.5 py-1 rounded-md border border-[#2d563e] shadow-sm">
            <span>NATURAL EARTH 1</span>
            <span>·</span>
            <span>LÍMITES TERRITORIALES NÍTIDOS</span>
          </div>

          {/* Interactive World SVG */}
          <div className="relative">
            <svg
              viewBox="0 0 960 500"
              className="w-full h-auto select-none"
              role="img"
              aria-label="Mapa mundial con límites geográficos reales de los 5 continentes"
              onMouseLeave={() => {
                setHoveredCountry(null);
                setTooltipPos(null);
              }}
            >
              <defs>
                {/* Ocean Background Gradient - Deep mineral green oceanic */}
                <radialGradient id="ocean-gradient-green" cx="50%" cy="50%" r="70%">
                  <stop offset="0%" stopColor="#0d2417" />
                  <stop offset="100%" stopColor="#05120a" />
                </radialGradient>

                {/* Subtle Graticule Pattern */}
                <pattern id="graticule-grid-green" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.5" />
                </pattern>
              </defs>

              {/* Ocean surface */}
              <rect width="960" height="500" fill="url(#ocean-gradient-green)" rx="10" />
              <rect width="960" height="500" fill="url(#graticule-grid-green)" rx="10" />

              {/* Equator & Parallels */}
              <line x1="20" y1="240" x2="940" y2="240" stroke="rgba(212, 175, 55, 0.18)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="20" y1="165" x2="940" y2="165" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.5" strokeDasharray="2 4" />
              <line x1="20" y1="315" x2="940" y2="315" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.5" strokeDasharray="2 4" />

              {/* All 177 Real Geographic Country Polygons */}
              <g id="world-countries-layer">
                {WORLD_COUNTRIES.map(country => {
                  const isHovered = hoveredCountry?.id === country.id;
                  const isContinentActive = country.continent === activeContinent;

                  return (
                    <path
                      key={country.id}
                      d={country.d}
                      fill={getCountryFill(country)}
                      stroke={getCountryStroke(country)}
                      strokeWidth={isHovered ? 1.6 : isContinentActive ? 0.75 : 0.45}
                      strokeLinejoin="round"
                      className="transition-colors duration-150 cursor-pointer"
                      onMouseMove={e => handleCountryMouseMove(e, country)}
                      onClick={() => {
                        if (country.continent) {
                          onSelectContinent(country.continent);
                        }
                        if (country.hasRecords && onSelectCountry) {
                          onSelectCountry(country.name);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`${country.name}: ${country.scientistCount} científicos`}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          if (country.continent) onSelectContinent(country.continent);
                        }
                      }}
                    />
                  );
                })}
              </g>

              {/* Landmark Historical Pins */}
              {/* Saqqara (Imhotep) */}
              <g
                className="cursor-pointer group/pin"
                onClick={() => onOpenScientist('imhotep')}
                transform="translate(534, 186)"
              >
                <circle r="6" fill="#4d8b55" fillOpacity="0.3" className="animate-ping" />
                <circle r="3.5" fill="#4d8b55" stroke="#ffffff" strokeWidth="1" />
              </g>

              {/* Atenas (Aristóteles) */}
              <g
                className="cursor-pointer group/pin"
                onClick={() => onOpenScientist('aristoteles')}
                transform="translate(516, 160)"
              >
                <circle r="3.5" fill="#2d6a4f" stroke="#ffffff" strokeWidth="1" />
              </g>

              {/* Londres / Down House (Darwin, Newton, Lovelace) */}
              <g
                className="cursor-pointer group/pin"
                onClick={() => onOpenScientist('isaac-newton')}
                transform="translate(460, 114)"
              >
                <circle r="3.5" fill="#2d6a4f" stroke="#ffffff" strokeWidth="1" />
              </g>

              {/* Córdoba (Abulcasis) */}
              <g
                className="cursor-pointer group/pin"
                onClick={() => onOpenScientist('abulcasis')}
                transform="translate(452, 164)"
              >
                <circle r="3.5" fill="#2d6a4f" stroke="#ffffff" strokeWidth="1" />
              </g>

              {/* Kioto (Yamanaka) */}
              <g
                className="cursor-pointer group/pin"
                onClick={() => onOpenScientist('shinya-yamanaka')}
                transform="translate(805, 178)"
              >
                <circle r="3.5" fill="#a47148" stroke="#ffffff" strokeWidth="1" />
              </g>

              {/* Río de Janeiro (Chagas) */}
              <g
                className="cursor-pointer group/pin"
                onClick={() => onOpenScientist('carlos-chagas')}
                transform="translate(325, 360)"
              >
                <circle r="3.5" fill="#d99b26" stroke="#ffffff" strokeWidth="1" />
              </g>
            </svg>

            {/* Interactive Tooltip Following Hovered Country */}
            {hoveredCountry && tooltipPos && (
              <div
                className="absolute z-20 pointer-events-none -translate-x-1/2 -translate-y-full mb-3 px-3 py-2 bg-[#0b1c12]/95 border border-[#2d563e] rounded-xl shadow-xl text-left min-w-[170px]"
                style={{
                  left: `${tooltipPos.x}px`,
                  top: `${tooltipPos.y - 10}px`,
                }}
              >
                <div className="flex items-center gap-2">
                  <CircularFlag country={hoveredCountry.name} size="sm" />
                  <span className="text-xs font-bold text-white whitespace-nowrap">
                    {hoveredCountry.name}
                  </span>
                </div>

                <div className="text-[11px] font-mono mt-1 flex items-center justify-between gap-3">
                  <span className="text-[#a3c9b3]">
                    {hoveredCountry.continent || 'Territorio'}
                  </span>
                  <span className={`font-semibold ${hoveredCountry.hasRecords ? 'text-[#78c09a]' : 'text-slate-400'}`}>
                    {hoveredCountry.hasRecords
                      ? `${hoveredCountry.scientistCount} científico${hoveredCountry.scientistCount > 1 ? 's' : ''}`
                      : 'Sin registros'}
                  </span>
                </div>

                {hoveredCountry.hasRecords && (
                  <div className="text-[10px] text-[#b4d8c2] mt-1 pt-1 border-t border-[#234734]/80">
                    Clic para ver científicos del país
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Minimalist Map Legend Strip */}
          <div className="mt-3 pt-2.5 border-t border-[#234734]/60 flex flex-wrap items-center justify-between text-[11px] text-[#d7e6dc] px-2 gap-2">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-[10px] font-mono text-[#a3c9b3] uppercase">Continentes:</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#2d6a4f]" />
                <span>Europa ({stats.porContinente.Europa})</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#d99b26]" />
                <span>América ({stats.porContinente.América})</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#a47148]" />
                <span>Asia ({stats.porContinente.Asia})</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#4d8b55]" />
                <span>África ({stats.porContinente.África})</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#b85d43]" />
                <span>Oceanía ({stats.porContinente.Oceanía})</span>
              </span>
            </div>

            <div className="text-[10px] font-mono text-[#a3c9b3]">
              {hoveredCountry ? `Seleccionado: ${hoveredCountry.name}` : 'Pasa el cursor sobre un país'}
            </div>
          </div>
        </div>

        {/* Live Continent Inspector Card (4 Columns on desktop) */}
        <div className="lg:col-span-4 bg-[#12281b] rounded-xl border border-[#234734] p-5 flex flex-col justify-between h-full shadow-lg">
          <div>
            {/* Continent Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#234734]/80">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shadow-sm"
                  style={{ backgroundColor: continentFillColor[activeContinent] }}
                />
                <h3 className="text-xl font-bold text-white tracking-tight font-serif">
                  {continentData.nombre}
                </h3>
              </div>
              <span className="text-xs font-mono font-semibold text-[#a3c9b3]">
                {stats.porContinente[activeContinent]} científicos
              </span>
            </div>

            <p className="text-xs text-[#d7e6dc] mt-3 leading-relaxed">
              {continentData.descripcion}
            </p>

            {/* Time Span */}
            <div className="mt-4 p-3 bg-[#0c1c13] rounded-lg border border-[#234734] flex items-center justify-between text-xs">
              <span className="text-[#a3c9b3]">Periodo documentado:</span>
              <span className="font-mono font-semibold text-[#d4af37]">
                {continentSpans[activeContinent].first} — {continentSpans[activeContinent].last}
              </span>
            </div>

            {/* Representative Scientists Preview */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs font-semibold text-[#fcfbf7] mb-2">
                <span className="flex items-center gap-1.5 text-[#a3c9b3]">
                  <Award className="w-3.5 h-3.5 text-[#d4af37]" />
                  Científicos Destacados
                </span>
                <span className="text-[10px] text-[#78c09a] font-mono">
                  {representativeScientists.length} de {stats.porContinente[activeContinent]}
                </span>
              </div>

              <div className="space-y-2">
                {representativeScientists.map(s => (
                  <button
                    key={s.id}
                    onClick={() => onOpenScientist(s.id)}
                    className="w-full text-left p-2.5 rounded-lg bg-[#0e2217] hover:bg-[#163323] border border-[#234734]/80 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-center gap-1.5">
                        <CircularFlag country={s.pais} size="sm" />
                        <span className="text-xs font-semibold text-white group-hover:text-[#a3c9b3] transition-colors">
                          {s.nombre}
                        </span>
                        {s.esPionera && (
                          <span className="px-1.5 py-0.2 text-[9px] font-mono bg-[#8c2d4e]/30 text-[#f4a7be] border border-[#8c2d4e]/60 rounded">
                            Pionera
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-[#d4af37] font-semibold">
                        {s.aportePeriodo}
                      </span>
                    </div>
                    {/* Subtítulo de aporte */}
                    <p className="text-[11px] text-[#b4d8c2] line-clamp-1 mt-1 font-medium">
                      {s.subtituloAporte || s.aporteDescripcion}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Button: Explore Continent */}
          <div className="mt-6 pt-4 border-t border-[#234734]">
            <button
              onClick={() => onSelectContinent(activeContinent)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#234734] hover:bg-[#2d563e] text-white font-medium text-xs rounded-lg shadow-sm border border-[#356e4e] transition-all cursor-pointer"
            >
              <span>Explorar {continentData.nombre} en detalle</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
