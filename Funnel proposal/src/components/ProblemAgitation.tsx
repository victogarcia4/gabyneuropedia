import React, { useState } from 'react';
import { School, Flame, Compass, MessageCircleWarning, ArrowRight } from 'lucide-react';

interface PainPoint {
  id: string;
  tabLabel: string;
  icon: React.ReactNode;
  quote: string;
  title: string;
  description: string;
  neurotip: string;
}

export default function ProblemAgitation() {
  const [activeTab, setActiveTab] = useState<string>('colegio');

  const painPoints: PainPoint[] = [
    {
      id: 'colegio',
      tabLabel: 'La Cita Escolar',
      icon: <School className="w-5 h-5" />,
      quote: '"Su hijo se distrae constantemente, interrumpe la clase y no completa las tareas."',
      title: 'La presión del aula y la etiqueta rápida',
      description: 'Llegas a la reunión escolar con el corazón en la boca. Sientes que las miradas de los maestros y otros padres te juzgan en silencio, atribuyendo el comportamiento de tu pequeño a una supuesta "falta de límites" o "crianza descuidada". Tu hijo empieza a creer que es "el niño malo" del salón.',
      neurotip: 'Consejo de la Dra. Gaby: El aula tradicional está diseñada para cerebros neurotípicos con alta tolerancia a la monotonía escolar. Que a tu hijo le cueste encajar en este molde no significa que tenga mala conducta o falta de inteligencia, sino que su filtro de atención funciona de manera distinta.'
    },
    {
      id: 'mananas',
      tabLabel: 'El Caos de la Mañana',
      icon: <Flame className="w-5 h-5" />,
      quote: '"¡Ponte los zapatos por favor! Lo he dicho diez veces y pareces estar en otro planeta."',
      title: 'El desgaste diario y la espiral de culpa',
      description: 'Repetir la misma instrucción básica 10 veces seguidas no es desobediencia voluntaria: es disfunción ejecutiva. Las mañanas se vuelven una carrera de gritos, apuros y lágrimas, y te vas a tu oficina sintiendo el peso de una profunda culpa por haber perdido la paciencia otra vez.',
      neurotip: 'Consejo de la Dra. Gaby: En el cerebro con sospecha de TDAH, la memoria de trabajo a corto plazo se borra rápidamente ante cualquier estímulo competidor (como una mosca volando o un color brillante). No te está ignorando a propósito; su cerebro se ha distraído honestamente.'
    },
    {
      id: 'ruido',
      tabLabel: 'El Ruido de Internet',
      icon: <Compass className="w-5 h-5" />,
      quote: '"No le des medicamentos, lo vas a dopar" vs "Si no lo medicas, arruinarás su futuro".',
      title: 'El laberinto de consejos contradictorios',
      description: 'Buscas ayuda en internet y te ahogas en opiniones polarizadas. Un foro te dice que es por culpa del azúcar y el Wi-Fi; otro te dice que lo mediques inmediatamente. El miedo a equivocarte y causarle un daño irreversible a su futuro te mantiene paralizado e incapaz de dar el primer paso.',
      neurotip: 'Consejo de la Dra. Gaby: La desinformación es el peor enemigo del neurodesarrollo. La ciencia no muerde: cuando entiendes el sustrato biológico del cerebro, dejas de basarte en mitos y tomas decisiones en frío, con la seguridad de la evidencia clínica.'
    }
  ];

  const activePoint = painPoints.find(p => p.id === activeTab) || painPoints[0];

  return (
    <section className="py-16 md:py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-[#c0392b] uppercase bg-rose-50 py-1 px-3.5 rounded-full inline-flex items-center gap-1.5 border border-rose-100 animate-pulse">
            <MessageCircleWarning className="w-3.5 h-3.5" /> El cansancio que guardas
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-950 mt-4 leading-snug">
            La sospecha no es fácil. Tampoco lo es la culpa del día a día.
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            Criar te exige mucho. Pero criar a ciegas con la sospecha constante de que algo en la atención de tu hijo va por otro ritmo, es doblemente agotador.
          </p>
        </div>

        {/* Tab Layout Container */}
        <div className="bg-brand-cream/40 border border-navy-800/10 rounded-2xl p-6 md:p-8 shadow-sm">
          {/* Tab Selector Buttons */}
          <div className="flex flex-wrap gap-2 pb-4 border-b border-navy-800/10 mb-6">
            {painPoints.map((point) => (
              <button
                key={point.id}
                onClick={() => setActiveTab(point.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  activeTab === point.id
                    ? 'bg-navy-900 text-brand-gold shadow-md shadow-navy-900/10'
                    : 'text-navy-800 hover:bg-navy-800/5'
                }`}
              >
                {point.icon}
                {point.tabLabel}
              </button>
            ))}
          </div>

          {/* Active Content Panel */}
          <div className="transition-opacity duration-300 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
            
            {/* Left Box: Quote and Detailed Explanation */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-white border-l-4 border-brand-orange py-3 px-4 rounded-r-xl shadow-xs italic text-sm text-slate-700 font-serif leading-relaxed">
                {activePoint.quote}
              </div>
              <h3 className="text-lg md:text-xl font-bold font-serif text-navy-950">
                {activePoint.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {activePoint.description}
              </p>
            </div>

            {/* Right Box: Dr. Gaby's Neuro-Tip (The Scientific Calm) */}
            <div className="md:col-span-5 bg-brand-mint/40 border border-teal-800/10 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-1.5 text-teal-800 text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                La Mirada Clínica
              </div>
              <p className="text-slate-700 text-xs leading-relaxed italic">
                {activePoint.neurotip}
              </p>
              <div className="pt-2 text-right">
                <span className="text-[10px] text-teal-800 font-bold uppercase tracking-wide inline-flex items-center gap-1">
                  Respirar Hondo <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Small motivational CTA */}
        <div className="text-center mt-10">
          <p className="text-slate-500 text-xs italic">
            &ldquo;Tener sospechas no te hace un mal padre; de hecho, estar aquí buscando claridad te hace un héroe cotidiano.&rdquo;
          </p>
        </div>

      </div>
    </section>
  );
}
