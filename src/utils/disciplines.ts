/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Scientist } from '../types';

export const FLAG_EMOJIS: Record<string, string> = {
  'Alemania': '🇩🇪',
  'Argentina': '🇦🇷',
  'Australia': '🇦🇺',
  'Austria': '🇦🇹',
  'Bélgica': '🇧🇪',
  'Brasil': '🇧🇷',
  'Canadá': '🇨🇦',
  'Chile': '🇨🇱',
  'China': '🇨🇳',
  'Colombia': '🇨🇴',
  'Costa Rica': '🇨🇷',
  'Cuba': '🇨🇺',
  'Dinamarca': '🇩🇰',
  'Egipto': '🇪🇬',
  'España': '🇪🇸',
  'Estados Unidos': '🇺🇸',
  'Etiopía': '🇪🇹',
  'Francia': '🇫🇷',
  'Grecia': '🇬🇷',
  'Hungría': '🇭🇺',
  'India': '🇮🇳',
  'Irak': '🇮🇶',
  'Irán': '🇮🇷',
  'Israel': '🇮🇱',
  'Italia': '🇮🇹',
  'Japón': '🇯🇵',
  'Kenia': '🇰🇪',
  'México': '🇲🇽',
  'Nueva Zelanda': '🇳🇿',
  'Países Bajos': '🇳🇱',
  'Perú': '🇵🇪',
  'Polonia': '🇵🇱',
  'Reino Unido': '🇬🇧',
  'Rusia': '🇷🇺',
  'Serbia': '🇷🇸',
  'Siria': '🇸🇾',
  'Sudáfrica': '🇿🇦',
  'Suecia': '🇸🇪',
  'Suiza': '🇨🇭',
  'Turquía': '🇹🇷',
  'Ucrania': '🇺🇦',
  'Uzbekistán': '🇺🇿',
  'Venezuela': '🇻🇪',
};

export function getCountryFlag(country: string): string {
  return FLAG_EMOJIS[country] || '🌐';
}

/**
 * Normaliza las disciplinas científicas a partir del campo o lista de disciplinas.
 */
export function getDisciplinas(s: Scientist): string[] {
  if (s.disciplinas && s.disciplinas.length > 0) {
    return s.disciplinas;
  }
  const text = (s.campo || '').toLowerCase();
  const res = new Set<string>();

  if (text.includes('físic') || text.includes('cuántic') || text.includes('relativid') || text.includes('termodinám') || text.includes('electromagn') || text.includes('óptica')) res.add('Física');
  if (text.includes('químic') || text.includes('bioquím') || text.includes('cristalograf')) res.add('Química');
  if (text.includes('biolog') || text.includes('genétic') || text.includes('botánic') || text.includes('zoolog') || text.includes('ecolog') || text.includes('evoluc') || text.includes('microbiol') || text.includes('fisiolog') || text.includes('citolog') || text.includes('micolog') || text.includes('entomolog') || text.includes('etolog') || text.includes('inmunol') || text.includes('virolog') || text.includes('embriolog')) res.add('Biología');
  if (text.includes('matemát') || text.includes('álgebr') || text.includes('geometr') || text.includes('cálcul') || text.includes('estadíst') || text.includes('topolog') || text.includes('teoría de números')) res.add('Matemáticas');
  if (text.includes('astronom') || text.includes('astrofís') || text.includes('cosmolog') || text.includes('planetar')) res.add('Astronomía');
  if (text.includes('medicin') || text.includes('cirug') || text.includes('anatom') || text.includes('farmacol') || text.includes('patolog') || text.includes('epidemiol') || text.includes('neurolog') || text.includes('oncolog') || text.includes('cardiolog') || text.includes('pediatr')) res.add('Medicina');
  if (text.includes('informát') || text.includes('computac') || text.includes('algoritm') || text.includes('inteligencia artificial') || text.includes('cibernét')) res.add('Informática');
  if (text.includes('ingenier') || text.includes('tecnolog') || text.includes('aeronáut') || text.includes('electrotec') || text.includes('mecánic') || text.includes('telecomunic')) res.add('Ingeniería');
  if (text.includes('geolog') || text.includes('mineralog') || text.includes('vulcanolog') || text.includes('sismolog') || text.includes('tectónic')) res.add('Geología');
  if (text.includes('geograf') || text.includes('cartograf') || text.includes('climatolog') || text.includes('oceanograf') || text.includes('meteorolog')) res.add('Geografía');
  if (text.includes('neurocienc') || text.includes('neurobiol') || text.includes('neurofisiolog') || text.includes('neuroanatom')) res.add('Neurociencia');
  if (text.includes('paleontol') || text.includes('fósil') || text.includes('paleoantropolog')) res.add('Paleontología');
  if (text.includes('ambiental') || text.includes('conservac') || text.includes('medio ambiente')) res.add('Ciencias ambientales');

  if (res.size === 0) {
    res.add(s.campo.split(/[,/y]/)[0].trim());
  }

  return Array.from(res);
}

/**
 * Estilos discretos, armónicos y legibles basados estrictamente en la paleta verde editorial
 * (verde oscuro, verde bosque, verde salvia, verde oliva y verde pino).
 */
export const DISCIPLINE_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  'Física': { 
    bg: 'bg-[#1b3a2b]/10 dark:bg-[#1b3a2b]/30', 
    text: 'text-[#142e20] dark:text-[#a3c9b3]', 
    border: 'border-[#1b3a2b]/25 dark:border-[#2d563e]' 
  },
  'Química': { 
    bg: 'bg-[#2d563e]/12 dark:bg-[#2d563e]/30', 
    text: 'text-[#1e442f] dark:text-[#b2d8c1]', 
    border: 'border-[#2d563e]/30 dark:border-[#3d7a57]' 
  },
  'Biología': { 
    bg: 'bg-[#234734]/12 dark:bg-[#234734]/35', 
    text: 'text-[#163323] dark:text-[#99d6ad]', 
    border: 'border-[#234734]/25 dark:border-[#2e6345]' 
  },
  'Matemáticas': { 
    bg: 'bg-[#356e4e]/10 dark:bg-[#356e4e]/30', 
    text: 'text-[#234d35] dark:text-[#a0dbb7]', 
    border: 'border-[#356e4e]/25 dark:border-[#428760]' 
  },
  'Astronomía': { 
    bg: 'bg-[#52796f]/12 dark:bg-[#52796f]/30', 
    text: 'text-[#2b4c44] dark:text-[#b4d8cf]', 
    border: 'border-[#52796f]/30 dark:border-[#659387]' 
  },
  'Medicina': { 
    bg: 'bg-[#28523b]/12 dark:bg-[#28523b]/30', 
    text: 'text-[#1c3e2b] dark:text-[#a8e0be]', 
    border: 'border-[#28523b]/25 dark:border-[#356e4e]' 
  },
  'Informática': { 
    bg: 'bg-[#1e3b2b]/12 dark:bg-[#1e3b2b]/30', 
    text: 'text-[#152e20] dark:text-[#a5d4b9]', 
    border: 'border-[#1e3b2b]/25 dark:border-[#2b543d]' 
  },
  'Ingeniería': { 
    bg: 'bg-[#405d43]/12 dark:bg-[#405d43]/30', 
    text: 'text-[#2d4530] dark:text-[#bfd6c2]', 
    border: 'border-[#405d43]/25 dark:border-[#527756]' 
  },
  'Geología': { 
    bg: 'bg-[#4a6b51]/12 dark:bg-[#4a6b51]/30', 
    text: 'text-[#304a35] dark:text-[#c4dfc9]', 
    border: 'border-[#4a6b51]/25 dark:border-[#5f8767]' 
  },
  'Geografía': { 
    bg: 'bg-[#3b634c]/12 dark:bg-[#3b634c]/30', 
    text: 'text-[#264433] dark:text-[#b0d8c0]', 
    border: 'border-[#3b634c]/25 dark:border-[#4c7e61]' 
  },
  'Neurociencia': { 
    bg: 'bg-[#244c35]/12 dark:bg-[#244c35]/30', 
    text: 'text-[#183625] dark:text-[#9ed6b4]', 
    border: 'border-[#244c35]/25 dark:border-[#326949]' 
  },
  'Paleontología': { 
    bg: 'bg-[#556b2f]/10 dark:bg-[#556b2f]/30', 
    text: 'text-[#38491d] dark:text-[#cde0a6]', 
    border: 'border-[#556b2f]/25 dark:border-[#6f8b3c]' 
  },
  'Ciencias ambientales': { 
    bg: 'bg-[#2e7d32]/10 dark:bg-[#2e7d32]/30', 
    text: 'text-[#1b5e20] dark:text-[#a5d6a7]', 
    border: 'border-[#2e7d32]/25 dark:border-[#388e3c]' 
  },
};

export function getDisciplineStyle(discipline: string) {
  return DISCIPLINE_STYLES[discipline] || {
    bg: 'bg-[#1b3a2b]/10 dark:bg-[#1b3a2b]/30',
    text: 'text-[#1b3a2b] dark:text-[#a3c9b3]',
    border: 'border-[#1b3a2b]/20 dark:border-[#2d563e]',
  };
}
