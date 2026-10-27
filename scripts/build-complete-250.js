import fs from 'node:fs';
import { SCIENTISTS_DATA } from '../src/data/scientists.ts';

const existingIds = new Set(SCIENTISTS_DATA.map(s => s.id));
const existingNames = new Set(SCIENTISTS_DATA.map(s => s.nombre.toLowerCase().trim()));

// Function to safely check and add
const list = [];
function add(s) {
  if (existingIds.has(s.id)) {
    throw new Error(`Duplicate ID with original: ${s.id}`);
  }
  const normName = s.nombre.toLowerCase().trim();
  if (existingNames.has(normName)) {
    throw new Error(`Duplicate Name with original: ${s.nombre}`);
  }
  const inList = list.find(x => x.id === s.id || x.nombre.toLowerCase().trim() === normName);
  if (inList) {
    throw new Error(`Duplicate in supplementary list: ${s.id} / ${s.nombre}`);
  }
  list.push({
    ...s,
    esComplementario: true,
    paginaPDF: null,
  });
}

// =========================================================================
// EUROPA (75)
// =========================================================================
add({
  id: 'hildegarda-de-bingen',
  nombre: 'Hildegarda de Bingen',
  pais: 'Alemania',
  continente: 'Europa',
  vida: '1098 – 1179',
  nacimientoLugar: 'Bermersheim vor der Höhe',
  aportePeriodo: 'c. 1155',
  anioNumerico: 1155,
  campo: 'Historia natural y medicina',
  aporteDescripcion: 'Autora de Physica y Causae et Curae, catalogó propiedades biológicas y terapéuticas de plantas, animales y minerales medievales.',
  lugaresTrabajo: 'Monasterio de Rupertsberg (Bingen)',
  esPionera: true,
  fuenteReferencia: 'Abadía de Rupertsberg / Diccionario Histórico de la Medicina',
});

add({
  id: 'san-alberto-magno',
  nombre: 'San Alberto Magno',
  pais: 'Alemania',
  continente: 'Europa',
  vida: 'c. 1200 – 1280',
  nacimientoLugar: 'Lauingen, Baviera',
  aportePeriodo: 'c. 1260',
  anioNumerico: 1260,
  campo: 'Botánica y zoología',
  aporteDescripcion: 'Escribió De vegetalibus et plantis y De animalibus, sistematizando la morfología de las plantas y la embriología comparada medieval.',
  lugaresTrabajo: 'Colonia y París',
  fuenteReferencia: 'Stanford Encyclopedia of Philosophy',
});

add({
  id: 'andrea-cesalpino',
  nombre: 'Andrea Cesalpino',
  pais: 'Italia',
  continente: 'Europa',
  vida: '1519 – 1603',
  nacimientoLugar: 'Arezzo, Toscana',
  aportePeriodo: '1583',
  anioNumerico: 1583,
  campo: 'Botánica y fisiología',
  aporteDescripcion: 'Publicó De plantis libri XVI, considerado el primer tratado moderno sistemático de clasificación vegetal por flores y frutos.',
  lugaresTrabajo: 'Universidad de Pisa y Roma',
  fuenteReferencia: 'Enciclopedia Británica / Jardín Botánico de Pisa',
});

add({
  id: 'ulisse-aldrovandi',
  nombre: 'Ulisse Aldrovandi',
  pais: 'Italia',
  continente: 'Europa',
  vida: '1522 – 1605',
  nacimientoLugar: 'Bolonia',
  aportePeriodo: '1599',
  anioNumerico: 1599,
  campo: 'Historia natural',
  aporteDescripcion: 'Pionero de la ornitología y la museología biológica; reunió una de las colecciones zoológicas y herbarios más extensas del Renacimiento.',
  lugaresTrabajo: 'Universidad de Bolonia',
  fuenteReferencia: 'Universidad de Bolonia / Archivo Histórico',
});

add({
  id: 'guillaume-rondelet',
  nombre: 'Guillaume Rondelet',
  pais: 'Francia',
  continente: 'Europa',
  vida: '1507 – 1566',
  nacimientoLugar: 'Montpellier',
  aportePeriodo: '1554',
  anioNumerico: 1554,
  campo: 'Ictiología y anatomía marina',
  aporteDescripcion: 'Publicó Libri de piscibus marinis, primer tratado moderno ilustrado sobre la anatomía y clasificación de peces y cetáceos marinos.',
  lugaresTrabajo: 'Universidad de Montpellier',
  fuenteReferencia: 'Faculté de Médecine de Montpellier',
});

add({
  id: 'pierre-belon',
  nombre: 'Pierre Belon',
  pais: 'Francia',
  continente: 'Europa',
  vida: '1517 – 1564',
  nacimientoLugar: 'Souletière, Cerans-Foulletourte',
  aportePeriodo: '1555',
  anioNumerico: 1555,
  campo: 'Anatomía comparada y ornitología',
  aporteDescripcion: 'Publicó L\'histoire de la nature des oyseaux, realizando la primera comparación ósea directa entre el esqueleto humano y el de las aves.',
  lugaresTrabajo: 'París',
  fuenteReferencia: 'Bibliothèque Nationale de France',
});

add({
  id: 'gaspard-bauhin',
  nombre: 'Gaspard Bauhin',
  pais: 'Suiza',
  continente: 'Europa',
  vida: '1560 – 1624',
  nacimientoLugar: 'Basilea',
  aportePeriodo: '1623',
  anioNumerico: 1623,
  campo: 'Botánica',
  aporteDescripcion: 'En Pinax theatri botanici describió miles de plantas e introdujo la nomenclatura preliminar por género y especie precursora de Linneo.',
  lugaresTrabajo: 'Universidad de Basilea',
  fuenteReferencia: 'Real Sociedad Linneana',
});

add({
  id: 'jan-baptist-van-helmont',
  nombre: 'Jan Baptist van Helmont',
  pais: 'Bélgica',
  continente: 'Europa',
  vida: '1580 – 1644',
  nacimientoLugar: 'Bruselas',
  aportePeriodo: '1648',
  anioNumerico: 1648,
  campo: 'Fisiología vegetal',
  aporteDescripcion: 'Realizó el célebre experimento del sauce de 5 años demostrando que la biomasa vegetal no proviene únicamente de la tierra.',
  lugaresTrabajo: 'Vilvoorde',
  fuenteReferencia: 'Royal Society of Chemistry',
});

add({
  id: 'regnier-de-graaf',
  nombre: 'Regnier de Graaf',
  pais: 'Países Bajos',
  continente: 'Europa',
  vida: '1641 – 1673',
  nacimientoLugar: 'Schoonhoven',
  aportePeriodo: '1672',
  anioNumerico: 1672,
  campo: 'Fisiología reproductiva',
  aporteDescripcion: 'Descubrió y describió los folículos ováricos (folículos de Graaf) y estudió el jugo pancreático y la reproducción mamífera.',
  lugaresTrabajo: 'Delft',
  fuenteReferencia: 'Royal College of Physicians',
});

add({
  id: 'nehemiah-grew',
  nombre: 'Nehemiah Grew',
  pais: 'Reino Unido',
  continente: 'Europa',
  vida: '1641 – 1712',
  nacimientoLugar: 'Mancetter, Warwickshire',
  aportePeriodo: '1682',
  anioNumerico: 1682,
  campo: 'Anatomía vegetal',
  aporteDescripcion: 'Publicó The Anatomy of Plants, fundando la anatomía microscópica de las plantas e identificando que los estambres son órganos masculinos.',
  lugaresTrabajo: 'Londres (Royal Society)',
  fuenteReferencia: 'Royal Society de Londres',
});

add({
  id: 'stephen-hales',
  nombre: 'Stephen Hales',
  pais: 'Reino Unido',
  continente: 'Europa',
  vida: '1677 – 1761',
  nacimientoLugar: 'Bekesbourne, Kent',
  aportePeriodo: '1727',
  anioNumerico: 1727,
  campo: 'Fisiología vegetal',
  aporteDescripcion: 'En Vegetable Staticks cuantificó la transpiración y la presión de la savia en las plantas mediante métodos biofísicos pioneros.',
  lugaresTrabajo: 'Teddington, Middlesex',
  fuenteReferencia: 'Royal Society / Copley Medal Archive',
});

add({
  id: 'laura-bassi',
  nombre: 'Laura Bassi',
  pais: 'Italia',
  continente: 'Europa',
  vida: '1711 – 1778',
  nacimientoLugar: 'Bolonia',
  aportePeriodo: '1732',
  anioNumerico: 1732,
  campo: 'Fisiología y biofísica',
  aporteDescripcion: 'Primera mujer en obtener una cátedra universitaria en Europa; investigó los efectos fisiológicos y de contracción neuromuscular.',
  lugaresTrabajo: 'Universidad de Bolonia',
  esPionera: true,
  fuenteReferencia: 'Academia de Ciencias del Instituto de Bolonia',
});

add({
  id: 'charles-bonnet',
  nombre: 'Charles Bonnet',
  pais: 'Suiza',
  continente: 'Europa',
  vida: '1720 – 1793',
  nacimientoLugar: 'Ginebra',
  aportePeriodo: '1745',
  anioNumerico: 1745,
  campo: 'Entomología y embriología',
  aporteDescripcion: 'Descubrió la partenogénesis en los pulgones (áfidos), demostrando la reproducción asexual en insectos.',
  lugaresTrabajo: 'Ginebra',
  fuenteReferencia: 'Académie des Sciences de París',
});

add({
  id: 'jan-ingenhousz',
  nombre: 'Jan Ingenhousz',
  pais: 'Países Bajos',
  continente: 'Europa',
  vida: '1730 – 1799',
  nacimientoLugar: 'Breda',
  aportePeriodo: '1779',
  anioNumerico: 1779,
  campo: 'Fisiología vegetal',
  aporteDescripcion: 'Descubrió que las plantas necesitan luz solar para purificar el aire y liberar oxígeno, sentando las bases de la fotosíntesis.',
  lugaresTrabajo: 'Londres y Viena',
  fuenteReferencia: 'Royal Society of Chemistry',
});

add({
  id: 'antoine-laurent-de-jussieu',
  nombre: 'Antoine-Laurent de Jussieu',
  pais: 'Francia',
  continente: 'Europa',
  vida: '1748 – 1836',
  nacimientoLugar: 'Lyon',
  aportePeriodo: '1789',
  anioNumerico: 1789,
  campo: 'Botánica',
  aporteDescripcion: 'En Genera Plantarum propuso el sistema natural de clasificación vegetal fundamentado en familias botánicas.',
  lugaresTrabajo: 'Jardin des Plantes (París)',
  fuenteReferencia: 'Muséum National d’Histoire Naturelle',
});

add({
  id: 'etienne-geoffroy-saint-hilaire',
  nombre: 'Étienne Geoffroy Saint-Hilaire',
  pais: 'Francia',
  continente: 'Europa',
  vida: '1772 – 1844',
  nacimientoLugar: 'Étampes',
  aportePeriodo: '1818',
  anioNumerico: 1818,
  campo: 'Anatomía comparada',
  aporteDescripcion: 'Formuló la teoría de la unidad de plan corporal (homologías morfológicas) entre todos los animales con su Philosophie anatomique.',
  lugaresTrabajo: 'París',
  fuenteReferencia: 'Académie des Sciences',
});

add({
  id: 'karl-ernst-von-baer',
  nombre: 'Karl Ernst von Baer',
  pais: 'Estonia',
  continente: 'Europa',
  vida: '1792 – 1876',
  nacimientoLugar: 'Piep (hoy Piibe)',
  aportePeriodo: '1827',
  anioNumerico: 1827,
  campo: 'Embriología comparada',
  aporteDescripcion: 'Descubrió el óvulo de los mamíferos y formuló las leyes del desarrollo embrionario de las capas germinales (leyes de von Baer).',
  lugaresTrabajo: 'Königsberg y San Petersburgo',
  fuenteReferencia: 'Academia Imperial de Ciencias de San Petersburgo',
});

add({
  id: 'jeanne-villepreux-power',
  nombre: 'Jeanne Villepreux-Power',
  pais: 'Francia',
  continente: 'Europa',
  vida: '1794 – 1871',
  nacimientoLugar: 'Juilhac, Corrèze',
  aportePeriodo: '1832',
  anioNumerico: 1832,
  campo: 'Biología marina',
  aporteDescripcion: 'Inventó los primeros acuarios marinos de vidrio para experimentación y demostró cómo Argonauta argo secreta su propia concha.',
  lugaresTrabajo: 'Sicilia y París',
  esPionera: true,
  fuenteReferencia: 'Zoological Society of London Archive',
});

add({
  id: 'jan-evangelista-purkyne',
  nombre: 'Jan Evangelista Purkyně',
  pais: 'Chequia',
  continente: 'Europa',
  vida: '1787 – 1869',
  nacimientoLugar: 'Libochovice, Bohemia',
  aportePeriodo: '1837',
  anioNumerico: 1837,
  campo: 'Fisiología y citología',
  aporteDescripcion: 'Descubrió las células de Purkinje del cerebelo, las fibras de conducción cardíacas y acuñó el término protoplasma.',
  lugaresTrabajo: 'Breslavia y Praga',
  fuenteReferencia: 'Universidad Carolina de Praga',
});

add({
  id: 'richard-owen',
  nombre: 'Richard Owen',
  pais: 'Reino Unido',
  continente: 'Europa',
  vida: '1804 – 1892',
  nacimientoLugar: 'Lancaster',
  aportePeriodo: '1842',
  anioNumerico: 1842,
  campo: 'Paleontología y anatomía',
  aporteDescripcion: 'Acuñó la palabra «dinosaurio», definió formalmente los conceptos de homología y analogía anatómica y fundó el Museo de Historia Natural de Londres.',
  lugaresTrabajo: 'Museo de Historia Natural de Londres',
  fuenteReferencia: 'Natural History Museum London',
});

add({
  id: 'robert-remak',
  nombre: 'Robert Remak',
  pais: 'Polonia',
  continente: 'Europa',
  vida: '1815 – 1865',
  nacimientoLugar: 'Posen (Poznań)',
  aportePeriodo: '1852',
  anioNumerico: 1852,
  campo: 'Embriología y citología',
  aporteDescripcion: 'Descubrió que las células provienen de la división binaria de células preexistentes y caracterizó las tres capas germinales embrionarias.',
  lugaresTrabajo: 'Berlín',
  fuenteReferencia: 'Universidad Humboldt de Berlín',
});

add({
  id: 'heinrich-anton-de-bary',
  nombre: 'Heinrich Anton de Bary',
  pais: 'Alemania',
  continente: 'Europa',
  vida: '1831 – 1888',
  nacimientoLugar: 'Fráncfort del Meno',
  aportePeriodo: '1879',
  anioNumerico: 1879,
  campo: 'Micología y fitopatología',
  aporteDescripcion: 'Fundó la micología y fitopatología moderna; acuñó el término «simbiosis» al demostrar la naturaleza doble de los líquenes.',
  lugaresTrabajo: 'Estrasburgo y Halle',
  fuenteReferencia: 'Sociedad Botánica de Alemania',
});

add({
  id: 'beatrix-potter',
  nombre: 'Beatrix Potter',
  pais: 'Reino Unido',
  continente: 'Europa',
  vida: '1866 – 1943',
  nacimientoLugar: 'Kensington, Londres',
  aportePeriodo: '1897',
  anioNumerico: 1897,
  campo: 'Micología',
  aporteDescripcion: 'Investigó la germinación de esporas de hongos y la hibridación simbiótica de líquenes, redactando el artículo pionero presentado a la Linnean Society.',
  lugaresTrabajo: 'Londres y Lake District',
  esPionera: true,
  fuenteReferencia: 'Linnean Society of London',
});

add({
  id: 'lise-meitner',
  nombre: 'Lise Meitner',
  pais: 'Austria',
  continente: 'Europa',
  vida: '1878 – 1968',
  nacimientoLugar: 'Viena',
  aportePeriodo: '1939',
  anioNumerico: 1939,
  campo: 'Biofísica y radiobiología',
  aporteDescripcion: 'Pionera en la fisión nuclear y en el análisis del impacto de los radioisótopos en el tejido orgánico y el trazado biofísico celular.',
  lugaresTrabajo: 'Berlín y Estocolmo',
  esPionera: true,
  fuenteReferencia: 'Academia de Ciencias de Suecia',
});

add({
  id: 'kristine-bonnevie',
  nombre: 'Kristine Bonnevie',
  pais: 'Noruega',
  continente: 'Europa',
  vida: '1872 – 1948',
  nacimientoLugar: 'Trondheim',
  aportePeriodo: '1912',
  anioNumerico: 1912,
  campo: 'Genética y embriología',
  aporteDescripcion: 'Primera profesora catedrática en Noruega; investigó la base genética del desarrollo dérmico y las huellas dactilares embrionarias.',
  lugaresTrabajo: 'Universidad de Oslo',
  esPionera: true,
  fuenteReferencia: 'Universidad de Oslo / Academia Noruega de Ciencias',
});

add({
  id: 'muriel-wheldale-onslow',
  nombre: 'Muriel Wheldale Onslow',
  pais: 'Reino Unido',
  continente: 'Europa',
  vida: '1880 – 1932',
  nacimientoLugar: 'Birmingham',
  aportePeriodo: '1909',
  anioNumerico: 1909,
  campo: 'Genética bioquímica',
  aporteDescripcion: 'Demostró por primera vez que la herencia genética controla la síntesis de pigmentos antocianinas en flores (antirrhinum).',
  lugaresTrabajo: 'Cambridge',
  esPionera: true,
  fuenteReferencia: 'Biochemical Society UK',
});

add({
  id: 'christiane-nusslein-volhard',
  nombre: 'Christiane Nüsslein-Volhard',
  pais: 'Alemania',
  continente: 'Europa',
  vida: '1942 – actualidad',
  nacimientoLugar: 'Heyrothsberge (Magdeburgo)',
  aportePeriodo: '1980',
  anioNumerico: 1980,
  campo: 'Genética del desarrollo',
  aporteDescripcion: 'Descubrió los genes que controlan la segmentación y el plan corporal en embriones de Drosophila; premio Nobel en 1995.',
  lugaresTrabajo: 'Tubinga (Instituto Max Planck)',
  esPionera: true,
  fuenteReferencia: 'Nobel Media / Instituto Max Planck',
});

add({
  id: 'agnes-arber',
  nombre: 'Agnes Arber',
  pais: 'Reino Unido',
  continente: 'Europa',
  vida: '1879 – 1960',
  nacimientoLugar: 'Londres',
  aportePeriodo: '1920',
  anioNumerico: 1920,
  campo: 'Morfología vegetal y filosofía botánica',
  aporteDescripcion: 'Autora de Water Plants y The Gramineae; primera mujer botánica elegida Fellow de la Royal Society de Londres.',
  lugaresTrabajo: 'Cambridge',
  esPionera: true,
  fuenteReferencia: 'The Royal Society',
});

add({
  id: 'marjory-stephenson',
  nombre: 'Marjory Stephenson',
  pais: 'Reino Unido',
  continente: 'Europa',
  vida: '1885 – 1948',
  nacimientoLugar: 'Burwell, Cambridgeshire',
  aportePeriodo: '1930',
  anioNumerico: 1930,
  campo: 'Metabolismo bacteriano',
  aporteDescripcion: 'Pionera de la microbiología química y autora de Bacterial Metabolism, libro fundacional del estudio enzimático de microorganismos.',
  lugaresTrabajo: 'Universidad de Cambridge',
  esPionera: true,
  fuenteReferencia: 'Microbiology Society / Royal Society',
});

add({
  id: 'erwin-neher',
  nombre: 'Erwin Neher',
  pais: 'Alemania',
  continente: 'Europa',
  vida: '1944 – actualidad',
  nacimientoLugar: 'Landsberg am Lech, Baviera',
  aportePeriodo: '1976',
  anioNumerico: 1976,
  campo: 'Biofísica y neurobiología',
  aporteDescripcion: 'Desarrolló la técnica de patch-clamp para registrar la corriente de canales iónicos individuales en membranas celulares; premio Nobel en 1991.',
  lugaresTrabajo: 'Gotinga (Instituto Max Planck)',
  fuenteReferencia: 'Nobel Media / Max-Planck-Gesellschaft',
});

add({
  id: 'bert-sakmann',
  nombre: 'Bert Sakmann',
  pais: 'Alemania',
  continente: 'Europa',
  vida: '1942 – actualidad',
  nacimientoLugar: 'Stuttgart',
  aportePeriodo: '1976',
  anioNumerico: 1976,
  campo: 'Fisiología celular',
  aporteDescripcion: 'Co-desarrollador de la técnica patch-clamp, elucidando la función de canales iónicos en la transmisión sináptica; premio Nobel en 1991.',
  lugaresTrabajo: 'Gotinga y Heidelberg',
  fuenteReferencia: 'Nobel Media',
});

add({
  id: 'aleksandr-kovalevski',
  nombre: 'Aleksandr Kovalevski',
  pais: 'Rusia',
  continente: 'Europa',
  vida: '1840 – 1901',
  nacimientoLugar: 'Vārkava (hoy Letonia)',
  aportePeriodo: '1866',
  anioNumerico: 1866,
  campo: 'Embriología evolutiva',
  aporteDescripcion: 'Demostró que los urocordados (ascidias) y el anfioxo poseen notocorda y hendiduras branquiales, uniendo a invertebrados con vertebrados.',
  lugaresTrabajo: 'San Petersburgo',
  fuenteReferencia: 'Academia Imperial de Ciencias',
});

add({
  id: 'clara-franzini-armstrong',
  nombre: 'Clara Franzini-Armstrong',
  pais: 'Italia',
  continente: 'Europa',
  vida: '1938 – actualidad',
  nacimientoLugar: 'Florencia',
  aportePeriodo: '1970',
  anioNumerico: 1970,
  campo: 'Biología celular y microscopía muscular',
  aporteDescripcion: 'Descubrió la arquitectura ultraestructural de las tríadas musculares y la liberación de calcio en el retículo sarcoplásmico.',
  lugaresTrabajo: 'Universidad de Pensilvania',
  esPionera: true,
  fuenteReferencia: 'National Academy of Sciences / Biophysical Society',
});

add({
  id: 'marthe-gautier',
  nombre: 'Marthe Gautier',
  pais: 'Francia',
  continente: 'Europa',
  vida: '1925 – 2022',
  nacimientoLugar: 'Montenils, Sena y Marne',
  aportePeriodo: '1959',
  anioNumerico: 1959,
  campo: 'Citogenética médica',
  aporteDescripcion: 'Descubrió mediante cultivo celular la trisomía 21 causante del síndrome de Down, primer defecto cromosómico humano identificado.',
  lugaresTrabajo: 'Hospital Trousseau (París)',
  esPionera: true,
  fuenteReferencia: 'INSERM / Société Française de Génétique Humaine',
});

add({
  id: 'felix-d-herelle',
  nombre: 'Félix d\'Hérelle',
  pais: 'Francia',
  continente: 'Europa',
  vida: '1873 – 1949',
  nacimientoLugar: 'París',
  aportePeriodo: '1917',
  anioNumerico: 1917,
  campo: 'Virología y microbiología',
  aporteDescripcion: 'Co-descubrió los bacteriófagos (virus que atacan bacterias) e inició la fagoterapia aplicada al tratamiento de infecciones bacterianas.',
  lugaresTrabajo: 'Instituto Pasteur (París) y Tiflis',
  fuenteReferencia: 'Institut Pasteur',
});

add({
  id: 'edmond-sergent',
  nombre: 'Edmond Sergent',
  pais: 'Francia',
  continente: 'Europa',
  vida: '1876 – 1969',
  nacimientoLugar: 'Philippeville',
  aportePeriodo: '1921',
  anioNumerico: 1921,
  campo: 'Parasitología e inmunología tropical',
  aporteDescripcion: 'Descubrió el concepto de premunición (inmunidad adquirida mantenida por la presencia persistente del parásito) en malaria.',
  lugaresTrabajo: 'Instituto Pasteur de Argelia',
  fuenteReferencia: 'Institut Pasteur d\'Algérie',
});

add({
  id: 'albert-calmette',
  nombre: 'Albert Calmette',
  pais: 'Francia',
  continente: 'Europa',
  vida: '1863 – 1933',
  nacimientoLugar: 'Niza',
  aportePeriodo: '1921',
  anioNumerico: 1921,
  campo: 'Bacteriología e inmunología',
  aporteDescripcion: 'Desarrolló junto con Camille Guérin la vacuna BCG contra la tuberculosis y formuló los primeros sueros antiofídicos antiveneno.',
  lugaresTrabajo: 'Instituto Pasteur de Lille y París',
  fuenteReferencia: 'Institut Pasteur',
});

add({
  id: 'camille-guerin',
  nombre: 'Camille Guérin',
  pais: 'Francia',
  continente: 'Europa',
  vida: '1872 – 1961',
  nacimientoLugar: 'Poitiers',
  aportePeriodo: '1921',
  anioNumerico: 1921,
  campo: 'Inmunología y veterinaria',
  aporteDescripcion: 'Atenuó el bacilo Mycobacterium bovis tras 230 pases sucesivos para crear la vacuna BCG protectora frente a la tuberculosis.',
  lugaresTrabajo: 'Instituto Pasteur de Lille',
  fuenteReferencia: 'Institut Pasteur',
});

add({
  id: 'paul-nurse',
  nombre: 'Paul Nurse',
  pais: 'Reino Unido',
  continente: 'Europa',
  vida: '1949 – actualidad',
  nacimientoLugar: 'Norwich, Norfolk',
  aportePeriodo: '1987',
  anioNumerico: 1987,
  campo: 'Biología celular y ciclo celular',
  aporteDescripcion: 'Descubrió el gen cdc2 y las quinasas dependientes de ciclinas (CDK) que regulan la división celular; premio Nobel en 2001.',
  lugaresTrabajo: 'Oxford e Instituto Francis Crick',
  fuenteReferencia: 'Nobel Media / Francis Crick Institute',
});

add({
  id: 'tim-hunt',
  nombre: 'Tim Hunt',
  pais: 'Reino Unido',
  continente: 'Europa',
  vida: '1943 – actualidad',
  nacimientoLugar: 'Neston, Cheshire',
  aportePeriodo: '1982',
  anioNumerico: 1982,
  campo: 'Bioquímica celular',
  aporteDescripcion: 'Descubrió las ciclinas, proteínas que se acumulan y degradan cíclicamente regulando las transiciones del ciclo celular; premio Nobel en 2001.',
  lugaresTrabajo: 'Marine Biological Laboratory y Cancer Research UK',
  fuenteReferencia: 'Nobel Media',
});

add({
  id: 'john-sulston',
  nombre: 'John Sulston',
  pais: 'Reino Unido',
  continente: 'Europa',
  vida: '1942 – 2018',
  nacimientoLugar: 'Fulmer, Buckinghamshire',
  aportePeriodo: '1983',
  anioNumerico: 1983,
  campo: 'Genómica y biología del desarrollo',
  aporteDescripcion: 'Trazó el linaje celular completo de las 959 células somáticas de C. elegans y lideró el Wellcome Sanger Institute en el Genoma Humano.',
  lugaresTrabajo: 'Cambridge (LMB y Sanger Institute)',
  fuenteReferencia: 'Nobel Media / Wellcome Sanger Institute',
});

add({
  id: 'alec-jeffreys',
  nombre: 'Alec Jeffreys',
  pais: 'Reino Unido',
  continente: 'Europa',
  vida: '1950 – actualidad',
  nacimientoLugar: 'Oxford',
  aportePeriodo: '1984',
  anioNumerico: 1984,
  campo: 'Genética molecular y forense',
  aporteDescripcion: 'Inventó la huella genética por ADN (DNA fingerprinting) mediante análisis de minisatélites repetitivos en tándem.',
  lugaresTrabajo: 'Universidad de Leicester',
  fuenteReferencia: 'Royal Society of London / Copley Medal',
});

add({
  id: 'mary-lyon',
  nombre: 'Mary Lyon',
  pais: 'Reino Unido',
  continente: 'Europa',
  vida: '1925 – 2014',
  nacimientoLugar: 'Norwich',
  aportePeriodo: '1961',
  anioNumerico: 1961,
  campo: 'Genética de mamíferos',
  aporteDescripcion: 'Propuso la hipótesis de la «lionización»: la inactivación aleatoria del cromosoma X en hembras de mamíferos.',
  lugaresTrabajo: 'MRC Radiobiology Unit (Harwell)',
  esPionera: true,
  fuenteReferencia: 'Royal Society / Wolf Prize in Medicine',
});

add({
  id: 'charlotte-auerbach',
  nombre: 'Charlotte Auerbach',
  pais: 'Alemania',
  continente: 'Europa',
  vida: '1899 – 1994',
  nacimientoLugar: 'Krefeld',
  aportePeriodo: '1941',
  anioNumerico: 1941,
  campo: 'Genética de mutagénesis',
  aporteDescripcion: 'Descubrió junto con J. M. Robson que las sustancias químicas (gas mostaza) provocan mutaciones en el material genético de Drosophila.',
  lugaresTrabajo: 'Universidad de Edimburgo',
  esPionera: true,
  fuenteReferencia: 'Royal Society of Edinburgh',
});

add({
  id: 'jules-hoffmann',
  nombre: 'Jules Hoffmann',
  pais: 'Luxemburgo',
  continente: 'Europa',
  vida: '1941 – actualidad',
  nacimientoLugar: 'Echternach',
  aportePeriodo: '1996',
  anioNumerico: 1996,
  campo: 'Inmunología innata',
  aporteDescripcion: 'Descubrió el papel del receptor Toll en la respuesta inmune innata antimicrobiana en Drosophila melanogaster; premio Nobel en 2011.',
  lugaresTrabajo: 'Estrasburgo (CNRS)',
  fuenteReferencia: 'Nobel Media / Académie des Sciences',
});

add({
  id: 'arvid-carlsson',
  nombre: 'Arvid Carlsson',
  pais: 'Suecia',
  continente: 'Europa',
  vida: '1923 – 2018',
  nacimientoLugar: 'Uppsala',
  aportePeriodo: '1958',
  anioNumerico: 1958,
  campo: 'Neurobiología y farmacología',
  aporteDescripcion: 'Demostró que la dopamina es un neurotransmisor cerebral autónomo cuya deficiencia provoca la enfermedad de Parkinson; premio Nobel en 2000.',
  lugaresTrabajo: 'Universidad de Gotemburgo',
  fuenteReferencia: 'Nobel Media',
});

add({
  id: 'torsten-wiesel',
  nombre: 'Torsten Wiesel',
  pais: 'Suecia',
  continente: 'Europa',
  vida: '1924 – actualidad',
  nacimientoLugar: 'Uppsala',
  aportePeriodo: '1962',
  anioNumerico: 1962,
  campo: 'Neurofisiología de la visión',
  aporteDescripcion: 'Descubrió junto con David Hubel las columnas de dominancia ocular y el procesamiento de la información en la corteza visual; premio Nobel en 1981.',
  lugaresTrabajo: 'Universidad Harvard y Rockefeller',
  fuenteReferencia: 'Nobel Media',
});

add({
  id: 'soren-sorensen',
  nombre: 'S. P. L. Sørensen',
  pais: 'Dinamarca',
  continente: 'Europa',
  vida: '1868 – 1939',
  nacimientoLugar: 'Havrebjerg',
  aportePeriodo: '1909',
  anioNumerico: 1909,
  campo: 'Bioquímica enzimática',
  aporteDescripcion: 'Introdujo la escala de pH y demostró el papel decisivo de la concentración de iones hidrógeno en la actividad de las enzimas.',
  lugaresTrabajo: 'Laboratorio Carlsberg (Copenhague)',
  fuenteReferencia: 'Carlsberg Foundation',
});

add({
  id: 'august-krogh',
  nombre: 'August Krogh',
  pais: 'Dinamarca',
  continente: 'Europa',
  vida: '1874 – 1949',
  nacimientoLugar: 'Grenaa',
  aportePeriodo: '1920',
  anioNumerico: 1920,
  campo: 'Fisiología respiratoria y capilar',
  aporteDescripcion: 'Descubrió el mecanismo de regulación motora de los capilares sanguíneos en el músculo esquelético; premio Nobel en 1920.',
  lugaresTrabajo: 'Universidad de Copenhague',
  fuenteReferencia: 'Nobel Media',
});

add({
  id: 'marie-krogh',
  nombre: 'Marie Krogh',
  pais: 'Dinamarca',
  continente: 'Europa',
  vida: '1874 – 1943',
  nacimientoLugar: 'Vildbjerg',
  aportePeriodo: '1910',
  anioNumerico: 1910,
  campo: 'Fisiología pulmonar',
  aporteDescripcion: 'Demostró mediante la prueba de monóxido de carbono que el intercambio de gases en los alvéolos pulmonares ocurre por difusión pasiva.',
  lugaresTrabajo: 'Universidad de Copenhague',
  esPionera: true,
  fuenteReferencia: 'Royal Danish Academy of Sciences',
});

add({
  id: 'jens-christian-skou',
  nombre: 'Jens Christian Skou',
  pais: 'Dinamarca',
  continente: 'Europa',
  vida: '1918 – 2018',
  nacimientoLugar: 'Lemvig',
  aportePeriodo: '1957',
  anioNumerico: 1957,
  campo: 'Bioquímica de membranas',
  aporteDescripcion: 'Descubrió la bomba de sodio-potasio (Na+/K+-ATPasa), la primera enzima transportadora de iones transmembrana; premio Nobel en 1997.',
  lugaresTrabajo: 'Universidad de Aarhus',
  fuenteReferencia: 'Nobel Media',
});

add({
  id: 'antonio-scarpa',
  nombre: 'Antonio Scarpa',
  pais: 'Italia',
  continente: 'Europa',
  vida: '1752 – 1832',
  nacimientoLugar: 'Motta di Livenza',
  aportePeriodo: '1789',
  anioNumerico: 1789,
  campo: 'Anatomía e histología sensorial',
  aporteDescripcion: 'Describió la anatomía microscópica del oído interno (ganglio de Scarpa, endolinfa) y la inervación del corazón.',
  lugaresTrabajo: 'Universidad de Pavía',
  fuenteReferencia: 'Academia de Ciencias de Turín',
});

add({
  id: 'filippo-pacini',
  nombre: 'Filippo Pacini',
  pais: 'Italia',
  continente: 'Europa',
  vida: '1812 – 1883',
  nacimientoLugar: 'Pistoia',
  aportePeriodo: '1854',
  anioNumerico: 1854,
  campo: 'Bacteriología y neuroanatomía',
  aporteDescripcion: 'Descubrió los corpúsculos táctiles de Pacini y aisló por primera vez el bacilo del cólera (Vibrio cholerae) 30 años antes que Koch.',
  lugaresTrabajo: 'Florencia',
  fuenteReferencia: 'Universidad de Florencia',
});

add({
  id: 'angela-nieto',
  nombre: 'Ángela Nieto',
  pais: 'España',
  continente: 'Europa',
  vida: '1960 – actualidad',
  nacimientoLugar: 'Madrid',
  aportePeriodo: '1994',
  anioNumerico: 1994,
  campo: 'Biología del desarrollo y biomedicina',
  aporteDescripcion: 'Descubrió el papel de la transición epitelio-mesénquima (EMT) en el desarrollo embrionario y su reactivación en la metástasis tumoral.',
  lugaresTrabajo: 'Instituto de Neurociencias de Alicante (CSIC-UMH)',
  esPionera: true,
  fuenteReferencia: 'Premio Nacional de Investigación / Premio L\'Oréal-UNESCO',
});

add({
  id: 'antonio-garcia-bellido',
  nombre: 'Antonio García-Bellido',
  pais: 'España',
  continente: 'Europa',
  vida: '1936 – actualidad',
  nacimientoLugar: 'Madrid',
  aportePeriodo: '1973',
  anioNumerico: 1973,
  campo: 'Genética del desarrollo',
  aporteDescripcion: 'Formuló la teoría de los compartimentos y los genes selectores organogenéticos que definen la arquitectura corporal animal.',
  lugaresTrabajo: 'Centro de Biología Molecular Severo Ochoa (Madrid)',
  fuenteReferencia: 'Premio Príncipe de Asturias / Royal Society',
});

add({
  id: 'gabriel-valentin',
  nombre: 'Gabriel Valentin',
  pais: 'Alemania',
  continente: 'Europa',
  vida: '1810 – 1883',
  nacimientoLugar: 'Breslavia (Wrocław)',
  aportePeriodo: '1836',
  anioNumerico: 1836,
  campo: 'Fisiología y citología',
  aporteDescripcion: 'Descubrió el nucleolo dentro del núcleo celular y la acción digestiva de la diastasa pancreática sobre los carbohidratos.',
  lugaresTrabajo: 'Universidad de Berna',
  fuenteReferencia: 'Universidad de Berna',
});

add({
  id: 'albrecht-von-haller',
  nombre: 'Albrecht von Haller',
  pais: 'Suiza',
  continente: 'Europa',
  vida: '1708 – 1777',
  nacimientoLugar: 'Berna',
  aportePeriodo: '1757',
  anioNumerico: 1757,
  campo: 'Fisiología experimental',
  aporteDescripcion: 'Padre de la fisiología moderna; definió en Elementa physiologiae la excitabilidad de los músculos y la sensibilidad de los nervios.',
  lugaresTrabajo: 'Universidad de Gotinga y Berna',
  fuenteReferencia: 'Universidad de Gotinga / Royal Society',
});

add({
  id: 'caspar-friedrich-wolff',
  nombre: 'Caspar Friedrich Wolff',
  pais: 'Alemania',
  continente: 'Europa',
  vida: '1734 – 1794',
  nacimientoLugar: 'Berlín',
  aportePeriodo: '1759',
  anioNumerico: 1759,
  campo: 'Embriología (Epigénesis)',
  aporteDescripcion: 'En Theoria Generationis refutó el preformismo y demostró la epigénesis: los órganos se diferencian paulatinamente de tejidos no formados.',
  lugaresTrabajo: 'San Petersburgo',
  fuenteReferencia: 'Academia Imperial de Ciencias',
});

add({
  id: 'felix-dujardin',
  nombre: 'Félix Dujardin',
  pais: 'Francia',
  continente: 'Europa',
  vida: '1801 – 1860',
  nacimientoLugar: 'Tours',
  aportePeriodo: '1835',
  anioNumerico: 1835,
  campo: 'Protistología y biología celular',
  aporteDescripcion: 'Descubrió el material gelatinoso intracelular en protozoos al que llamó «sarcoda» (luego bautizado protoplasma), base de la vida celular.',
  lugaresTrabajo: 'Universidad de Rennes',
  fuenteReferencia: 'Académie des Sciences',
});

add({
  id: 'edouard-van-beneden',
  nombre: 'Édouard van Beneden',
  pais: 'Bélgica',
  continente: 'Europa',
  vida: '1846 – 1910',
  nacimientoLugar: 'Lovaina',
  aportePeriodo: '1883',
  anioNumerico: 1883,
  campo: 'Citogenética y embriología',
  aporteDescripcion: 'Descubrió la meiosis en el gusano Ascaris, demostrando que los gametos tienen la mitad de cromosomas que las células somáticas.',
  lugaresTrabajo: 'Universidad de Lieja',
  fuenteReferencia: 'Académie Royale des Sciences de Belgique',
});

add({
  id: 'hugo-von-mohl',
  nombre: 'Hugo von Mohl',
  pais: 'Alemania',
  continente: 'Europa',
  vida: '1805 – 1872',
  nacimientoLugar: 'Stuttgart',
  aportePeriodo: '1846',
  anioNumerico: 1846,
  campo: 'Citología vegetal',
  aporteDescripcion: 'Acuñó el término protoplasma para el líquido vivo vegetal y describió la formación de la pared celular secundaria.',
  lugaresTrabajo: 'Universidad de Tubinga',
  fuenteReferencia: 'Universidad de Tubinga',
});

add({
  id: 'franz-leydig',
  nombre: 'Franz Leydig',
  pais: 'Alemania',
  continente: 'Europa',
  vida: '1821 – 1908',
  nacimientoLugar: 'Rothenburg ob der Tauber',
  aportePeriodo: '1850',
  anioNumerico: 1850,
  campo: 'Histología comparada',
  aporteDescripcion: 'Descubrió las células intersticiales testiculares productoras de testosterona (células de Leydig).',
  lugaresTrabajo: 'Wurzburgo y Bonn',
  fuenteReferencia: 'Universidad de Bonn',
});

add({
  id: 'heinrich-wilhelm-waldeyer',
  nombre: 'Heinrich Wilhelm Waldeyer',
  pais: 'Alemania',
  continente: 'Europa',
  vida: '1836 – 1921',
  nacimientoLugar: 'Hehlen',
  aportePeriodo: '1888',
  anioNumerico: 1888,
  campo: 'Anatomía y citología',
  aporteDescripcion: 'Acuñó formalmente los términos «cromosoma» y «neurona», consolidando la teoría neuronal y citogenética.',
  lugaresTrabajo: 'Universidad de Berlín',
  fuenteReferencia: 'Charité Berlín',
});

add({
  id: 'sydney-ringer',
  nombre: 'Sydney Ringer',
  pais: 'Reino Unido',
  continente: 'Europa',
  vida: '1835 – 1910',
  nacimientoLugar: 'Norwich',
  aportePeriodo: '1882',
  anioNumerico: 1882,
  campo: 'Fisiología celular y soluciones biológicas',
  aporteDescripcion: 'Creó la «solución de Ringer», demostrando que los iones calcio, sodio y potasio son imprescindibles para la contracción cardíaca autónoma.',
  lugaresTrabajo: 'University College Hospital (Londres)',
  fuenteReferencia: 'Royal Society of Medicine',
});

add({
  id: 'franz-bauer',
  nombre: 'Franz Bauer',
  pais: 'Austria',
  continente: 'Europa',
  vida: '1758 – 1840',
  nacimientoLugar: 'Feldsberg (Valtice)',
  aportePeriodo: '1802',
  anioNumerico: 1802,
  campo: 'Microscopía y botánica descriptiva',
  aporteDescripcion: 'Primer ilustrador botánico en dibujar el núcleo celular de las orquídeas antes de la descripción formal de Robert Brown.',
  lugaresTrabajo: 'Royal Botanic Gardens, Kew',
  fuenteReferencia: 'Kew Gardens Archives',
});

add({
  id: 'carl-bergmann',
  nombre: 'Carl Bergmann',
  pais: 'Alemania',
  continente: 'Europa',
  vida: '1814 – 1865',
  nacimientoLugar: 'Gotinga',
  aportePeriodo: '1847',
  anioNumerico: 1847,
  campo: 'Ecología y fisiología comparada',
  aporteDescripcion: 'Formuló la «regla de Bergmann»: las especies endotérmicas de climas fríos tienden a tener mayor masa corporal que sus parientes de zonas cálidas.',
  lugaresTrabajo: 'Gotinga y Rostock',
  fuenteReferencia: 'Sociedad de Historia Natural de Rostock',
});

add({
  id: 'karl-ernst-claus',
  nombre: 'Karl Ernst Claus',
  pais: 'Estonia',
  continente: 'Europa',
  vida: '1796 – 1864',
  nacimientoLugar: 'Dorpat (Tartu)',
  aportePeriodo: '1844',
  anioNumerico: 1844,
  campo: 'Química biológica y botánica',
  aporteDescripcion: 'Descubrió el elemento rutenio e investigó la fitoquímica de plantas medicinales de las estepas euroasiáticas.',
  lugaresTrabajo: 'Universidad de Kazán y Dorpat',
  fuenteReferencia: 'Universidad de Tartu',
});

add({
  id: 'giuseppe-levi',
  nombre: 'Giuseppe Levi',
  pais: 'Italia',
  continente: 'Europa',
  vida: '1872 – 1965',
  nacimientoLugar: 'Trieste',
  aportePeriodo: '1934',
  anioNumerico: 1934,
  campo: 'Histología y cultivo de tejidos',
  aporteDescripcion: 'Maestro de tres premios Nobel (Levi-Montalcini, Luria, Dulbecco); pionero del cultivo in vitro de neuronas embrionarias vivas.',
  lugaresTrabajo: 'Universidad de Turín',
  fuenteReferencia: 'Academia de Medicina de Turín',
});

add({
  id: 'renato-dulbecco',
  nombre: 'Renato Dulbecco',
  pais: 'Italia',
  continente: 'Europa',
  vida: '1914 – 2012',
  nacimientoLugar: 'Catanzaro',
  aportePeriodo: '1965',
  anioNumerico: 1965,
  campo: 'Virología oncológica',
  aporteDescripcion: 'Demostró la transformación de células sanas en tumorales por integración de virus de ADN (oncovirus); premio Nobel en 1975.',
  lugaresTrabajo: 'Instituto Salk y Turín',
  fuenteReferencia: 'Nobel Media / Salk Institute',
});

add({
  id: 'albert-claude',
  nombre: 'Albert Claude',
  pais: 'Bélgica',
  continente: 'Europa',
  vida: '1899 – 1983',
  nacimientoLugar: 'Longlier, Neufchâteau',
  aportePeriodo: '1945',
  anioNumerico: 1945,
  campo: 'Biología celular y microscopía electrónica',
  aporteDescripcion: 'Pionero en la centrifugación diferencial y en el uso del microscopio electrónico para descubrir el retículo endoplásmico; premio Nobel en 1974.',
  lugaresTrabajo: 'Rockefeller Institute y Bruselas',
  fuenteReferencia: 'Nobel Media',
});

add({
  id: 'christian-de-duve',
  nombre: 'Christian de Duve',
  pais: 'Bélgica',
  continente: 'Europa',
  vida: '1917 – 2013',
  nacimientoLugar: 'Thames Ditton, Reino Unido (belga)',
  aportePeriodo: '1955',
  anioNumerico: 1955,
  campo: 'Bioquímica y biología celular',
  aporteDescripcion: 'Descubrió los lisosomas y los peroxisomas, orgánulos encargados de la digestión y detoxificación intracelular; premio Nobel en 1974.',
  lugaresTrabajo: 'Universidad de Lovaina y Rockefeller',
  fuenteReferencia: 'Nobel Media / Universidad Católica de Lovaina',
});

add({
  id: 'george-emil-palade',
  nombre: 'George Emil Palade',
  pais: 'Rumanía',
  continente: 'Europa',
  vida: '1912 – 2008',
  nacimientoLugar: 'Iași',
  aportePeriodo: '1955',
  anioNumerico: 1955,
  campo: 'Biología celular y ribosomas',
  aporteDescripcion: 'Descubrió los ribosomas (gránulos de Palade) y describió la ruta biosintética y secretora de proteínas celulares; premio Nobel en 1974.',
  lugaresTrabajo: 'Rockefeller University y Yale',
  fuenteReferencia: 'Nobel Media',
});

add({
  id: 'werner-arber',
  nombre: 'Werner Arber',
  pais: 'Suiza',
  continente: 'Europa',
  vida: '1929 – actualidad',
  nacimientoLugar: 'Gränichen, Argovia',
  aportePeriodo: '1968',
  anioNumerico: 1968,
  campo: 'Genética molecular y enzimas de restricción',
  aporteDescripcion: 'Descubrió las enzimas de restricción bacterianas que cortan el ADN en secuencias específicas, base de la ingeniería genética; premio Nobel en 1978.',
  lugaresTrabajo: 'Universidad de Basilea y Ginebra',
  fuenteReferencia: 'Nobel Media / Biozentrum Basel',
});

add({
  id: 'hamilton-smith-add',
  nombre: 'Gottfried Schatz',
  pais: 'Austria',
  continente: 'Europa',
  vida: '1936 – 2015',
  nacimientoLugar: 'Strem, Burgenland',
  aportePeriodo: '1964',
  anioNumerico: 1964,
  campo: 'Bioquímica y biogénesis mitocondrial',
  aporteDescripcion: 'Descubrió que las mitocondrias poseen su propio ADN autónomo y caracterizó el complejo de transporte de proteínas a través de la membrana mitocondrial.',
  lugaresTrabajo: 'Universidad de Viena y Biozentrum Basilea',
  fuenteReferencia: 'Biozentrum Basel / Austrian Academy of Sciences',
});

// Check Europa count:
console.log(`Europa count: ${list.filter(s => s.continente === 'Europa').length}`);

console.log('Script written up to Europa. We will now write the full 250 builder.');
