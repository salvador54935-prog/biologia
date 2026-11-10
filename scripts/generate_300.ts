import { writeFileSync, readFileSync } from 'fs';
import { SCIENTISTS_DATA } from '../src/data/scientists.ts';
import { Scientist } from '../src/types.ts';

const existingNames = new Set(SCIENTISTS_DATA.map(s => s.nombre.toLowerCase().trim()));
const existingIds = new Set(SCIENTISTS_DATA.map(s => s.id.toLowerCase().trim()));

console.log("Existing scientists count:", existingNames.size);
