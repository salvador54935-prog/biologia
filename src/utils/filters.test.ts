import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  getStatistics,
  getContinentSpans,
  filterScientists,
  getAdjacentScientists,
  getCountryGeographicProfile,
} from './filters.ts';
import { SCIENTISTS_DATA, HISTORICAL_SCIENTISTS } from '../data/scientists.ts';
import { SUPPLEMENTARY_SCIENTISTS } from '../data/supplementaryScientists.ts';
import { MULTIDISCIPLINARY_SCIENTISTS } from '../data/multidisciplinaryScientists.ts';
import { UNIVERSAL_SCIENTISTS } from '../data/universalScientists.ts';
import { SHOWCASE_SCIENTISTS } from '../components/ShowcaseHero.tsx';

function normalizeName(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

test('historical foundational collection contains exactly 209 independent scientists', () => {
  assert.equal(HISTORICAL_SCIENTISTS.length, 209);

  for (const s of HISTORICAL_SCIENTISTS) {
    assert.equal((s as any).paginaPDF, undefined, `paginaPDF must not exist for ${s.id}`);
    assert.ok(s.subtituloAporte, `Missing subtituloAporte for ${s.id}`);
    assert.ok(s.disciplinas && s.disciplinas.length > 0, `Missing disciplinas for ${s.id}`);
  }
});

test('supplementary collection contains exactly 250 verified scientists', () => {
  assert.equal(SUPPLEMENTARY_SCIENTISTS.length, 250);
  for (const s of SUPPLEMENTARY_SCIENTISTS) {
    assert.equal(s.esComplementario, true);
    assert.equal((s as any).paginaPDF, undefined, `paginaPDF must not exist for ${s.id}`);
    assert.ok(s.subtituloAporte, `Missing subtituloAporte for ${s.id}`);
    assert.ok(s.disciplinas && s.disciplinas.length > 0, `Missing disciplinas for ${s.id}`);
  }
});

test('multidisciplinary collection contains exactly 300 verified scientists', () => {
  assert.equal(MULTIDISCIPLINARY_SCIENTISTS.length, 300);
  for (const s of MULTIDISCIPLINARY_SCIENTISTS) {
    assert.ok(s.id, 'ID must not be empty');
    assert.ok(s.nombre, 'Nombre must not be empty');
    assert.ok(s.pais, 'Pais must not be empty');
    assert.ok(s.continente, 'Continente must not be empty');
    assert.ok(s.subtituloAporte, `subtituloAporte required for ${s.id}`);
    assert.ok(s.disciplinas && s.disciplinas.length > 0, `Disciplinas required for ${s.id}`);
    assert.ok(s.biografia, `Biografia required for ${s.id}`);
    assert.ok(s.importanciaHistorica, `Importancia historica required for ${s.id}`);
  }
});

test('universal encyclopedia expansion adds 391 verified unique scientists', () => {
  assert.equal(UNIVERSAL_SCIENTISTS.length, 391);
  for (const s of UNIVERSAL_SCIENTISTS) {
    assert.ok(s.id, 'ID must not be empty');
    assert.ok(s.nombre, 'Nombre must not be empty');
    assert.ok(s.pais, 'Pais must not be empty');
    assert.ok(s.continente, 'Continente must not be empty');
    assert.ok(s.subtituloAporte, `subtituloAporte required for ${s.id}`);
    assert.ok(s.disciplinas && s.disciplinas.length > 0, `Disciplinas required for ${s.id}`);
    assert.ok(s.biografia, `Biografia required for ${s.id}`);
    assert.ok(s.importanciaHistorica, `Importancia historica required for ${s.id}`);
  }
});

test('total expanded collection reaches exactly 1,150 scientists across 81 countries and 5 continents', () => {
  assert.equal(SCIENTISTS_DATA.length, 1150);
  const stats = getStatistics();
  assert.equal(stats.totalCientificos, 1150);
  assert.equal(stats.totalContinentes, 5);
  assert.equal(stats.totalPaises, 81);
  assert.ok(stats.totalDisciplinas >= 13);
  assert.equal(stats.primerAporte, 'c. 2650 a. C.');
  assert.equal(stats.ultimoAporte, '2024');
  assert.equal(stats.ultimoAporte.includes('–'), false);

  const spans = getContinentSpans();
  for (const [continent, span] of Object.entries(spans)) {
    assert.equal(span.first.includes('–'), false, `${continent} start should be a single year`);
    assert.equal(span.last.includes('–'), false, `${continent} end should be a single year`);
  }
});

test('no duplicate scientist IDs or normalized names exist across all 1,150 records', () => {
  const ids = new Set<string>();
  const names = new Set<string>();
  for (const s of SCIENTISTS_DATA) {
    assert.equal(ids.has(s.id), false, `Duplicate ID found: ${s.id}`);
    ids.add(s.id);
    const norm = normalizeName(s.nombre);
    assert.equal(names.has(norm), false, `Duplicate normalized name found: ${s.nombre} (${s.id})`);
    names.add(norm);
  }
  assert.equal(ids.size, 1150);
  assert.equal(names.size, 1150);
});

test('every scientist has complete non-placeholder metadata', () => {
  for (const s of SCIENTISTS_DATA) {
    assert.ok(s.subtituloAporte && s.subtituloAporte.trim().length > 5, `Missing subtituloAporte for ${s.id}`);
    assert.ok(s.disciplinas && s.disciplinas.length > 0, `Missing disciplinas for ${s.id}`);
    assert.notEqual(s.nacimientoLugar, 'No especificado en el documento', `Placeholder nacimientoLugar for ${s.id}`);
    assert.notEqual(s.lugaresTrabajo, 'No especificado en el documento', `Placeholder lugaresTrabajo for ${s.id}`);
  }
});

test('exactly 10 showcase scientists are defined and exist in collection with verified portraits', () => {
  assert.equal(SHOWCASE_SCIENTISTS.length, 10);
  const showcaseIds = [
    'albert-einstein',
    'isaac-newton',
    'marie-curie',
    'charles-darwin',
    'galileo-galilei',
    'louis-pasteur',
    'ada-lovelace',
    'nikola-tesla',
    'ibn-al-haytham',
    'katherine-johnson',
  ];

  assert.deepEqual(SHOWCASE_SCIENTISTS.map(s => s.id), showcaseIds);

  for (const item of SHOWCASE_SCIENTISTS) {
    const record = SCIENTISTS_DATA.find(s => s.id === item.id);
    assert.ok(record, `Showcase scientist ${item.id} not found in SCIENTISTS_DATA`);
    const portraitFile = path.join(process.cwd(), 'public', item.retratoUrl);
    assert.ok(fs.existsSync(portraitFile), `Local portrait file ${portraitFile} must exist`);
  }
});

test('country geographic profile distinguishes associated, birthplace, and workplace links', () => {
  const uk = getCountryGeographicProfile('Reino Unido');
  assert.ok(uk.direct.length > 50);
  assert.ok(uk.bornIn.length > 40);
  assert.ok(uk.workedIn.length > uk.direct.length);
  assert.ok(uk.workedIn.some(s => s.id === 'marie-curie' || s.pais !== 'Reino Unido'));

  const mauricio = getCountryGeographicProfile('Mauricio');
  assert.equal(mauricio.direct.length, 1);
  assert.equal(mauricio.direct[0].id, 'ameenah-gurib-fakim');
});

test('search query finds scientists across physics, chemistry, biology, math, astronomy', () => {
  const einsteinResults = filterScientists({ query: 'Einstein' });
  assert.ok(einsteinResults.length >= 1);
  assert.ok(einsteinResults.some(s => s.nombre === 'Albert Einstein'));

  const newtonResults = filterScientists({ query: 'Newton' });
  assert.ok(newtonResults.length >= 1);
  assert.ok(newtonResults.some(s => s.nombre === 'Isaac Newton'));

  const darwinResults = filterScientists({ query: 'Darwin' });
  assert.ok(darwinResults.length >= 2);
  assert.ok(darwinResults.some(s => s.nombre === 'Charles Darwin'));

  const curieResults = filterScientists({ query: 'Curie' });
  assert.ok(curieResults.length >= 1);
  assert.ok(curieResults.some(s => s.nombre === 'Marie Curie'));
});

test('filter by discipline works seamlessly', () => {
  const fisicos = filterScientists({ disciplina: 'Física' });
  assert.ok(fisicos.length >= 30);
  assert.ok(fisicos.some(s => s.nombre === 'Albert Einstein'));

  const biologos = filterScientists({ disciplina: 'Biología' });
  assert.ok(biologos.length >= 100);
  assert.ok(biologos.some(s => s.nombre === 'Charles Darwin'));
});

test('adjacent scientist navigation works chronologically across full collection', () => {
  const nav = getAdjacentScientists('charles-darwin');
  assert.ok(nav.prev !== null);
  assert.ok(nav.next !== null);
});

test('100% of scientists across all 81 countries have an official circular flag in CircularFlag component', () => {
  const flagFile = fs.readFileSync(path.join(process.cwd(), 'src/components/CircularFlag.tsx'), 'utf-8');
  const supportedCases = new Set<string>();
  const regex = /case\s+['"]([^'"]+)['"]:/g;
  let match;
  while ((match = regex.exec(flagFile)) !== null) {
    supportedCases.add(match[1]);
  }

  for (const s of SCIENTISTS_DATA) {
    const raw = s.pais.trim();
    const norm = raw === 'Malí' ? 'Mali' : raw;
    assert.ok(
      supportedCases.has(norm),
      `Scientist ${s.nombre} (${s.id}) from ${s.pais} has no circular flag in CircularFlag.tsx`
    );
  }
});

