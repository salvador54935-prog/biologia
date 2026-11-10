/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export interface CircularFlagProps {
  country: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showTitle?: boolean;
}

const SIZE_CLASSES = {
  xs: 'w-3.5 h-3.5 min-w-[14px]',
  sm: 'w-4 h-4 min-w-[16px]',
  md: 'w-5 h-5 min-w-[20px]',
  lg: 'w-6 h-6 min-w-[24px]',
  xl: 'w-8 h-8 min-w-[32px]',
};

// SVG paths and colors for official circular flag representations
export const CircularFlag: React.FC<CircularFlagProps> = ({
  country,
  size = 'md',
  className = '',
  showTitle = true,
}) => {
  const norm = country.trim();
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;

  const renderFlagSvg = () => {
    switch (norm) {
      case 'Alemania':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="170.7" fill="#000000" />
            <rect y="170.7" width="512" height="170.7" fill="#DD0000" />
            <rect y="341.3" width="512" height="170.7" fill="#FFCE00" />
          </svg>
        );
      case 'Argentina':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="170.7" fill="#75AADB" />
            <rect y="170.7" width="512" height="170.7" fill="#FFFFFF" />
            <rect y="341.3" width="512" height="170.7" fill="#75AADB" />
            <circle cx="256" cy="256" r="38" fill="#F6B40E" />
          </svg>
        );
      case 'Australia':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="512" fill="#00008B" />
            <path d="M0,0 L200,100 M200,0 L0,100" stroke="#FFFFFF" strokeWidth="20" />
            <path d="M0,0 L200,100 M200,0 L0,100" stroke="#CC0000" strokeWidth="10" />
            <rect width="200" height="20" y="40" fill="#FFFFFF" />
            <rect width="20" height="100" x="90" fill="#FFFFFF" />
            <rect width="200" height="12" y="44" fill="#CC0000" />
            <rect width="12" height="100" x="94" fill="#CC0000" />
            <circle cx="100" cy="350" r="26" fill="#FFFFFF" />
            <circle cx="380" cy="120" r="14" fill="#FFFFFF" />
            <circle cx="430" cy="220" r="14" fill="#FFFFFF" />
            <circle cx="380" cy="380" r="18" fill="#FFFFFF" />
            <circle cx="310" cy="270" r="14" fill="#FFFFFF" />
          </svg>
        );
      case 'Austria':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="170.7" fill="#ED2939" />
            <rect y="170.7" width="512" height="170.7" fill="#FFFFFF" />
            <rect y="341.3" width="512" height="170.7" fill="#ED2939" />
          </svg>
        );
      case 'Bélgica':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="170.7" height="512" fill="#000000" />
            <rect x="170.7" width="170.7" height="512" fill="#FDDA24" />
            <rect x="341.3" width="170.7" height="512" fill="#EF3340" />
          </svg>
        );
      case 'Brasil':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="512" fill="#009C3B" />
            <polygon points="256,70 460,256 256,442 52,256" fill="#FFDF00" />
            <circle cx="256" cy="256" r="105" fill="#002776" />
            <path d="M165,270 Q256,230 347,275" stroke="#FFFFFF" strokeWidth="18" fill="none" />
          </svg>
        );
      case 'Canadá':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="128" height="512" fill="#FF0000" />
            <rect x="128" width="256" height="512" fill="#FFFFFF" />
            <rect x="384" width="128" height="512" fill="#FF0000" />
            <path d="M256,120 L270,210 L330,195 L295,250 L345,280 L290,300 L265,390 L247,390 L222,300 L167,280 L217,250 L182,195 L242,210 Z" fill="#FF0000" />
          </svg>
        );
      case 'Chile':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect y="256" width="512" height="256" fill="#D52B1E" />
            <rect width="512" height="256" fill="#FFFFFF" />
            <rect width="256" height="256" fill="#0039A6" />
            <polygon points="128,70 146,125 204,125 157,159 175,214 128,180 81,214 99,159 52,125 110,125" fill="#FFFFFF" />
          </svg>
        );
      case 'China':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="512" fill="#DE2910" />
            <polygon points="128,75 142,120 188,120 151,147 165,191 128,164 91,191 105,147 68,120 114,120" fill="#FFDE00" />
            <polygon points="220,55 225,70 240,70 228,79 232,94 220,85 208,94 212,79 200,70 215,70" fill="#FFDE00" />
            <polygon points="260,110 265,125 280,125 268,134 272,149 260,140 248,149 252,134 240,125 255,125" fill="#FFDE00" />
            <polygon points="260,185 265,200 280,200 268,209 272,224 260,215 248,224 252,209 240,200 255,200" fill="#FFDE00" />
            <polygon points="220,240 225,255 240,255 228,264 232,279 220,270 208,279 212,264 200,255 215,255" fill="#FFDE00" />
          </svg>
        );
      case 'Colombia':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="256" fill="#FCD116" />
            <rect y="256" width="512" height="128" fill="#003893" />
            <rect y="384" width="512" height="128" fill="#CE1126" />
          </svg>
        );
      case 'Costa Rica':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="85.3" fill="#002B7F" />
            <rect y="85.3" width="512" height="85.3" fill="#FFFFFF" />
            <rect y="170.6" width="512" height="170.8" fill="#CE1126" />
            <rect y="341.4" width="512" height="85.3" fill="#FFFFFF" />
            <rect y="426.7" width="512" height="85.3" fill="#002B7F" />
          </svg>
        );
      case 'Cuba':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="102.4" fill="#002A8F" />
            <rect y="102.4" width="512" height="102.4" fill="#FFFFFF" />
            <rect y="204.8" width="512" height="102.4" fill="#002A8F" />
            <rect y="307.2" width="512" height="102.4" fill="#FFFFFF" />
            <rect y="409.6" width="512" height="102.4" fill="#002A8F" />
            <polygon points="0,0 230,256 0,512" fill="#CF142B" />
            <polygon points="76,200 85,228 114,228 90,245 99,273 76,256 53,273 62,245 38,228 67,228" fill="#FFFFFF" />
          </svg>
        );
      case 'Dinamarca':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="512" fill="#C60C30" />
            <rect x="150" width="70" height="512" fill="#FFFFFF" />
            <rect y="221" width="512" height="70" fill="#FFFFFF" />
          </svg>
        );
      case 'Egipto':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="170.7" fill="#C8102E" />
            <rect y="170.7" width="512" height="170.7" fill="#FFFFFF" />
            <rect y="341.3" width="512" height="170.7" fill="#000000" />
            <circle cx="256" cy="256" r="32" fill="#C59B27" />
          </svg>
        );
      case 'España':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="128" fill="#AA151B" />
            <rect y="128" width="512" height="256" fill="#F1BF00" />
            <rect y="384" width="512" height="128" fill="#AA151B" />
            <circle cx="150" cy="256" r="32" fill="#AA151B" />
          </svg>
        );
      case 'Estados Unidos':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="512" fill="#B22234" />
            <rect y="39.4" width="512" height="39.4" fill="#FFFFFF" />
            <rect y="118.2" width="512" height="39.4" fill="#FFFFFF" />
            <rect y="197" width="512" height="39.4" fill="#FFFFFF" />
            <rect y="275.8" width="512" height="39.4" fill="#FFFFFF" />
            <rect y="354.6" width="512" height="39.4" fill="#FFFFFF" />
            <rect y="433.4" width="512" height="39.4" fill="#FFFFFF" />
            <rect width="230" height="275.8" fill="#3C3B6E" />
            <circle cx="50" cy="50" r="10" fill="#FFFFFF" />
            <circle cx="115" cy="50" r="10" fill="#FFFFFF" />
            <circle cx="180" cy="50" r="10" fill="#FFFFFF" />
            <circle cx="82" cy="100" r="10" fill="#FFFFFF" />
            <circle cx="147" cy="100" r="10" fill="#FFFFFF" />
            <circle cx="50" cy="150" r="10" fill="#FFFFFF" />
            <circle cx="115" cy="150" r="10" fill="#FFFFFF" />
            <circle cx="180" cy="150" r="10" fill="#FFFFFF" />
            <circle cx="82" cy="200" r="10" fill="#FFFFFF" />
            <circle cx="147" cy="200" r="10" fill="#FFFFFF" />
          </svg>
        );
      case 'Etiopía':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="170.7" fill="#078930" />
            <rect y="170.7" width="512" height="170.7" fill="#FCDD09" />
            <rect y="341.3" width="512" height="170.7" fill="#DA121A" />
            <circle cx="256" cy="256" r="65" fill="#0F47AF" />
            <polygon points="256,205 268,242 307,242 275,265 287,302 256,279 225,302 237,265 205,242 244,242" fill="#FCDD09" />
          </svg>
        );
      case 'Francia':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="170.7" height="512" fill="#002654" />
            <rect x="170.7" width="170.7" height="512" fill="#FFFFFF" />
            <rect x="341.3" width="170.7" height="512" fill="#ED2939" />
          </svg>
        );
      case 'Grecia':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="512" fill="#0D5EAF" />
            <rect y="56.9" width="512" height="56.9" fill="#FFFFFF" />
            <rect y="170.7" width="512" height="56.9" fill="#FFFFFF" />
            <rect y="284.5" width="512" height="56.9" fill="#FFFFFF" />
            <rect y="398.3" width="512" height="56.9" fill="#FFFFFF" />
            <rect width="227.6" height="227.6" fill="#0D5EAF" />
            <rect x="85.3" width="56.9" height="227.6" fill="#FFFFFF" />
            <rect y="85.3" width="227.6" height="56.9" fill="#FFFFFF" />
          </svg>
        );
      case 'Hungría':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="170.7" fill="#CE2939" />
            <rect y="170.7" width="512" height="170.7" fill="#FFFFFF" />
            <rect y="341.3" width="512" height="170.7" fill="#477050" />
          </svg>
        );
      case 'India':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="170.7" fill="#FF9933" />
            <rect y="170.7" width="512" height="170.7" fill="#FFFFFF" />
            <rect y="341.3" width="512" height="170.7" fill="#138808" />
            <circle cx="256" cy="256" r="45" fill="none" stroke="#000080" strokeWidth="6" />
            <circle cx="256" cy="256" r="10" fill="#000080" />
          </svg>
        );
      case 'Irak':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="170.7" fill="#CE1126" />
            <rect y="170.7" width="512" height="170.7" fill="#FFFFFF" />
            <rect y="341.3" width="512" height="170.7" fill="#000000" />
            <text x="256" y="272" textAnchor="middle" fill="#007A3D" fontSize="48" fontWeight="bold">الله أكبر</text>
          </svg>
        );
      case 'Irán':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="170.7" fill="#239F40" />
            <rect y="170.7" width="512" height="170.7" fill="#FFFFFF" />
            <rect y="341.3" width="512" height="170.7" fill="#DA0000" />
            <circle cx="256" cy="256" r="28" fill="#DA0000" />
          </svg>
        );
      case 'Israel':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="512" fill="#FFFFFF" />
            <rect y="50" width="512" height="60" fill="#0038B8" />
            <rect y="402" width="512" height="60" fill="#0038B8" />
            <polygon points="256,180 310,274 202,274" fill="none" stroke="#0038B8" strokeWidth="12" />
            <polygon points="256,314 310,220 202,220" fill="none" stroke="#0038B8" strokeWidth="12" />
          </svg>
        );
      case 'Italia':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="170.7" height="512" fill="#009246" />
            <rect x="170.7" width="170.7" height="512" fill="#FFFFFF" />
            <rect x="341.3" width="170.7" height="512" fill="#CE2B37" />
          </svg>
        );
      case 'Japón':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="512" fill="#FFFFFF" />
            <circle cx="256" cy="256" r="145" fill="#BC002D" />
          </svg>
        );
      case 'Kenia':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="150" fill="#000000" />
            <rect y="150" width="512" height="24" fill="#FFFFFF" />
            <rect y="174" width="512" height="164" fill="#BB0000" />
            <rect y="338" width="512" height="24" fill="#FFFFFF" />
            <rect y="362" width="512" height="150" fill="#006600" />
            <ellipse cx="256" cy="256" rx="42" ry="90" fill="#BB0000" stroke="#FFFFFF" strokeWidth="8" />
          </svg>
        );
      case 'México':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="170.7" height="512" fill="#006847" />
            <rect x="170.7" width="170.7" height="512" fill="#FFFFFF" />
            <rect x="341.3" width="170.7" height="512" fill="#CE1126" />
            <circle cx="256" cy="256" r="36" fill="#8B4513" />
          </svg>
        );
      case 'Nueva Zelanda':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="512" fill="#00247D" />
            <path d="M0,0 L180,90 M180,0 L0,90" stroke="#FFFFFF" strokeWidth="18" />
            <path d="M0,0 L180,90 M180,0 L0,90" stroke="#CC0000" strokeWidth="9" />
            <rect width="180" height="18" y="36" fill="#FFFFFF" />
            <rect width="18" height="90" x="81" fill="#FFFFFF" />
            <rect width="180" height="10" y="40" fill="#CC0000" />
            <rect width="10" height="90" x="85" fill="#CC0000" />
            <circle cx="380" cy="130" r="18" fill="#CC0000" stroke="#FFFFFF" strokeWidth="4" />
            <circle cx="430" cy="230" r="18" fill="#CC0000" stroke="#FFFFFF" strokeWidth="4" />
            <circle cx="380" cy="370" r="22" fill="#CC0000" stroke="#FFFFFF" strokeWidth="4" />
            <circle cx="310" cy="260" r="16" fill="#CC0000" stroke="#FFFFFF" strokeWidth="4" />
          </svg>
        );
      case 'Países Bajos':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="170.7" fill="#AE1C28" />
            <rect y="170.7" width="512" height="170.7" fill="#FFFFFF" />
            <rect y="341.3" width="512" height="170.7" fill="#21468B" />
          </svg>
        );
      case 'Perú':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="170.7" height="512" fill="#D91023" />
            <rect x="170.7" width="170.7" height="512" fill="#FFFFFF" />
            <rect x="341.3" width="170.7" height="512" fill="#D91023" />
          </svg>
        );
      case 'Polonia':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="256" fill="#FFFFFF" />
            <rect y="256" width="512" height="256" fill="#DC143C" />
          </svg>
        );
      case 'Reino Unido':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="512" fill="#012169" />
            <path d="M0,0 L512,512 M512,0 L0,512" stroke="#FFFFFF" strokeWidth="60" />
            <path d="M0,0 L512,512" stroke="#C8102E" strokeWidth="24" />
            <path d="M512,0 L0,512" stroke="#C8102E" strokeWidth="24" />
            <rect width="512" height="120" y="196" fill="#FFFFFF" />
            <rect width="120" height="512" x="196" fill="#FFFFFF" />
            <rect width="512" height="72" y="220" fill="#C8102E" />
            <rect width="72" height="512" x="220" fill="#C8102E" />
          </svg>
        );
      case 'Rusia':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="170.7" fill="#FFFFFF" />
            <rect y="170.7" width="512" height="170.7" fill="#0039A6" />
            <rect y="341.3" width="512" height="170.7" fill="#D52B1E" />
          </svg>
        );
      case 'Serbia':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="170.7" fill="#C6363C" />
            <rect y="170.7" width="512" height="170.7" fill="#0C4076" />
            <rect y="341.3" width="512" height="170.7" fill="#FFFFFF" />
          </svg>
        );
      case 'Siria':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="170.7" fill="#CE1126" />
            <rect y="170.7" width="512" height="170.7" fill="#FFFFFF" />
            <rect y="341.3" width="512" height="170.7" fill="#000000" />
            <circle cx="190" cy="256" r="22" fill="#007A3D" />
            <circle cx="322" cy="256" r="22" fill="#007A3D" />
          </svg>
        );
      case 'Sudáfrica':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="256" fill="#E03C31" />
            <rect y="256" width="512" height="256" fill="#001489" />
            <polygon points="0,0 230,256 0,512" fill="#000000" />
            <polygon points="0,0 200,256 0,512" fill="#FFB612" stroke="#FFFFFF" strokeWidth="18" />
            <path d="M0,210 L230,210 L380,60 L512,60 L512,120 L380,120 L240,256 L380,392 L512,392 L512,452 L380,452 L230,302 L0,302 Z" fill="#007749" stroke="#FFFFFF" strokeWidth="12" />
          </svg>
        );
      case 'Suecia':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="512" fill="#006AA7" />
            <rect x="140" width="70" height="512" fill="#FECC00" />
            <rect y="221" width="512" height="70" fill="#FECC00" />
          </svg>
        );
      case 'Suiza':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="512" fill="#D52B1E" />
            <rect x="216" y="126" width="80" height="260" fill="#FFFFFF" />
            <rect x="126" y="216" width="260" height="80" fill="#FFFFFF" />
          </svg>
        );
      case 'Turquía':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="512" fill="#E30A17" />
            <circle cx="210" cy="256" r="105" fill="#FFFFFF" />
            <circle cx="236" cy="256" r="84" fill="#E30A17" />
            <polygon points="340,256 308,266 320,298 296,276 272,298 284,266 252,256 284,246 272,214 296,236 320,214 308,246" fill="#FFFFFF" />
          </svg>
        );
      case 'Ucrania':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="256" fill="#005BBB" />
            <rect y="256" width="512" height="256" fill="#FFD700" />
          </svg>
        );
      case 'Uzbekistán':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="160" fill="#0099B5" />
            <rect y="160" width="512" height="16" fill="#CE1126" />
            <rect y="176" width="512" height="160" fill="#FFFFFF" />
            <rect y="336" width="512" height="16" fill="#CE1126" />
            <rect y="352" width="512" height="160" fill="#1EB53A" />
            <circle cx="90" cy="80" r="35" fill="#FFFFFF" />
            <circle cx="102" cy="80" r="30" fill="#0099B5" />
          </svg>
        );
      case 'Venezuela':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="170.7" fill="#FCE300" />
            <rect y="170.7" width="512" height="170.7" fill="#00247D" />
            <rect y="341.3" width="512" height="170.7" fill="#CF142B" />
            <circle cx="256" cy="256" r="10" fill="#FFFFFF" />
            <circle cx="216" cy="250" r="10" fill="#FFFFFF" />
            <circle cx="296" cy="250" r="10" fill="#FFFFFF" />
            <circle cx="180" cy="235" r="10" fill="#FFFFFF" />
            <circle cx="332" cy="235" r="10" fill="#FFFFFF" />
            <circle cx="236" cy="225" r="10" fill="#FFFFFF" />
            <circle cx="276" cy="225" r="10" fill="#FFFFFF" />
            <circle cx="256" cy="210" r="10" fill="#FFFFFF" />
          </svg>
        );
      default:
        return (
          <div className="w-full h-full bg-[#2d563e] flex items-center justify-center text-white text-[9px] font-bold">
            {norm.slice(0, 2).toUpperCase()}
          </div>
        );
    }
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full overflow-hidden shrink-0 border border-[#1b3a2b]/20 dark:border-[#a3c9b3]/30 shadow-xs aspect-square select-none ${sizeClass} ${className}`}
      title={showTitle ? `País: ${country}` : undefined}
      aria-label={`Bandera de ${country}`}
    >
      {renderFlagSvg()}
    </span>
  );
};
