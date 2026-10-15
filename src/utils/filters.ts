import { SCIENTISTS_DATA } from '../data/scientists';
import { ContinentId, Scientist } from '../types';

export interface FilterOptions {
  query?: string;
  continente?: ContinentId | 'Todos';
  pais?: string | 'Todos';
  campo?: string | 'Todos';
  periodo?: string | 'Todos';
}

export function getAllFields(): string[] {
  const fields = new Set<string>();
  SCIENTISTS_DATA.forEach(s => {
    // split if composite like "Zoología y ecología"
    fields.add(s.campo);
  });
  return Array.from(fields).sort((a, b) => a.localeCompare(b, 'es'));
}

export function getAllCountries(): string[] {
  const countries = new Set<string>();
  SCIENTISTS_DATA.forEach(s => countries.add(s.pais));
  return Array.from(countries).sort((a, b) => a.localeCompare(b, 'es'));
}

export function getCountriesForContinent(continente: ContinentId): string[] {
  const countries = new Set<string>();
  SCIENTISTS_DATA.filter(s => s.continente === continente).forEach(s => countries.add(s.pais));
  return Array.from(countries).sort((a, b) => a.localeCompare(b, 'es'));
}

export function getScientistsByContinent(continente: ContinentId): Scientist[] {
  return SCIENTISTS_DATA.filter(s => s.continente === continente).sort(
    (a, b) => a.anioNumerico - b.anioNumerico
  );
}

export function getScientistsByCountry(pais: string): Scientist[] {
  return SCIENTISTS_DATA.filter(s => s.pais === pais).sort(
    (a, b) => a.anioNumerico - b.anioNumerico
  );
}

export function getStatistics() {
  const totalCientificos = SCIENTISTS_DATA.length;
  const continentes = Array.from(new Set(SCIENTISTS_DATA.map(s => s.continente)));
  const totalContinentes = continentes.length;
  const paises = new Set(SCIENTISTS_DATA.map(s => s.pais));
  const totalPaises = paises.size;
  const campos = new Set(SCIENTISTS_DATA.map(s => s.campo));
  const totalCampos = campos.size;

  const ordenados = [...SCIENTISTS_DATA].sort((a, b) => a.anioNumerico - b.anioNumerico);
  const primerAporte = ordenados[0]?.aportePeriodo ?? 'c. 2650 a. C.';
  const ultimoAporte = ordenados[ordenados.length - 1]?.aportePeriodo ?? '2012';

  const porContinente = {
    Europa: SCIENTISTS_DATA.filter(s => s.continente === 'Europa').length,
    América: SCIENTISTS_DATA.filter(s => s.continente === 'América').length,
    Asia: SCIENTISTS_DATA.filter(s => s.continente === 'Asia').length,
    África: SCIENTISTS_DATA.filter(s => s.continente === 'África').length,
    Oceanía: SCIENTISTS_DATA.filter(s => s.continente === 'Oceanía').length,
  };

  return {
    totalCientificos,
    totalContinentes,
    totalPaises,
    totalCampos,
    primerAporte,
    ultimoAporte,
    porContinente,
  };
}

export function filterScientists(options: FilterOptions): Scientist[] {
  const { query, continente, pais, campo, periodo } = options;

  const normalizedQuery = query ? query.trim().toLowerCase() : '';

  return SCIENTISTS_DATA.filter(s => {
    // Continente
    if (continente && continente !== 'Todos' && s.continente !== continente) {
      return false;
    }

    // País
    if (pais && pais !== 'Todos' && s.pais !== pais) {
      return false;
    }

    // Campo
    if (campo && campo !== 'Todos' && !s.campo.toLowerCase().includes(campo.toLowerCase())) {
      return false;
    }

    // Periodo histórico
    if (periodo && periodo !== 'Todos') {
      if (periodo === 'antiguedad' && s.anioNumerico > 500) return false;
      if (periodo === 'medieval' && (s.anioNumerico <= 500 || s.anioNumerico > 1500)) return false;
      if (periodo === 'moderna' && (s.anioNumerico <= 1500 || s.anioNumerico > 1800)) return false;
      if (periodo === 'siglo19' && (s.anioNumerico <= 1800 || s.anioNumerico > 1900)) return false;
      if (periodo === 'siglo20_1' && (s.anioNumerico <= 1900 || s.anioNumerico > 1950)) return false;
      if (periodo === 'siglo20_2' && (s.anioNumerico <= 1950 || s.anioNumerico > 2000)) return false;
      if (periodo === 'siglo21' && s.anioNumerico <= 2000) return false;
    }

    // Query text search
    if (normalizedQuery) {
      const matchName = s.nombre.toLowerCase().includes(normalizedQuery);
      const matchCountry = s.pais.toLowerCase().includes(normalizedQuery);
      const matchContinent = s.continente.toLowerCase().includes(normalizedQuery);
      const matchField = s.campo.toLowerCase().includes(normalizedQuery);
      const matchDesc = s.aporteDescripcion.toLowerCase().includes(normalizedQuery);
      const matchPeriod = s.aportePeriodo.toLowerCase().includes(normalizedQuery);
      const matchBirth = s.nacimientoLugar.toLowerCase().includes(normalizedQuery);
      const matchWork = s.lugaresTrabajo.toLowerCase().includes(normalizedQuery);

      if (!matchName && !matchCountry && !matchContinent && !matchField && !matchDesc && !matchPeriod && !matchBirth && !matchWork) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => a.anioNumerico - b.anioNumerico);
}

export function getAdjacentScientists(id: string): { prev: Scientist | null; next: Scientist | null } {
  const sorted = [...SCIENTISTS_DATA].sort((a, b) => a.anioNumerico - b.anioNumerico);
  const index = sorted.findIndex(s => s.id === id);
  if (index === -1) return { prev: null, next: null };

  return {
    prev: index > 0 ? sorted[index - 1] : null,
    next: index < sorted.length - 1 ? sorted[index + 1] : null,
  };
}

export function getRelatedScientists(scientist: Scientist, limit = 3): Scientist[] {
  return SCIENTISTS_DATA.filter(
    s => s.id !== scientist.id && s.campo.toLowerCase().includes(scientist.campo.toLowerCase())
  ).slice(0, limit);
}
