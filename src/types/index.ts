/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ContinentId = 'Europa' | 'América' | 'Asia' | 'África' | 'Oceanía';

export interface Scientist {
  id: string;
  nombre: string;
  nombreCompleto?: string; // Nombre completo formal si difiere
  subtituloAporte?: string; // Pequeña descripción que indica por qué es reconocido o de qué fue pionero
  pais: string; // País de identificación histórica
  continente: ContinentId;
  vida: string; // Fecha de nacimiento y muerte (o actualidad)
  nacimientoLugar: string; // Lugar de nacimiento
  fallecimientoLugar?: string; // Lugar de fallecimiento (si aplica)
  aportePeriodo: string; // Año o período del aporte histórico
  anioNumerico: number; // Año numérico para ordenación cronológica (negativo para a. C.)
  campo: string; // Campo o especialidad científica principal
  disciplinas: string[]; // Lista normalizada de disciplinas (Física, Química, Biología, etc.)
  aporteDescripcion: string; // Resumen del descubrimiento / aporte principal
  lugaresTrabajo: string; // Lugares o instituciones donde desarrolló su labor científica
  esComplementario?: boolean; // Distintivo interno de investigación complementaria
  fuenteReferencia?: string; // Fuente bibliográfica principal
  destacado?: boolean; // Científico destacado para el pabellón de honor
  esPionera?: boolean; // Distintivo de científicas pioneras
  biografia?: string; // Biografía desarrollada y redactada
  importanciaHistorica?: string; // Importancia histórica y legado contemporáneo
  retratoUrl?: string; // Ruta al retrato histórico auténtico verificado

  // Campos de investigación profunda y ampliación biográfica
  contextoHistorico?: string; // Contexto social, histórico y científico de su época
  formacionTrayectoria?: string; // Estudios, maestros, instituciones y dificultades superadas
  descubrimientosDetallados?: string; // Explicación técnica y conceptual de sus descubrimientos
  obrasYReconocimientos?: string[]; // Libros clave, publicaciones y premios
  enlacesReferencia?: { titulo: string; url?: string }[]; // Enlaces y referencias bibliográficas
}

export interface ContinentInfo {
  id: ContinentId;
  nombre: string;
  descripcion: string;
  color: string;
  colorBorder: string;
  colorHover: string;
  centro: [number, number]; // [lat, lng] aprox para mapa
  paises: string[];
}

export type ActiveTab = 'inicio' | 'continentes' | 'linea-tiempo' | 'cientificos' | 'acerca';
