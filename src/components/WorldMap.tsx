import React, { useState } from 'react';
import { ContinentId } from '../types';
import { CONTINENTS_INFO } from '../data/continents';
import { WORLD_COUNTRIES, MapCountryFeature } from '../data/worldMapData';
import { getStatistics, getScientistsByContinent } from '../utils/filters';
import { Globe, ArrowRight, Award, Compass, Sparkles, MapPin, ZoomIn, Info } from 'lucide-react';

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
  const scientistsInContinent = getScientistsByContinent(activeContinent);
  const representativeScientists = scientistsInContinent
    .filter(s => s.destacado)
    .slice(0, 3);

  // Time span summary for each continent from PDF
  const continentSpans: Record<ContinentId, { first: string; last: string }> = {
    Europa: { first: 'c. 400 a. C.', last: '2012' },
    América: { first: '1881', last: '2012' },
    Asia: { first: 'c. 600 a. C.', last: '2006' },
    África: { first: 'c. 2650 a. C.', last: '2010' },
    Oceanía: { first: '1925', last: '1994' },
  };

  // Continent thematic colors
  const continentFillColor: Record<ContinentId, string> = {
    Europa: '#38bdf8', // Cyan glacial
    América: '#f59e0b', // Ocre dorado (como en la referencia)
    África: '#22c55e', // Verde salvia / esmeralda (como en la referencia)
    Asia: '#a855f7', // Amatista / violeta suave
    Oceanía: '#f43f5e', // Rosa coral elegante
  };

  const getCountryFill = (country: MapCountryFeature) => {
    const isContinentActive = country.continent === activeContinent;
    const isCountryHovered = hoveredCountry?.id === country.id;

    if (isCountryHovered) {
      return '#ffffff';
    }

    if (isContinentActive && country.continent) {
      // Highlighted continent with its distinctive color
      return continentFillColor[country.continent];
    }

    // Default neutral land (minimalist slate-navy)
    return '#223046';
  };

  const getCountryStroke = (country: MapCountryFeature) => {
    if (hoveredCountry?.id === country.id) {
      return '#38bdf8';
    }
    if (country.continent === activeContinent) {
      return 'rgba(255, 255, 255, 0.35)';
    }
    return 'rgba(255, 255, 255, 0.12)';
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
    <div className="w-full bg-[#061122] rounded-2xl border border-slate-800 p-4 sm:p-6 lg:p-8 relative overflow-hidden shadow-2xl">
      {/* Background subtle oceanic ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Map Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            <span>Cartografía Científica Real · Proyección Natural Earth</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
            Distribución Mundial de los 209 Científicos
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Geometría geográfica con límites territoriales exactos y paleta cromática minimalista inspirada en la cartografía histórica.
          </p>
        </div>

        {/* Quick Continent Selector Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800">
          {(['Europa', 'América', 'Asia', 'África', 'Oceanía'] as ContinentId[]).map(cId => {
            const isSelected = activeContinent === cId;
            return (
              <button
                key={cId}
                onClick={() => setHoveredContinent(cId)}
                onMouseEnter={() => setHoveredContinent(cId)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700 ring-1 ring-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
                aria-label={`Seleccionar continente ${cId}`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: continentFillColor[cId] }}
                />
                <span>{cId}</span>
                <span className="font-mono text-[10px] text-slate-400">
                  ({stats.porContinente[cId]})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid: Interactive SVG World Map + Continent Live Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SVG World Map Surface (8 Columns on desktop) */}
        <div className="lg:col-span-8 bg-[#09172e] rounded-xl border border-slate-800/90 p-2 sm:p-4 relative overflow-hidden group">
          {/* Map coordinate badge */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-[10px] font-mono text-slate-400 bg-slate-900/90 px-2.5 py-1 rounded-md border border-slate-800/80 shadow">
            <span>NATURAL EARTH 1</span>
            <span>·</span>
            <span>LÍMITES REALES</span>
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
                {/* Ocean Background Gradient */}
                <radialGradient id="ocean-gradient" cx="50%" cy="50%" r="70%">
                  <stop offset="0%" stopColor="#0c1f3d" />
                  <stop offset="100%" stopColor="#071224" />
                </radialGradient>

                {/* Subtle Graticule Pattern */}
                <pattern id="graticule-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.5" />
                </pattern>
              </defs>

              {/* Ocean surface */}
              <rect width="960" height="500" fill="url(#ocean-gradient)" rx="10" />
              <rect width="960" height="500" fill="url(#graticule-grid)" rx="10" />

              {/* Equator & Parallels */}
              <line x1="20" y1="240" x2="940" y2="240" stroke="rgba(56, 189, 248, 0.12)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="20" y1="165" x2="940" y2="165" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.5" strokeDasharray="2 4" />
              <line x1="20" y1="315" x2="940" y2="315" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.5" strokeDasharray="2 4" />

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
                      strokeWidth={isHovered ? 1.5 : isContinentActive ? 0.7 : 0.4}
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

              {/* Landmark Historical Pins for Key Centers of Biology */}
              {/* Saqqara (Imhotep c. 2650 a.C.) */}
              <g
                className="cursor-pointer group/pin"
                onClick={() => onOpenScientist('imhotep')}
                transform="translate(534, 186)"
              >
                <circle r="6" fill="#22c55e" fillOpacity="0.3" className="animate-ping" />
                <circle r="3.5" fill="#22c55e" stroke="#ffffff" strokeWidth="1" />
              </g>

              {/* Atenas (Aristóteles c. 340 a.C.) */}
              <g
                className="cursor-pointer group/pin"
                onClick={() => onOpenScientist('aristoteles')}
                transform="translate(516, 160)"
              >
                <circle r="3.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1" />
              </g>

              {/* Londres / Down House (Darwin, Harvey, Hooke) */}
              <g
                className="cursor-pointer group/pin"
                onClick={() => onOpenScientist('charles-darwin')}
                transform="translate(460, 114)"
              >
                <circle r="3.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1" />
              </g>

              {/* Córdoba / Madinat al-Zahra (Abulcasis c. 1000) */}
              <g
                className="cursor-pointer group/pin"
                onClick={() => onOpenScientist('abulcasis')}
                transform="translate(452, 164)"
              >
                <circle r="3.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1" />
              </g>

              {/* Kioto (Yamanaka, Honjo) */}
              <g
                className="cursor-pointer group/pin"
                onClick={() => onOpenScientist('shinya-yamanaka')}
                transform="translate(805, 178)"
              >
                <circle r="3.5" fill="#a855f7" stroke="#ffffff" strokeWidth="1" />
              </g>

              {/* Río de Janeiro (Chagas, Cruz) */}
              <g
                className="cursor-pointer group/pin"
                onClick={() => onOpenScientist('carlos-chagas')}
                transform="translate(325, 360)"
              >
                <circle r="3.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1" />
              </g>
            </svg>

            {/* Interactive Tooltip Following Hovered Country */}
            {hoveredCountry && tooltipPos && (
              <div
                className="absolute z-20 pointer-events-none -translate-x-1/2 -translate-y-full mb-3 px-3 py-2 bg-slate-950/95 border border-slate-700 rounded-lg shadow-xl text-left min-w-[140px]"
                style={{
                  left: `${tooltipPos.x}px`,
                  top: `${tooltipPos.y - 10}px`,
                }}
              >
                <div className="flex items-center gap-1.5">
                  {hoveredCountry.continent && (
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: continentFillColor[hoveredCountry.continent] }}
                    />
                  )}
                  <span className="text-xs font-bold text-white whitespace-nowrap">
                    {hoveredCountry.name}
                  </span>
                </div>

                <div className="text-[11px] font-mono mt-0.5 flex items-center justify-between gap-3">
                  <span className="text-slate-400">
                    {hoveredCountry.continent || 'Región'}
                  </span>
                  <span className={`font-semibold ${hoveredCountry.hasRecords ? 'text-cyan-400' : 'text-slate-500'}`}>
                    {hoveredCountry.hasRecords
                      ? `${hoveredCountry.scientistCount} científico${hoveredCountry.scientistCount > 1 ? 's' : ''}`
                      : 'Sin registros en PDF'}
                  </span>
                </div>

                {hoveredCountry.hasRecords && (
                  <div className="text-[10px] text-cyan-300/80 mt-1 pt-1 border-t border-slate-800">
                    Clic para ver científicos del país
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Minimalist Map Legend Strip */}
          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-400 px-2 gap-2">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Paleta:</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#38bdf8]" />
                <span>Europa (100)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#f59e0b]" />
                <span>América (55)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#a855f7]" />
                <span>Asia (30)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#22c55e]" />
                <span>África (13)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#f43f5e]" />
                <span>Oceanía (11)</span>
              </span>
            </div>

            <div className="text-[10px] font-mono text-slate-500">
              {hoveredCountry ? `Seleccionado: ${hoveredCountry.name}` : 'Pasa el cursor sobre un país o continente'}
            </div>
          </div>
        </div>

        {/* Live Continent Inspector Card (4 Columns on desktop) */}
        <div className="lg:col-span-4 bg-[#091428] rounded-xl border border-slate-800 p-5 flex flex-col justify-between h-full shadow-lg">
          <div>
            {/* Continent Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shadow"
                  style={{ backgroundColor: continentFillColor[activeContinent] }}
                />
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {continentData.nombre}
                </h3>
              </div>
              <span className="text-xs font-mono font-semibold text-slate-300">
                {stats.porContinente[activeContinent]} científicos
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              {continentData.descripcion}
            </p>

            {/* Time Span from PDF */}
            <div className="mt-4 p-3 bg-slate-900/80 rounded-lg border border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">Rango de aportes en el PDF:</span>
              <span className="font-mono font-semibold text-amber-300">
                {continentSpans[activeContinent].first} — {continentSpans[activeContinent].last}
              </span>
            </div>

            {/* Representative Scientists Preview */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <Award className="w-3.5 h-3.5" />
                  Científicos Representativos
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {representativeScientists.length} de {stats.porContinente[activeContinent]}
                </span>
              </div>

              <div className="space-y-2">
                {representativeScientists.map(s => (
                  <button
                    key={s.id}
                    onClick={() => onOpenScientist(s.id)}
                    className="w-full text-left p-2.5 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        {s.nombre}
                      </span>
                      <span className="text-[10px] font-mono text-amber-400 font-semibold">
                        {s.aportePeriodo}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span>{s.pais}</span>
                      <span>·</span>
                      <span className="text-slate-300">{s.campo}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                      {s.aporteDescripcion}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Button: Explore Continent */}
          <div className="mt-6 pt-4 border-t border-slate-800">
            <button
              onClick={() => onSelectContinent(activeContinent)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium text-xs rounded-lg shadow-md shadow-cyan-600/20 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
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
