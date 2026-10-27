import React from 'react';
import { BookOpen, FileText, Globe, Award, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { getStatistics } from '../utils/filters';

interface AboutSectionProps {
  onBackToHome?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onBackToHome }) => {
  const stats = getStatistics();

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 text-slate-200">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Fidelidad Documental, Colección Ampliada y Metodología</span>
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight mt-1 font-serif">
          Acerca de VITA MUNDI — Atlas Universal de la Biología
        </h1>
        <p className="text-sm text-slate-300 mt-2 leading-relaxed">
          Plataforma web educativa e interactiva diseñada a partir de la fuente documental 
          <strong className="text-white"> “Línea del tiempo de la biología”</strong> (con sus 209 científicos originales íntegramente preservados),
          enriquecida con una <strong className="text-emerald-300">colección complementaria verificada de 250 biólogos y naturalistas</strong> de los cinco continentes,
          alcanzando 459 figuras pioneras y más de 4.660 años de descubrimientos de la vida.
        </p>
      </div>

      {/* Summary Table from PDF Page 1 */}
      <div className="bg-[#091224] rounded-xl border border-slate-800 p-6 shadow-md">
        <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Globe className="w-4 h-4 text-cyan-400" />
          <span>Distribución Documental por Continentes (Página 1 del PDF)</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px]">
                <th className="py-2.5 px-3">Continente</th>
                <th className="py-2.5 px-3 text-center">Científicos</th>
                <th className="py-2.5 px-3">Primer Aporte</th>
                <th className="py-2.5 px-3">Último Aporte</th>
                <th className="py-2.5 px-3">Páginas en PDF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
              <tr>
                <td className="py-2.5 px-3 font-sans font-semibold text-sky-400">Europa</td>
                <td className="py-2.5 px-3 text-center text-white font-bold">100</td>
                <td className="py-2.5 px-3 text-amber-300">c. 400 a. C.</td>
                <td className="py-2.5 px-3 text-amber-300">2012</td>
                <td className="py-2.5 px-3 text-slate-400">Páginas 2 a 7</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-sans font-semibold text-emerald-400">América</td>
                <td className="py-2.5 px-3 text-center text-white font-bold">55</td>
                <td className="py-2.5 px-3 text-amber-300">1881</td>
                <td className="py-2.5 px-3 text-amber-300">2012</td>
                <td className="py-2.5 px-3 text-slate-400">Páginas 8 a 11</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-sans font-semibold text-amber-400">Asia</td>
                <td className="py-2.5 px-3 text-center text-white font-bold">30</td>
                <td className="py-2.5 px-3 text-amber-300">c. 600 a. C.</td>
                <td className="py-2.5 px-3 text-amber-300">2006</td>
                <td className="py-2.5 px-3 text-slate-400">Páginas 12 a 13</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-sans font-semibold text-orange-400">África</td>
                <td className="py-2.5 px-3 text-center text-white font-bold">13</td>
                <td className="py-2.5 px-3 text-amber-300">c. 2650 a. C.</td>
                <td className="py-2.5 px-3 text-amber-300">2010</td>
                <td className="py-2.5 px-3 text-slate-400">Página 14</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-sans font-semibold text-purple-400">Oceanía</td>
                <td className="py-2.5 px-3 text-center text-white font-bold">11</td>
                <td className="py-2.5 px-3 text-amber-300">1925</td>
                <td className="py-2.5 px-3 text-amber-300">1994</td>
                <td className="py-2.5 px-3 text-slate-400">Página 15</td>
              </tr>
              <tr className="bg-slate-900/80 font-bold text-white border-t-2 border-slate-700">
                <td className="py-3 px-3 font-sans">Total Registrado</td>
                <td className="py-3 px-3 text-center text-cyan-300 text-sm">209</td>
                <td className="py-3 px-3 text-amber-300">c. 2650 a. C.</td>
                <td className="py-3 px-3 text-amber-300">2012</td>
                <td className="py-3 px-3 text-slate-400">14 páginas de datos</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Rules and Disclaimers from Document */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#091224] rounded-xl border border-slate-800 p-5 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Reglas de Lectura del Documento</span>
          </h3>
          <ul className="text-xs text-slate-300 space-y-2.5 list-disc pl-4 leading-relaxed">
            <li>
              <strong>País y Continente de Identificación:</strong> Cada persona aparece en el continente del país con el que se la identifica históricamente. Si nació en otro lugar, la ficha lo indica expresamente.
            </li>
            <li>
              <strong>Fechas y Aportes:</strong> El año del aporte es el del descubrimiento o la publicación más conocidos, pudiendo variar según la fuente consultada. Las fechas marcadas con «c.» corresponden a aproximaciones históricas («circa»).
            </li>
            <li>
              <strong>Estado vital:</strong> Quien no tiene fecha de muerte registrada figura en vida a junio de 2026.
            </li>
          </ul>
        </div>

        <div className="bg-[#091224] rounded-xl border border-slate-800 p-5 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Aclaraciones Documentales y Rigor Académico</span>
          </h3>
          <ul className="text-xs text-slate-300 space-y-2.5 list-disc pl-4 leading-relaxed">
            <li>
              <strong>Representatividad Regional:</strong> Las listas de África y Oceanía son más breves porque la fuente partió exclusivamente de quienes nacieron en dichos territorios, no por escasez o ausencia de ciencia en esas latitudes.
            </li>
            <li>
              <strong>Equidad Histórica:</strong> La cantidad de científicos por continente no presupone en ningún caso la importancia científica intrínseca de cada región.
            </li>
            <li>
              <strong>Antártida:</strong> El documento original contempla cinco continentes habitados y no proporciona registros para el continente antártico.
            </li>
            <li>
              <strong>Recomendación Académica:</strong> Para trabajos de investigación o ensayos formales, se recomienda contrastar las fechas y descripciones con literatura académica especializada.
            </li>
          </ul>
        </div>
      </div>

      {/* Architectural & Open Science Note */}
      <div className="p-6 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-2">
        <div className="text-slate-200 font-semibold text-sm">
          Compromiso de Fidelidad, Ciencia Abierta y Colección Ampliada
        </div>
        <p className="leading-relaxed">
          VITA MUNDI fue concebido bajo un principio de estricta fidelidad documental y rigor histórico: los 209 científicos del documento original conservan con exactitud su número de página del PDF, mientras que los 250 registros de la colección complementaria cuentan con fuentes académicas y enciclopédicas comprobadas. Su arquitectura desacoplada en TypeScript permite navegación instantánea, visualización cartográfica vectorial y filtrado por pioneras, épocas y continentes sin sesgos ni dependencias privativas.
        </p>
      </div>
    </div>
  );
};
