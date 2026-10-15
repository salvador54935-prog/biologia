import fs from 'node:fs';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import * as topojson from 'topojson-client';
import atlas from 'world-atlas/countries-110m.json' with { type: 'json' };

// Create projection centered on world
const width = 960;
const height = 500;
const projection = geoNaturalEarth1()
  .scale(155)
  .translate([width / 2, height / 2 - 10]);

const pathGenerator = geoPath(projection);

// Complete ISO numeric code to continent and Spanish name mapping
const COUNTRY_LOOKUP = {
  // América
  '032': { name: 'Argentina', continent: 'América' },
  '044': { name: 'Bahamas', continent: 'América' },
  '068': { name: 'Bolivia', continent: 'América' },
  '076': { name: 'Brasil', continent: 'América' },
  '084': { name: 'Belice', continent: 'América' },
  '124': { name: 'Canadá', continent: 'América' },
  '152': { name: 'Chile', continent: 'América' },
  '170': { name: 'Colombia', continent: 'América' },
  '188': { name: 'Costa Rica', continent: 'América' },
  '192': { name: 'Cuba', continent: 'América' },
  '214': { name: 'República Dominicana', continent: 'América' },
  '218': { name: 'Ecuador', continent: 'América' },
  '222': { name: 'El Salvador', continent: 'América' },
  '304': { name: 'Groenlandia', continent: 'América' },
  '320': { name: 'Guatemala', continent: 'América' },
  '328': { name: 'Guyana', continent: 'América' },
  '332': { name: 'Haití', continent: 'América' },
  '340': { name: 'Honduras', continent: 'América' },
  '388': { name: 'Jamaica', continent: 'América' },
  '484': { name: 'México', continent: 'América' },
  '558': { name: 'Nicaragua', continent: 'América' },
  '591': { name: 'Panamá', continent: 'América' },
  '600': { name: 'Paraguay', continent: 'América' },
  '604': { name: 'Perú', continent: 'América' },
  '630': { name: 'Puerto Rico', continent: 'América' },
  '740': { name: 'Surinam', continent: 'América' },
  '780': { name: 'Trinidad y Tobago', continent: 'América' },
  '840': { name: 'Estados Unidos', continent: 'América' },
  '858': { name: 'Uruguay', continent: 'América' },
  '862': { name: 'Venezuela', continent: 'América' },

  // Europa
  '008': { name: 'Albania', continent: 'Europa' },
  '040': { name: 'Austria', continent: 'Europa' },
  '056': { name: 'Bélgica', continent: 'Europa' },
  '070': { name: 'Bosnia y Herzegovina', continent: 'Europa' },
  '100': { name: 'Bulgaria', continent: 'Europa' },
  '112': { name: 'Bielorrusia', continent: 'Europa' },
  '191': { name: 'Croacia', continent: 'Europa' },
  '203': { name: 'Chequia', continent: 'Europa' },
  '208': { name: 'Dinamarca', continent: 'Europa' },
  '233': { name: 'Estonia', continent: 'Europa' },
  '246': { name: 'Finlandia', continent: 'Europa' },
  '250': { name: 'Francia', continent: 'Europa' },
  '276': { name: 'Alemania', continent: 'Europa' },
  '300': { name: 'Grecia', continent: 'Europa' },
  '348': { name: 'Hungría', continent: 'Europa' },
  '352': { name: 'Islandia', continent: 'Europa' },
  '372': { name: 'Irlanda', continent: 'Europa' },
  '380': { name: 'Italia', continent: 'Europa' },
  '428': { name: 'Letonia', continent: 'Europa' },
  '440': { name: 'Lituania', continent: 'Europa' },
  '442': { name: 'Luxemburgo', continent: 'Europa' },
  '498': { name: 'Moldavia', continent: 'Europa' },
  '499': { name: 'Montenegro', continent: 'Europa' },
  '528': { name: 'Países Bajos', continent: 'Europa' },
  '578': { name: 'Noruega', continent: 'Europa' },
  '616': { name: 'Polonia', continent: 'Europa' },
  '620': { name: 'Portugal', continent: 'Europa' },
  '642': { name: 'Rumanía', continent: 'Europa' },
  '643': { name: 'Rusia', continent: 'Europa' }, // En el PDF clasificado en Europa
  '688': { name: 'Serbia', continent: 'Europa' },
  '703': { name: 'Eslovaquia', continent: 'Europa' },
  '705': { name: 'Eslovenia', continent: 'Europa' },
  '724': { name: 'España', continent: 'Europa' },
  '752': { name: 'Suecia', continent: 'Europa' },
  '756': { name: 'Suiza', continent: 'Europa' },
  '804': { name: 'Ucrania', continent: 'Europa' },
  '807': { name: 'Macedonia del Norte', continent: 'Europa' },
  '826': { name: 'Reino Unido', continent: 'Europa' },
  '-99': { name: 'Kosovo', continent: 'Europa' },

  // Asia
  '004': { name: 'Afganistán', continent: 'Asia' },
  '031': { name: 'Azerbaiyán', continent: 'Asia' },
  '050': { name: 'Bangladés', continent: 'Asia' },
  '051': { name: 'Armenia', continent: 'Asia' },
  '064': { name: 'Bután', continent: 'Asia' },
  '096': { name: 'Brunéi', continent: 'Asia' },
  '104': { name: 'Birmania', continent: 'Asia' },
  '116': { name: 'Camboya', continent: 'Asia' },
  '144': { name: 'Sri Lanka', continent: 'Asia' },
  '156': { name: 'China', continent: 'Asia' },
  '158': { name: 'Taiwán', continent: 'Asia' },
  '268': { name: 'Georgia', continent: 'Asia' },
  '356': { name: 'India', continent: 'Asia' },
  '360': { name: 'Indonesia', continent: 'Asia' },
  '364': { name: 'Irán', continent: 'Asia' },
  '368': { name: 'Irak', continent: 'Asia' },
  '376': { name: 'Israel', continent: 'Asia' },
  '392': { name: 'Japón', continent: 'Asia' },
  '398': { name: 'Kazajistán', continent: 'Asia' },
  '400': { name: 'Jordania', continent: 'Asia' },
  '408': { name: 'Corea del Norte', continent: 'Asia' },
  '410': { name: 'Corea del Sur', continent: 'Asia' },
  '414': { name: 'Kuwait', continent: 'Asia' },
  '417': { name: 'Kirguistán', continent: 'Asia' },
  '418': { name: 'Laos', continent: 'Asia' },
  '422': { name: 'Líbano', continent: 'Asia' },
  '458': { name: 'Malasia', continent: 'Asia' },
  '496': { name: 'Mongolia', continent: 'Asia' },
  '512': { name: 'Omán', continent: 'Asia' },
  '524': { name: 'Nepal', continent: 'Asia' },
  '586': { name: 'Pakistán', continent: 'Asia' },
  '608': { name: 'Filipinas', continent: 'Asia' },
  '634': { name: 'Catar', continent: 'Asia' },
  '682': { name: 'Arabia Saudita', continent: 'Asia' },
  '704': { name: 'Vietnam', continent: 'Asia' },
  '760': { name: 'Siria', continent: 'Asia' },
  '762': { name: 'Tayikistán', continent: 'Asia' },
  '764': { name: 'Tailandia', continent: 'Asia' },
  '784': { name: 'Emiratos Árabes Unidos', continent: 'Asia' },
  '792': { name: 'Turquía', continent: 'Asia' }, // En el PDF clasificado en Asia
  '795': { name: 'Turkmenistán', continent: 'Asia' },
  '860': { name: 'Uzbekistán', continent: 'Asia' },
  '887': { name: 'Yemen', continent: 'Asia' },

  // África
  '012': { name: 'Argelia', continent: 'África' },
  '024': { name: 'Angola', continent: 'África' },
  '108': { name: 'Burundi', continent: 'África' },
  '120': { name: 'Camerún', continent: 'África' },
  '132': { name: 'Cabo Verde', continent: 'África' },
  '140': { name: 'República Centroafricana', continent: 'África' },
  '148': { name: 'Chad', continent: 'África' },
  '178': { name: 'Congo', continent: 'África' },
  '180': { name: 'República Democrática del Congo', continent: 'África' },
  '204': { name: 'Benín', continent: 'África' },
  '226': { name: 'Guinea Ecuatorial', continent: 'África' },
  '231': { name: 'Etiopía', continent: 'África' },
  '232': { name: 'Eritrea', continent: 'África' },
  '262': { name: 'Yibuti', continent: 'África' },
  '266': { name: 'Gabón', continent: 'África' },
  '270': { name: 'Gambia', continent: 'África' },
  '288': { name: 'Ghana', continent: 'África' },
  '324': { name: 'Guinea', continent: 'África' },
  '384': { name: 'Costa de Marfil', continent: 'África' },
  '404': { name: 'Kenia', continent: 'África' },
  '426': { name: 'Lesoto', continent: 'África' },
  '430': { name: 'Liberia', continent: 'África' },
  '434': { name: 'Libia', continent: 'África' },
  '450': { name: 'Madagascar', continent: 'África' },
  '454': { name: 'Malaui', continent: 'África' },
  '466': { name: 'Mali', continent: 'África' },
  '478': { name: 'Mauritania', continent: 'África' },
  '504': { name: 'Marruecos', continent: 'África' },
  '508': { name: 'Mozambique', continent: 'África' },
  '516': { name: 'Namibia', continent: 'África' },
  '562': { name: 'Níger', continent: 'África' },
  '566': { name: 'Nigeria', continent: 'África' },
  '646': { name: 'Ruanda', continent: 'África' },
  '686': { name: 'Senegal', continent: 'África' },
  '694': { name: 'Sierra Leona', continent: 'África' },
  '706': { name: 'Somalia', continent: 'África' },
  '710': { name: 'Sudáfrica', continent: 'África' },
  '728': { name: 'Sudán del Sur', continent: 'África' },
  '729': { name: 'Sudán', continent: 'África' },
  '748': { name: 'Suazilandia', continent: 'África' },
  '768': { name: 'Togo', continent: 'África' },
  '788': { name: 'Túnez', continent: 'África' },
  '800': { name: 'Uganda', continent: 'África' },
  '818': { name: 'Egipto', continent: 'África' },
  '834': { name: 'Tanzania', continent: 'África' },
  '854': { name: 'Burkina Faso', continent: 'África' },
  '894': { name: 'Zambia', continent: 'África' },
  '716': { name: 'Zimbabue', continent: 'África' },

  // Oceanía
  '036': { name: 'Australia', continent: 'Oceanía' },
  '242': { name: 'Fiyi', continent: 'Oceanía' },
  '554': { name: 'Nueva Zelanda', continent: 'Oceanía' },
  '598': { name: 'Papúa Nueva Guinea', continent: 'Oceanía' },
  '090': { name: 'Islas Salomón', continent: 'Oceanía' },
  '548': { name: 'Vanuatu', continent: 'Oceanía' },
  '882': { name: 'Samoa', continent: 'Oceanía' },

  // Antártida (No incluida en los 5 continentes del PDF)
  '010': { name: 'Antártida', continent: null },
};

// Import scientists data to count exactly per country
import { SCIENTISTS_DATA } from '../src/data/scientists.ts';

const scientistCountByCountry = {};
SCIENTISTS_DATA.forEach(s => {
  scientistCountByCountry[s.pais] = (scientistCountByCountry[s.pais] || 0) + 1;
});

const features = topojson.feature(atlas, atlas.objects.countries).features;

const projectedCountries = [];

features.forEach((f, idx) => {
  const featureId = String(f.id ?? `territory-${idx}`);
  const info = COUNTRY_LOOKUP[featureId] || { name: `Territorio ${idx}`, continent: null };
  const d = pathGenerator(f);
  if (!d) return;

  const centroid = pathGenerator.centroid(f);
  const scientistCount = scientistCountByCountry[info.name] || 0;

  projectedCountries.push({
    id: featureId,
    name: info.name,
    continent: info.continent,
    d,
    centroid: [Math.round(centroid[0] * 10) / 10, Math.round(centroid[1] * 10) / 10],
    scientistCount,
    hasRecords: scientistCount > 0,
  });
});

console.log(`Generated ${projectedCountries.length} projected countries.`);

// Generate land outline
const land = topojson.feature(atlas, atlas.objects.land);
const landPath = pathGenerator(land);

const tsContent = `// Archivo autogenerado con geometrías reales de proyección Natural Earth (d3-geo + world-atlas)
import { ContinentId } from '../types';

export interface MapCountryFeature {
  id: string;
  name: string;
  continent: ContinentId | null;
  d: string;
  centroid: [number, number];
  scientistCount: number;
  hasRecords: boolean;
}

export const WORLD_LAND_OUTLINE = ${JSON.stringify(landPath)};

export const WORLD_COUNTRIES: MapCountryFeature[] = ${JSON.stringify(projectedCountries, null, 2)};
`;

fs.writeFileSync('src/data/worldMapData.ts', tsContent);
console.log('Saved src/data/worldMapData.ts successfully!');
