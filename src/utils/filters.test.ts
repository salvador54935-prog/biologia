import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getStatistics,
  filterScientists,
  getAdjacentScientists,
  getAllCountries,
  getCountriesForContinent,
} from './filters.ts';
import { SCIENTISTS_DATA } from '../data/scientists.ts';

test('database contains exactly 209 scientists', () => {
  assert.equal(SCIENTISTS_DATA.length, 209);
});

test('continent counts match PDF exactly', () => {
  const stats = getStatistics();
  assert.equal(stats.totalCientificos, 209);
  assert.equal(stats.porContinente.Europa, 100);
  assert.equal(stats.porContinente.América, 55);
  assert.equal(stats.porContinente.Asia, 30);
  assert.equal(stats.porContinente.África, 13);
  assert.equal(stats.porContinente.Oceanía, 11);
  assert.equal(stats.totalContinentes, 5);
});

test('first and last historical entries match document limits', () => {
  const sorted = [...SCIENTISTS_DATA].sort((a, b) => a.anioNumerico - b.anioNumerico);
  // Imhotep is c. 2650 a. C.
  assert.equal(sorted[0].id, 'imhotep');
  assert.equal(sorted[0].aportePeriodo, 'c. 2650 a. C.');
  assert.equal(sorted[0].continente, 'África');

  // Last entries are from 2012 (Charpentier, Doudna)
  const last = sorted[sorted.length - 1];
  assert.equal(last.aportePeriodo, '2012');
});

test('no duplicate scientist IDs exist', () => {
  const ids = new Set<string>();
  for (const s of SCIENTISTS_DATA) {
    assert.equal(ids.has(s.id), false, `Duplicate ID found: ${s.id}`);
    ids.add(s.id);
  }
  assert.equal(ids.size, 209);
});

test('filtering by continent returns exact count', () => {
  const europeans = filterScientists({ continente: 'Europa' });
  assert.equal(europeans.length, 100);

  const americans = filterScientists({ continente: 'América' });
  assert.equal(americans.length, 55);

  const asians = filterScientists({ continente: 'Asia' });
  assert.equal(asians.length, 30);

  const africans = filterScientists({ continente: 'África' });
  assert.equal(africans.length, 13);

  const oceanians = filterScientists({ continente: 'Oceanía' });
  assert.equal(oceanians.length, 11);
});

test('search query finds exact scientist by name, field or contribution', () => {
  const darwinResults = filterScientists({ query: 'Darwin' });
  assert.ok(darwinResults.length >= 1);
  assert.equal(darwinResults[0].nombre, 'Charles Darwin');

  const dnaResults = filterScientists({ query: 'doble hélice' });
  assert.ok(dnaResults.length >= 2); // Watson & Crick

  const crisprResults = filterScientists({ query: 'CRISPR' });
  assert.equal(crisprResults.length, 2); // Charpentier & Doudna
});

test('adjacent scientist navigation works chronologically', () => {
  const nav = getAdjacentScientists('charles-darwin');
  assert.ok(nav.prev !== null);
  assert.ok(nav.next !== null);
  // Wallace is before Darwin (1858 vs 1859)
  assert.equal(nav.prev?.id, 'alfred-russel-wallace');
});

test('countries for continent are present', () => {
  const oceaniaCountries = getCountriesForContinent('Oceanía');
  assert.deepEqual(oceaniaCountries, ['Australia', 'Nueva Zelanda']);
});
