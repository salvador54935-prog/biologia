export type ContinentId = 'Europa' | 'América' | 'Asia' | 'África' | 'Oceanía';

export interface Scientist {
  id: string;
  nombre: string;
  pais: string; // País de identificación
  continente: ContinentId;
  vida: string; // Fecha de nacimiento y muerte
  nacimientoLugar: string; // Lugar de nacimiento
  aportePeriodo: string; // Texto del año o período tal como figura en el registro
  anioNumerico: number; // Año numérico para ordenación (negativo para a.C.)
  campo: string; // Disciplina o campo científico
  aporteDescripcion: string; // Resumen del descubrimiento / aporte
  lugaresTrabajo: string; // Lugar(es) de trabajo indicados
  paginaPDF?: number | null; // Página 2 a 15 de donde se extrajo (null para colección ampliada)
  esComplementario?: boolean; // true si pertenece a la ampliación de 250 científicos
  fuenteReferencia?: string; // Fuente bibliográfica o enciclopédica del registro
  destacado?: boolean; // Hito destacado para vitrina en lobby
  esPionera?: boolean; // Distintivo de pioneras e investigadoras en la historia biológica
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
