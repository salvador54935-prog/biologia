/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export interface CircularFlagProps {
  country: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  showTitle?: boolean;
}

const SIZE_CLASSES = {
  xs: 'w-3.5 h-3.5 min-w-[14px]',
  sm: 'w-4 h-4 min-w-[16px]',
  md: 'w-5 h-5 min-w-[20px]',
  lg: 'w-6 h-6 min-w-[24px]',
  xl: 'w-8 h-8 min-w-[32px]',
  '2xl': 'w-12 h-12 min-w-[48px]',
};

// Normalize country string to handle accents, whitespace, and regional aliases
export function normalizeCountryName(country: string): string {
  const trimmed = country.trim();
  switch (trimmed) {
    case 'Malí':
      return 'Mali';
    case 'República Checa':
      return 'Chequia';
    case 'Gran Bretaña':
    case 'Inglaterra':
    case 'Escocia':
    case 'Gales':
      return 'Reino Unido';
    case 'EE. UU.':
    case 'EEUU':
    case 'USA':
    case 'Estados Unidos de América':
      return 'Estados Unidos';
    case 'Unión Soviética':
    case 'URSS':
      return 'Rusia';
    case 'Holanda':
      return 'Países Bajos';
    case 'Corea':
      return 'Corea del Sur';
    case 'Perú':
    case 'Peru':
      return 'Perú';
    case 'México':
    case 'Mexico':
      return 'México';
    case 'Bélgica':
    case 'Belgica':
      return 'Bélgica';
    case 'Hungría':
    case 'Hungria':
      return 'Hungría';
    case 'Irán':
    case 'Iran':
      return 'Irán';
    case 'Japón':
    case 'Japon':
      return 'Japón';
    case 'Túnez':
    case 'Tunez':
      return 'Túnez';
    case 'Sudáfrica':
    case 'Sudafrica':
      return 'Sudáfrica';
    case 'Turquía':
    case 'Turquia':
      return 'Turquía';
    case 'Etiopía':
    case 'Etiopia':
      return 'Etiopía';
    case 'Rumanía':
    case 'Rumania':
      return 'Rumanía';
    case 'Camerún':
    case 'Camerun':
      return 'Camerún';
    case 'Pakistán':
    case 'Pakistan':
      return 'Pakistán';
    case 'Taiwán':
    case 'Taiwan':
      return 'Taiwán';
    case 'Uzbekistán':
    case 'Uzbekistan':
      return 'Uzbekistán';
    default:
      return trimmed;
  }
}

// SVG paths and colors for official circular flag representations covering 100% of countries
export const CircularFlag: React.FC<CircularFlagProps> = ({
  country,
  size = 'md',
  className = '',
  showTitle = true,
}) => {
  const norm = normalizeCountryName(country);
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
            <circle cx="256" cy="256" r="42" fill="none" stroke="#F6B40E" strokeWidth="4" />
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

      case 'Bolivia':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="170.7" fill="#D52B1E" />
            <rect y="170.7" width="512" height="170.7" fill="#FCD116" />
            <rect y="341.3" width="512" height="170.7" fill="#007934" />
            <ellipse cx="256" cy="256" rx="42" ry="32" fill="#007934" stroke="#D52B1E" strokeWidth="4" />
            <circle cx="256" cy="250" r="16" fill="#FCD116" />
            <polygon points="256,236 270,264 242,264" fill="#8B4513" />
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

      case 'Burkina Faso':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="256" fill="#EF3340" />
            <rect y="256" width="512" height="256" fill="#009739" />
            <polygon points="256,180 278,248 350,248 292,290 314,358 256,316 198,358 220,290 162,248 234,248" fill="#FCD116" />
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

      case 'Camerún':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="170.7" height="512" fill="#007A5E" />
            <rect x="170.7" width="170.7" height="512" fill="#CE1126" />
            <rect x="341.3" width="170.7" height="512" fill="#FCD116" />
            <polygon points="256,206 270,248 314,248 278,274 292,316 256,290 220,316 234,274 198,248 242,248" fill="#FCD116" />
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

      case 'Chad':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="170.7" height="512" fill="#002664" />
            <rect x="170.7" width="170.7" height="512" fill="#FECB00" />
            <rect x="341.3" width="170.7" height="512" fill="#C60C30" />
          </svg>
        );

      case 'Chequia':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="256" fill="#FFFFFF" />
            <rect y="256" width="512" height="256" fill="#D7141A" />
            <polygon points="0,0 256,256 0,512" fill="#11457E" />
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

      case 'Corea del Sur':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="512" fill="#FFFFFF" />
            <g transform="rotate(-30 256 256)">
              <path d="M156,256 A100,100 0 0,0 356,256 A50,50 0 0,0 256,256 A50,50 0 0,1 156,256" fill="#CD2E3A" />
              <path d="M156,256 A100,100 0 0,1 356,256 A50,50 0 0,1 256,256 A50,50 0 0,0 156,256" fill="#0047A0" />
            </g>
            <g transform="translate(105, 105) rotate(45)">
              <rect x="-35" y="-18" width="70" height="8" fill="#000000" />
              <rect x="-35" y="-4" width="70" height="8" fill="#000000" />
              <rect x="-35" y="10" width="70" height="8" fill="#000000" />
            </g>
            <g transform="translate(407, 407) rotate(45)">
              <rect x="-35" y="-18" width="30" height="8" fill="#000000" />
              <rect x="5" y="-18" width="30" height="8" fill="#000000" />
              <rect x="-35" y="-4" width="30" height="8" fill="#000000" />
              <rect x="5" y="-4" width="30" height="8" fill="#000000" />
              <rect x="-35" y="10" width="30" height="8" fill="#000000" />
              <rect x="5" y="10" width="30" height="8" fill="#000000" />
            </g>
            <g transform="translate(407, 105) rotate(-45)">
              <rect x="-35" y="-18" width="30" height="8" fill="#000000" />
              <rect x="5" y="-18" width="30" height="8" fill="#000000" />
              <rect x="-35" y="-4" width="70" height="8" fill="#000000" />
              <rect x="-35" y="10" width="30" height="8" fill="#000000" />
              <rect x="5" y="10" width="30" height="8" fill="#000000" />
            </g>
            <g transform="translate(105, 407) rotate(-45)">
              <rect x="-35" y="-18" width="70" height="8" fill="#000000" />
              <rect x="-35" y="-4" width="30" height="8" fill="#000000" />
              <rect x="5" y="-4" width="30" height="8" fill="#000000" />
              <rect x="-35" y="10" width="70" height="8" fill="#000000" />
            </g>
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

      case 'Croacia':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="170.7" fill="#FF0000" />
            <rect y="170.7" width="512" height="170.7" fill="#FFFFFF" />
            <rect y="341.3" width="512" height="170.7" fill="#0000FF" />
            <g transform="translate(206, 175)">
              <rect width="100" height="110" rx="8" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />
              <rect x="0" y="0" width="20" height="22" fill="#FF0000" />
              <rect x="40" y="0" width="20" height="22" fill="#FF0000" />
              <rect x="80" y="0" width="20" height="22" fill="#FF0000" />
              <rect x="20" y="22" width="20" height="22" fill="#FF0000" />
              <rect x="60" y="22" width="20" height="22" fill="#FF0000" />
              <rect x="0" y="44" width="20" height="22" fill="#FF0000" />
              <rect x="40" y="44" width="20" height="22" fill="#FF0000" />
              <rect x="80" y="44" width="20" height="22" fill="#FF0000" />
              <rect x="20" y="66" width="20" height="22" fill="#FF0000" />
              <rect x="60" y="66" width="20" height="22" fill="#FF0000" />
              <rect x="0" y="88" width="20" height="22" fill="#FF0000" />
              <rect x="40" y="88" width="20" height="22" fill="#FF0000" />
              <rect x="80" y="88" width="20" height="22" fill="#FF0000" />
            </g>
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

      case 'Ecuador':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="256" fill="#FFDD00" />
            <rect y="256" width="512" height="128" fill="#034EA2" />
            <rect y="384" width="512" height="128" fill="#ED1C24" />
            <ellipse cx="256" cy="256" rx="42" ry="50" fill="#034EA2" stroke="#FFDD00" strokeWidth="4" />
            <path d="M220,270 Q256,240 292,270 L280,290 L232,290 Z" fill="#009A44" />
            <circle cx="256" cy="235" r="14" fill="#FFDD00" />
            <path d="M226,206 Q256,190 286,206 L276,218 Q256,210 236,218 Z" fill="#5C4033" />
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

      case 'Estonia':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="170.7" fill="#0072CE" />
            <rect y="170.7" width="512" height="170.7" fill="#000000" />
            <rect y="341.3" width="512" height="170.7" fill="#FFFFFF" />
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

      case 'Filipinas':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="256" fill="#0038A8" />
            <rect y="256" width="512" height="256" fill="#CE1126" />
            <polygon points="0,0 256,256 0,512" fill="#FFFFFF" />
            <circle cx="90" cy="256" r="32" fill="#FCD116" />
            <polygon points="36,60 41,74 55,74 44,83 48,97 36,88 24,97 28,83 17,74 31,74" fill="#FCD116" />
            <polygon points="36,415 41,429 55,429 44,438 48,452 36,443 24,452 28,438 17,429 31,429" fill="#FCD116" />
            <polygon points="190,242 195,256 209,256 198,265 202,279 190,270 178,279 182,265 171,256 185,256" fill="#FCD116" />
          </svg>
        );

      case 'Finlandia':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="512" fill="#FFFFFF" />
            <rect x="140" width="75" height="512" fill="#002F6C" />
            <rect y="218" width="512" height="75" fill="#002F6C" />
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

      case 'Honduras':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="170.7" fill="#0073CF" />
            <rect y="170.7" width="512" height="170.7" fill="#FFFFFF" />
            <rect y="341.3" width="512" height="170.7" fill="#0073CF" />
            <circle cx="210" cy="225" r="9" fill="#0073CF" />
            <circle cx="302" cy="225" r="9" fill="#0073CF" />
            <circle cx="256" cy="256" r="9" fill="#0073CF" />
            <circle cx="210" cy="287" r="9" fill="#0073CF" />
            <circle cx="302" cy="287" r="9" fill="#0073CF" />
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

      case 'Irlanda':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="170.7" height="512" fill="#169B62" />
            <rect x="170.7" width="170.7" height="512" fill="#FFFFFF" />
            <rect x="341.3" width="170.7" height="512" fill="#FF883E" />
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

      case 'Libia':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="128" fill="#E70013" />
            <rect y="128" width="512" height="256" fill="#000000" />
            <rect y="384" width="512" height="128" fill="#239E46" />
            <circle cx="250" cy="256" r="50" fill="#FFFFFF" />
            <circle cx="264" cy="256" r="42" fill="#000000" />
            <polygon points="280,240 286,252 299,252 288,260 292,272 280,264 268,272 272,260 261,252 274,252" fill="#FFFFFF" />
          </svg>
        );

      case 'Luxemburgo':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="170.7" fill="#EA141D" />
            <rect y="170.7" width="512" height="170.7" fill="#FFFFFF" />
            <rect y="341.3" width="512" height="170.7" fill="#00A1DE" />
          </svg>
        );

      case 'Mali':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="170.7" height="512" fill="#14B53A" />
            <rect x="170.7" width="170.7" height="512" fill="#FCD116" />
            <rect x="341.3" width="170.7" height="512" fill="#CE1126" />
          </svg>
        );

      case 'Marruecos':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="512" fill="#C1272D" />
            <polygon
              points="256,156 280,226 354,226 294,268 318,338 256,296 194,338 218,268 158,226 232,226"
              fill="none"
              stroke="#006233"
              strokeWidth="18"
              strokeLinejoin="miter"
            />
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

      case 'Nigeria':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="170.7" height="512" fill="#008751" />
            <rect x="170.7" width="170.7" height="512" fill="#FFFFFF" />
            <rect x="341.3" width="170.7" height="512" fill="#008751" />
          </svg>
        );

      case 'Noruega':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="512" fill="#BA0C2F" />
            <rect x="130" width="100" height="512" fill="#FFFFFF" />
            <rect y="206" width="512" height="100" fill="#FFFFFF" />
            <rect x="155" width="50" height="512" fill="#00205B" />
            <rect y="231" width="512" height="50" fill="#00205B" />
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

      case 'Pakistán':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="128" height="512" fill="#FFFFFF" />
            <rect x="128" width="384" height="512" fill="#01411C" />
            <circle cx="320" cy="256" r="80" fill="#FFFFFF" />
            <circle cx="344" cy="236" r="70" fill="#01411C" />
            <polygon points="350,190 357,208 376,204 363,218 372,234 355,226 342,238 344,220 329,210 347,204" fill="#FFFFFF" />
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

      case 'Rumanía':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="170.7" height="512" fill="#002B7F" />
            <rect x="170.7" width="170.7" height="512" fill="#FCD116" />
            <rect x="341.3" width="170.7" height="512" fill="#CE1126" />
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

      case 'Senegal':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="170.7" height="512" fill="#00853F" />
            <rect x="170.7" width="170.7" height="512" fill="#FDEF42" />
            <rect x="341.3" width="170.7" height="512" fill="#E31B23" />
            <polygon points="256,206 270,248 314,248 278,274 292,316 256,290 220,316 234,274 198,248 242,248" fill="#00853F" />
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

      case 'Taiwán':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="512" fill="#FE0000" />
            <rect width="256" height="256" fill="#000095" />
            <circle cx="128" cy="128" r="42" fill="#FFFFFF" />
            <circle cx="128" cy="128" r="32" fill="#000095" />
            <circle cx="128" cy="128" r="26" fill="#FFFFFF" />
            <path d="M128,66 L134,92 L128,84 L122,92 Z M128,190 L134,164 L128,172 L122,164 Z M66,128 L92,134 L84,128 L92,122 Z M190,128 L164,134 L172,128 L164,122 Z M84,84 L106,100 L100,94 L94,100 Z M172,172 L150,156 L156,162 L162,156 Z M172,84 L156,106 L162,100 L156,94 Z M84,172 L100,150 L94,156 L100,162 Z" fill="#FFFFFF" />
          </svg>
        );

      case 'Tanzania':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <polygon points="0,0 512,0 0,512" fill="#1EB53A" />
            <polygon points="512,0 512,512 0,512" fill="#00A3DD" />
            <polygon points="0,512 0,420 420,0 512,0 512,92 92,512" fill="#FCD116" />
            <polygon points="0,480 0,450 450,0 480,0 512,32 64,512" fill="#000000" />
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

      case 'Túnez':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="512" fill="#E70013" />
            <circle cx="256" cy="256" r="95" fill="#FFFFFF" />
            <circle cx="256" cy="256" r="60" fill="#E70013" />
            <circle cx="274" cy="256" r="48" fill="#FFFFFF" />
            <polygon points="274,232 280,248 296,248 283,257 288,273 274,263 260,273 265,257 252,248 268,248" fill="#E70013" />
          </svg>
        );

      case 'Ucrania':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="256" fill="#005BBB" />
            <rect y="256" width="512" height="256" fill="#FFD700" />
          </svg>
        );

      case 'Uganda':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="85.3" fill="#000000" />
            <rect y="85.3" width="512" height="85.3" fill="#FCD116" />
            <rect y="170.6" width="512" height="85.3" fill="#D90000" />
            <rect y="255.9" width="512" height="85.3" fill="#000000" />
            <rect y="341.2" width="512" height="85.3" fill="#FCD116" />
            <rect y="426.5" width="512" height="85.5" fill="#D90000" />
            <circle cx="256" cy="256" r="70" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />
            <circle cx="256" cy="250" r="16" fill="#D90000" />
            <polygon points="256,225 264,242 248,242" fill="#000000" />
            <line x1="256" y1="266" x2="256" y2="300" stroke="#000000" strokeWidth="5" />
          </svg>
        );

      case 'Uruguay':
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full">
            <rect width="512" height="512" fill="#FFFFFF" />
            <rect y="56.9" width="512" height="56.9" fill="#0038A8" />
            <rect y="170.7" width="512" height="56.9" fill="#0038A8" />
            <rect y="284.5" width="512" height="56.9" fill="#0038A8" />
            <rect y="398.3" width="512" height="56.9" fill="#0038A8" />
            <rect width="227.6" height="227.6" fill="#FFFFFF" />
            <circle cx="113.8" cy="113.8" r="40" fill="#FCD116" stroke="#9A6B00" strokeWidth="2" />
            <circle cx="102" cy="108" r="4" fill="#9A6B00" />
            <circle cx="125" cy="108" r="4" fill="#9A6B00" />
            <path d="M102,126 Q113.8,136 125,126" stroke="#9A6B00" strokeWidth="3" fill="none" />
            <line x1="113.8" y1="56" x2="113.8" y2="70" stroke="#FCD116" strokeWidth="6" />
            <line x1="113.8" y1="158" x2="113.8" y2="172" stroke="#FCD116" strokeWidth="6" />
            <line x1="56" y1="113.8" x2="70" y2="113.8" stroke="#FCD116" strokeWidth="6" />
            <line x1="158" y1="113.8" x2="172" y2="113.8" stroke="#FCD116" strokeWidth="6" />
            <line x1="73" y1="73" x2="83" y2="83" stroke="#FCD116" strokeWidth="5" />
            <line x1="154" y1="154" x2="144" y2="144" stroke="#FCD116" strokeWidth="5" />
            <line x1="154" y1="73" x2="144" y2="83" stroke="#FCD116" strokeWidth="5" />
            <line x1="73" y1="154" x2="83" y2="144" stroke="#FCD116" strokeWidth="5" />
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
        // Elegant heraldic insignia fallback if an unknown region is ever passed
        return (
          <svg viewBox="0 0 512 512" className="w-full h-full bg-[#1b3a2b]">
            <circle cx="256" cy="256" r="230" fill="none" stroke="#a3c9b3" strokeWidth="24" />
            <circle cx="256" cy="256" r="180" fill="#234734" />
            <text
              x="256"
              y="285"
              textAnchor="middle"
              fill="#fcfbf7"
              fontSize="120"
              fontWeight="bold"
              fontFamily="sans-serif"
            >
              {norm.slice(0, 2).toUpperCase()}
            </text>
          </svg>
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
