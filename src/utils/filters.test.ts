import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  getStatistics,
  filterScientists,
  getAdjacentScientists,
  getCountriesForContinent,
} from './filters.ts';
import { SCIENTISTS_DATA, ORIGINAL_PDF_SCIENTISTS } from '../data/scientists.ts';
import { SUPPLEMENTARY_SCIENTISTS } from '../data/supplementaryScientists.ts';
import { MULTIDISCIPLINARY_SCIENTISTS } from '../data/multidisciplinaryScientists.ts';
import { SHOWCASE_SCIENTISTS } from '../components/ShowcaseHero.tsx';

test('original PDF collection contains exactly 209 scientists', () => {
  assert.equal(ORIGINAL_PDF_SCIENTISTS.length, 209);
  
  // Exact distribution according to page 1 of the PDF
  const eur = ORIGINAL_PDF_SCIENTISTS.filter(s => s.continente === 'Europa').length;
  const am = ORIGINAL_PDF_SCIENTISTS.filter(s => s.continente === 'América').length;
  const as = ORIGINAL_PDF_SCIENTISTS.filter(s => s.continente === 'Asia').length;
  const af = ORIGINAL_PDF_SCIENTISTS.filter(s => s.continente === 'África').length;
  const oc = ORIGINAL_PDF_SCIENTISTS.filter(s => s.continente === 'Oceanía').length;

  assert.equal(eur, 100);
  assert.equal(am, 55);
  assert.equal(as, 30);
  assert.equal(af, 13);
  assert.equal(oc, 11);
});

test('supplementary collection contains exactly 250 verified scientists', () => {
  assert.equal(SUPPLEMENTARY_SCIENTISTS.length, 250);
  for (const s of SUPPLEMENTARY_SCIENTISTS) {
    assert.equal(s.esComplementario, true);
    assert.ok(s.fuenteReferencia, `Missing reference for ${s.id}`);
  }
});

test('multidisciplinary collection contains exactly 300 verified scientists', () => {
  assert.equal(MULTIDISCIPLINARY_SCIENTISTS.length, 300);
  for (const s of MULTIDISCIPLINARY_SCIENTISTS) {
    assert.ok(s.id, 'ID must not be empty');
    assert.ok(s.nombre, 'Nombre must not be empty');
    assert.ok(s.pais, 'Pais must not be empty');
    assert.ok(s.continente, 'Continente must not be empty');
    assert.ok(s.campo, 'Campo must not be empty');
    assert.ok(s.disciplinas && s.disciplinas.length > 0, `Disciplinas required for ${s.id}`);
    assert.ok(s.biografia, `Biografia required for ${s.id}`);
    assert.ok(s.importanciaHistorica, `Importancia historica required for ${s.id}`);
  }
});

test('total multidisciplinary expanded collection reaches exactly 759 scientists', () => {
  assert.equal(SCIENTISTS_DATA.length, 759);
  const stats = getStatistics();
  assert.equal(stats.totalCientificos, 759);
  assert.equal(stats.totalContinentes, 5);
  assert.ok(stats.totalPaises >= 70);
});

test('first and last historical entries match document limits', () => {
  const sorted = [...SCIENTISTS_DATA].sort((a, b) => a.anioNumerico - b.anioNumerico);
  // Imhotep is c. 2650 a. C.
  assert.equal(sorted[0].id, 'imhotep');
  assert.equal(sorted[0].aportePeriodo, 'c. 2650 a. C.');
  assert.equal(sorted[0].continente, 'África');
});

test('no duplicate scientist IDs exist across all 759 records', () => {
  const ids = new Set<string>();
  for (const s of SCIENTISTS_DATA) {
    assert.equal(ids.has(s.id), false, `Duplicate ID found: ${s.id}`);
    ids.add(s.id);
  }
  assert.equal(ids.size, 759);
});

test('exactly 10 showcase scientists are defined and exist in collection', () => {
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
    // Verify local portrait file exists
    const portraitFile = path.join(process.cwd(), 'public', item.retratoUrl);
    assert.ok(fs.existsSync(portraitFile), `Local portrait file ${portraitFile} must exist`);
  }
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

test('adjacent scientist navigation works chronologically across full collection', () => {
  const nav = getAdjacentScientists('charles-darwin');
  assert.ok(nav.prev !== null);
  assert.ok(nav.next !== null);
});

test('countries for continent are present', () => {
  const oceaniaCountries = getCountriesForContinent('Oceanía');
  assert.ok(oceaniaCountries.includes('Australia'));
  assert.ok(oceaniaCountries.includes('Nueva Zelanda'));
});
