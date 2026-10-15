# BIOATLAS — Atlas Interactivo de la Historia de la Biología

Plataforma web educativa e interactiva para la exploración rigurosa de la historia de la biología, desarrollada a partir del documento documental **«Línea del tiempo de la biología»**.

---

## 1. Resumen y Alcance del Proyecto

BIOATLAS transforma las 20 páginas de la fuente documental en una aplicación web interactiva, moderna y accesible. Cubre un periodo histórico de más de cuatro milenios: desde los primeros tratados quirúrgicos atribuidos a **Imhotep** (c. 2650 a. C.) en el antiguo Egipto, hasta el desarrollo de la técnica de edición genética **CRISPR-Cas9** por Emmanuelle Charpentier y Jennifer Doudna en 2012.

### Cifras Clave Verificadas
- **Total de científicos registrados:** 209
- **Continentes documentados:** 5
- **Europa:** 100 científicos (c. 400 a. C. a 2012)
- **América:** 55 científicos (1881 a 2012)
- **Asia:** 30 científicos (c. 600 a. C. a 2006)
- **África:** 13 científicos (c. 2650 a. C. a 2010)
- **Oceanía:** 11 científicos (1925 a 1994)
- **Países representados:** 42 naciones
- **Campos científicos catalogados:** 67 disciplinas (genética, microbiología, inmunología, paleontología, etc.)
- **Fidelidad documental:** 100% correspondiente a las páginas 2 a 15 y la línea de tiempo global de las páginas 16 a 20 del PDF original.

---

## 2. Fidelidad Documental y Reglas Aplicadas

1. **Sin invenciones:** Todos los científicos, fechas, países, aportes y páginas de referencia provienen exclusivamente del PDF original.
2. **Diferenciación geográfica triple:**
   - **País de identificación:** El país con el que la fuente histórica clasifica a la persona.
   - **Lugar de nacimiento:** Cuando difiere de la identificación (ej. Alexander von Humboldt nació en Berlín, Severo Ochoa en Luarca, Luis F. Leloir en París de padres argentinos).
   - **Lugares de trabajo:** Laboratorios o expediciones donde se realizó la labor científica (ej. Francis Crick en Cambridge; Francisco Hernández en Nueva España; José Celestino Mutis en Bogotá).
3. **Manejo de fechas aproximadas:** Se preservan fielmente expresiones como «c.» (circa), «década de 1960» e «inicios del siglo XX».
4. **Fechas anteriores a nuestra era:** Se ordenan algebraicamente como años negativos (ej. c. 2650 a. C. = `-2650`, c. 600 a. C. = `-600`, c. 400 a. C. = `-400`).
5. **Aclaración sobre representatividad:**
   - El número de científicos no refleja el valor científico intrínseco de cada continente.
   - Las listas de África y Oceanía se conformaron a partir de personas nacidas allí, como especifica la página 1 del PDF.
   - No se incluye la Antártida por no estar contemplada en el documento original.

---

## 3. Arquitectura del Software

```
/
├── src/
│   ├── assets/
│   │   └── images/                # Activos visuales históricos de alta fidelidad
│   ├── components/
│   │   ├── Header.tsx             # Barra superior (Top Bar Contract: wordmark, enlaces, acción de búsqueda)
│   │   ├── WorldMap.tsx           # Mapa mundial vectorial interactivo con 5 continentes y dossier en vivo
│   │   ├── StatsBar.tsx           # Indicadores estadísticos dinámicos con fuentes tabulares
│   │   ├── FeaturedDiscoveries.tsx# Selección transversal de hitos fundacionales
│   │   ├── ContinentView.tsx      # Vista dedicada por continente con filtro por país y cronología
│   │   ├── CountryModal.tsx       # Ficha nacional con lista de científicos y advertencia para países sin registro
│   │   ├── ScientistModal.tsx     # Ficha individual completa con citación de página, navegación y disciplinas
│   │   ├── GlobalTimeline.tsx     # Línea del tiempo interactiva: modo cronograma y modo tabla de datos
│   │   ├── ScientistsDirectory.tsx# Directorio general con buscador instantáneo y filtros cruzados
│   │   ├── SearchDialog.tsx       # Modal de búsqueda rápida con atajo de teclado Cmd+K / Ctrl+K
│   │   ├── AboutModal.tsx         # Documentación de fuente, metodología y notas académicas
│   │   └── Footer.tsx             # Pie de página sobrio con atribuciones documentales
│   ├── data/
│   │   ├── scientists.ts          # Base de datos estructurada con los 209 científicos del PDF
│   │   └── continents.ts          # Metadatos, colores y listados de países por continente
│   ├── types/
│   │   └── index.ts               # Definiciones de TypeScript
│   ├── utils/
│   │   ├── filters.ts             # Funciones puras de búsqueda, filtrado y cálculo estadístico
│   │   └── filters.test.ts        # Suite de pruebas automatizadas con node:test
│   ├── App.tsx                    # Orquestador principal de estado y vistas
│   ├── main.tsx                   # Punto de entrada de React
│   └── index.css                  # Tailwind CSS y variables de diseño
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 4. Pruebas Automatizadas

El proyecto cuenta con pruebas de lógica pura ejecutadas con el corredor nativo de Node.js (`node:test` y `tsx`):

```bash
npx tsx --test src/utils/filters.test.ts
```

### Resultados de la Validación:
- Total exacto de 209 científicos validados.
- Conteos por continente: Europa (100), América (55), Asia (30), África (13), Oceanía (11).
- Unicidad de identificadores (`id` sin duplicados).
- Ordenación cronológica a.C. y d.C. verificada.
- Navegación bidireccional entre científicos contiguos probada.
- Búsqueda multi-criterio validada.

---

## 5. Instrucciones de Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Compilar TypeScript y validar sintaxis
npm run build

# Ejecutar el servidor de desarrollo en http://localhost:3000
npm run dev
```

---

## 6. Guía de Ampliación

Para extender el atlas sin alterar la arquitectura:
1. **Agregar nuevos científicos:** Agregar objetos tipados en `src/data/scientists.ts` respetando la interfaz `Scientist`. Las estadísticas, filtros y ordenación cronológica se actualizan automáticamente en toda la interfaz.
2. **Nuevos países o territorios:** Añadir las cadenas en `src/data/continents.ts`. Si un país no tiene registros, el sistema muestra el mensaje respetuoso predeterminado.
3. **Persistencia futura:** El desacoplamiento en `src/utils/filters.ts` permite reemplazar el array estático por consultas a Firestore o PostgreSQL sin modificar los componentes de visualización.
