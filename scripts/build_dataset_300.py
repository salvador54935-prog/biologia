import json, unicodedata, re, sys, os

# Load existing 459 scientists
with open('/tmp/existing_names.json') as f:
    existing = json.load(f)

existing_ids = set(existing['ids'])
existing_names = set(existing['names'])

def norm(text):
    return unicodedata.normalize('NFD', text.lower()).encode('ascii', 'ignore').decode('utf-8').strip()

dataset = []
seen_ids = set()
seen_names = set()

def add_entry(d):
    # Validation
    sid = d['id']
    name = d['nombre']
    norm_n = norm(name)

    if sid in existing_ids:
        raise ValueError(f"Collision with existing collection ID: {sid} ({name})")
    if norm_n in existing_names:
        raise ValueError(f"Collision with existing collection Name: {name}")
    if sid in seen_ids:
        raise ValueError(f"Duplicate ID in 300 collection: {sid}")
    if norm_n in seen_names:
        raise ValueError(f"Duplicate Name in 300 collection: {name}")

    seen_ids.add(sid)
    seen_names.add(norm_n)
    
    # Enrich with default values
    entry = {
        "id": sid,
        "nombre": name,
        "pais": d["pais"],
        "continente": d["continente"],
        "vida": d["vida"],
        "nacimientoLugar": d.get("nacimientoLugar", f"Nacido en {d['pais']}"),
        "aportePeriodo": d["aportePeriodo"],
        "anioNumerico": d["anioNumerico"],
        "campo": d["campo"],
        "disciplinas": d.get("disciplinas", [d["campo"].split()[0]]),
        "aporteDescripcion": d["aporteDescripcion"],
        "biografia": d.get("biografia", d["aporteDescripcion"]),
        "importanciaHistorica": d.get("importanciaHistorica", d["aporteDescripcion"]),
        "lugaresTrabajo": d.get("lugaresTrabajo", d["pais"]),
        "paginaPDF": None,
        "esComplementario": True,
        "fuenteReferencia": d.get("fuenteReferencia", "Enciclopedia Británica / Nobel Prize / MacTutor History of Mathematics"),
        "destacado": d.get("destacado", False),
        "esPionera": d.get("esPionera", False)
    }
    if "retratoUrl" in d:
        entry["retratoUrl"] = d["retratoUrl"]

    dataset.append(entry)

print("Builder initialized successfully.")

# =========================================================================
# LOTE 1: TOP 10 MANDATORIOS Y PIONEROS UNIVERSALES (20 CIENTÍFICOS)
# =========================================================================
add_entry({
    "id": "albert-einstein",
    "nombre": "Albert Einstein",
    "pais": "Alemania",
    "continente": "Europa",
    "vida": "1879 – 1955",
    "nacimientoLugar": "Ulm, Reino de Wurtemberg, Alemania",
    "aportePeriodo": "1905",
    "anioNumerico": 1905,
    "campo": "Física teórica y cosmología",
    "disciplinas": ["Física", "Matemáticas"],
    "aporteDescripcion": "Formuló la teoría de la relatividad especial y general, explicó el efecto fotoeléctrico y dedujo la equivalencia masa-energía (E=mc²).",
    "biografia": "Físico teórico nacido en Alemania, considerado el científico más influyente del siglo XX. Ganador del Premio Nobel de Física en 1921 por su explicación del efecto fotoeléctrico.",
    "importanciaHistorica": "Revolucionó la comprensión del espacio, el tiempo, la gravedad y la estructura del cosmos, sentando las bases de la física moderna.",
    "lugaresTrabajo": "Berna, Zúrich, Praga, Berlín y Princeton (EE. UU.)",
    "fuenteReferencia": "Premio Nobel de Física 1921 / Institute for Advanced Study Princeton",
    "destacado": True,
    "retratoUrl": "/portraits/albert-einstein.jpg"
})

add_entry({
    "id": "isaac-newton",
    "nombre": "Isaac Newton",
    "pais": "Reino Unido",
    "continente": "Europa",
    "vida": "1643 – 1727",
    "nacimientoLugar": "Woolsthorpe-by-Colsterworth, Lincolnshire, Inglaterra",
    "aportePeriodo": "1687",
    "anioNumerico": 1687,
    "campo": "Física clásica, matemáticas y astronomía",
    "disciplinas": ["Física", "Matemáticas", "Astronomía"],
    "aporteDescripcion": "Enunció las tres leyes fundamentales del movimiento y la ley de gravitación universal; codesarrolló el cálculo infinitesimal y la descomposición prismática de la luz.",
    "biografia": "Polímata, físico y matemático inglés, autor de Principia Mathematica (1687), obra cumbre de la Revolución Científica.",
    "importanciaHistorica": "Unificó la mecánica terrestre y celeste en un marco matemático predictivo que rigió la ciencia durante más de dos siglos.",
    "lugaresTrabajo": "Universidad de Cambridge y Real Casa de la Moneda de Londres",
    "fuenteReferencia": "Royal Society of London / Cambridge University Archives",
    "destacado": True,
    "retratoUrl": "/portraits/isaac-newton.jpg"
})

add_entry({
    "id": "marie-curie",
    "nombre": "Marie Curie",
    "pais": "Polonia",
    "continente": "Europa",
    "vida": "1867 – 1934",
    "nacimientoLugar": "Varsovia, Polonia",
    "aportePeriodo": "1898",
    "anioNumerico": 1898,
    "campo": "Física nuclear y radioquímica",
    "disciplinas": ["Física", "Química"],
    "aporteDescripcion": "Pionera en el estudio de la radiactividad espontánea; descubrió y aisló los elementos radioactivos polonio y radio, e impulsó la radiología médica.",
    "biografia": "Física y química polaca nacionalizada francesa. Primera persona en ganar dos Premios Nobel en distintas ciencias (Física 1903 y Química 1911) y primera mujer profesora en la Sorbona.",
    "importanciaHistorica": "Fundó la ciencia moderna de la radiación, impulsando tratamientos radiológicos oncológicos y abriendo la era atómica.",
    "lugaresTrabajo": "Universidad de París (Sorbona) e Instituto del Radio de París",
    "fuenteReferencia": "Premio Nobel de Física 1903 / Premio Nobel de Química 1911 / Instituto Curie",
    "destacado": True,
    "esPionera": True,
    "retratoUrl": "/portraits/marie-curie.jpg"
})

add_entry({
    "id": "galileo-galilei",
    "nombre": "Galileo Galilei",
    "pais": "Italia",
    "continente": "Europa",
    "vida": "1564 – 1642",
    "nacimientoLugar": "Pisa, Ducado de Florencia, Italia",
    "aportePeriodo": "1610",
    "anioNumerico": 1610,
    "campo": "Astronomía observacional, física y cinemática",
    "disciplinas": ["Astronomía", "Física", "Matemáticas"],
    "aporteDescripcion": "Perfeccionó el telescopio para la observación celeste, descubrió las 4 lunas mayores de Júpiter, los cráteres lunares y las fases de Venus, refutando el geocentrismo.",
    "biografia": "Astrónomo, físico e ingeniero toscano, considerado el padre de la astronomía observacional y del método científico experimental moderno.",
    "importanciaHistorica": "Confirmó de forma empírica el modelo heliocéntrico copernicano y sentó el principio de inercia y la caída uniforme de los cuerpos.",
    "lugaresTrabajo": "Universidad de Pisa, Universidad de Padua y Arcetri (Florencia)",
    "fuenteReferencia": "Accademia dei Lincei / Museo Galileo Florencia",
    "destacado": True,
    "retratoUrl": "/portraits/galileo-galilei.jpg"
})

add_entry({
    "id": "ada-lovelace",
    "nombre": "Ada Lovelace",
    "pais": "Reino Unido",
    "continente": "Europa",
    "vida": "1815 – 1852",
    "nacimientoLugar": "Londres, Inglaterra",
    "aportePeriodo": "1843",
    "anioNumerico": 1843,
    "campo": "Informática teórica y matemáticas",
    "disciplinas": ["Informática", "Matemáticas"],
    "aporteDescripcion": "Diseñó el primer algoritmo informático concebido para ser procesado por una máquina de cálculo programable, anticipando que las computadoras podrían manipular cualquier símbolo.",
    "biografia": "Matemática y escritora británica, hija de Lord Byron. En sus notas sobre la máquina analítica de Charles Babbage teorizó el concepto de software universal.",
    "importanciaHistorica": "Reconocida unánimemente como la primera programadora de computadoras de la historia y visionaria de la era digital.",
    "lugaresTrabajo": "Londres y Ockham Park, Reino Unido",
    "fuenteReferencia": "Scientific Memoirs (Richard Taylor, 1843) / Computer History Museum",
    "destacado": True,
    "esPionera": True,
    "retratoUrl": "/portraits/ada-lovelace.jpg"
})

add_entry({
    "id": "nikola-tesla",
    "nombre": "Nikola Tesla",
    "pais": "Serbia",
    "continente": "Europa",
    "vida": "1856 – 1943",
    "nacimientoLugar": "Smiljan, Imperio austríaco (actual Croacia / origen serbio)",
    "aportePeriodo": "1888",
    "anioNumerico": 1888,
    "campo": "Ingeniería eléctrica, electromagnetismo y robótica",
    "disciplinas": ["Ingeniería", "Física"],
    "aporteDescripcion": "Desarrolló el motor de inducción de corriente alterna (CA), el sistema polifásico de transmisión eléctrica, la bobina de Tesla y las comunicaciones inalámbricas pioneras.",
    "biografia": "Ingeniero mecánico y electricista serbio-estadounidense con más de 300 patentes en sistemas de energía, turbinas y circuitos de alta frecuencia.",
    "importanciaHistorica": "Hizo posible la electrificación global a gran escala y la red de energía eléctrica sobre la que opera el mundo industrializado contemporáneo.",
    "lugaresTrabajo": "Budapest, París, Nueva York y Colorado Springs",
    "fuenteReferencia": "Tesla Memorial Society / Museo Nikola Tesla Belgrado",
    "destacado": True,
    "retratoUrl": "/portraits/nikola-tesla.jpg"
})

add_entry({
    "id": "katherine-johnson",
    "nombre": "Katherine Johnson",
    "pais": "Estados Unidos",
    "continente": "América",
    "vida": "1918 – 2020",
    "nacimientoLugar": "White Sulphur Springs, Virginia Occidental, EE. UU.",
    "aportePeriodo": "1962",
    "anioNumerico": 1962,
    "campo": "Matemáticas aplicadas, mecánica orbital y aeroespacial",
    "disciplinas": ["Matemáticas", "Ingeniería", "Astronomía"],
    "aporteDescripcion": "Calculó con exactitud matemática las trayectorias orbitales balísticas de los primeros vuelos espaciales estadounidenses tripulados (Mercury, Apolo 11 y transbordadores).",
    "biografia": "Matemática aeroespacial en la NASA (Langley). Pionera afroestadounidense galardonada con la Medalla Presidencial de la Libertad en 2015.",
    "importanciaHistorica": "Pieza matemática indispensable en la llegada del ser humano a la Luna y símbolo de superación y excelencia en las ciencias espaciales.",
    "lugaresTrabajo": "NASA Langley Research Center, Hampton, Virginia",
    "fuenteReferencia": "NASA History Division / Presidential Medal of Freedom 2015",
    "destacado": True,
    "esPionera": True,
    "retratoUrl": "/portraits/katherine-johnson.jpg"
})

# Otros 13 gigantes de la física y astronomía en Lote 1
add_entry({
    "id": "johannes-kepler",
    "nombre": "Johannes Kepler",
    "pais": "Alemania",
    "continente": "Europa",
    "vida": "1571 – 1630",
    "nacimientoLugar": "Weil der Stadt, Sacro Imperio Romano Germánico",
    "aportePeriodo": "1609",
    "anioNumerico": 1609,
    "campo": "Astronomía teórica y matemáticas",
    "disciplinas": ["Astronomía", "Matemáticas", "Física"],
    "aporteDescripcion": "Formuló las tres leyes del movimiento planetario (órbitas elípticas, ley de las áreas y armonía de los periodos), desterrando el dogma de las órbitas circulares.",
    "biografia": "Astrónomo y matemático alemán, figura clave de la revolución científica que colaboró con Tycho Brahe y calculó con precisión la órbita de Marte.",
    "importanciaHistorica": "Proporcionó la base empírica y geométrica que permitió a Isaac Newton formular la gravitación universal.",
    "lugaresTrabajo": "Graz, Praga y Linz",
    "fuenteReferencia": "Astronomia Nova (1609) / Kepler Gesellschaft",
    "destacado": True
})

add_entry({
    "id": "nicolas-copernico",
    "nombre": "Nicolás Copérnico",
    "pais": "Polonia",
    "continente": "Europa",
    "vida": "1473 – 1543",
    "nacimientoLugar": "Torun, Reino de Polonia",
    "aportePeriodo": "1543",
    "anioNumerico": 1543,
    "campo": "Astronomía y matemáticas",
    "disciplinas": ["Astronomía", "Matemáticas"],
    "aporteDescripcion": "Formuló el modelo heliocéntrico del sistema solar en De revolutionibus orbium coelestium, situando al Sol en el centro y a la Tierra como un planeta en movimiento.",
    "biografia": "Canónigo, astrónomo y matemático polaco educado en Cracovia, Bolonia y Padua. Desarrolló en secreto su teoría astronómica heliocéntrica durante tres décadas.",
    "importanciaHistorica": "Inició la Revolución Copernicana, que derrocó la cosmovisión ptolemaica y aristotélica que había dominado durante 1.400 años.",
    "lugaresTrabajo": "Frombork y Olsztyn (Polonia)",
    "fuenteReferencia": "De revolutionibus orbium coelestium (1543) / Museo de Copérnico Frombork",
    "destacado": True
})

add_entry({
    "id": "james-clerk-maxwell",
    "nombre": "James Clerk Maxwell",
    "pais": "Reino Unido",
    "continente": "Europa",
    "vida": "1831 – 1879",
    "nacimientoLugar": "Edimburgo, Escocia",
    "aportePeriodo": "1865",
    "anioNumerico": 1865,
    "campo": "Física electromagnética y termodinámica",
    "disciplinas": ["Física", "Matemáticas"],
    "aporteDescripcion": "Unificó la electricidad, el magnetismo y la óptica en las cuatro ecuaciones de Maxwell, prediciendo la existencia de ondas electromagnéticas que viajan a la velocidad de la luz.",
    "biografia": "Científico escocés considerado junto a Newton y Einstein uno de los tres más grandes físicos de la historia. Primer director del Laboratorio Cavendish.",
    "importanciaHistorica": "Sentó las bases teóricas de la radiocomunicación, la televisión, el radar, la relatividad especial y la física cuántica.",
    "lugaresTrabajo": "King's College London y Universidad de Cambridge",
    "fuenteReferencia": "A Treatise on Electricity and Magnetism (1873) / Maxwell Foundation",
    "destacado": True
})

add_entry({
    "id": "michael-faraday",
    "nombre": "Michael Faraday",
    "pais": "Reino Unido",
    "continente": "Europa",
    "vida": "1791 – 1867",
    "nacimientoLugar": "Newington Butts, Londres, Inglaterra",
    "aportePeriodo": "1831",
    "anioNumerico": 1831,
    "campo": "Física electromagnética y electroquímica",
    "disciplinas": ["Física", "Química"],
    "aporteDescripcion": "Descubrió la inducción electromagnética, el diamagnetismo y las leyes de la electrólisis; inventó el primer motor eléctrico y el concepto de líneas de campo de fuerza.",
    "biografia": "Físico y químico experimental inglés de origen humilde y autodidacta. Fue profesor en la Royal Institution de Gran Bretaña.",
    "importanciaHistorica": "Permitió la generación y transformación masiva de electricidad y fundó el concepto moderno de campo físico.",
    "lugaresTrabajo": "Royal Institution of Great Britain, Londres",
    "fuenteReferencia": "Royal Institution / Experimental Researches in Electricity (1839)",
    "destacado": True
})

add_entry({
    "id": "max-planck",
    "nombre": "Max Planck",
    "pais": "Alemania",
    "continente": "Europa",
    "vida": "1858 – 1947",
    "nacimientoLugar": "Kiel, ducado de Holstein, Alemania",
    "aportePeriodo": "1900",
    "anioNumerico": 1900,
    "campo": "Física cuántica y termodinámica",
    "disciplinas": ["Física", "Matemáticas"],
    "aporteDescripcion": "Introdujo la hipótesis cuántica al postular que la energía se emite y absorbe en paquetes discretos (cuantos) proporcionales a su frecuencia (E=hν), definiendo la constante de Planck.",
    "biografia": "Físico teórico alemán, galardonado con el Premio Nobel de Física en 1918 por su descubrimiento de los cuantos de energía.",
    "importanciaHistorica": "Padre fundador de la mecánica cuántica, la teoría más precisa de la física sobre el microcosmos atómico y subatómico.",
    "lugaresTrabajo": "Universidad de Kiel y Universidad de Berlín",
    "fuenteReferencia": "Premio Nobel de Física 1918 / Max Planck Gesellschaft",
    "destacado": True
})

add_entry({
    "id": "niels-bohr",
    "nombre": "Niels Bohr",
    "pais": "Dinamarca",
    "continente": "Europa",
    "vida": "1885 – 1962",
    "nacimientoLugar": "Copenhague, Dinamarca",
    "aportePeriodo": "1913",
    "anioNumerico": 1913,
    "campo": "Física atómica y cuántica",
    "disciplinas": ["Física", "Química"],
    "aporteDescripcion": "Propuso el modelo atómico de Bohr con niveles discretos de energía para electrones y formuló el principio de complementariedad de la mecánica cuántica.",
    "biografia": "Físico danés, Premio Nobel de Física en 1922. Fundador del Instituto de Física Teórica de Copenhague, epicentro de la física cuántica en los años veinte.",
    "importanciaHistorica": "Estructuró la física atómica contemporánea y lideró el debate filosófico sobre la naturaleza probabilística de la realidad cuántica frente a Einstein.",
    "lugaresTrabajo": "Universidad de Copenhague y Laboratorio Los Álamos",
    "fuenteReferencia": "Premio Nobel de Física 1922 / Instituto Niels Bohr Copenhague"
})

add_entry({
    "id": "werner-heisenberg",
    "nombre": "Werner Heisenberg",
    "pais": "Alemania",
    "continente": "Europa",
    "vida": "1901 – 1976",
    "nacimientoLugar": "Wurzburgo, Baviera, Alemania",
    "aportePeriodo": "1927",
    "anioNumerico": 1927,
    "campo": "Física cuántica y mecánica matricial",
    "disciplinas": ["Física", "Matemáticas"],
    "aporteDescripcion": "Enunció el principio de incertidumbre de Heisenberg (imposibilidad de medir simultáneamente posición y momento de una partícula con exactitud arbitraria) y formuló la mecánica matricial.",
    "biografia": "Físico teórico alemán, Premio Nobel de Física en 1932. Colaboró estrechamente con Niels Bohr y Max Born en la formulación cuántica.",
    "importanciaHistorica": "Transformó la física al demostrar que el observador y el acto de medición interactúan inseparablemente con el estado cuántico.",
    "lugaresTrabajo": "Universidad de Gotinga, Universidad de Leipzig y Múnich",
    "fuenteReferencia": "Premio Nobel de Física 1932 / Heisenberg Archives"
})

add_entry({
    "id": "paul-dirac",
    "nombre": "Paul Dirac",
    "pais": "Reino Unido",
    "continente": "Europa",
    "vida": "1902 – 1984",
    "nacimientoLugar": "Bristol, Inglaterra",
    "aportePeriodo": "1928",
    "anioNumerico": 1928,
    "campo": "Física cuántica relativista y electrodinámica cuántica",
    "disciplinas": ["Física", "Matemáticas"],
    "aporteDescripcion": "Formuló la ecuación de Dirac unificando la mecánica cuántica con la relatividad especial, prediciendo teóricamente la existencia de la antimateria (el positrón) y el espín del electrón.",
    "biografia": "Físico y matemático británico, catedrático Lucasiano en Cambridge (la misma cátedra de Newton). Premio Nobel de Física en 1933 a los 31 años.",
    "importanciaHistorica": "Pionero de la electrodinámica cuántica y de la teoría cuántica de campos, célebre por su búsqueda de la belleza matemática en las leyes naturales.",
    "lugaresTrabajo": "Universidad de Cambridge y Universidad Estatal de Florida",
    "fuenteReferencia": "Premio Nobel de Física 1933 / Dirac Estate Cambridge"
})

add_entry({
    "id": "richard-feynman",
    "nombre": "Richard Feynman",
    "pais": "Estados Unidos",
    "continente": "América",
    "vida": "1918 – 1988",
    "nacimientoLugar": "Queens, Nueva York, EE. UU.",
    "aportePeriodo": "1948",
    "anioNumerico": 1948,
    "campo": "Electrodinámica cuántica, física de partículas y nanotecnología",
    "disciplinas": ["Física", "Matemáticas", "Ingeniería"],
    "aporteDescripcion": "Desarrolló la formulación por integrales de camino de la mecánica cuántica y los diagramas de Feynman para representar interacciones subatómicas; anticipó la nanotecnología.",
    "biografia": "Físico teórico estadounidense, Premio Nobel de Física en 1965 junto a Tomonaga y Schwinger. Profesor en Caltech y célebre divulgador científico.",
    "importanciaHistorica": "Permitió calcular con precisión nanométrica las interacciones entre radiación y materia, siendo uno de los físicos más influyentes de la posguerra.",
    "lugaresTrabajo": "Proyecto Manhattan (Los Álamos), Universidad de Cornell y Caltech",
    "fuenteReferencia": "Premio Nobel de Física 1965 / Caltech Archives"
})

add_entry({
    "id": "stephen-hawking",
    "nombre": "Stephen Hawking",
    "pais": "Reino Unido",
    "continente": "Europa",
    "vida": "1942 – 2018",
    "nacimientoLugar": "Oxford, Inglaterra",
    "aportePeriodo": "1974",
    "anioNumerico": 1974,
    "campo": "Cosmología teórica, astrofísica y gravedad cuántica",
    "disciplinas": ["Física", "Astronomía", "Matemáticas"],
    "aporteDescripcion": "Predijo teóricamente que los agujeros negros emiten radiación térmica cuántica (radiación de Hawking) y codesarrolló los teoremas de singularidad espaciotemporal junto a Roger Penrose.",
    "biografia": "Físico teórico y cosmólogo británico, catedrático Lucasiano de Matemáticas en Cambridge durante tres décadas y autor del superventas Breve historia del tiempo.",
    "importanciaHistorica": "Unificó por primera vez principios de termodinámica, relatividad general y física cuántica en el estudio de los horizontes de sucesos cósmicos.",
    "lugaresTrabajo": "DAMTP, Universidad de Cambridge",
    "fuenteReferencia": "Royal Society of London / University of Cambridge"
})

add_entry({
    "id": "edwin-hubble",
    "nombre": "Edwin Hubble",
    "pais": "Estados Unidos",
    "continente": "América",
    "vida": "1889 – 1953",
    "nacimientoLugar": "Marshfield, Misuri, EE. UU.",
    "aportePeriodo": "1929",
    "anioNumerico": 1929,
    "campo": "Astronomía extragaláctica y cosmología observacional",
    "disciplinas": ["Astronomía", "Física"],
    "aporteDescripcion": "Demostró que las nebulosas espirales son galaxias independientes fuera de la Vía Láctea y descubrió que el universo se está expandiendo (ley de Hubble-Lemaître).",
    "biografia": "Astrónomo estadounidense que utilizó el telescopio Hooker de 100 pulgadas en el Observatorio del Monte Wilson para transformar nuestra escala del cosmos.",
    "importanciaHistorica": "Proporcionó la evidencia observacional decisiva que sustentó el modelo del Big Bang y multiplicó por millones el tamaño conocido del universo.",
    "lugaresTrabajo": "Observatorio Yerkes y Observatorio del Monte Wilson, California",
    "fuenteReferencia": "Carnegie Institution for Science / Mount Wilson Observatory"
})

add_entry({
    "id": "tycho-brahe",
    "nombre": "Tycho Brahe",
    "pais": "Dinamarca",
    "continente": "Europa",
    "vida": "1546 – 1601",
    "nacimientoLugar": "Castillo de Knutstorp, Escania (entonces Dinamarca)",
    "aportePeriodo": "1572",
    "anioNumerico": 1572,
    "campo": "Astronomía observacional e instrumentación",
    "disciplinas": ["Astronomía", "Ingeniería"],
    "aporteDescripcion": "Realizó las mediciones astronómicas a simple vista más precisas de la historia, catalogó más de 1.000 estrellas y demostró que las supernovas y cometas están más allá de la Luna.",
    "biografia": "Noble y astrónomo danés que construyó los observatorios Uraniborg y Stjerneborg en la isla de Hven con sofisticados cuadrantes y sextantes.",
    "importanciaHistorica": "Sus meticulosos datos observacionales permitieron a su discípulo Johannes Kepler descubrir las leyes elípticas del movimiento planetario.",
    "lugaresTrabajo": "Isla de Hven (Dinamarca) y Praga (Sacro Imperio)",
    "fuenteReferencia": "De Nova Stella (1573) / Real Academia Danesa de Ciencias"
})

add_entry({
    "id": "subrahmanyan-chandrasekhar",
    "nombre": "Subrahmanyan Chandrasekhar",
    "pais": "India",
    "continente": "Asia",
    "vida": "1910 – 1995",
    "nacimientoLugar": "Lahore, India británica (actual Pakistán)",
    "aportePeriodo": "1930",
    "anioNumerico": 1930,
    "campo": "Astrofísica teórica y evolución estelar",
    "disciplinas": ["Física", "Astronomía", "Matemáticas"],
    "aporteDescripcion": "Calculó el límite de masa máxima (1,44 masas solares, el límite de Chandrasekhar) que puede soportar una estrella enana blanca antes de colapsar en una estrella de neutrones o agujero negro.",
    "biografia": "Astrofísico indio-estadounidense, Premio Nobel de Física en 1983 por sus estudios teóricos sobre los procesos físicos que rigen la estructura y evolución estelar.",
    "importanciaHistorica": "Fundamento indispensable para la comprensión del ciclo de vida estelar, las supernovas tipo Ia y los objetos compactos ultradensos.",
    "lugaresTrabajo": "Trinity College Cambridge y Universidad de Chicago (Observatorio Yerkes)",
    "fuenteReferencia": "Premio Nobel de Física 1983 / University of Chicago"
})

print(f"Lote 1 completado. Total acumulado: {len(dataset)}")

# =========================================================================
# LOTE 2: MATEMÁTICAS, INFORMÁTICA Y COMPUTACIÓN (30 CIENTÍFICOS)
# =========================================================================

add_entry({
    "id": "alan-turing",
    "nombre": "Alan Turing",
    "pais": "Reino Unido",
    "continente": "Europa",
    "vida": "1912 – 1954",
    "nacimientoLugar": "Londres, Inglaterra",
    "aportePeriodo": "1936",
    "anioNumerico": 1936,
    "campo": "Informática teórica, lógica matemática y criptografía",
    "disciplinas": ["Informática", "Matemáticas"],
    "aporteDescripcion": "Formalizó los conceptos de algoritmo y computación mediante la máquina de Turing, descifró la máquina Enigma en Bletchley Park y concibió el test de Turing para inteligencia artificial.",
    "biografia": "Matemático, lógico y criptoanalista británico considerado el padre de la ciencia de la computación moderna y de la inteligencia artificial.",
    "importanciaHistorica": "Sentó las bases teóricas de toda la arquitectura del software contemporáneo y salvó millones de vidas durante la Segunda Guerra Mundial.",
    "lugaresTrabajo": "Universidad de Cambridge, Bletchley Park y Universidad de Mánchester",
    "fuenteReferencia": "On Computable Numbers (1936) / Turing Digital Archive King's College",
    "destacado": True
})

add_entry({
    "id": "john-von-neumann",
    "nombre": "John von Neumann",
    "pais": "Hungría",
    "continente": "Europa",
    "vida": "1903 – 1957",
    "nacimientoLugar": "Budapest, Imperio austrohúngaro",
    "aportePeriodo": "1945",
    "anioNumerico": 1945,
    "campo": "Matemáticas, informática y teoría de juegos",
    "disciplinas": ["Informática", "Matemáticas", "Física"],
    "aporteDescripcion": "Diseñó la arquitectura de von Neumann (base del hardware de computadoras con programa almacenado en memoria), fundó la teoría de juegos y formuló matemáticamente la mecánica cuántica.",
    "biografia": "Polímata húngaro-estadounidense de prodigiosa capacidad de cálculo. Integró el Instituto de Estudios Avanzados de Princeton y asesoró el Proyecto Manhattan.",
    "importanciaHistorica": "Prácticamente todas las computadoras digitales construidas desde 1945 siguen el esquema arquitectónico que lleva su nombre.",
    "lugaresTrabajo": "Universidad de Berlín, Universidad de Princeton y Laboratorio Los Álamos",
    "fuenteReferencia": "First Draft of a Report on the EDVAC (1945) / Princeton IAS"
})

add_entry({
    "id": "claude-shannon",
    "nombre": "Claude Shannon",
    "pais": "Estados Unidos",
    "continente": "América",
    "vida": "1916 – 2001",
    "nacimientoLugar": "Petoskey, Míchigan, EE. UU.",
    "aportePeriodo": "1948",
    "anioNumerico": 1948,
    "campo": "Teoría de la información, criptografía e ingeniería electrónica",
    "disciplinas": ["Informática", "Matemáticas", "Ingeniería"],
    "aporteDescripcion": "Fundó la teoría de la información moderna, demostró que el álgebra booleana podía construir circuitos lógicos y definió el 'bit' como unidad fundamental de información.",
    "biografia": "Matemático e ingeniero electricista estadounidense de los Laboratorios Bell y profesor en el MIT. Padre indiscutible de la era digital y de las telecomunicaciones.",
    "importanciaHistorica": "Estableció el límite teórico de compresión y transmisión de datos (teorema de Shannon-Hartley) que rige Internet, la telefonía y el almacenamiento digital.",
    "lugaresTrabajo": "Bell Laboratories y MIT",
    "fuenteReferencia": "A Mathematical Theory of Communication (1948) / IEEE History"
})

add_entry({
    "id": "tim-berners-lee",
    "nombre": "Tim Berners-Lee",
    "pais": "Reino Unido",
    "continente": "Europa",
    "vida": "1955 – actualidad",
    "nacimientoLugar": "Londres, Inglaterra",
    "aportePeriodo": "1989",
    "anioNumerico": 1989,
    "campo": "Informática de redes e ingeniería de software",
    "disciplinas": ["Informática", "Ingeniería"],
    "aporteDescripcion": "Inventó la World Wide Web (WWW), el protocolo HTTP, el lenguaje HTML, el sistema de direccionamiento URL y el primer navegador web.",
    "biografia": "Científico de la computación británico en el CERN. Liberó la tecnología web de forma libre y gratuita para toda la humanidad en 1993 y fundó el consorcio W3C.",
    "importanciaHistorica": "Democratizó el acceso instantáneo al conocimiento global, desatando la mayor revolución comunicativa y económica de la historia moderna.",
    "lugaresTrabajo": "CERN (Ginebra), MIT y Universidad de Oxford",
    "fuenteReferencia": "W3C / CERN Information Management: A Proposal (1989) / Premio Turing 2016"
})

add_entry({
    "id": "grace-hopper",
    "nombre": "Grace Hopper",
    "pais": "Estados Unidos",
    "continente": "América",
    "vida": "1906 – 1992",
    "nacimientoLugar": "Nueva York, EE. UU.",
    "aportePeriodo": "1952",
    "anioNumerico": 1952,
    "campo": "Informática, desarrollo de compiladores y lenguajes de programación",
    "disciplinas": ["Informática", "Matemáticas"],
    "aporteDescripcion": "Desarrolló el primer compilador informático (A-0) que traducía código legible por humanos a lenguaje máquina, e impulsó la creación del lenguaje COBOL.",
    "biografia": "Científica de la computación y contraalmirante de la Armada de los Estados Unidos. Pionera en computación automática (Harvard Mark I) y divulgadora del término 'bug'.",
    "importanciaHistorica": "Hizo posible que la programación se realizara en palabras comprensibles en inglés y no en crudo código binario, democratizando el desarrollo de software.",
    "lugaresTrabajo": "Universidad de Harvard, Eckert-Mauchly Computer Corp y Armada de EE. UU.",
    "fuenteReferencia": "IEEE Computer Society / National Medal of Technology 1991",
    "esPionera": True
})

add_entry({
    "id": "margaret-hamilton",
    "nombre": "Margaret Hamilton",
    "pais": "Estados Unidos",
    "continente": "América",
    "vida": "1936 – actualidad",
    "nacimientoLugar": "Paoli, Indiana, EE. UU.",
    "aportePeriodo": "1969",
    "anioNumerico": 1969,
    "campo": "Ingeniería de software y sistemas aeroespaciales",
    "disciplinas": ["Informática", "Ingeniería"],
    "aporteDescripcion": "Dirigió el desarrollo del software de vuelo a bordo del Apolo Guidance Computer (AGC) que permitió el alunizaje seguro de la misión Apolo 11; acuñó el término 'ingeniería de software'.",
    "biografia": "Científica de la computación que lideró la División de Ingeniería de Software del MIT Instrumentation Lab para la NASA. Galardonada con la Medalla Presidencial de la Libertad.",
    "importanciaHistorica": "Estableció los estándares de fiabilidad, procesamiento asíncrono y detección de errores en tiempo real para software de misión crítica.",
    "lugaresTrabajo": "MIT Draper Laboratory y Hamilton Technologies",
    "fuenteReferencia": "NASA History Division / Presidential Medal of Freedom 2016",
    "esPionera": True
})

add_entry({
    "id": "carl-friedrich-gauss",
    "nombre": "Carl Friedrich Gauss",
    "pais": "Alemania",
    "continente": "Europa",
    "vida": "1777 – 1855",
    "nacimientoLugar": "Brunswick, Sacro Imperio Romano Germánico",
    "aportePeriodo": "1801",
    "anioNumerico": 1801,
    "campo": "Matemáticas puras, teoría de números, astronomía y geomagnetismo",
    "disciplinas": ["Matemáticas", "Astronomía", "Física"],
    "aporteDescripcion": "Publicó Disquisitiones Arithmeticae fundando la teoría moderna de números; demostró el teorema fundamental del álgebra y descubrió la distribución normal (campana de Gauss).",
    "biografia": "Llamado el 'Príncipe de los Matemáticos' por su genialidad sin precedentes. Dirigió el Observatorio de Gotinga y cartografió el geomagnetismo terrestre.",
    "importanciaHistorica": "Uno de los tres matemáticos más grandes de todos los tiempos; sus aportes abarcan desde el cálculo estadístico hasta la geodesia y el magnetismo.",
    "lugaresTrabajo": "Universidad de Gotinga y Observatorio de Gotinga",
    "fuenteReferencia": "Disquisitiones Arithmeticae (1801) / Gauss Society Göttingen",
    "destacado": True
})

add_entry({
    "id": "leonhard-euler",
    "nombre": "Leonhard Euler",
    "pais": "Suiza",
    "continente": "Europa",
    "vida": "1707 – 1783",
    "nacimientoLugar": "Basilea, Suiza",
    "aportePeriodo": "1748",
    "anioNumerico": 1748,
    "campo": "Matemáticas, análisis matemático y mecánica de fluidos",
    "disciplinas": ["Matemáticas", "Física"],
    "aporteDescripcion": "Introdujo la noción moderna de función f(x), la constante e, la unidad imaginaria i, la fórmula de Euler (e^(iπ) + 1 = 0) y fundó la teoría de grafos (puentes de Königsberg).",
    "biografia": "El matemático más prolífico de la historia. Escribió casi un millar de tratados científicos incluso tras perder completamente la vista.",
    "importanciaHistorica": "Estandarizó la notación matemática de toda la ciencia moderna y resolvió problemas fundamentales de acústica, óptica y mecánica celeste.",
    "lugaresTrabajo": "Academia de Ciencias de San Petersburgo y Academia Prusiana de las Ciencias (Berlín)",
    "fuenteReferencia": "Euler Archive / Academia de Ciencias de San Petersburgo"
})

add_entry({
    "id": "emmy-noether",
    "nombre": "Emmy Noether",
    "pais": "Alemania",
    "continente": "Europa",
    "vida": "1882 – 1935",
    "nacimientoLugar": "Erlangen, Baviera, Alemania",
    "aportePeriodo": "1918",
    "anioNumerico": 1918,
    "campo": "Álgebra abstracta y física matemática",
    "disciplinas": ["Matemáticas", "Física"],
    "aporteDescripcion": "Demostró el teorema de Noether, que vincula indisolublemente toda simetría en la naturaleza con una ley de conservación física (energía, momento y carga).",
    "biografia": "Matemática judía alemana elogiada por Einstein como la figura matemática femenina más importante de la historia. Desarrolló la teoría de anillos y de ideales.",
    "importanciaHistorica": "Pilar central sobre el que descansa toda la física teórica contemporánea y el modelo estándar de partículas elementales.",
    "lugaresTrabajo": "Universidad de Gotinga y Bryn Mawr College (EE. UU.)",
    "fuenteReferencia": "Invariante Variationsprobleme (1918) / MacTutor History of Mathematics",
    "esPionera": True
})

add_entry({
    "id": "srinivasa-ramanujan",
    "nombre": "Srinivasa Ramanujan",
    "pais": "India",
    "continente": "Asia",
    "vida": "1887 – 1920",
    "nacimientoLugar": "Erode, presidencia de Madrás, India británica",
    "aportePeriodo": "1914",
    "anioNumerico": 1914,
    "campo": "Teoría analítica de números y series infinitas",
    "disciplinas": ["Matemáticas"],
    "aporteDescripcion": "Descubrió miles de identidades matemáticas, fórmulas para aproximar π con asombrosa rapidez, funciones theta simuladas y particiones de números enteros.",
    "biografia": "Genio autodidacta indio cuyos cuadernos matemáticos deslumbraron a G. H. Hardy en Cambridge, siendo nombrado miembro de la Royal Society.",
    "importanciaHistorica": "Sus intuitivas ecuaciones se aplican un siglo después en teoría de cuerdas, física estadística y criptografía moderna.",
    "lugaresTrabajo": "Madrás (India) y Trinity College Cambridge (Reino Unido)",
    "fuenteReferencia": "Royal Society of London / Ramanujan Mathematical Society"
})

add_entry({
    "id": "euclides",
    "nombre": "Euclides de Alejandría",
    "pais": "Grecia",
    "continente": "Europa",
    "vida": "c. 325 a. C. – c. 265 a. C.",
    "nacimientoLugar": "Alejandría, Egipto ptolemaico / Grecia clásica",
    "aportePeriodo": "c. 300 a. C.",
    "anioNumerico": -300,
    "campo": "Geometría clásica, teoría de números y óptica",
    "disciplinas": ["Matemáticas"],
    "aporteDescripcion": "Escribió los Elementos de geometría, sistematizando axiomáticamente todo el conocimiento geométrico clásico mediante definiciones, postulados y demostraciones deductivas.",
    "biografia": "Matemático griego que enseñó en Alejandría durante el reinado de Ptolomeo I. Su obra Elementos fue el libro de texto escolar durante más de 2.000 años.",
    "importanciaHistorica": "Creó el método axiomático-deductivo, el estándar universal sobre el que se edificó todo el rigor de la matemática moderna.",
    "lugaresTrabajo": "Biblioteca de Alejandría",
    "fuenteReferencia": "Elementos de Euclides / MacTutor History of Mathematics"
})

add_entry({
    "id": "arquimedes",
    "nombre": "Arquímedes de Siracusa",
    "pais": "Grecia",
    "continente": "Europa",
    "vida": "c. 287 a. C. – c. 212 a. C.",
    "nacimientoLugar": "Siracusa, Magna Grecia (actual Sicilia, Italia)",
    "aportePeriodo": "c. 250 a. C.",
    "anioNumerico": -250,
    "campo": "Matemáticas, hidrostática, mecánica e ingeniería",
    "disciplinas": ["Matemáticas", "Física", "Ingeniería"],
    "aporteDescripcion": "Formuló el principio de flotabilidad de los cuerpos (principio de Arquímedes), el principio de la palanca, el tornillo sin fin y aproximó π mediante polígonos circunscritos.",
    "biografia": "Considerado el científico y matemático más brillante de la Antigüedad clásica, célebre por sus ingenios bélicos y su grito de '¡Eureka!'.",
    "importanciaHistorica": "Anticipó en casi dos milenios el cálculo integral moderno al calcular áreas y volúmenes mediante el método de exhaución.",
    "lugaresTrabajo": "Siracusa y Alejandría",
    "fuenteReferencia": "Sobre los cuerpos flotantes / Museo de Siracusa"
})

add_entry({
    "id": "al-juarismi",
    "nombre": "Al-Juarismi",
    "pais": "Uzbekistán",
    "continente": "Asia",
    "vida": "c. 780 – c. 850",
    "nacimientoLugar": "Jiva, Corasmia (actual Uzbekistán)",
    "aportePeriodo": "c. 820",
    "anioNumerico": 820,
    "campo": "Álgebra, aritmética y astronomía",
    "disciplinas": ["Matemáticas", "Astronomía", "Informática"],
    "aporteDescripcion": "Escribió Al-Kitāb al-mukhtaṣar fī ḥisāb al-ŷabr wa-l-muqābala, fundando el álgebra como disciplina independiente e introduciendo los números indoarábigos y el concepto de algoritmo.",
    "biografia": "Matemático y astrónomo persa en la Casa de la Sabiduría (Bayt al-Hikma) de Bagdad durante la Edad de Oro del Islam. Las palabras 'álgebra' y 'algoritmo' derivan de su obra y nombre.",
    "importanciaHistorica": "Revolucionó el cálculo matemático mundial al sustituir los engorrosos numerales romanos por el sistema posicional decimal con el cero.",
    "lugaresTrabajo": "Casa de la Sabiduría de Bagdad (Califato Abasí)",
    "fuenteReferencia": "Compendio de cálculo por reintegración y comparación / MacTutor"
})

add_entry({
    "id": "pierre-de-fermat",
    "nombre": "Pierre de Fermat",
    "pais": "Francia",
    "continente": "Europa",
    "vida": "1607 – 1665",
    "nacimientoLugar": "Beaumont-de-Lomagne, Francia",
    "aportePeriodo": "1637",
    "anioNumerico": 1637,
    "campo": "Teoría de números, cálculo de probabilidades y óptica",
    "disciplinas": ["Matemáticas", "Física"],
    "aporteDescripcion": "Enunció el Último Teorema de Fermat (x^n + y^n = z^n no tiene soluciones enteras para n>2), fundó el cálculo de probabilidades junto a Pascal y el principio de mínimo tiempo en óptica.",
    "biografia": "Jurista y matemático francés que realizó aportes decisivos al cálculo diferencial y la geometría analítica de manera independiente a Descartes.",
    "importanciaHistorica": "Su último teorema impulsó el desarrollo del álgebra moderna hasta ser demostrado 358 años más tarde por Andrew Wiles en 1995.",
    "lugaresTrabajo": "Toulouse y Castres (Francia)",
    "fuenteReferencia": "Arithmetica de Diofanto (anotaciones) / MacTutor History"
})

add_entry({
    "id": "blaise-pascal",
    "nombre": "Blaise Pascal",
    "pais": "Francia",
    "continente": "Europa",
    "vida": "1623 – 1662",
    "nacimientoLugar": "Clermont-Ferrand, Francia",
    "aportePeriodo": "1642",
    "anioNumerico": 1642,
    "campo": "Matemáticas, hidrodinámica, informática e ingeniería",
    "disciplinas": ["Matemáticas", "Física", "Informática"],
    "aporteDescripcion": "Inventó la Pascalina (una de las primeras calculadoras mecánicas mecánicas de engranajes), enunció el principio de Pascal sobre la presión de fluidos y desarrolló la teoría de probabilidades.",
    "biografia": "Matemático, físico, teólogo y filósofo francés. Sus investigaciones sobre la presión atmosférica y el vacío sentaron bases experimentales cruciales.",
    "importanciaHistorica": "Pionero del cálculo automático de datos y de la teoría probabilística que hoy sostiene las ciencias actuariales y estadísticas.",
    "lugaresTrabajo": "Ruan y París",
    "fuenteReferencia": "Traité du triangle arithmétique (1654) / Académie des Sciences"
})

add_entry({
    "id": "gottfried-leibniz",
    "nombre": "Gottfried Wilhelm Leibniz",
    "pais": "Alemania",
    "continente": "Europa",
    "vida": "1646 – 1716",
    "nacimientoLugar": "Leipzig, Sajonia, Sacro Imperio Romano Germánico",
    "aportePeriodo": "1684",
    "anioNumerico": 1684,
    "campo": "Cálculo infinitesimal, lógica matemática e informática",
    "disciplinas": ["Matemáticas", "Informática", "Física"],
    "aporteDescripcion": "Inventó el cálculo infinitesimal de forma independiente a Newton (acuñando la notación dx y el símbolo de integral ∫ que usamos hoy) y perfeccionó el sistema numérico binario.",
    "biografia": "Filósofo y matemático alemán, uno de los mayores polímatas de la historia. Diseñó la 'calculadora escalonada' capaz de multiplicar y dividir mecánicamente.",
    "importanciaHistorica": "Su notación del cálculo hizo posible la difusión del análisis matemático en toda Europa continental y su lógica binaria anticipó la computación.",
    "lugaresTrabajo": "Maguncia, París y Hannover",
    "fuenteReferencia": "Nova Methodus pro Maximis et Minimis (1684) / Leibniz Gesellschaft"
})

add_entry({
    "id": "rene-descartes",
    "nombre": "René Descartes",
    "pais": "Francia",
    "continente": "Europa",
    "vida": "1596 – 1650",
    "nacimientoLugar": "La Haye en Touraine (hoy Descartes), Francia",
    "aportePeriodo": "1637",
    "anioNumerico": 1637,
    "campo": "Geometría analítica, matemáticas y óptica",
    "disciplinas": ["Matemáticas", "Física"],
    "aporteDescripcion": "Fusionó el álgebra y la geometría mediante el sistema de coordenadas cartesianas, permitiendo representar curvas y figuras geométricas mediante ecuaciones algebraicas.",
    "biografia": "Filósofo y matemático francés, autor de La Géométrie (apéndice del Discurso del método), piedra angular de la ciencia analítica.",
    "importanciaHistorica": "Transformó las matemáticas en el lenguaje unificado de la física y fundó el racionalismo científico moderno.",
    "lugaresTrabajo": "París, Países Bajos y Estocolmo (Suecia)",
    "fuenteReferencia": "Discurso del método (1637) / Académie Royale de France"
})

add_entry({
    "id": "hipatia-de-alejandria",
    "nombre": "Hipatia de Alejandría",
    "pais": "Egipto",
    "continente": "África",
    "vida": "c. 360 – 415",
    "nacimientoLugar": "Alejandría, Egipto romano",
    "aportePeriodo": "c. 400",
    "anioNumerico": 400,
    "campo": "Matemáticas, astronomía y filosofía neoplatónica",
    "disciplinas": ["Matemáticas", "Astronomía"],
    "aporteDescripcion": "Comentó y perfeccionó las secciones cónicas de Apolonio y la Aritmética de Diofanto; diseñó astrolabios e hidrómetros para mediciones astronómicas y de densidad líquida.",
    "biografia": "Filósofa, astrónoma y matemática alejandrina que dirigió la escuela neoplatónica de Alejandría. Primera mujer matemática de cuya vida y obra se conservan registros fiables.",
    "importanciaHistorica": "Símbolo universal de la búsqueda de la verdad racional y precursora de la preservación del saber geométrico clásico en tiempos de convulsión histórica.",
    "lugaresTrabajo": "Museo y Biblioteca de Alejandría",
    "fuenteReferencia": "Suda bizantina / Sócrates Escolástico / MacTutor",
    "esPionera": True
})

add_entry({
    "id": "sofia-kovalevskaya",
    "nombre": "Sofía Kovalévskaya",
    "pais": "Rusia",
    "continente": "Europa",
    "vida": "1850 – 1891",
    "nacimientoLugar": "Moscú, Imperio ruso",
    "aportePeriodo": "1888",
    "anioNumerico": 1888,
    "campo": "Ecuaciones diferenciales parciales y mecánica celeste",
    "disciplinas": ["Matemáticas", "Física"],
    "aporteDescripcion": "Demostró el teorema de Cauchy-Kovalévskaya para ecuaciones en derivadas parciales y resolvió la rotación de un cuerpo rígido alrededor de un punto fijo (trompo de Kovalévskaya).",
    "biografia": "Matemática rusa, primera mujer en Europa en obtener un doctorado en matemáticas (Universidad de Gotinga) y primera en ser nombrada profesora universitaria ordinaria en Estocolmo.",
    "importanciaHistorica": "Abrió la investigación avanzada en dinámica analítica y demostró con brillantez la capacidad investigadora femenina al más alto nivel académico internacional.",
    "lugaresTrabajo": "Universidad de Heidelberg, Berlín y Universidad de Estocolmo",
    "fuenteReferencia": "Premio Bordin de la Academia de Ciencias de París 1888 / Kovalevskaya Fund",
    "esPionera": True
})

add_entry({
    "id": "maryam-mirzakhani",
    "nombre": "Maryam Mirzakhani",
    "pais": "Irán",
    "continente": "Asia",
    "vida": "1977 – 2017",
    "nacimientoLugar": "Teherán, Irán",
    "aportePeriodo": "2014",
    "anioNumerico": 2014,
    "campo": "Geometría hiperbólica, sistemas dinámicos y superficies de Riemann",
    "disciplinas": ["Matemáticas"],
    "aporteDescripcion": "Realizó contribuciones deslumbrantes a la dinámica y geometría de las superficies de Riemann y sus espacios de moduli, resolviendo conjeturas complejas de física teórica.",
    "biografia": "Matemática iraní y profesora en la Universidad de Stanford. Primera mujer y primera persona iraní en recibir la Medalla Fields (el 'Nobel de las matemáticas') en 2014.",
    "importanciaHistorica": "Inspiración global para mujeres en ciencias exactas; sus teoremas conectaron de forma profunda la geometría hiperbólica con la teoría cuántica de campos.",
    "lugaresTrabajo": "Universidad de Princeton y Universidad de Stanford",
    "fuenteReferencia": "Unión Matemática Internacional (Medalla Fields 2014) / Stanford University",
    "esPionera": True
})

add_entry({
    "id": "kurt-godel",
    "nombre": "Kurt Gödel",
    "pais": "Austria",
    "continente": "Europa",
    "vida": "1906 – 1978",
    "nacimientoLugar": "Brno, Imperio austrohúngaro (actual República Checa)",
    "aportePeriodo": "1931",
    "anioNumerico": 1931,
    "campo": "Lógica matemática y filosofía de la ciencia",
    "disciplinas": ["Matemáticas", "Informática"],
    "aporteDescripcion": "Demostró los teoremas de incompletitud de Gödel: en cualquier sistema axiomático coherente y recursivo capaz de aritmética elemental existen proposiciones verdaderas pero indemostrables.",
    "biografia": "Lógico y matemático austríaco-estadounidense, miembro del Círculo de Viena y del Instituto de Estudios Avanzados de Princeton, donde fue íntimo amigo de Albert Einstein.",
    "importanciaHistorica": "Transformó para siempre los límites del conocimiento matemático y sentó el principio que rige la indecidibilidad en las ciencias de la computación.",
    "lugaresTrabajo": "Universidad de Viena e Institute for Advanced Study Princeton",
    "fuenteReferencia": "Über formal unentscheidbare Sätze (1931) / Princeton IAS"
})

add_entry({
    "id": "charles-babbage",
    "nombre": "Charles Babbage",
    "pais": "Reino Unido",
    "continente": "Europa",
    "vida": "1791 – 1871",
    "nacimientoLugar": "Londres, Inglaterra",
    "aportePeriodo": "1837",
    "anioNumerico": 1837,
    "campo": "Ingeniería mecánica y computación mecánica",
    "disciplinas": ["Informática", "Ingeniería", "Matemáticas"],
    "aporteDescripcion": "Diseñó la máquina diferencial y concibió la máquina analítica mecánica, precursora del computador moderno con unidad aritmética, control por tarjetas perforadas y memoria.",
    "biografia": "Matemático, filósofo de la ciencia e inventor británico. Catedrático Lucasiano en Cambridge y cofundador de la Royal Astronomical Society.",
    "importanciaHistorica": "Considerado el padre del hardware computacional; sus planos mecánicos definieron por vez primera el procesamiento automático y secuencial de datos.",
    "lugaresTrabajo": "Universidad de Cambridge y Londres",
    "fuenteReferencia": "Science Museum London / Royal Society Archives"
})

add_entry({
    "id": "dennis-ritchie",
    "nombre": "Dennis Ritchie",
    "pais": "Estados Unidos",
    "continente": "América",
    "vida": "1941 – 2011",
    "nacimientoLugar": "Bronxville, Nueva York, EE. UU.",
    "aportePeriodo": "1972",
    "anioNumerico": 1972,
    "campo": "Ciencia de la computación, sistemas operativos y lenguajes",
    "disciplinas": ["Informática", "Ingeniería"],
    "aporteDescripcion": "Creó el lenguaje de programación C y codesarrolló el sistema operativo Unix en los Laboratorios Bell junto a Ken Thompson.",
    "biografia": "Científico de la computación estadounidense galardonado con el Premio Turing en 1983. Su trabajo es el cimiento directo de Linux, macOS, iOS, Android y Windows.",
    "importanciaHistorica": "Casi la totalidad de los sistemas operativos, navegadores de Internet y motores de bases de datos del mundo moderno están escritos en C o en sus derivados directos.",
    "lugaresTrabajo": "Bell Laboratories (Lucent Technologies), Murray Hill, Nueva Jersey",
    "fuenteReferencia": "Premio Turing ACM 1983 / Bell Labs Archives"
})

add_entry({
    "id": "donald-knuth",
    "nombre": "Donald Knuth",
    "pais": "Estados Unidos",
    "continente": "América",
    "vida": "1938 – actualidad",
    "nacimientoLugar": "Milwaukee, Wisconsin, EE. UU.",
    "aportePeriodo": "1968",
    "anioNumerico": 1968,
    "campo": "Análisis de algoritmos y sistemas tipográficos digitales",
    "disciplinas": ["Informática", "Matemáticas"],
    "aporteDescripcion": "Escribió la monumental enciclopedia The Art of Computer Programming, fundó el análisis formal de algoritmos y creó el sistema tipográfico digital TeX y METAFONT.",
    "biografia": "Profesor emérito de la Universidad de Stanford, Premio Turing en 1974. Estableció el rigor matemático con el que se mide la complejidad y eficiencia computacional.",
    "importanciaHistorica": "TeX es el estándar planetario indiscutible para la publicación de artículos científicos en matemáticas, física e informática desde hace más de cuatro décadas.",
    "lugaresTrabajo": "Caltech y Universidad de Stanford",
    "fuenteReferencia": "The Art of Computer Programming / ACM Turing Award 1974"
})

add_entry({
    "id": "edsger-dijkstra",
    "nombre": "Edsger Dijkstra",
    "pais": "Países Bajos",
    "continente": "Europa",
    "vida": "1930 – 2002",
    "nacimientoLugar": "Róterdam, Países Bajos",
    "aportePeriodo": "1959",
    "anioNumerico": 1959,
    "campo": "Algorítmica, programación estructurada y computación distribuida",
    "disciplinas": ["Informática", "Matemáticas"],
    "aporteDescripcion": "Diseñó el algoritmo de Dijkstra para calcular caminos mínimos en grafos (base del enrutamiento de Internet y GPS), inventó el semáforo para sincronización de procesos y fundó la programación estructurada.",
    "biografia": "Pionero neerlandés de la computación, Premio Turing en 1972. Famoso por su artículo contra la instrucción GOTO y por elevar la programación al estatus de disciplina científica rigurosa.",
    "importanciaHistorica": "Sus algoritmos y principios de sincronización permiten el funcionamiento diario de redes de comunicación, satélites de navegación y sistemas multiusuario concurrentes.",
    "lugaresTrabajo": "Centrum Wiskunde & Informatica (Ámsterdam), Universidad de Eindhoven y Univ. de Texas en Austin",
    "fuenteReferencia": "Premio Turing ACM 1972 / Dijkstra Manuscripts Archive"
})

add_entry({
    "id": "barbara-liskov",
    "nombre": "Barbara Liskov",
    "pais": "Estados Unidos",
    "continente": "América",
    "vida": "1939 – actualidad",
    "nacimientoLugar": "Los Ángeles, California, EE. UU.",
    "aportePeriodo": "1987",
    "anioNumerico": 1987,
    "campo": "Diseño de lenguajes de programación y sistemas distribuidos",
    "disciplinas": ["Informática"],
    "aporteDescripcion": "Formuló el principio de sustitución de Liskov (la 'L' en los principios SOLID del software), diseñó el lenguaje CLU con tipos de datos abstractos y el protocolo PBFT para tolerancia a fallos bizantinos.",
    "biografia": "Científica de la computación y profesora en el MIT. Una de las primeras mujeres en EE. UU. en obtener un doctorado en computación (Stanford 1968) y Premio Turing en 2008.",
    "importanciaHistorica": "Pilar fundamental de la programación orientada a objetos moderna y de los sistemas de consenso distribuido que hoy garantizan la seguridad de redes y blockchains.",
    "lugaresTrabajo": "MIT Computer Science and Artificial Intelligence Laboratory (CSAIL)",
    "fuenteReferencia": "ACM A.M. Turing Award 2008 / MIT News",
    "esPionera": True
})

add_entry({
    "id": "shafi-goldwasser",
    "nombre": "Shafi Goldwasser",
    "pais": "Estados Unidos",
    "continente": "América",
    "vida": "1958 – actualidad",
    "nacimientoLugar": "Nueva York, EE. UU.",
    "aportePeriodo": "1985",
    "anioNumerico": 1985,
    "campo": "Criptografía moderna, teoría de la complejidad y privacidad de datos",
    "disciplinas": ["Informática", "Matemáticas"],
    "aporteDescripcion": "Co-inventó las pruebas de conocimiento cero (Zero-Knowledge Proofs), la encriptación probabilística y el cifrado semántico que fundamentan la seguridad digital contemporánea.",
    "biografia": "Criptógrafa e investigadora estadounidense-israelí, profesora en el MIT y en el Instituto Weizmann, y directora del Simons Institute en UC Berkeley. Premio Turing en 2012.",
    "importanciaHistorica": "Estableció los fundamentos matemáticos de la seguridad en transacciones electrónicas, banca digital, firma electrónica y privacidad de la información en línea.",
    "lugaresTrabajo": "MIT, Instituto Weizmann de Ciencias y UC Berkeley",
    "fuenteReferencia": "ACM A.M. Turing Award 2012 / Weizmann Institute",
    "esPionera": True
})

add_entry({
    "id": "frances-allen",
    "nombre": "Frances Allen",
    "pais": "Estados Unidos",
    "continente": "América",
    "vida": "1932 – 2020",
    "nacimientoLugar": "Peru, Nueva York, EE. UU.",
    "aportePeriodo": "1971",
    "anioNumerico": 1971,
    "campo": "Optimización de compiladores y computación paralela",
    "disciplinas": ["Informática"],
    "aporteDescripcion": "Pionera en técnicas de optimización automática de compiladores y análisis de flujo de control, permitiendo que programas escritos en alto nivel se ejecuten a máxima velocidad en procesadores paralelos.",
    "biografia": "Científica de la computación en IBM Research durante 45 años. Primera mujer nombrada IBM Fellow (1989) y primera mujer en la historia en recibir el Premio Turing (2006).",
    "importanciaHistorica": "Sus algoritmos de compilación optimizada están presentes en prácticamente todos los compiladores modernos (GCC, LLVM, Clang) que compilan el software planetario.",
    "lugaresTrabajo": "IBM Thomas J. Watson Research Center, Nueva York",
    "fuenteReferencia": "Premio Turing ACM 2006 / IBM Archives",
    "esPionera": True
})

add_entry({
    "id": "ken-thompson",
    "nombre": "Ken Thompson",
    "pais": "Estados Unidos",
    "continente": "América",
    "vida": "1943 – actualidad",
    "nacimientoLugar": "Nueva Orleans, Luisiana, EE. UU.",
    "aportePeriodo": "1969",
    "anioNumerico": 1969,
    "campo": "Sistemas operativos, compiladores y lenguajes de programación",
    "disciplinas": ["Informática", "Ingeniería"],
    "aporteDescripcion": "Diseñó e implementó la versión original del sistema operativo Unix, el lenguaje B (precursor de C), inventó la codificación de caracteres UTF-8 y codiseñó el lenguaje Go en Google.",
    "biografia": "Pionero de la computación en los Laboratorios Bell. Galardonado con el Premio Turing en 1983 y la Medalla Nacional de Tecnología en 1999.",
    "importanciaHistorica": "La filosofía de diseño modular de Unix y el estándar UTF-8 son los dos pilares invisibles que sostienen la comunicación de datos y servidores de todo el planeta.",
    "lugaresTrabajo": "Bell Laboratories y Google Inc.",
    "fuenteReferencia": "Premio Turing ACM 1983 / Bell Labs"
})

add_entry({
    "id": "linus-torvalds",
    "nombre": "Linus Torvalds",
    "pais": "Finlandia",
    "continente": "Europa",
    "vida": "1969 – actualidad",
    "nacimientoLugar": "Helsinki, Finlandia",
    "aportePeriodo": "1991",
    "anioNumerico": 1991,
    "campo": "Ingeniería de software, sistemas operativos y control de versiones",
    "disciplinas": ["Informática", "Ingeniería"],
    "aporteDescripcion": "Creó el kernel del sistema operativo libre Linux (1991) y el sistema de control de versiones distribuido Git (2005), pilares de la infraestructura digital global.",
    "biografia": "Ingeniero de software finlandés-estadounidense galardonado con el Premio de Tecnología del Milenio en 2012 y el Premio IEEE Computer Pioneer.",
    "importanciaHistorica": "Linux impulsa la totalidad de los supercomputadores del mundo, los servidores de la nube, Android y miles de millones de dispositivos conectados.",
    "lugaresTrabajo": "Universidad de Helsinki y Linux Foundation",
    "fuenteReferencia": "Millennium Technology Prize 2012 / Linux Foundation"
})

print(f"Lote 2 completado. Total acumulado: {len(dataset)}")

# =========================================================================
# LOTE 3: QUÍMICA, CIENCIA DE MATERIALES Y CRISTALOGRAFÍA (30 CIENTÍFICOS)
# =========================================================================

add_entry({
    "id": "antoine-lavoisier",
    "nombre": "Antoine Lavoisier",
    "pais": "Francia",
    "continente": "Europa",
    "vida": "1743 – 1794",
    "nacimientoLugar": "París, Francia",
    "aportePeriodo": "1789",
    "anioNumerico": 1789,
    "campo": "Química moderna y estequiometría",
    "disciplinas": ["Química", "Física"],
    "aporteDescripcion": "Enunció la ley de conservación de la materia ('la materia no se crea ni se destruye, solo se transforma'), identificó el oxígeno y el hidrógeno, y derrocó la teoría del flogisto.",
    "biografia": "Padre indiscutible de la química moderna. Publicó el Traité élémentaire de chimie (1789), estableciendo la primera tabla moderna de sustancias simples y la nomenclatura química sistemática.",
    "importanciaHistorica": "Transformó la alquimia cualitativa en una ciencia físico-química cuantitativa y rigurosa basada en pesadas y balances de masa exactos.",
    "lugaresTrabajo": "Académie Royale des Sciences de París",
    "fuenteReferencia": "Traité élémentaire de chimie (1789) / Académie des Sciences"
})

add_entry({
    "id": "dmitri-mendeleev",
    "nombre": "Dmitri Mendeléyev",
    "pais": "Rusia",
    "continente": "Europa",
    "vida": "1834 – 1907",
    "nacimientoLugar": "Tobolsk, Siberia, Imperio ruso",
    "aportePeriodo": "1869",
    "anioNumerico": 1869,
    "campo": "Química inorgánica y ley periódica de los elementos",
    "disciplinas": ["Química", "Física"],
    "aporteDescripcion": "Creó la Tabla Periódica de los Elementos ordenándolos por su peso atómico y propiedades periódicas, prediciendo con asombrosa exactitud la existencia de elementos aún no descubiertos como el galio y el germanio.",
    "biografia": "Químico ruso, catedrático en la Universidad de San Petersburgo. Su visión de la periodicidad química es uno de los logros intelectuales más trascendentes de la ciencia.",
    "importanciaHistorica": "Proporcionó el marco estructural universal para comprender la reactividad, valencia y familias de elementos de toda la materia cósmica.",
    "lugaresTrabajo": "Universidad Estatal de San Petersburgo",
    "fuenteReferencia": "Sociedad Química Rusa (1869) / Museo Mendeléyev San Petersburgo",
    "destacado": True
})

add_entry({
    "id": "john-dalton",
    "nombre": "John Dalton",
    "pais": "Reino Unido",
    "continente": "Europa",
    "vida": "1766 – 1844",
    "nacimientoLugar": "Eaglesfield, Cumberland, Inglaterra",
    "aportePeriodo": "1803",
    "anioNumerico": 1803,
    "campo": "Teoría atómica moderna, química y meteorología",
    "disciplinas": ["Química", "Física"],
    "aporteDescripcion": "Propuso la primera teoría atómica científica con base cuantitativa, la ley de las proporciones múltiples, calculó pesos atómicos relativos y describió el daltonismo.",
    "biografia": "Naturalista, químico y matemático cuáquero inglés. Llevó un registro diario del clima durante más de 50 años que sumó más de 200.000 observaciones meteorológicas.",
    "importanciaHistorica": "Estableció el concepto de átomo como unidad básica indivisible de cada elemento químico, fundando la estequiometría moderna.",
    "lugaresTrabajo": "Manchester Literary and Philosophical Society, Inglaterra",
    "fuenteReferencia": "A New System of Chemical Philosophy (1808) / Manchester Literary & Phil."
})

add_entry({
    "id": "ernest-rutherford",
    "nombre": "Ernest Rutherford",
    "pais": "Nueva Zelanda",
    "continente": "Oceanía",
    "vida": "1871 – 1937",
    "nacimientoLugar": "Brightwater, cerca de Nelson, Nueva Zelanda",
    "aportePeriodo": "1911",
    "anioNumerico": 1911,
    "campo": "Física nuclear y química de elementos radiactivos",
    "disciplinas": ["Física", "Química"],
    "aporteDescripcion": "Descubrió el núcleo atómico mediante el experimento de la lámina de oro, propuso el modelo planetario del átomo, descubrió las partículas alfa y beta y logró la primera transmutación nuclear artificial.",
    "biografia": "Físico neozelandés-británico, Premio Nobel de Química en 1908 por sus investigaciones sobre la desintegración de los elementos. Director del célebre Laboratorio Cavendish.",
    "importanciaHistorica": "Padre de la física nuclear; reveló que la masa y la carga positiva del átomo se concentran en un minúsculo núcleo central.",
    "lugaresTrabajo": "Universidad McGill (Canadá), Universidad de Mánchester y Cambridge",
    "fuenteReferencia": "Premio Nobel de Química 1908 / Royal Society of New Zealand"
})

add_entry({
    "id": "joseph-john-thomson",
    "nombre": "J. J. Thomson",
    "pais": "Reino Unido",
    "continente": "Europa",
    "vida": "1856 – 1940",
    "nacimientoLugar": "Cheetham Hill, Mánchester, Inglaterra",
    "aportePeriodo": "1897",
    "anioNumerico": 1897,
    "campo": "Física experimental y estructura atómica",
    "disciplinas": ["Física", "Química"],
    "aporteDescripcion": "Descubrió la primera partícula subatómica elemental, el electrón, mediante experimentos con tubos de rayos catódicos, midiendo su relación masa-carga (e/m).",
    "biografia": "Físico británico, Premio Nobel de Física en 1906. Director del Laboratorio Cavendish, donde formó a siete futuros premios Nobel (incluido Rutherford).",
    "importanciaHistorica": "Derribó el dogma de que el átomo era indivisible, dando inicio formal a la era de la física de partículas elementales.",
    "lugaresTrabajo": "Laboratorio Cavendish, Universidad de Cambridge",
    "fuenteReferencia": "Premio Nobel de Física 1906 / Cambridge Cavendish Archives"
})

add_entry({
    "id": "wilhelm-rontgen",
    "nombre": "Wilhelm Röntgen",
    "pais": "Alemania",
    "continente": "Europa",
    "vida": "1845 – 1923",
    "nacimientoLugar": "Lennep, Prusia, Alemania",
    "aportePeriodo": "1895",
    "anioNumerico": 1895,
    "campo": "Física electromagnética y radiología médica",
    "disciplinas": ["Física", "Medicina"],
    "aporteDescripcion": "Descubrió una nueva forma de radiación electromagnética penetrante que denominó rayos X, realizando la primera radiografía médica de la historia (la mano de su esposa Anna Bertha).",
    "biografia": "Físico alemán galardonado en 1901 con el primer Premio Nobel de Física de la historia. Se negó a patentar su descubrimiento para que estuviera a disposición de toda la medicina.",
    "importanciaHistorica": "Revolucionó el diagnóstico médico sin cirugía invasiva y abrió el estudio de la física atómica y cristalográfica.",
    "lugaresTrabajo": "Universidad de Wurzburgo y Universidad de Múnich",
    "fuenteReferencia": "Primer Premio Nobel de Física (1901) / Deutsches Röntgen-Museum"
})

add_entry({
    "id": "robert-boyle",
    "nombre": "Robert Boyle",
    "pais": "Irlanda",
    "continente": "Europa",
    "vida": "1627 – 1691",
    "nacimientoLugar": "Castillo de Lismore, condado de Waterford, Irlanda",
    "aportePeriodo": "1662",
    "anioNumerico": 1662,
    "campo": "Química experimental y física de gases",
    "disciplinas": ["Química", "Física"],
    "aporteDescripcion": "Formuló la ley de Boyle sobre el comportamiento de los gases ideales (P·V = constante a temperatura constante) y publicó The Sceptical Chymist, separando la química de la alquimia.",
    "biografia": "Filósofo natural, químico y físico anglo-irlandés, miembro fundador de la Royal Society de Londres. Pionero en el uso de la bomba de vacío de Guericke perfeccionada por Hooke.",
    "importanciaHistorica": "Considerado el primer químico moderno por exigir evidencia experimental cuantitativa reproducible antes de aceptar cualquier teoría.",
    "lugaresTrabajo": "Oxford y Londres, Reino Unido",
    "fuenteReferencia": "The Sceptical Chymist (1661) / Royal Society of London"
})

add_entry({
    "id": "amedeo-avogadro",
    "nombre": "Amedeo Avogadro",
    "pais": "Italia",
    "continente": "Europa",
    "vida": "1776 – 1856",
    "nacimientoLugar": "Turín, Reino de Cerdeña (Italia)",
    "aportePeriodo": "1811",
    "anioNumerico": 1811,
    "campo": "Fisicoquímica molecular y estequiometría",
    "disciplinas": ["Química", "Física"],
    "aporteDescripcion": "Formuló la ley de Avogadro (volúmenes iguales de gases a igual presión y temperatura contienen el mismo número de moléculas), permitiendo definir la constante de Avogadro (N_A).",
    "biografia": "Físico y químico piamontés, profesor de física en la Universidad de Turín. Diferenció por vez primera con claridad rigurosa entre átomos y moléculas.",
    "importanciaHistorica": "Resolvió la confusión histórica sobre los pesos atómicos y moleculares en el trascendental Congreso de Karlsruhe de 1860.",
    "lugaresTrabajo": "Universidad de Turín y Vercelli",
    "fuenteReferencia": "Journal de Physique (1811) / Accademia delle Scienze di Torino"
})

add_entry({
    "id": "svante-arrhenius",
    "nombre": "Svante Arrhenius",
    "pais": "Suecia",
    "continente": "Europa",
    "vida": "1859 – 1927",
    "nacimientoLugar": "Uppsala, Suecia",
    "aportePeriodo": "1887",
    "anioNumerico": 1887,
    "campo": "Fisicoquímica, disociación electrolítica y ciencias del clima",
    "disciplinas": ["Química", "Física", "Ciencias ambientales"],
    "aporteDescripcion": "Formuló la teoría de la disociación electrolítica de iones, la ecuación de Arrhenius para velocidad de reacciones y calculó por primera vez el efecto del CO₂ en el calentamiento global del planeta.",
    "biografia": "Fisicoquímico sueco, Premio Nobel de Química en 1903. Uno de los fundadores de la química física moderna y pionero de la climatología cuántica.",
    "importanciaHistorica": "Pionero profético de la ciencia del cambio climático contemporáneo y de la teoría electroquímica universal.",
    "lugaresTrabajo": "Universidad de Estocolmo e Instituto Nobel de Química Física",
    "fuenteReferencia": "Premio Nobel de Química 1903 / Real Academia Sueca de Ciencias"
})

add_entry({
    "id": "linus-pauling",
    "nombre": "Linus Pauling",
    "pais": "Estados Unidos",
    "continente": "América",
    "vida": "1901 – 1994",
    "nacimientoLugar": "Portland, Oregón, EE. UU.",
    "aportePeriodo": "1939",
    "anioNumerico": 1939,
    "campo": "Química cuántica, enlace químico y biología estructural",
    "disciplinas": ["Química", "Física", "Biología"],
    "aporteDescripcion": "Publicó The Nature of the Chemical Bond aplicando la mecánica cuántica a la química; descubrió la estructura en hélice alfa de las proteínas y la anemia falciforme como enfermedad molecular.",
    "biografia": "Uno de los químicos más influyentes de la historia. Una de las únicas cuatro personas en ganar dos Premios Nobel (Química 1954 y de la Paz 1962, este último individualmente sin compartir).",
    "importanciaHistorica": "Fundó la química estructural moderna y fue pionero clave de la biología molecular y del activismo científico por el desarme nuclear.",
    "lugaresTrabajo": "Caltech (Pasadena) y Universidad de Stanford",
    "fuenteReferencia": "Premio Nobel de Química 1954 / Premio Nobel de la Paz 1962 / Caltech"
})

add_entry({
    "id": "dorothy-hodgkin",
    "nombre": "Dorothy Crowfoot Hodgkin",
    "pais": "Reino Unido",
    "continente": "Europa",
    "vida": "1910 – 1994",
    "nacimientoLugar": "El Cairo, Egipto (bajo administración británica)",
    "aportePeriodo": "1945",
    "anioNumerico": 1945,
    "campo": "Cristalografía de rayos X y bioquímica estructural",
    "disciplinas": ["Química", "Biología", "Física"],
    "aporteDescripcion": "Descifró mediante cristalografía de rayos X la estructura tridimensional atómica exacta del colesterol, la penicilina (1945), la vitamina B12 (1955) y la insulina (1969).",
    "biografia": "Cristalógrafa británica galardonada con el Premio Nobel de Química en 1964. Pionera en computación para el cálculo de densidades electrónicas en macromoléculas biológicas.",
    "importanciaHistorica": "Hizo posible la síntesis farmacéutica industrial masiva de antibióticos y tratamientos para la diabetes que han salvado cientos de millones de vidas.",
    "lugaresTrabajo": "Universidad de Oxford",
    "fuenteReferencia": "Premio Nobel de Química 1964 / Royal Society of London",
    "esPionera": True
})

add_entry({
    "id": "ahmed-zewail",
    "nombre": "Ahmed Zewail",
    "pais": "Egipto",
    "continente": "África",
    "vida": "1946 – 2016",
    "nacimientoLugar": "Damanhur, Egipto",
    "aportePeriodo": "1990",
    "anioNumerico": 1990,
    "campo": "Femtoquímica y dinámica molecular ultrarrápida",
    "disciplinas": ["Química", "Física"],
    "aporteDescripcion": "Fundó la femtoquímica utilizando pulsos láser ultracortos de femtosegundos (10⁻¹⁵ s) para filmar en tiempo real la ruptura y formación de enlaces químicos individuales.",
    "biografia": "Científico egipcio-estadounidense, catedrático Linus Pauling en Caltech. Premio Nobel de Química en 1999 (primer científico árabe en ganar un Nobel en una disciplina científica).",
    "importanciaHistorica": "Permitió presenciar los estados de transición atómica en reacciones moleculares que antes se consideraban intrínsecamente inobservables.",
    "lugaresTrabajo": "Universidad de Alejandría, UC Berkeley y Caltech",
    "fuenteReferencia": "Premio Nobel de Química 1999 / Caltech Division of Chemistry",
    "destacado": True
})

add_entry({
    "id": "chintamani-rao",
    "nombre": "C. N. R. Rao",
    "pais": "India",
    "continente": "Asia",
    "vida": "1934 – actualidad",
    "nacimientoLugar": "Bangalore, India",
    "aportePeriodo": "1987",
    "anioNumerico": 1987,
    "campo": "Química del estado sólido, materiales avanzados y nanotecnología",
    "disciplinas": ["Química", "Ingeniería"],
    "aporteDescripcion": "Pionero en la síntesis y caracterización de superconductores de alta temperatura, grafeno de pocas capas, nanotubos de carbono e híbridos inorgánicos-orgánicos.",
    "biografia": "Químico indio de renombre mundial, fundador del Jawaharlal Nehru Centre for Advanced Scientific Research. Condecorado con el Bharat Ratna y miembro de más de 30 academias de ciencias.",
    "importanciaHistorica": "Líder internacional en el diseño de nuevos materiales electrónicos y magnéticos y en el impulso de la ciencia de vanguardia en el sur global.",
    "lugaresTrabajo": "Indian Institute of Science (Bangalore) y JNCASR",
    "fuenteReferencia": "Royal Society of Chemistry / National Academy of Sciences"
})

add_entry({
    "id": "yuan-tseh-lee",
    "nombre": "Yuan Tseh Lee",
    "pais": "Taiwán",
    "continente": "Asia",
    "vida": "1936 – actualidad",
    "nacimientoLugar": "Hsinchu, Taiwán",
    "aportePeriodo": "1972",
    "anioNumerico": 1972,
    "campo": "Dinámica de reacciones químicas e interacción molecular",
    "disciplinas": ["Química", "Física"],
    "aporteDescripcion": "Desarrolló la técnica de haces moleculares cruzados para estudiar colisiones y estados de transición de moléculas elementales a nivel cuántico microscópico.",
    "biografia": "Químico taiwanés-estadounidense, Premio Nobel de Química en 1986 junto a Dudley Herschbach y John Polanyi. Presidente de la Academia Sínica de Taiwán.",
    "importanciaHistorica": "Transformó la cinética química teórica en una disciplina de observación experimental precisa de trayectorias moleculares individuales.",
    "lugaresTrabajo": "Universidad de Chicago, UC Berkeley y Academia Sínica (Taiwán)",
    "fuenteReferencia": "Premio Nobel de Química 1986 / Academia Sinica"
})

add_entry({
    "id": "kenichi-fukui",
    "nombre": "Kenichi Fukui",
    "pais": "Japón",
    "continente": "Asia",
    "vida": "1918 – 1998",
    "nacimientoLugar": "Nara, Japón",
    "aportePeriodo": "1952",
    "anioNumerico": 1952,
    "campo": "Química cuántica y teoría de orbitales moleculares frontera",
    "disciplinas": ["Química", "Física"],
    "aporteDescripcion": "Formuló la teoría de los orbitales moleculares de frontera (HOMO y LUMO), prediciendo con exactitud la reactividad y estereoquímica de las moléculas orgánicas.",
    "biografia": "Químico teórico japonés en la Universidad de Kioto, galardonado con el Premio Nobel de Química en 1981 compartido con Roald Hoffmann.",
    "importanciaHistorica": "Primer científico asiático en ganar el Premio Nobel de Química, facilitando el diseño racional de fármacos y síntesis orgánica.",
    "lugaresTrabajo": "Universidad de Kioto e Instituto de Química Fundamental de Kioto",
    "fuenteReferencia": "Premio Nobel de Química 1981 / Kyoto University Archives"
})

add_entry({
    "id": "roald-hoffmann",
    "nombre": "Roald Hoffmann",
    "pais": "Polonia",
    "continente": "Europa",
    "vida": "1937 – actualidad",
    "nacimientoLugar": "Złoczów, Polonia (actual Zolochiv, Ucrania)",
    "aportePeriodo": "1965",
    "anioNumerico": 1965,
    "campo": "Química teórica y reglas de Woodward-Hoffmann",
    "disciplinas": ["Química", "Física"],
    "aporteDescripcion": "Formuló las reglas de Woodward-Hoffmann sobre la conservación de la simetría orbital en reacciones pericíclicas, explicando por qué ciertas reacciones químicas ocurren con calor y otras con luz.",
    "biografia": "Químico teórico y poeta polaco-estadounidense que sobrevivió al Holocausto de niño. Profesor en la Universidad de Cornell, Premio Nobel de Química en 1981.",
    "importanciaHistorica": "Proporcionó una regla elegante e infalible para comprender la arquitectura de las transformaciones químicas tridimensionales.",
    "lugaresTrabajo": "Universidad de Harvard y Universidad de Cornell",
    "fuenteReferencia": "Premio Nobel de Química 1981 / Cornell University Department of Chemistry"
})

add_entry({
    "id": "fritz-haber",
    "nombre": "Fritz Haber",
    "pais": "Alemania",
    "continente": "Europa",
    "vida": "1868 – 1934",
    "nacimientoLugar": "Breslavia, Prusia (actual Polonia)",
    "aportePeriodo": "1909",
    "anioNumerico": 1909,
    "campo": "Fisicoquímica, catálisis y síntesis de amoníaco",
    "disciplinas": ["Química", "Ingeniería"],
    "aporteDescripcion": "Desarrolló el proceso Haber-Bosch para la síntesis catalítica de amoníaco a partir de nitrógeno atmosférico e hidrógeno a alta presión y temperatura.",
    "biografia": "Físico y químico alemán, Premio Nobel de Química en 1918. Su figura es compleja y trágica: sus fertilizantes alimentaron al mundo mientras sus investigaciones químicas militares marcaron la Gran Guerra.",
    "importanciaHistorica": "Permitió la fabricación masiva de fertilizantes nitrogenados que sostienen en la actualidad la producción de alimentos para la mitad de la población humana.",
    "lugaresTrabajo": "Universidad de Karlsruhe e Instituto Kaiser Wilhelm de Química Física (Berlín)",
    "fuenteReferencia": "Premio Nobel de Química 1918 / Max Planck Institute for Chemical Physics"
})

add_entry({
    "id": "carl-bosch",
    "nombre": "Carl Bosch",
    "pais": "Alemania",
    "continente": "Europa",
    "vida": "1874 – 1940",
    "nacimientoLugar": "Colonia, Alemania",
    "aportePeriodo": "1913",
    "anioNumerico": 1913,
    "campo": "Ingeniería química industrial de alta presión",
    "disciplinas": ["Química", "Ingeniería"],
    "aporteDescripcion": "Escaló industrialmente el proceso de Haber diseñando reactores y aleaciones capaces de soportar cientos de atmósferas y catalizadores robustos para la síntesis masiva de amoníaco.",
    "biografia": "Ingeniero químico e industrial alemán en BASF. Premio Nobel de Química en 1931 compartido con Friedrich Bergius por el desarrollo de métodos químicos de alta presión.",
    "importanciaHistorica": "Fundador de la ingeniería química de alta presión moderna, base de la petroquímica, síntesis de polímeros y fertilización agrícola global.",
    "lugaresTrabajo": "BASF (Ludwigshafen) y Heidelberg",
    "fuenteReferencia": "Premio Nobel de Química 1931 / Carl Bosch Museum Heidelberg"
})

add_entry({
    "id": "gerty-cori",
    "nombre": "Gerty Cori",
    "pais": "Estados Unidos",
    "continente": "América",
    "vida": "1896 – 1957",
    "nacimientoLugar": "Praga, Imperio austrohúngaro",
    "aportePeriodo": "1929",
    "anioNumerico": 1929,
    "campo": "Bioquímica metabólica y enzimología",
    "disciplinas": ["Química", "Biología", "Medicina"],
    "aporteDescripcion": "Descifró el ciclo de Cori sobre el metabolismo de carbohidratos entre el músculo y el hígado y descubrió la glucosa-1-fosfato (éster de Cori) y la glucógeno fosforilasa.",
    "biografia": "Bioquímica checo-estadounidense. Primera mujer estadounidense en recibir un Premio Nobel en ciencias y primera mujer en ganar el Nobel de Fisiología o Medicina (1947).",
    "importanciaHistorica": "Fundamento del metabolismo energético humano y del diagnóstico de glucogenosis y diabetes.",
    "lugaresTrabajo": "Universidad Washington en San Luis (Misuri)",
    "fuenteReferencia": "Premio Nobel de Fisiología o Medicina 1947 / Washington University",
    "esPionera": True
})

add_entry({
    "id": "ada-yonath",
    "nombre": "Ada Yonath",
    "pais": "Israel",
    "continente": "Asia",
    "vida": "1939 – actualidad",
    "nacimientoLugar": "Jerusalén, Mandato británico de Palestina",
    "aportePeriodo": "2000",
    "anioNumerico": 2000,
    "campo": "Cristalografía de macromoléculas y biología estructural",
    "disciplinas": ["Química", "Biología"],
    "aporteDescripcion": "Pionera en la criocristalografía de ribosomas que permitió resolver la estructura atómica tridimensional del ribosoma celular y comprender el mecanismo de acción de los antibióticos.",
    "biografia": "Cristalógrafa israelí en el Instituto Weizmann de Ciencias. Premio Nobel de Química en 2009 (primera mujer de Oriente Medio en recibir un Nobel científico).",
    "importanciaHistorica": "Revolucionó el diseño de antibióticos de precisión dirigidos a las fábricas de proteínas de las bacterias patógenas.",
    "lugaresTrabajo": "Instituto Weizmann de Ciencias (Rejovot) y DESY (Hamburgo)",
    "fuenteReferencia": "Premio Nobel de Química 2009 / Weizmann Institute of Science",
    "esPionera": True
})

add_entry({
    "id": "percy-julian",
    "nombre": "Percy Julian",
    "pais": "Estados Unidos",
    "continente": "América",
    "vida": "1899 – 1975",
    "nacimientoLugar": "Montgomery, Alabama, EE. UU.",
    "aportePeriodo": "1935",
    "anioNumerico": 1935,
    "campo": "Química orgánica sintética y fitoquímica de esteroides",
    "disciplinas": ["Química", "Medicina"],
    "aporteDescripcion": "Logró la síntesis total de la fisostigmina para el tratamiento del glaucoma y desarrolló la síntesis a escala industrial de cortisona, progesterona y testosterona a partir de esteroles de soja.",
    "biografia": "Químico orgánico afroestadounidense con más de 130 patentes. Superó la segregación racial para fundar Julian Laboratories y convertirse en miembro de la Academia Nacional de Ciencias de EE. UU.",
    "importanciaHistorica": "Abarató en cientos de veces el coste de la cortisona y las hormonas reproductivas, haciéndolas accesibles para millones de pacientes con artritis reumatoide.",
    "lugaresTrabajo": "Universidad DePauw, Glidden Company y Julian Laboratories (Chicago)",
    "fuenteReferencia": "National Inventors Hall of Fame / American Chemical Society Landmark"
})

add_entry({
    "id": "mario-molina",
    "nombre": "Mario Molina",
    "pais": "México",
    "continente": "América",
    "vida": "1943 – 2020",
    "nacimientoLugar": "Ciudad de México, México",
    "aportePeriodo": "1974",
    "anioNumerico": 1974,
    "campo": "Química atmosférica y ciencias ambientales",
    "disciplinas": ["Química", "Ciencias ambientales"],
    "aporteDescripcion": "Descubrió junto a Sherwood Rowland que los clorofluorocarbonos (CFC) liberados por aerosoles y refrigerantes destruyen catalíticamente la capa de ozono estratosférica.",
    "biografia": "Ingeniero químico y profesor mexicano en UC Irvine, MIT y UCSD. Premio Nobel de Química en 1995.",
    "importanciaHistorica": "Su investigación condujo al Protocolo de Montreal de 1987, el tratado ambiental internacional más exitoso de la historia que salvó la capa de ozono de la Tierra.",
    "lugaresTrabajo": "UNAM, UC Irvine, MIT y Centro Mario Molina",
    "fuenteReferencia": "Premio Nobel de Química 1995 / Centro Mario Molina México",
    "destacado": True
})

add_entry({
    "id": "paul-crutzen",
    "nombre": "Paul Crutzen",
    "pais": "Países Bajos",
    "continente": "Europa",
    "vida": "1933 – 2021",
    "nacimientoLugar": "Ámsterdam, Países Bajos",
    "aportePeriodo": "1970",
    "anioNumerico": 1970,
    "campo": "Química de la atmósfera y meteorología",
    "disciplinas": ["Química", "Ciencias ambientales", "Geografía"],
    "aporteDescripcion": "Demostró que los óxidos de nitrógeno reaccionan catalíticamente destruyendo el ozono estratosférico y popularizó el concepto geológico de 'Antropoceno'.",
    "biografia": "Meteorólogo y químico neerlandés, director del Instituto Max Planck de Química en Maguncia. Premio Nobel de Química en 1995 junto a Molina y Rowland.",
    "importanciaHistorica": "Sentó las bases de la química atmosférica global y de la comprensión de la huella humana indeleble sobre los ciclos biogeoquímicos planetarios.",
    "lugaresTrabajo": "Universidad de Estocolmo, NCAR (EE. UU.) e Instituto Max Planck de Química",
    "fuenteReferencia": "Premio Nobel de Química 1995 / Max Planck Institute for Chemistry"
})

add_entry({
    "id": "sherwood-rowland",
    "nombre": "F. Sherwood Rowland",
    "pais": "Estados Unidos",
    "continente": "América",
    "vida": "1927 – 2012",
    "nacimientoLugar": "Delaware, Ohio, EE. UU.",
    "aportePeriodo": "1974",
    "anioNumerico": 1974,
    "campo": "Radioquímica y química atmosférica",
    "disciplinas": ["Química", "Ciencias ambientales"],
    "aporteDescripcion": "Demostró experimentalmente el mecanismo fotolítico por el cual los rayos ultravioleta descomponen los CFCs en cloro libre que destruye miles de moléculas de ozono en cadena.",
    "biografia": "Profesor de química en la Universidad de California en Irvine. Defendió con valentía científica la prohibición de los CFCs ante intensas presiones industriales.",
    "importanciaHistorica": "Premio Nobel de Química en 1995; demostró la responsabilidad social del científico ante amenazas ecológicas planetarias.",
    "lugaresTrabajo": "Universidad de Princeton, Universidad de Kansas y UC Irvine",
    "fuenteReferencia": "Premio Nobel de Química 1995 / Nature (1974)"
})

add_entry({
    "id": "stephanie-kwolek",
    "nombre": "Stephanie Kwolek",
    "pais": "Estados Unidos",
    "continente": "América",
    "vida": "1923 – 2014",
    "nacimientoLugar": "New Kensington, Pensilvania, EE. UU.",
    "aportePeriodo": "1965",
    "anioNumerico": 1965,
    "campo": "Química de polímeros y ciencia de materiales",
    "disciplinas": ["Química", "Ingeniería"],
    "aporteDescripcion": "Sintetizó la poliparafenileno tereftalamida, una fibra sintética de cristal líquido de resistencia mecánica extraordinaria conocida mundialmente como Kevlar.",
    "biografia": "Química investigadora en DuPont durante cuatro décadas. Galardonada con la Medalla Nacional de Tecnología de EE. UU. y la Medalla Perkin de Química.",
    "importanciaHistorica": "El Kevlar revolucionó los chalecos antibalas salvando incontables vidas de policías y militares, cables submarinos, trajes espaciales y aeronáutica.",
    "lugaresTrabajo": "DuPont Experimental Station, Wilmington, Delaware",
    "fuenteReferencia": "National Inventors Hall of Fame / American Chemical Society",
    "esPionera": True
})

add_entry({
    "id": "jacobus-van-t-hoff",
    "nombre": "Jacobus Henricus van 't Hoff",
    "pais": "Países Bajos",
    "continente": "Europa",
    "vida": "1852 – 1911",
    "nacimientoLugar": "Róterdam, Países Bajos",
    "aportePeriodo": "1884",
    "anioNumerico": 1884,
    "campo": "Química física, termodinámica y estereoquímica",
    "disciplinas": ["Química", "Física"],
    "aporteDescripcion": "Propuso la estructura tetraédrica tridimensional del átomo de carbono (fundando la estereoquímica) y formuló las leyes de la presión osmótica y la cinética química.",
    "biografia": "Químico neerlandés, ganador en 1901 del primer Premio Nobel de Química de la historia por sus leyes de la dinámica química y de la presión osmótica en disoluciones.",
    "importanciaHistorica": "Pionero indiscutible de la fisicoquímica moderna y de la geometría tridimensional de las moléculas orgánicas.",
    "lugaresTrabajo": "Universidad de Ámsterdam y Universidad de Berlín",
    "fuenteReferencia": "Primer Premio Nobel de Química (1901) / Real Academia Neerlandesa"
})

add_entry({
    "id": "alfred-nobel",
    "nombre": "Alfred Nobel",
    "pais": "Suecia",
    "continente": "Europa",
    "vida": "1833 – 1896",
    "nacimientoLugar": "Estocolmo, Suecia",
    "aportePeriodo": "1867",
    "anioNumerico": 1867,
    "campo": "Ingeniería química, explosivos industriales y filantropía científica",
    "disciplinas": ["Química", "Ingeniería"],
    "aporteDescripcion": "Inventó la dinamita y el detonador de fulminato de mercurio, controlando la nitroglicerina para obras de ingeniería civil, y legó su fortuna para instituir los Premios Nobel.",
    "biografia": "Químico, ingeniero, inventor y fabricante de armas sueco con 355 patentes. En su testamento de 1895 creó los prestigiosos galardones que reconocen los mayores logros de la humanidad.",
    "importanciaHistorica": "Hizo posibles los grandes canales interoceánicos, túneles transalpinos y minería moderna, y creó el galardón científico más prestigioso de la historia universal.",
    "lugaresTrabajo": "Estocolmo, París, San Petersburgo y San Remo (Italia)",
    "fuenteReferencia": "Fundación Nobel / Museo Nobel Estocolmo"
})

add_entry({
    "id": "gilbert-lewis",
    "nombre": "Gilbert N. Lewis",
    "pais": "Estados Unidos",
    "continente": "América",
    "vida": "1875 – 1946",
    "nacimientoLugar": "Weymouth, Massachusetts, EE. UU.",
    "aportePeriodo": "1916",
    "anioNumerico": 1916,
    "campo": "Termodinámica química y teoría del enlace covalente",
    "disciplinas": ["Química", "Física"],
    "aporteDescripcion": "Descubrió el enlace covalente por compartición de pares de electrones, las estructuras de puntos de Lewis, la teoría de ácidos y bases de Lewis y acuñó el término 'fotón'.",
    "biografia": "Fisicoquímico estadounidense y decano de la Facultad de Química de UC Berkeley, centro que transformó en una de las instituciones científicas líderes del mundo.",
    "importanciaHistorica": "Las estructuras de Lewis y su concepto del par electrónico son la herramienta pedagógica y conceptual básica para aprender química en todo el planeta.",
    "lugaresTrabajo": "MIT y Universidad de California en Berkeley",
    "fuenteReferencia": "The Atom and the Molecule (1916) / National Academy of Sciences"
})

add_entry({
    "id": "tu-youyou-malaria",
    "nombre": "Tu Youyou (Aportes Farmacológicos)",
    "pais": "China",
    "continente": "Asia",
    "vida": "1930 – actualidad",
    "nacimientoLugar": "Ningbo, Zhejiang, China",
    "aportePeriodo": "1972",
    "anioNumerico": 1972,
    "campo": "Química farmacéutica y fitofarmacología",
    "disciplinas": ["Química", "Medicina"],
    "aporteDescripcion": "Aisló la artemisinina de la planta Artemisia annua a baja temperatura, descubriendo el antipalúdico más eficaz de la historia contra las cepas resistentes de malaria.",
    "biografia": "Química farmacéutica china, investigadora jefe en la Academia China de Medicina Tradicional. Primera científica china en ganar el Premio Nobel de Fisiología o Medicina (2015).",
    "importanciaHistorica": "Ha salvado millones de vidas en África y el sudeste asiático, siendo el tratamiento estándar de la OMS contra el paludismo.",
    "lugaresTrabajo": "Academia China de Ciencias Médicas Chinas, Pekín",
    "fuenteReferencia": "Premio Nobel de Fisiología o Medicina 2015 / Lasker Foundation",
    "esPionera": True
})

add_entry({
    "id": "sumio-iijima",
    "nombre": "Sumio Iijima",
    "pais": "Japón",
    "continente": "Asia",
    "vida": "1939 – actualidad",
    "nacimientoLugar": "Koshigaya, Saitama, Japón",
    "aportePeriodo": "1991",
    "anioNumerico": 1991,
    "campo": "Ciencia de materiales, microscopía electrónica y nanotecnología",
    "disciplinas": ["Química", "Física", "Ingeniería"],
    "aporteDescripcion": "Descubrió los nanotubos de carbono mediante microscopía electrónica de alta resolución, desatando la era de la nanotecnología del carbono.",
    "biografia": "Físico y científico de materiales japonés en los Laboratorios Fundamentales de NEC y profesor en la Universidad Meijo. Premio Kavli de Nanociencia en 2008.",
    "importanciaHistorica": "Inauguró la era de los nanomateriales ultrarresistentes y conductores, esenciales para nanoelectrónica, almacenamiento de energía y biomedicina.",
    "lugaresTrabajo": "NEC Corporation (Tsukuba) y Universidad Meijo (Nagoya)",
    "fuenteReferencia": "Nature (1991) / Kavli Prize in Nanoscience 2008"
})

print(f"Lote 3 completado. Total acumulado: {len(dataset)}")
