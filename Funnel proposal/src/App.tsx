import React, { useState, useRef, useEffect } from 'react';
import { 
  Brain, 
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  FileText, 
  MessageSquareHeart, 
  Info,
  CalendarDays,
  Settings,
  Lock,
  X
} from 'lucide-react';
import { FAQS, TESTIMONIALS } from './data';
import AboutExpert from './components/AboutExpert';
import ProblemAgitation from './components/ProblemAgitation';
import InteractiveChecklist from './components/InteractiveChecklist';
import LeadMagnetForm from './components/LeadMagnetForm';
import CopywriterDashboard from './components/CopywriterDashboard';

export default function App() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Admin / Strategy panel state
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState<string | null>(null);

  useEffect(() => {
    const checkAdminTrigger = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash.includes('admin') || path.includes('admin')) {
        setIsAuthModalOpen(true);
      }
    };
    checkAdminTrigger();
    window.addEventListener('hashchange', checkAdminTrigger);
    return () => window.removeEventListener('hashchange', checkAdminTrigger);
  }, []);

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'Gabyneuropedia' || adminPassword === 'Zulybeth97@') {
      setIsAdminUnlocked(true);
      setIsAuthModalOpen(false);
      setAdminPassword('');
      setAdminError(null);
      
      // Smooth scroll to dashboard after small rendering delay
      setTimeout(() => {
        const dashboard = document.getElementById('funnel-secrets');
        dashboard?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    } else {
      setAdminError('Contraseña incorrecta. Inténtalo de nuevo.');
    }
  };
  
  // Refs for smooth scroll targetting
  const formRef = useRef<HTMLDivElement>(null);
  const checklistRef = useRef<HTMLDivElement>(null);

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToChecklist = () => {
    checklistRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-brand-cream/80 text-navy-950 font-sans antialiased selection:bg-brand-gold/40">
      
      {/* Top Utility Nav / Header Settings Toggle */}
      <div className="bg-navy-950 text-slate-300 py-3 border-b border-white/5 relative z-30">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-brand-gold rounded-full animate-pulse" />
            <span className="font-semibold tracking-wider text-[10px] uppercase text-slate-400">gabyneuropedia • Embudo Optimizado</span>
          </div>
          <div className="flex items-center gap-4">
            {isAdminUnlocked ? (
              <div className="flex items-center gap-2">
                <span className="text-brand-gold font-bold tracking-wider text-[10px] uppercase flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded border border-brand-gold/20">
                  🔓 MODO ESTRATEGA ACTIVADO
                </span>
                <button 
                  onClick={() => setIsAdminUnlocked(false)}
                  className="text-slate-400 hover:text-white text-[10px] font-bold uppercase py-1 px-2.5 rounded bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-slate-400 hover:text-brand-gold uppercase transition-colors cursor-pointer bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded border border-white/10"
              >
                <Settings className="w-3.5 h-3.5" /> ACCESO ESTRATEGA
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Admin Authorization Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/80 backdrop-blur-md p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-slate-200 shadow-2xl relative space-y-4">
            <button
              onClick={() => {
                setIsAuthModalOpen(false);
                setAdminPassword('');
                setAdminError(null);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-navy-950 p-1 rounded-full hover:bg-slate-100 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center mx-auto mb-2">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-navy-950">Acceso Estratégico</h3>
              <p className="text-xs text-slate-500">
                Ingresa la contraseña para ver la estrategia de copy, entregables y manual de estilo.
              </p>
            </div>
            
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">
                  Contraseña
                </label>
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full text-sm py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-navy-950 focus:bg-white transition-all text-center tracking-widest font-mono"
                  placeholder="••••••••"
                  autoFocus
                />
              </div>
              
              {adminError && (
                <p className="text-xs text-brand-orange bg-brand-orange/10 p-2 rounded-lg text-center font-semibold">
                  {adminError}
                </p>
              )}
              
              <button
                type="submit"
                className="w-full bg-navy-900 hover:bg-navy-950 text-white font-bold text-xs uppercase tracking-widest py-3 rounded-lg cursor-pointer transition-all"
              >
                Verificar Contraseña
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Marketing Badge (Call-to-Action) */}
      <div className="fixed bottom-4 right-4 z-50 animate-bounce">
        <button
          onClick={handleScrollToForm}
          className="flex items-center gap-2 bg-brand-orange text-white text-xs font-bold tracking-widest uppercase py-3 px-5 rounded-full shadow-lg hover:shadow-xl hover:bg-brand-orange/95 cursor-pointer max-w-xs"
        >
          <Download className="w-4 h-4" /> Abrir Checklist
        </button>
      </div>

      {/* Hero Section */}
      <header className="relative bg-navy-900 text-white overflow-hidden py-16 md:py-24 border-b border-brand-gold/15">
        {/* Soft background light */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-10 w-96 h-96 bg-brand-mint/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 z-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Brand Tag */}
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full py-1.5 px-4">
                <Brain className="w-4 h-4 text-brand-gold" />
                <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-brand-gold">
                  gabyneuropedia • Neurodesarrollo y Crianza
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
                ¿Es insolencia, falta de límites... <span className="text-brand-gold italic">o hay algo más</span> en su cerebro?
              </h1>

              {/* Value Proposition */}
              <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl font-light">
                Despeja la incertidumbre. Descarga el Checklist interactivo gratuito de gabyneuropedia. Aprende a discernir entre posibles signos de TDAH y factores ecológicos cotidianos de tu hogar (como el sueño o pantallas) antes de apresurar etiquetas permanentes.
              </p>

              {/* CTA Row */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={handleScrollToForm}
                  className="bg-brand-orange hover:bg-brand-orange/95 text-white font-bold text-xs uppercase tracking-widest py-4 px-8 rounded-lg shadow-lg hover:shadow-xl hover:translate-y-[-1px] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Download className="w-4.5 h-4.5" /> Completar Checklist Gratis
                </button>
                
                <button
                  onClick={handleScrollToChecklist}
                  className="border border-white/30 hover:border-white/60 text-white font-semibold text-xs uppercase tracking-widest py-4 px-8 rounded-lg hover:bg-white/5 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  Prueba Interactiva Rápida <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Statistics Strip */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap gap-x-8 gap-y-3 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-brand-gold" /> +10,000 Familias Guiadas
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-gold" /> Rigor Científico Accesible
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="w-4 h-4 text-brand-gold" /> Lista de Espera Abierta
                </span>
              </div>

            </div>

            {/* Hero Right Visual Column */}
            <div className="lg:col-span-5 flex justify-center pb-8 lg:pb-0">
              <div className="relative z-20">
                {/* Backing accent circle */}
                <div className="absolute -inset-4 bg-brand-gold/10 rounded-full blur-xl pointer-events-none" />
                
                {/* Book graphic wrapper representing lead magnet */}
                <div className="relative z-10 w-64 h-80 sm:w-72 sm:h-96 rounded-2xl bg-gradient-to-tr from-brand-orange to-slate-900 p-8 shadow-2xl flex flex-col justify-between border border-white/20">
                  <div className="space-y-4">
                    <span className="text-[10px] tracking-widest font-bold uppercase py-1 px-2.5 rounded bg-brand-gold text-navy-950">
                      GUÍA GRATUITA
                    </span>
                    <h3 className="text-2xl font-serif font-bold leading-tight pt-2 text-white">
                      ¿TDAH o algo más?
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans mt-1">
                      El Checklist Clínico de 24 puntos que todo padre o cuidador preocupado debe completar antes de su próxima consulta pediátrica.
                    </p>
                  </div>

                  <div className="border-t border-white/20 pt-4 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] text-slate-400 uppercase tracking-widest">Creado por la especialista</p>
                      <p className="text-xs text-brand-gold font-bold font-serif leading-none mt-1">Dra. Gaby Jiménez</p>
                    </div>
                    <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white shrink-0">
                      <Download className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Micro Floating badge */}
                <div className="absolute -bottom-5 right-2 sm:-right-4 z-30 bg-brand-gold text-navy-950 p-3.5 rounded-xl shadow-2xl border border-white/25 flex items-center gap-2 max-w-[180px]">
                  <div className="p-1 rounded bg-navy-900 border text-brand-gold border-white/10 shrink-0 text-xs">🚀</div>
                  <p className="text-[10px] leading-tight font-sans font-bold">HTML interactivo + PDF al finalizar</p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Empathy & Problem Agitation Section */}
      <ProblemAgitation />

      {/* Dual Column: Presentation of Solutions & Value points */}
      <section className="py-16 md:py-24 bg-brand-mint/20 border-y border-navy-800/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left box: Value benefits of the checklist */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold tracking-widest text-[#2c3e50] uppercase bg-slate-200/60 py-1 px-3.5 rounded-full inline-block">
                ¿Qué vas a descubrir?
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-950 leading-tight">
                No todos los síntomas son TDAH. Esta guía te dará un mapa de acción.
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Este checklist ha sido refinado clínicamente para quitarle el tecnicismo a la medicina. Su propósito no es sustituir el veredicto del médico, sino darte datos objetivos de observación para que no llegues perdida a consulta.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-orange shrink-0 font-bold text-xs mt-0.5">✓</div>
                  <div>
                    <h4 className="text-sm font-bold text-navy-950">Las 3 Dimensiones de Observación</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Analiza conducta (TDAH), hábitos fisiológicos (sueño) y ambiente externo (pantallas digitales).</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-orange shrink-0 font-bold text-xs mt-0.5">✓</div>
                  <div>
                    <h4 className="text-sm font-bold text-navy-950">El Cuestionario de Historial del Sueño</h4>
                    <p className="text-xs text-slate-500 mt-0.5">La herramienta adecuada para descartar el pseudo-TDAH causado por mal descanso nocturno.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-orange shrink-0 font-bold text-xs mt-0.5">✓</div>
                  <div>
                    <h4 className="text-sm font-bold text-navy-950">Saber qué preguntarle a tu Especialista</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Te regalamos las 5 preguntas críticas que debes hacerle al pediatra para cuestionar de forma fundamentada un diagnóstico precoz.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right card: Micro-sell and bullet focus */}
            <div className="lg:col-span-5 bg-white border border-navy-800/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
              <div className="flex items-center gap-1.5 text-xs font-bold text-navy-700 uppercase tracking-widest border-b pb-3 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-orange" />
                Beneficios de tu Descarga
              </div>
              
              <ul className="space-y-3.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-brand-orange font-bold">01.</span>
                  <span><strong>Paz mental antes de adivinar:</strong> Desarmarás el miedo ordenando las conductas de tu hijo con parámetros clínicos validados.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-orange font-bold">02.</span>
                  <span><strong>Eficiencia en tu próxima consulta:</strong> Evitarás respuestas vagas reuniendo observaciones listas para entregar en un lenguaje comprensible.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-orange font-bold">03.</span>
                  <span><strong>Protección contra etiquetas injustas:</strong> Podrás dialogar con la escuela sintiéndote respaldado por el conocimiento científico.</span>
                </li>
              </ul>

              <button
                onClick={handleScrollToForm}
                className="w-full bg-navy-900 border border-navy-900 hover:bg-navy-900/95 text-brand-gold font-bold text-xs uppercase tracking-widest py-3 rounded-lg shadow-sm transition-all cursor-pointer"
              >
                Inscribirme y Completar
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Playground Section */}
      <section ref={checklistRef} className="py-16 md:py-24 bg-[#f9f5ed]">
        <div className="max-w-5xl mx-auto px-4 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-widest text-[#2c3e50] uppercase bg-slate-200/80 py-1 px-3.5 rounded-full">
              PRACTICA EN VIVO
            </span>
            <h2 className="text-3xl font-serif font-bold text-navy-950 mt-4 leading-snug">
              Haz una prueba de observación interactiva rápida ahora mismo
            </h2>
            <p className="text-slate-600 text-sm mt-3 leading-relaxed">
              ¿Quieres un anticipo? Selecciona las conductas que observas en tu hijo y descubre el análisis diferencial preliminar basado en la escuela de Gabyneuropedia.
            </p>
          </div>

          <InteractiveChecklist onFormScrollRequest={handleScrollToForm} />

        </div>
      </section>

      {/* Main Lead Magnet Form Section */}
      <section ref={formRef} className="py-16 md:py-24 bg-brand-cream relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Form Left pitch card */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold tracking-widest text-brand-orange bg-brand-orange/10 border border-brand-orange/15 py-1 px-3.5 rounded-full">
                ¡RECURSO 100% GRATUITO!
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-950 leading-tight">
                La ciencia no muerde. Toma el control del neurodesarrollo en tu familia.
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Su cerebro no está roto, solo se comunica bajo otra estructura de conexiones. Regístrate de forma segura, completa el checklist en HTML y genera tu PDF cuando termines.
              </p>

              <div className="bg-white/50 border border-slate-200 rounded-2xl p-5 md:p-6 space-y-3">
                <div className="flex items-center gap-1.5 text-xs text-navy-900 font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-bounce" />
                  Al registrarte obtienes:
                </div>
                <ul className="text-xs text-slate-500 space-y-2 leading-relaxed">
                  <li>✔ <strong>Checklist Completo en HTML</strong>: Márcalo online y luego imprímelo o guárdalo como PDF.</li>
                  <li>✔ <strong>Suscripción exclusiva</strong>: Clases y consejos semanales de la Dra. Gaby.</li>
                  <li>✔ <strong>Invitación prioritaria</strong>: Acceso anticipado a futuros programas y mentorías uno a uno.</li>
                </ul>
              </div>
            </div>

            {/* Form Right core element */}
            <div className="lg:col-span-6">
              <LeadMagnetForm />
            </div>

          </div>
        </div>
      </section>

      {/* Mini Testimonial Strip */}
      <section className="py-16 bg-[#faf6ee] border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-widest text-[#2c3e50] uppercase bg-slate-200/80 py-1 px-3.5 rounded-full inline-flex items-center gap-1.5">
              <MessageSquareHeart className="w-3.5 h-3.5 text-[#e05a47]" /> VOCES DE APOYO
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy-950 mt-4 leading-snug">
              Otras madres, padres y cuidadores ya han tomado el control
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, idx) => (
              <div key={idx} className="bg-white border border-slate-200/80 p-6 rounded-2xl flex flex-col justify-between shadow-xs">
                <p className="text-slate-600 text-xs leading-relaxed italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{testimonial.role}</div>
                  <span className="text-[9px] bg-slate-50 border border-slate-100 py-0.5 px-1.5 rounded text-slate-500 font-medium font-mono">Verificado</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Biography section */}
      <AboutExpert />

      {/* Accordion FAQ Section */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-widest text-[#2c3e50] uppercase bg-slate-200/80 py-1 px-3.5 rounded-full inline-flex items-center gap-1">
              <Info className="w-3.5 h-3.5" /> CLARIDAD ANTE TODO
            </span>
            <h2 className="text-3xl font-serif font-bold text-navy-950 mt-4 leading-snug">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200 bg-slate-50/50">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 flex items-center justify-between gap-4 text-left font-serif font-bold text-sm md:text-base text-navy-950 hover:bg-slate-100/50 transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="p-5 border-t border-slate-200 bg-white text-xs md:text-sm text-slate-600 leading-relaxed animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Copywriter's Strategic Dashboard */}
      {isAdminUnlocked && <CopywriterDashboard />}

      {/* Footer */}
      <footer className="bg-navy-950 text-white py-12 border-t border-white/10 text-center">
        <div className="max-w-6xl mx-auto px-4 space-y-6">
          <div className="flex justify-center items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-xs font-bold font-serif text-navy-950">
              G
            </div>
            <span className="text-sm font-bold font-serif tracking-wide">
              gabyneuropedia • Ciencia con Corazón
            </span>
          </div>
          <p className="text-[10px] text-slate-500 max-w-lg mx-auto leading-relaxed">
            Exención de responsabilidad: Este sitio web y el checklist provisto son materiales educativos e informativos de gabyneuropedia. No constituyen, sustituyen ni reemplazan el diagnóstico médico profesional, la consulta especializada ni el tratamiento psiquiátrico/neurológico personalizado de su hijo.
          </p>
          <p className="text-[10px] text-slate-600 pt-3 border-t border-white/5">
            © 2026 gabyneuropedia. Todos los derechos reservados. Diseñado bajo el Método C.L.A.R.O. para familias extraordinarias.
          </p>
          <div className="flex justify-center items-center gap-2 mt-3">
            <img 
              src="/VHGM.jpg" 
              alt="Dr. Victor Garcia M" 
              className="w-5 h-5 rounded-full border border-white/20 object-cover shrink-0" 
            />
            <p className="text-[10px] text-slate-500">
              <a 
                href="https://48hours.live" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-brand-gold transition-colors"
              >
                Built by Dr. Victor Garcia M at 48hours.live
              </a>
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
