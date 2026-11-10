/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, Globe, CheckCircle2, ShieldCheck, Sparkles, Award } from 'lucide-react';
import { getStatistics } from '../utils/filters';

interface AboutSectionProps {
  onBackToHome?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onBackToHome }) => {
  const stats = getStatistics();

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 text-[#142e20] dark:text-[#f4f1ea]">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#8c6b2d] dark:text-[#d4af37] uppercase tracking-wider font-semibold">
          <BookOpen className="w-4 h-4" />
          <span>Metodología Académica, Fuentes y Rigor Documental</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0f2419] dark:text-[#f4f1ea] tracking-tight mt-1 font-serif">
          Acerca de BIOATLAS — Atlas Universal del Conocimiento Científico
        </h1>
        <p className="text-sm text-[#243d2c] dark:text-[#d7e6dc] mt-2 leading-relaxed">
          Plataforma web educativa e interactiva diseñada para cartografiar la historia viva de los descubrimientos humanos.
          Reúne <strong className="text-[#0f2419] dark:text-white">759 científicos verificados</strong> en física, química, biología, matemáticas, astronomía, medicina, ingeniería y computación,
          abarcando desde las primeras dinastías egipcias y la antigüedad clásica hasta las fronteras contemporáneas de la ciencia.
        </p>
      </div>

      {/* Summary Table */}
      <div className="bg-[#f7f5ed] dark:bg-[#0e2217] rounded-xl border border-[#234734]/25 dark:border-[#2d563e]/60 p-6 shadow-xs">
        <h2 className="text-base font-bold text-[#0f2419] dark:text-white mb-4 flex items-center gap-2 font-serif">
          <Globe className="w-4 h-4 text-[#8c6b2d] dark:text-[#d4af37]" />
          <span>Distribución Cartográfica y Temporal por Continentes</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-[#234734]/20 text-[#52796f] dark:text-[#8ba898] font-mono uppercase text-[11px]">
                <th className="py-2.5 px-3">Continente</th>
                <th className="py-2.5 px-3 text-center">Científicos</th>
                <th className="py-2.5 px-3">Primer Hito</th>
                <th className="py-2.5 px-3">Hito Reciente</th>
                <th className="py-2.5 px-3">Representatividad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#234734]/10 font-mono text-[#243d2c] dark:text-[#d7e6dc]">
              <tr>
                <td className="py-2.5 px-3 font-sans font-semibold text-[#2d6a4f] dark:text-[#78c09a]">Europa</td>
                <td className="py-2.5 px-3 text-center text-[#0f2419] dark:text-white font-bold">{stats.porContinente.Europa}</td>
                <td className="py-2.5 px-3 text-[#8c6b2d] dark:text-[#d4af37]">c. 400 a. C.</td>
                <td className="py-2.5 px-3 text-[#8c6b2d] dark:text-[#d4af37]">2024</td>
                <td className="py-2.5 px-3 font-sans text-xs">Pioneros fundacionales e ilustración</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-sans font-semibold text-[#d99b26] dark:text-[#f4caa8]">América</td>
                <td className="py-2.5 px-3 text-center text-[#0f2419] dark:text-white font-bold">{stats.porContinente.América}</td>
                <td className="py-2.5 px-3 text-[#8c6b2d] dark:text-[#d4af37]">1752</td>
                <td className="py-2.5 px-3 text-[#8c6b2d] dark:text-[#d4af37]">2024</td>
                <td className="py-2.5 px-3 font-sans text-xs">Investigación biomédica, aeroespacial y tecnología</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-sans font-semibold text-[#a47148] dark:text-[#d8a882]">Asia</td>
                <td className="py-2.5 px-3 text-center text-[#0f2419] dark:text-white font-bold">{stats.porContinente.Asia}</td>
                <td className="py-2.5 px-3 text-[#8c6b2d] dark:text-[#d4af37]">c. 600 a. C.</td>
                <td className="py-2.5 px-3 text-[#8c6b2d] dark:text-[#d4af37]">2024</td>
                <td className="py-2.5 px-3 font-sans text-xs">Medicina milenaria, óptica y computación</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-sans font-semibold text-[#4d8b55] dark:text-[#9bb7a5]">África</td>
                <td className="py-2.5 px-3 text-center text-[#0f2419] dark:text-white font-bold">{stats.porContinente.África}</td>
                <td className="py-2.5 px-3 text-[#8c6b2d] dark:text-[#d4af37]">c. 2650 a. C.</td>
                <td className="py-2.5 px-3 text-[#8c6b2d] dark:text-[#d4af37]">2024</td>
                <td className="py-2.5 px-3 font-sans text-xs">Arquitectura faraónica, cirugía e inmunología</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-sans font-semibold text-[#b85d43] dark:text-[#f2aab2]">Oceanía</td>
                <td className="py-2.5 px-3 text-center text-[#0f2419] dark:text-white font-bold">{stats.porContinente.Oceanía}</td>
                <td className="py-2.5 px-3 text-[#8c6b2d] dark:text-[#d4af37]">1915</td>
                <td className="py-2.5 px-3 text-[#8c6b2d] dark:text-[#d4af37]">2024</td>
                <td className="py-2.5 px-3 font-sans text-xs">Inmunología clínica, genética y ecología</td>
              </tr>
              <tr className="bg-[#f4efe3] dark:bg-[#12241a] font-bold text-[#0f2419] dark:text-white border-t-2 border-[#234734]/30">
                <td className="py-3 px-3 font-sans">Total Colección BIOATLAS</td>
                <td className="py-3 px-3 text-center text-[#1b3a2b] dark:text-[#a3c9b3] text-sm">759</td>
                <td className="py-3 px-3 text-[#8c6b2d] dark:text-[#d4af37]">c. 2650 a. C.</td>
                <td className="py-3 px-3 text-[#8c6b2d] dark:text-[#d4af37]">2024</td>
                <td className="py-3 px-3 font-sans text-xs">42 Naciones representadas</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Rules and Disclaimers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#fcfbf7] dark:bg-[#12241a] rounded-xl border border-[#234734]/20 p-5 space-y-3">
          <h3 className="text-sm font-bold text-[#0f2419] dark:text-white flex items-center gap-2 font-serif">
            <CheckCircle2 className="w-4 h-4 text-[#356e4e] dark:text-[#78c09a]" />
            <span>Principios Editoriales de BIOATLAS</span>
          </h3>
          <ul className="text-xs text-[#243d2c] dark:text-[#d7e6dc] space-y-2.5 list-disc pl-4 leading-relaxed">
            <li>
              <strong>Criterio de Inclusión:</strong> Figuras cuyos aportes, investigaciones, experimentos o descubrimientos marcaron hitos verificables en el desarrollo del saber humano.
            </li>
            <li>
              <strong>Identificación y Aportes Clave:</strong> Al lado del nombre de cada científico se incluye una descripción que sintetiza con exactitud histórica su contribución pionera.
            </li>
            <li>
              <strong>Banderas Circulares Oficiales:</strong> Cada registro está vinculado a la bandera de su nación con un tratamiento gráfico circular nítido.
            </li>
          </ul>
        </div>

        <div className="bg-[#fcfbf7] dark:bg-[#12241a] rounded-xl border border-[#234734]/20 p-5 space-y-3">
          <h3 className="text-sm font-bold text-[#0f2419] dark:text-white flex items-center gap-2 font-serif">
            <ShieldCheck className="w-4 h-4 text-[#8c6b2d] dark:text-[#d4af37]" />
            <span>Rigor y Verificación Documental</span>
          </h3>
          <ul className="text-xs text-[#243d2c] dark:text-[#d7e6dc] space-y-2.5 list-disc pl-4 leading-relaxed">
            <li>
              <strong>Fuentes Reconocidas:</strong> Datos contrastados con la Enciclopedia Británica, la Enciclopedia de Filosofía de Stanford, registros de la Fundación Nobel y publicaciones especializadas.
            </li>
            <li>
              <strong>Equidad Global:</strong> Representación balanceada entre continentes, visibilizando tanto a los grandes referentes universales como a científicos pioneros menos conocidos.
            </li>
            <li>
              <strong>Fechas y Aproximaciones:</strong> Las fechas con «c.» corresponden a estimaciones históricas («circa») documentadas en la literatura especializada.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
