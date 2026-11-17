/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useCallback } from 'react';
import { ContinentId } from '../types';
import { CONTINENTS_INFO } from '../data/continents';
import { WORLD_COUNTRIES, MapCountryFeature } from '../data/worldMapData';
import {
  getStatistics,
  getScientistsByContinent,
  getContinentSpans,
  getCountryGeographicProfile,
} from '../utils/filters';
import { CircularFlag, normalizeCountryName } from './CircularFlag';
import {
  Compass,
  ArrowRight,
  Award,
  Globe2,
  Layers,
} from 'lucide-react';

interface WorldMapProps {
  onSelectContinent: (continente: ContinentId) => void;
  onOpenScientist: (scientistId: string) => void;
  onSelectCountry?: (country: string) => void;
}

type MapMode = 'adscripcion' | 'origen_trabajo';

interface EnrichedCountryFeature extends MapCountryFeature {
  canonicalName: string;
  liveCount: number;
  hasLiveRecords: boolean;
}

const CONTINENT_FILL_COLOR: Record<ContinentId, string> = {
  Europa: '#2d6a4f',
  América: '#d99b26',
  África: '#4d8b55',
  Asia: '#a47148',
  Oceanía: '#b85d43',
};

interface WorldMapCanvasProps {
  countries: EnrichedCountryFeature[];
  mauricioCount: number;
  activeContinent: ContinentId;
  hoveredCountryId: string | null;
  onCountryHover: (e: React.MouseEvent, country: EnrichedCountryFeature) => void;
  onCountryClick: (country: EnrichedCountryFeature) => void;
  onMauricioHover: (e: React.MouseEvent) => void;
  onMauricioClick: () => void;
  onMouseLeave: () => void;
  onOpenScientist: (id: string) => void;
}

const WorldMapCanvas = React.memo<WorldMapCanvasProps>(({
  countries,
  mauricioCount,
  activeContinent,
  hoveredCountryId,
  onCountryHover,
  onCountryClick,
  onMauricioHover,
  onMauricioClick,
  onMouseLeave,
  onOpenScientist,
}) => {
  const getCountryFill = (country: EnrichedCountryFeature) => {
    const isContinentActive = country.continent === activeContinent;
    const isCountryHovered = hoveredCountryId === country.id;

    if (isCountryHovered) {
      return '#fef08a';
    }

    if (country.continent) {
      if (isContinentActive) {
        return country.hasLiveRecords ? CONTINENT_FILL_COLOR[country.continent] : '#1c3a2a';
      }
      return country.hasLiveRecords ? '#1c3626' : '#14251b';
    }

    return '#0e1c14';
  };

  const getCountryStroke = (country: EnrichedCountryFeature) => {
    if (hoveredCountryId === country.id) {
      return '#ffffff';
    }
    if (country.continent === activeContinent) {
      return 'rgba(255, 255, 255, 0.55)';
    }
    return 'rgba(255, 255, 255, 0.2)';
  };

  const isMauricioHovered = hoveredCountryId === 'mauricio';

  return (
    <svg
      viewBox="0 0 960 500"
      className="w-full h-auto select-none"
      role="img"
      aria-label="Mapa mundial con límites geográficos reales de los 5 continentes"
      onMouseLeave={onMouseLeave}
    >
      <defs>
        <radialGradient id="ocean-gradient-green" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#0d2417" />
          <stop offset="100%" stopColor="#05120a" />
        </radialGradient>

        <pattern id="graticule-grid-green" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.5" />
        </pattern>
      </defs>

      <rect width="960" height="500" fill="url(#ocean-gradient-green)" rx="10" />
      <rect width="960" height="500" fill="url(#graticule-grid-green)" rx="10" />

      <line x1="20" y1="240" x2="940" y2="240" stroke="rgba(212, 175, 55, 0.18)" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="20" y1="165" x2="940" y2="165" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.5" strokeDasharray="2 4" />
      <line x1="20" y1="315" x2="940" y2="315" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.5" strokeDasharray="2 4" />

      <g id="world-countries-layer">
        {countries.map(country => {
          const isHovered = hoveredCountryId === country.id;
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
              onMouseMove={e => onCountryHover(e, country)}
              onClick={() => onCountryClick(country)}
              tabIndex={0}
              role="button"
              aria-label={`${country.canonicalName}: ${country.liveCount} científico${country.liveCount === 1 ? '' : 's'}`}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onCountryClick(country);
                }
              }}
            />
          );
        })}
      </g>

      {/* Mauricio (isla del océano Índico al este de Madagascar) */}
      <g
        className="cursor-pointer"
        transform="translate(618, 294)"
        onMouseMove={onMauricioHover}
        onClick={onMauricioClick}
        tabIndex={0}
        role="button"
        aria-label={`Mauricio: ${mauricioCount} científico${mauricioCount === 1 ? '' : 's'}`}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onMauricioClick();
          }
        }}
      >
        <circle
          r={isMauricioHovered ? 7 : 5.5}
          fill={isMauricioHovered ? '#fef08a' : activeContinent === 'África' ? '#4d8b55' : '#2d6a4f'}
          stroke="#ffffff"
          strokeWidth={isMauricioHovered ? 1.5 : 1}
        />
      </g>

      {/* Landmark Historical Pins */}
      <g
        className="cursor-pointer"
        onClick={() => onOpenScientist('imhotep')}
        transform="translate(534, 186)"
      >
        <circle r="3.5" fill="#4d8b55" stroke="#ffffff" strokeWidth="1" />
      </g>
      <g
        className="cursor-pointer"
        onClick={() => onOpenScientist('aristoteles')}
        transform="translate(516, 160)"
      >
        <circle r="3.5" fill="#2d6a4f" stroke="#ffffff" strokeWidth="1" />
      </g>
      <g
        className="cursor-pointer"
        onClick={() => onOpenScientist('isaac-newton')}
        transform="translate(460, 114)"
      >
        <circle r="3.5" fill="#2d6a4f" stroke="#ffffff" strokeWidth="1" />
      </g>
      <g
        className="cursor-pointer"
        onClick={() => onOpenScientist('abulcasis')}
        transform="translate(452, 164)"
      >
        <circle r="3.5" fill="#2d6a4f" stroke="#ffffff" strokeWidth="1" />
      </g>
      <g
        className="cursor-pointer"
        onClick={() => onOpenScientist('shinya-yamanaka')}
        transform="translate(805, 178)"
      >
        <circle r="3.5" fill="#a47148" stroke="#ffffff" strokeWidth="1" />
      </g>
      <g
        className="cursor-pointer"
        onClick={() => onOpenScientist('carlos-chagas')}
        transform="translate(325, 360)"
      >
        <circle r="3.5" fill="#d99b26" stroke="#ffffff" strokeWidth="1" />
      </g>
    </svg>
  );
});
WorldMapCanvas.displayName = 'WorldMapCanvas';

export const WorldMap: React.FC<WorldMapProps> = ({
  onSelectContinent,
  onOpenScientist,
  onSelectCountry,
}) => {
  const [hoveredContinent, setHoveredContinent] = useState<ContinentId | null>('Europa');
  const [hoveredCountry, setHoveredCountry] = useState<EnrichedCountryFeature | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const [mapMode, setMapMode] = useState<MapMode>('adscripcion');

  const stats = getStatistics();
  const continentSpans = useMemo(() => getContinentSpans(), []);
  const activeContinent = hoveredContinent || 'Europa';
  const continentData = CONTINENTS_INFO[activeContinent];

  const allScientistsInContinent = useMemo(
    () => getScientistsByContinent(activeContinent),
    [activeContinent]
  );

  const representativeScientists = useMemo(
    () =>
      allScientistsInContinent
        .filter(s => s.destacado || s.esPionera)
        .slice(0, 3),
    [allScientistsInContinent]
  );

  const enrichedCountries = useMemo<EnrichedCountryFeature[]>(() => {
    return WORLD_COUNTRIES.map(c => {
      const canonicalName = normalizeCountryName(c.name);
      const profile = getCountryGeographicProfile(canonicalName);
      const liveCount =
        mapMode === 'origen_trabajo' ? profile.totalUnique.length : profile.direct.length;
      return {
        ...c,
        canonicalName,
        liveCount,
        hasLiveRecords: liveCount > 0,
      };
    });
  }, [mapMode]);

  const mauricioFeature = useMemo<EnrichedCountryFeature>(() => {
    const profile = getCountryGeographicProfile('Mauricio');
    const liveCount =
      mapMode === 'origen_trabajo' ? profile.totalUnique.length : profile.direct.length;
    return {
      id: 'mauricio',
      name: 'Mauricio',
      canonicalName: 'Mauricio',
      continent: 'África',
      d: '',
      centroid: [618, 294],
      scientistCount: liveCount,
      hasRecords: liveCount > 0,
      liveCount,
      hasLiveRecords: liveCount > 0,
    };
  }, [mapMode]);

  const handleCountryHover = useCallback((e: React.MouseEvent, country: EnrichedCountryFeature) => {
    const rect = e.currentTarget.closest('svg')?.getBoundingClientRect();
    if (rect) {
      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    setHoveredCountry(prev => (prev?.id === country.id && prev.liveCount === country.liveCount ? prev : country));
    if (country.continent) {
      setHoveredContinent(prev => (prev === country.continent ? prev : country.continent));
    }
  }, []);

  const handleMauricioHover = useCallback(
    (e: React.MouseEvent) => {
      handleCountryHover(e, mauricioFeature);
    },
    [handleCountryHover, mauricioFeature]
  );

  const handleCountryClick = useCallback(
    (country: EnrichedCountryFeature) => {
      if (country.hasLiveRecords && onSelectCountry) {
        onSelectCountry(country.canonicalName);
        return;
      }
      if (country.continent) {
        onSelectContinent(country.continent);
      }
    },
    [onSelectCountry, onSelectContinent]
  );

  const handleMauricioClick = useCallback(() => {
    handleCountryClick(mauricioFeature);
  }, [handleCountryClick, mauricioFeature]);

  const handleMouseLeave = useCallback(() => {
    setHoveredCountry(null);
    setTooltipPos(null);
  }, []);

  return (
    <div className="w-full bg-[#0e2217] rounded-2xl border border-[#234734]/40 p-4 sm:p-6 lg:p-8 relative overflow-hidden shadow-2xl text-[#f4f1ea]">
      {/* Top Map Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#a3c9b3] uppercase tracking-wider font-semibold">
            <Compass className="w-4 h-4 text-[#d4af37]" />
            <span>Cartografía Científica Universal • Proyección Natural Earth</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#fcfbf7] tracking-tight mt-1 font-serif">
            Atlas Cartográfico de Científicos y Descubrimientos
          </h2>
          <p className="text-xs sm:text-sm text-[#b4d8c2] mt-0.5">
            Límites territoriales nítidos y paleta naturalista para explorar {stats.totalCientificos} biografías en {stats.totalPaises} naciones.
          </p>
        </div>

        {/* Total Badge */}
        <div className="flex items-center gap-2 bg-[#142e20] px-3 py-1.5 rounded-xl border border-[#2d563e] self-start sm:self-auto text-xs font-mono font-medium text-[#e4efe8]">
          <Globe2 className="h-4 w-4 text-[#d4af37]" />
          <span>{stats.totalCientificos} Científicos en {stats.totalContinentes} Continentes</span>
        </div>
      </div>

      {/* Quick Continent Selector + Map Dimension Toggle */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#142e20]/80 rounded-xl border border-[#234734]/60">
          {(['Europa', 'América', 'Asia', 'África', 'Oceanía'] as ContinentId[]).map(cId => {
            const isSelected = activeContinent === cId;
            const count = stats.porContinente[cId];

            return (
              <button
                key={cId}
                type="button"
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
                  style={{ backgroundColor: CONTINENT_FILL_COLOR[cId] }}
                />
                <span className="font-semibold">{cId}</span>
                <span className="font-mono text-[11px] text-[#c4e0ce]">
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Map Geographic Layer Mode Toggle */}
        <div className="flex items-center gap-1 p-1 bg-[#142e20]/80 rounded-xl border border-[#234734]/60 self-start lg:self-auto">
          <Layers className="w-3.5 h-3.5 text-[#d4af37] ml-2 mr-1 hidden sm:block" />
          <button
            type="button"
            onClick={() => setMapMode('adscripcion')}
            className={`px-2.5 py-1.5 text-[11px] font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              mapMode === 'adscripcion'
                ? 'bg-[#2d563e] text-white font-semibold shadow-xs'
                : 'text-[#a3c9b3] hover:text-white'
            }`}
          >
            Por país de adscripción
          </button>
          <button
            type="button"
            onClick={() => setMapMode('origen_trabajo')}
            className={`px-2.5 py-1.5 text-[11px] font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              mapMode === 'origen_trabajo'
                ? 'bg-[#2d563e] text-white font-semibold shadow-xs'
                : 'text-[#a3c9b3] hover:text-white'
            }`}
          >
            Por nacimiento y centros de trabajo
          </button>
        </div>
      </div>

      {/* Grid: Interactive SVG World Map + Continent Live Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SVG World Map Surface (8 Columns on desktop) */}
        <div className="lg:col-span-8 bg-[#091710] rounded-xl border border-[#234734]/70 p-2 sm:p-4 relative overflow-hidden group">
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-[10px] font-mono text-[#a3c9b3] bg-[#142e20]/90 px-2.5 py-1 rounded-md border border-[#2d563e] shadow-sm">
            <span>NATURAL EARTH 1</span>
            <span>·</span>
            <span>{mapMode === 'adscripcion' ? 'PAÍS PRINCIPAL' : 'NACIMIENTO + CENTROS'}</span>
          </div>

          <div className="relative">
            <WorldMapCanvas
              countries={enrichedCountries}
              mauricioCount={mauricioFeature.liveCount}
              activeContinent={activeContinent}
              hoveredCountryId={hoveredCountry?.id || null}
              onCountryHover={handleCountryHover}
              onCountryClick={handleCountryClick}
              onMauricioHover={handleMauricioHover}
              onMauricioClick={handleMauricioClick}
              onMouseLeave={handleMouseLeave}
              onOpenScientist={onOpenScientist}
            />

            {/* Interactive Tooltip Following Hovered Country */}
            {hoveredCountry && tooltipPos && (
              <div
                className="absolute z-20 pointer-events-none -translate-x-1/2 -translate-y-full mb-3 px-3 py-2 bg-[#0b1c12]/95 border border-[#2d563e] rounded-xl shadow-xl text-left min-w-[180px]"
                style={{
                  left: `${tooltipPos.x}px`,
                  top: `${tooltipPos.y - 10}px`,
                }}
              >
                <div className="flex items-center gap-2">
                  <CircularFlag country={hoveredCountry.canonicalName} size="sm" />
                  <span className="text-xs font-bold text-white whitespace-nowrap">
                    {hoveredCountry.canonicalName}
                  </span>
                </div>

                <div className="text-[11px] font-mono mt-1 flex items-center justify-between gap-3">
                  <span className="text-[#a3c9b3]">
                    {hoveredCountry.continent || 'Territorio'}
                  </span>
                  <span className={`font-semibold ${hoveredCountry.hasLiveRecords ? 'text-[#78c09a]' : 'text-[#8ba898]'}`}>
                    {hoveredCountry.hasLiveRecords
                      ? `${hoveredCountry.liveCount} científico${hoveredCountry.liveCount > 1 ? 's' : ''}`
                      : 'Sin registros'}
                  </span>
                </div>

                {hoveredCountry.hasLiveRecords && (
                  <div className="text-[10px] text-[#b4d8c2] mt-1 pt-1 border-t border-[#234734]/80">
                    Clic para abrir ficha territorial (adscripción, nacimiento y trabajo)
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
              {hoveredCountry ? `Seleccionado: ${hoveredCountry.canonicalName}` : 'Pasa el cursor sobre un país'}
            </div>
          </div>
        </div>

        {/* Live Continent Inspector Card (4 Columns on desktop) */}
        <div className="lg:col-span-4 bg-[#12281b] rounded-xl border border-[#234734] p-5 flex flex-col justify-between h-full shadow-lg">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#234734]/80">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shadow-sm"
                  style={{ backgroundColor: CONTINENT_FILL_COLOR[activeContinent] }}
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

            <div className="mt-4 p-3 bg-[#0c1c13] rounded-lg border border-[#234734] flex items-center justify-between text-xs">
              <span className="text-[#a3c9b3]">Periodo documentado:</span>
              <span className="font-mono font-semibold text-[#d4af37]">
                {continentSpans[activeContinent].first} — {continentSpans[activeContinent].last}
              </span>
            </div>

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
                    type="button"
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
                    <p className="text-[11px] text-[#b4d8c2] line-clamp-1 mt-1 font-medium">
                      {s.subtituloAporte || s.aporteDescripcion}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#234734]">
            <button
              type="button"
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
