import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getStatistics,
  filterScientists,
  getAdjacentScientists,
  getAllCountries,
  getCountriesForContinent,
} from './filters.ts';
import { SCIENTISTS_DATA, ORIGINAL_PDF_SCIENTISTS } from '../data/scientists.ts';
import { SUPPLEMENTARY_SCIENTISTS } from '../data/supplementaryScientists.ts';

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

test('total expanded collection reaches exactly 459 scientists', () => {
  assert.equal(SCIENTISTS_DATA.length, 459);
  const stats = getStatistics();
  assert.equal(stats.totalCientificos, 459);
  assert.equal(stats.totalContinentes, 5);
  assert.ok(stats.totalPaises >= 60);
});

test('first and last historical entries match document limits', () => {
  const sorted = [...SCIENTISTS_DATA].sort((a, b) => a.anioNumerico - b.anioNumerico);
  // Imhotep is c. 2650 a. C.
  assert.equal(sorted[0].id, 'imhotep');
  assert.equal(sorted[0].aportePeriodo, 'c. 2650 a. C.');
  assert.equal(sorted[0].continente, 'África');
});

test('no duplicate scientist IDs exist across all 459 records', () => {
  const ids = new Set<string>();
  for (const s of SCIENTISTS_DATA) {
    assert.equal(ids.has(s.id), false, `Duplicate ID found: ${s.id}`);
    ids.add(s.id);
  }
  assert.equal(ids.size, 459);
});

test('search query finds exact scientist by name, field or contribution', () => {
  const darwinResults = filterScientists({ query: 'Darwin' });
  assert.ok(darwinResults.length >= 2);
  assert.ok(darwinResults.some(s => s.nombre === 'Charles Darwin'));
  assert.ok(darwinResults.some(s => s.nombre === 'Erasmus Darwin'));

  const crisprResults = filterScientists({ query: 'CRISPR' });
  assert.ok(crisprResults.length >= 2); // Charpentier & Doudna

  const favaloroResults = filterScientists({ query: 'Favaloro' });
  assert.equal(favaloroResults.length, 1);
  assert.equal(favaloroResults[0].nombre, 'René Favaloro');
});

test('adjacent scientist navigation works chronologically', () => {
  const nav = getAdjacentScientists('charles-darwin');
  assert.ok(nav.prev !== null);
  assert.ok(nav.next !== null);
});

test('countries for continent are present', () => {
  const oceaniaCountries = getCountriesForContinent('Oceanía');
  assert.deepEqual(oceaniaCountries, ['Australia', 'Nueva Zelanda']);
});

test('filterScientists correctly handles collection filters', () => {
  const onlyPDF = filterScientists({ soloPDF: true });
  assert.equal(onlyPDF.length, 209);
  assert.ok(onlyPDF.every(s => !s.esComplementario));

  const onlySupplementary = filterScientists({ soloAmpliacion: true });
  assert.equal(onlySupplementary.length, 250);
  assert.ok(onlySupplementary.every(s => s.esComplementario));

  const pioneers = filterScientists({ soloPioneras: true });
  assert.ok(pioneers.length >= 30);
  assert.ok(pioneers.every(s => s.esPionera));
});

