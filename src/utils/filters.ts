/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SCIENTISTS_DATA } from '../data/scientists';
import { ContinentId, Scientist } from '../types';

export interface FilterOptions {
  query?: string;
  continente?: ContinentId | 'Todos';
  pais?: string | 'Todos';
  campo?: string | 'Todos';
  disciplina?: string | 'Todos';
  periodo?: string | 'Todos';
  soloPioneras?: boolean;
  soloDestacados?: boolean;
}

export interface CountryGeographicProfile {
  country: string;
  direct: Scientist[];
  bornIn: Scientist[];
  workedIn: Scientist[];
  totalUnique: Scientist[];
}

// Pre-sorted chronological cache (computed once at module load)
const SORTED_SCIENTISTS: Scientist[] = [...SCIENTISTS_DATA].sort(
  (a, b) => a.anioNumerico - b.anioNumerico
);

const INDEX_BY_ID = new Map<string, number>();
SORTED_SCIENTISTS.forEach((s, idx) => INDEX_BY_ID.set(s.id, idx));

// Pre-computed lowercase search blobs for instant filtering on low-spec devices
const SEARCH_BLOBS = new Map<string, string>();
for (const s of SORTED_SCIENTISTS) {
  SEARCH_BLOBS.set(
    s.id,
    [
      s.nombre,
      s.nombreCompleto || '',
      s.subtituloAporte || '',
      s.pais,
      s.continente,
      s.campo,
      ...(s.disciplinas || []),
      s.aporteDescripcion,
      s.aportePeriodo,
      s.nacimientoLugar,
      s.lugaresTrabajo,
      s.biografia || '',
    ]
      .join(' ')
      .toLowerCase()
  );
}

// Cached metadata lists & statistics
const ALL_DISCIPLINES_CACHE: string[] = (() => {
  const disciplines = new Set<string>();
  SORTED_SCIENTISTS.forEach(s => s.disciplinas?.forEach(d => disciplines.add(d)));
  return Array.from(disciplines).sort((a, b) => a.localeCompare(b, 'es'));
})();

const ALL_FIELDS_CACHE: string[] = (() => {
  const fields = new Set<string>();
  SORTED_SCIENTISTS.forEach(s => fields.add(s.campo));
  return Array.from(fields).sort((a, b) => a.localeCompare(b, 'es'));
})();

const ALL_COUNTRIES_CACHE: string[] = (() => {
  const countries = new Set<string>();
  SORTED_SCIENTISTS.forEach(s => countries.add(s.pais));
  return Array.from(countries).sort((a, b) => a.localeCompare(b, 'es'));
})();

const BY_CONTINENT_CACHE = new Map<ContinentId, Scientist[]>();
(['Europa', 'América', 'Asia', 'África', 'Oceanía'] as ContinentId[]).forEach(c => {
  BY_CONTINENT_CACHE.set(
    c,
    SORTED_SCIENTISTS.filter(s => s.continente === c)
  );
});

const BY_COUNTRY_CACHE = new Map<string, Scientist[]>();
ALL_COUNTRIES_CACHE.forEach(country => {
  BY_COUNTRY_CACHE.set(
    country,
    SORTED_SCIENTISTS.filter(s => s.pais === country)
  );
});

function formatBoundaryStart(list: Scientist[]): string {
  const first = list[0];
  if (!first) return '—';
  if (first.anioNumerico <= 0) return first.aportePeriodo;
  const match = first.aportePeriodo?.match(/\b(\d{4})\b/);
  return match ? match[1] : String(first.anioNumerico);
}

function formatBoundaryEnd(list: Scientist[]): string {
  if (list.length === 0) return 'Presente';
  let maxYear = -Infinity;
  for (const s of list) {
    if (s.anioNumerico > maxYear) maxYear = s.anioNumerico;
    const matches = s.aportePeriodo?.match(/\b(\d{4})\b/g);
    if (matches) {
      for (const m of matches) {
        const y = Number(m);
        if (y > maxYear && y <= 2030) maxYear = y;
      }
    }
  }
  return Number.isFinite(maxYear) ? String(maxYear) : 'Presente';
}

const STATS_CACHE = (() => {
  const totalCientificos = SORTED_SCIENTISTS.length;
  const continentes = Array.from(new Set(SORTED_SCIENTISTS.map(s => s.continente)));
  const totalContinentes = continentes.length;
  const totalPaises = ALL_COUNTRIES_CACHE.length;
  const totalCampos = ALL_FIELDS_CACHE.length;
  const totalDisciplinas = ALL_DISCIPLINES_CACHE.length;

  const primerAporte = formatBoundaryStart(SORTED_SCIENTISTS);
  const ultimoAporte = formatBoundaryEnd(SORTED_SCIENTISTS);

  const porContinente: Record<ContinentId, number> = {
    Europa: BY_CONTINENT_CACHE.get('Europa')?.length ?? 0,
    América: BY_CONTINENT_CACHE.get('América')?.length ?? 0,
    Asia: BY_CONTINENT_CACHE.get('Asia')?.length ?? 0,
    África: BY_CONTINENT_CACHE.get('África')?.length ?? 0,
    Oceanía: BY_CONTINENT_CACHE.get('Oceanía')?.length ?? 0,
  };

  return {
    totalCientificos,
    totalContinentes,
    totalPaises,
    totalCampos,
    totalDisciplinas,
    primerAporte,
    ultimoAporte,
    porContinente,
  };
})();

const CONTINENT_SPANS_CACHE: Record<ContinentId, { first: string; last: string }> = (() => {
  const result = {} as Record<ContinentId, { first: string; last: string }>;
  (['Europa', 'América', 'Asia', 'África', 'Oceanía'] as ContinentId[]).forEach(c => {
    const list = BY_CONTINENT_CACHE.get(c) || [];
    result[c] = {
      first: formatBoundaryStart(list),
      last: formatBoundaryEnd(list),
    };
  });
  return result;
})();

const COUNTRY_GEO_ALIASES: Record<string, string[]> = {
  Alemania: ['alemania', 'berlín', 'berlin', 'múnich', 'munich', 'gotinga', 'göttingen', 'heidelberg', 'bonn', 'leipzig', 'max planck', 'hamburgo', 'stuttgart', 'fráncfort', 'frankfurt', 'jena', 'tübingen', 'tubinga', 'friburgo'],
  Argelia: ['argelia', 'argel', 'oran', 'orán'],
  Argentina: ['argentina', 'buenos aires', 'la plata', 'córdoba, argentina', 'conicet', 'uba'],
  Australia: ['australia', 'sídney', 'sydney', 'melbourne', 'camberra', 'canberra', 'adelaida', 'brisbane', 'perth', 'csiro'],
  Austria: ['austria', 'viena', 'graz', 'innsbruck', 'salzburgo'],
  Bélgica: ['bélgica', 'belgica', 'bruselas', 'lovaina', 'gante', 'amberes', 'lieja'],
  Brasil: ['brasil', 'río de janeiro', 'rio de janeiro', 'são paulo', 'sao paulo', 'fiocruz', 'usp'],
  Canadá: ['canadá', 'canada', 'toronto', 'montreal', 'mcgill', 'vancouver', 'ottawa', 'winnipeg', 'alberta'],
  Chequia: ['chequia', 'república checa', 'praga', 'brno', 'bohemia'],
  Chile: ['chile', 'santiago de chile', 'valparaíso', 'concepción'],
  China: ['china', 'pekín', 'beijing', 'shanghái', 'shanghai', 'cantón', 'nankín', 'wuhan', 'hong kong'],
  Colombia: ['colombia', 'bogotá', 'bogota', 'medellín'],
  'Corea del Sur': ['corea del sur', 'seúl', 'seoul', 'kaist', 'daejeon'],
  'Costa Rica': ['costa rica', 'san josé, costa rica'],
  Cuba: ['cuba', 'la habana', 'habana'],
  Dinamarca: ['dinamarca', 'copenhague', 'aarhus', 'carlsberg'],
  Egipto: ['egipto', 'el cairo', 'cairo', 'alejandría', 'alejandria', 'guiza', 'saqqara', 'fustat', 'ain shams'],
  España: ['españa', 'madrid', 'barcelona', 'valencia', 'sevilla', 'granada', 'salamanca', 'córdoba, españa', 'csic'],
  'Estados Unidos': ['estados unidos', 'ee. uu.', 'eeuu', 'harvard', 'mit', 'stanford', 'berkeley', 'princeton', 'caltech', 'yale', 'columbia', 'chicago', 'johns hopkins', 'rockefeller', 'nueva york', 'boston', 'california', 'nih', 'nasa', 'bell labs', 'laboratorios bell', 'filadelfia', 'pasadena', 'seattle', 'la jolla', 'scripps', 'cornell', 'ucla'],
  Estonia: ['estonia', 'tartu', 'tallin'],
  Etiopía: ['etiopía', 'etiopia', 'adís abeba', 'addis abeba'],
  Filipinas: ['filipinas', 'manila'],
  Finlandia: ['finlandia', 'helsinki', 'turku'],
  Francia: ['francia', 'parís', 'paris', 'instituto pasteur', 'sorbona', 'sorbonne', 'lyon', 'estrasburgo', 'montpellier', 'collège de france', 'saclay', 'cnrs', 'marsella', 'toulouse'],
  Ghana: ['ghana', 'acra', 'knust', 'kumasi'],
  Grecia: ['grecia', 'atenas', 'cos', 'tesalia', 'mileto', 'estagira'],
  Guatemala: ['guatemala'],
  Hungría: ['hungría', 'hungria', 'budapest', 'szeged'],
  India: ['india', 'calcuta', 'bangalore', 'mumbai', 'bombay', 'nueva delhi', 'delhi', 'madras', 'chennai', 'iisc'],
  Indonesia: ['indonesia', 'yakarta', 'java'],
  Irak: ['irak', 'bagdad', 'basora', 'mesopotamia'],
  Irán: ['irán', 'iran', 'teherán', 'teheran', 'shiraz', 'isfahán', 'rayy', 'persia'],
  Irlanda: ['irlanda', 'dublín', 'dublin'],
  Israel: ['israel', 'jerusalén', 'jerusalen', 'tel aviv', 'weizmann', 'technion', 'haifa'],
  Italia: ['italia', 'roma', 'milán', 'milan', 'bolonia', 'padua', 'florencia', 'pisa', 'turín', 'turin', 'nápoles', 'napoles', 'pavías', 'pavía', 'venecia', 'salerno'],
  Japón: ['japón', 'japon', 'tokio', 'tokyo', 'kioto', 'kyoto', 'osaka', 'nagoya', 'riken', 'tsukuba', 'sapporo'],
  Kenia: ['kenia', 'nairobi', 'icipe', 'mombasa'],
  Líbano: ['líbano', 'libano', 'beirut'],
  Marruecos: ['marruecos', 'fez', 'rabat', 'casablanca', 'marrakech'],
  Mauricio: ['mauricio', 'port louis'],
  México: ['méxico', 'mexico', 'unam', 'cinvestav', 'ciudad de méxico', 'guadalajara', 'monterrey', 'puebla'],
  Nigeria: ['nigeria', 'lagos', 'ibadan', 'ibadán', 'benín'],
  Noruega: ['noruega', 'oslo', 'trondheim', 'bergen'],
  'Nueva Zelanda': ['nueva zelanda', 'wellington', 'auckland', 'christchurch', 'otago'],
  'Países Bajos': ['países bajos', 'paises bajos', 'holanda', 'ámsterdam', 'amsterdam', 'leiden', 'utrecht', 'delft', 'groninga', 'nimega', 'radboud'],
  Pakistán: ['pakistán', 'pakistan', 'lahore', 'karachi', 'islamabad'],
  Perú: ['perú', 'peru', 'lima', 'san marcos', 'cayetano heredia'],
  Polonia: ['polonia', 'varsovia', 'cracovia', 'wrocław', 'gdansk'],
  Portugal: ['portugal', 'lisboa', 'coímbra', 'coimbra', 'oporto'],
  'Reino Unido': ['reino unido', 'londres', 'oxford', 'cambridge', 'edimburgo', 'escocia', 'inglaterra', 'gales', 'mánchester', 'manchester', 'birmingham', 'glasgow', 'cavendish', 'royal society', 'imperial college', 'ucl', 'nottingham', 'crick', 'down house', 'gran bretaña'],
  'República del Congo': ['república del congo', 'brazzaville', 'congo'],
  Rumanía: ['rumanía', 'rumania', 'bucarest'],
  Rusia: ['rusia', 'moscú', 'moscu', 'san petersburgo', 'leningrado', 'urss', 'unión soviética', 'novosibirsk', 'kazán'],
  Senegal: ['senegal', 'dakar', 'ucad'],
  Serbia: ['serbia', 'belgrado'],
  Siria: ['siria', 'damasco', 'alepo'],
  Suazilandia: ['suazilandia', 'esuatini', 'uniswa', 'mbabane'],
  Sudáfrica: ['sudáfrica', 'sudafrica', 'ciudad del cabo', 'johannesburgo', 'pretoria', 'stellenbosch', 'witwatersrand'],
  Suecia: ['suecia', 'estocolmo', 'upsala', 'uppsala', 'lund', 'karolinska', 'gotemburgo'],
  Suiza: ['suiza', 'zúrich', 'zurich', 'eth', 'ginebra', 'basilea', 'lausana', 'epfl', 'cern', 'berna'],
  Taiwán: ['taiwán', 'taiwan', 'taipéi', 'taipei'],
  Tanzania: ['tanzania', 'dar es-salaam', 'olduvai', 'serengeti'],
  Túnez: ['túnez', 'tunez', 'kairuán', 'cartago'],
  Turquía: ['turquía', 'turquia', 'estambul', 'ankara', 'anatolia'],
  Ucrania: ['ucrania', 'kiev', 'jarkov', 'járkov', 'odesa'],
  Uganda: ['uganda', 'kampala', 'makerere'],
  Uruguay: ['uruguay', 'montevideo'],
  Uzbekistán: ['uzbekistán', 'uzbekistan', 'samarcanda', 'bujará', 'bujara', 'taskent'],
  Venezuela: ['venezuela', 'caracas', 'mérida, venezuela', 'ivic'],
  Vietnam: ['vietnam', 'hanói', 'hanoi', 'ho chi minh'],
  Zimbabue: ['zimbabue', 'harare', 'bulawayo'],
};

function matchesCountryLocation(text: string | undefined, country: string): boolean {
  if (!text) return false;
  const low = text.toLowerCase();
  const terms = COUNTRY_GEO_ALIASES[country] || [country.toLowerCase()];
  return terms.some(term => {
    if (term.length <= 4) {
      // Avoid substring false positives for short acronyms/city names like "mit", "cos", "uba", "fez", "usp"
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return new RegExp(`(^|[^\\p{L}])${escaped}([^\\p{L}]|$)`, 'iu').test(low);
    }
    return low.includes(term);
  });
}

const COUNTRY_PROFILE_CACHE = new Map<string, CountryGeographicProfile>();

export function getCountryGeographicProfile(country: string): CountryGeographicProfile {
  const cached = COUNTRY_PROFILE_CACHE.get(country);
  if (cached) return cached;

  const direct = getScientistsByCountry(country);

  const bornIn = SORTED_SCIENTISTS.filter(
    s => matchesCountryLocation(s.nacimientoLugar, country)
  );
  const workedIn = SORTED_SCIENTISTS.filter(
    s => matchesCountryLocation(s.lugaresTrabajo, country)
  );

  const uniqueMap = new Map<string, Scientist>();
  for (const s of direct) uniqueMap.set(s.id, s);
  for (const s of bornIn) if (!uniqueMap.has(s.id)) uniqueMap.set(s.id, s);
  for (const s of workedIn) if (!uniqueMap.has(s.id)) uniqueMap.set(s.id, s);

  const totalUnique = Array.from(uniqueMap.values()).sort(
    (a, b) => a.anioNumerico - b.anioNumerico
  );

  const profile: CountryGeographicProfile = {
    country,
    direct,
    bornIn,
    workedIn,
    totalUnique,
  };
  COUNTRY_PROFILE_CACHE.set(country, profile);
  return profile;
}

export function getAllDisciplines(): string[] {
  return ALL_DISCIPLINES_CACHE;
}

export function getAllFields(): string[] {
  return ALL_FIELDS_CACHE;
}

export function getAllCountries(): string[] {
  return ALL_COUNTRIES_CACHE;
}

export function getCountriesForContinent(continente: ContinentId): string[] {
  const countries = new Set<string>();
  (BY_CONTINENT_CACHE.get(continente) || []).forEach(s => countries.add(s.pais));
  return Array.from(countries).sort((a, b) => a.localeCompare(b, 'es'));
}

export function getScientistsByContinent(continente: ContinentId): Scientist[] {
  return BY_CONTINENT_CACHE.get(continente) || [];
}

export function getScientistsByCountry(pais: string): Scientist[] {
  return BY_COUNTRY_CACHE.get(pais) || [];
}

export function getStatistics() {
  return STATS_CACHE;
}

export function getContinentSpans(): Record<ContinentId, { first: string; last: string }> {
  return CONTINENT_SPANS_CACHE;
}

export function filterScientists(options: FilterOptions): Scientist[] {
  const { query, continente, pais, campo, disciplina, periodo, soloPioneras, soloDestacados } = options;

  const normalizedQuery = query ? query.trim().toLowerCase() : '';
  const normalizedCampo = campo && campo !== 'Todos' ? campo.toLowerCase() : '';

  return SORTED_SCIENTISTS.filter(s => {
    if (soloPioneras && !s.esPionera) return false;
    if (soloDestacados && !s.destacado) return false;
    if (continente && continente !== 'Todos' && s.continente !== continente) return false;
    if (pais && pais !== 'Todos' && s.pais !== pais) return false;
    if (disciplina && disciplina !== 'Todos' && (!s.disciplinas || !s.disciplinas.includes(disciplina))) {
      return false;
    }
    if (normalizedCampo && !s.campo.toLowerCase().includes(normalizedCampo)) {
      return false;
    }
    if (periodo && periodo !== 'Todos') {
      if (periodo === 'antiguedad' && s.anioNumerico > 500) return false;
      if (periodo === 'medieval' && (s.anioNumerico <= 500 || s.anioNumerico > 1500)) return false;
      if (periodo === 'moderna' && (s.anioNumerico <= 1500 || s.anioNumerico > 1800)) return false;
      if (periodo === 'siglo19' && (s.anioNumerico <= 1800 || s.anioNumerico > 1900)) return false;
      if (periodo === 'siglo20_1' && (s.anioNumerico <= 1900 || s.anioNumerico > 1950)) return false;
      if (periodo === 'siglo20_2' && (s.anioNumerico <= 1950 || s.anioNumerico > 2000)) return false;
      if (periodo === 'siglo21' && s.anioNumerico <= 2000) return false;
    }
    if (normalizedQuery) {
      const blob = SEARCH_BLOBS.get(s.id) || '';
      return blob.includes(normalizedQuery);
    }
    return true;
  });
}

export function getAdjacentScientists(id: string): { prev: Scientist | null; next: Scientist | null } {
  const index = INDEX_BY_ID.get(id);
  if (index === undefined) return { prev: null, next: null };

  const prev = index > 0 ? SORTED_SCIENTISTS[index - 1] : null;
  const next = index < SORTED_SCIENTISTS.length - 1 ? SORTED_SCIENTISTS[index + 1] : null;

  return { prev, next };
}

export function getRelatedScientists(scientist: Scientist, limit: number = 3): Scientist[] {
  const out: Scientist[] = [];
  for (const s of SORTED_SCIENTISTS) {
    if (s.id === scientist.id) continue;
    if (
      s.campo === scientist.campo ||
      (s.disciplinas &&
        scientist.disciplinas &&
        s.disciplinas.some(d => scientist.disciplinas?.includes(d)))
    ) {
      out.push(s);
      if (out.length >= limit) break;
    }
  }
  return out;
}
