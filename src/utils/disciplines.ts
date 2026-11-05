import { Scientist } from '../types';

export const FLAG_EMOJIS: Record<string, string> = {
  'Alemania': '🇩🇪',
  'Argentina': '🇦🇷',
  'Armenia': '🇦🇲',
  'Australia': '🇦🇺',
  'Austria': '🇦🇹',
  'Bélgica': '🇧🇪',
  'Brasil': '🇧🇷',
  'Bulgaria': '🇧🇬',
  'Canadá': '🇨🇦',
  'Chile': '🇨🇱',
  'China': '🇨🇳',
  'Colombia': '🇨🇴',
  'Corea del Sur': '🇰🇷',
  'Costa Rica': '🇨🇷',
  'Croacia': '🇭🇷',
  'Cuba': '🇨🇺',
  'Dinamarca': '🇩🇰',
  'Ecuador': '🇪🇨',
  'Egipto': '🇪🇬',
  'España': '🇪🇸',
  'Estados Unidos': '🇺🇸',
  'Etiopía': '🇪🇹',
  'Filipinas': '🇵🇭',
  'Finlandia': '🇫🇮',
  'Francia': '🇫🇷',
  'Georgia': '🇬🇪',
  'Ghana': '🇬🇭',
  'Grecia': '🇬🇷',
  'Guatemala': '🇬🇹',
  'Hungría': '🇭🇺',
  'India': '🇮🇳',
  'Indonesia': '🇮🇩',
  'Irán': '🇮🇷',
  'Irak': '🇮🇶',
  'Irlanda': '🇮🇪',
  'Islandia': '🇮🇸',
  'Israel': '🇮🇱',
  'Italia': '🇮🇹',
  'Japón': '🇯🇵',
  'Kenia': '🇰🇪',
  'Marruecos': '🇲🇦',
  'México': '🇲🇽',
  'Nigeria': '🇳🇬',
  'Noruega': '🇳🇴',
  'Nueva Zelanda': '🇳🇿',
  'Países Bajos': '🇳🇱',
  'Pakistán': '🇵🇰',
  'Palestina': '🇵🇸',
  'Panamá': '🇵🇦',
  'Perú': '🇵🇪',
  'Polonia': '🇵🇱',
  'Portugal': '🇵🇹',
  'Reino Unido': '🇬🇧',
  'República Checa': '🇨🇿',
  'Rumanía': '🇷🇴',
  'Rusia': '🇷🇺',
  'Senegal': '🇸🇳',
  'Serbia': '🇷🇸',
  'Singapur': '🇸🇬',
  'Sudáfrica': '🇿🇦',
  'Suecia': '🇸🇪',
  'Suiza': '🇨🇭',
  'Tailandia': '🇹🇭',
  'Túnez': '🇹🇳',
  'Turquía': '🇹🇷',
  'Ucrania': '🇺🇦',
  'Uganda': '🇺🇬',
  'Uruguay': '🇺🇾',
  'Uzbekistán': '🇺🇿',
  'Venezuela': '🇻🇪',
  'Vietnam': '🇻🇳',
  'Zimbabue': '🇿🇼',
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
  const text = s.campo.toLowerCase();
  const res = new Set<string>();

  if (text.includes('físic') || text.includes('cuántic') || text.includes('relativid') || text.includes('termodinám') || text.includes('electromagn')) res.add('Física');
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
 * Estilos discretos y refinados para cada disciplina científica
 * Alineados con la paleta editorial crema, marfil y verde bosque profundo.
 */
export const DISCIPLINE_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  'Física': { bg: 'bg-[#1b3a2b]/10 dark:bg-[#1b3a2b]/30', text: 'text-[#1b3a2b] dark:text-[#a3c9b3]', border: 'border-[#1b3a2b]/30' },
  'Química': { bg: 'bg-[#8c5028]/10 dark:bg-[#8c5028]/30', text: 'text-[#8c5028] dark:text-[#f4caa8]', border: 'border-[#8c5028]/30' },
  'Biología': { bg: 'bg-[#2d5a27]/10 dark:bg-[#2d5a27]/30', text: 'text-[#2d5a27] dark:text-[#a8dfa0]', border: 'border-[#2d5a27]/30' },
  'Matemáticas': { bg: 'bg-[#1e4558]/10 dark:bg-[#1e4558]/30', text: 'text-[#1e4558] dark:text-[#a0d2eb]', border: 'border-[#1e4558]/30' },
  'Astronomía': { bg: 'bg-[#3b3355]/10 dark:bg-[#3b3355]/30', text: 'text-[#3b3355] dark:text-[#cfc3e8]', border: 'border-[#3b3355]/30' },
  'Medicina': { bg: 'bg-[#7d2e38]/10 dark:bg-[#7d2e38]/30', text: 'text-[#7d2e38] dark:text-[#f2aab2]', border: 'border-[#7d2e38]/30' },
  'Informática': { bg: 'bg-[#0f4c5c]/10 dark:bg-[#0f4c5c]/30', text: 'text-[#0f4c5c] dark:text-[#8ee3ef]', border: 'border-[#0f4c5c]/30' },
  'Ingeniería': { bg: 'bg-[#5c4d3c]/10 dark:bg-[#5c4d3c]/30', text: 'text-[#5c4d3c] dark:text-[#d9c7b0]', border: 'border-[#5c4d3c]/30' },
  'Geología': { bg: 'bg-[#5c4033]/10 dark:bg-[#5c4033]/30', text: 'text-[#5c4033] dark:text-[#d7beaa]', border: 'border-[#5c4033]/30' },
  'Geografía': { bg: 'bg-[#2b594b]/10 dark:bg-[#2b594b]/30', text: 'text-[#2b594b] dark:text-[#a8d5c4]', border: 'border-[#2b594b]/30' },
  'Neurociencia': { bg: 'bg-[#5a2a6b]/10 dark:bg-[#5a2a6b]/30', text: 'text-[#5a2a6b] dark:text-[#dfb3f0]', border: 'border-[#5a2a6b]/30' },
  'Paleontología': { bg: 'bg-[#6b583e]/10 dark:bg-[#6b583e]/30', text: 'text-[#6b583e] dark:text-[#dfccb0]', border: 'border-[#6b583e]/30' },
  'Ciencias ambientales': { bg: 'bg-[#24583b]/10 dark:bg-[#24583b]/30', text: 'text-[#24583b] dark:text-[#a9dbba]', border: 'border-[#24583b]/30' },
};

export function getDisciplineStyle(discipline: string) {
  return DISCIPLINE_STYLES[discipline] || {
    bg: 'bg-[#2c3e2e]/10 dark:bg-[#2c3e2e]/30',
    text: 'text-[#2c3e2e] dark:text-[#c4d4c6]',
    border: 'border-[#2c3e2e]/20',
  };
}
