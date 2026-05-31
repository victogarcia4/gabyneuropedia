import React, { useState } from 'react';
import { LeadData } from '../types';
import { Mail, User, Baby, CheckCircle2, FileDown, BookOpen, AlertCircle, Sparkles } from 'lucide-react';

export default function LeadMagnetForm() {
  const [formData, setFormData] = useState<LeadData>({
    name: '',
    email: '',
    role: '',
    childAge: '',
    consents: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      setFormData(prev => ({ ...prev, [name]: e.target.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.role || !formData.childAge || !formData.consents) {
      setErrorMsg('Por favor completa todos los campos del formulario y acepta el consentimiento de privacidad.');
      return;
    }

    setIsSubmitting(true);

    const newLead = { ...formData, date: new Date().toISOString() };

    // Save lead list in localStorage
    const savedLeads = JSON.parse(localStorage.getItem('gabyneuropedia_leads') || '[]');
    savedLeads.push(newLead);
    localStorage.setItem('gabyneuropedia_leads', JSON.stringify(savedLeads));

    // Send to Google Sheet
    const scriptUrl = (import.meta as any).env?.VITE_GOOGLE_SHEET_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbzDFPfPHTbi6Dnwd4CMVuiLKm6APMWgiGbcELDTRFN-UoO31WIoXQZ5TnS1RF4UxPkYxg/exec";
    if (scriptUrl) {
      try {
        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors', // Avoids CORS preflight issue
          body: JSON.stringify(newLead),
        });
      } catch (error) {
        console.error('Error sending data to Google Sheet:', error);
      }
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-navy-950 border border-brand-gold/30 rounded-3xl p-6 md:p-10 shadow-2xl text-white space-y-8 animate-fadeIn">
        
        {/* Success Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-3 bg-brand-gold/10 text-brand-gold rounded-full border border-brand-gold/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-white">
            ¡Descarga Disponible, {formData.name.split(' ')[0]}!
          </h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            Hemos enviado el Checklist en PDF de 24 puntos y el Método C.L.A.R.O. a tu bandeja de correo:
            <span className="text-brand-gold font-medium"> {formData.email}</span>.
            <br/><br/>
            <span className="text-amber-400 font-semibold">
              ⚕️ Recuerda: Este checklist es una guía de observación, NO un diagnóstico médico.
              Para evaluación formal, agenda una consulta con un especialista en neurodesarrollo.
            </span>
          </p>
        </div>

        {/* Immediate Access Buttons */}
        <div className="bg-navy-900 border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] tracking-widest font-bold text-brand-gold uppercase">Acceso Instantáneo</span>
            <h4 className="text-sm font-semibold text-white">Haz clic aquí para descargar el PDF de inmediato:</h4>
          </div>
          <a
            href="/checklist-tdah-24-puntos.pdf"
            download="Checklist_TDAH_24_Puntos_GabyNeuroPedia.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold/90 text-navy-950 text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded-lg shadow-md transition-all shrink-0"
          >
            <FileDown className="w-4 h-4" /> Bajar PDF Ahora
          </a>
        </div>

        {/* Soft Sell / Next Step of the Funnel */}
        <div className="border border-brand-orange/30 bg-brand-orange/5 p-6 rounded-2xl space-y-6 relative overflow-hidden">
          {/* Decorative design sparkles */}
          <div className="absolute top-2 right-2 text-brand-orange/20">
            <Sparkles className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] tracking-widest font-bold text-brand-orange uppercase bg-brand-orange/10 py-1 px-3 rounded-full border border-brand-orange/20">
              PRÓXIMO PASO RECOMENDADO
            </span>
            <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-gold">
              Tu Checklist es solo la primera página. Entiende el mapa completo.
            </h3>
            <p className="text-slate-300 text-xs lg:text-sm leading-relaxed">
              El Checklist te ayuda a <strong className="text-white">documentar conductas</strong>, pero
              <strong className="text-brand-gold"> no soluciona el caos diario del hogar</strong>.
              Para comprender los circuitos cerebrales de tu hijo, obtener <strong>estrategias prácticas inmediatas</strong>
              y aprender el <strong>Método C.L.A.R.O.</strong> completo (Calma, Límites, Autonomía, Rutina, Observación),
              necesitas nuestro libro digital estrella:
            </p>
          </div>

          <div className="bg-navy-900/60 p-4 border border-white/5 rounded-xl flex flex-col md:flex-row items-center gap-6">
            {/* Ebook Graphic representation */}
            <div className="relative shrink-0 select-none">
              <div className="w-24 h-32 bg-brand-orange text-navy-950 font-serif p-2 rounded shadow-2xl relative border-l-4 border-brand-gold flex flex-col justify-between">
                <div className="text-[9px] font-bold tracking-widest uppercase">Sin Filtros</div>
                <div className="text-[11px] font-bold leading-tight">El Cerebro No Está Roto</div>
                <div className="text-[8px] text-right font-sans opacity-70">Dra. Gaby</div>
              </div>
            </div>

            <div className="flex-1 space-y-2 text-center md:text-left">
              <h4 className="text-sm font-bold text-slate-200">Ebook: Sin Filtros (El Cerebro de Mi Hijo No Está Roto)</h4>
              <p className="text-xs text-slate-400">8 capítulos con estrategias prácticas explicadas por una neuropediatra formada en Barcelona. Ciencia pura, sin tecnicismos.</p>
              <div className="flex items-center justify-center md:justify-start gap-3 mt-1">
                <span className="text-slate-500 line-through text-xs">$47 USD</span>
                <span className="text-brand-orange font-bold text-lg font-serif">$27 USD</span>
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider bg-emerald-500/10 py-0.5 px-2 rounded">Ahorra 43%</span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-4">
            <button
              onClick={() => window.open('https://instagram.com/gabyneuropedia', '_blank')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange/90 text-white text-xs font-bold uppercase tracking-widest py-3 px-6 rounded-lg shadow-md hover:shadow-xl transition-all shrink-0"
            >
              <BookOpen className="w-4 h-4" /> Quiero "Sin Filtros!" Ahora
            </button>
          </div>

        </div>

        {/* Small Note */}
        <p className="text-[10px] text-center text-slate-500">
          ¿No ves el correo? Por favor, revisa tu carpeta de promociones, correo no deseado o spam.
        </p>

      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-navy-800/10 shadow-2xl p-6 md:p-10 text-navy-950 space-y-6 relative overflow-hidden">
      
      {/* Absolute background accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none" />

      <div className="text-center space-y-2">
        <h3 className="text-2xl font-serif font-bold text-navy-950">Descargar Checklist</h3>
        <p className="text-xs text-slate-500">Rellena el formulario oficial para recibir el PDF gratuito directamente.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Name input */}
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-navy-900" htmlFor="name">
            Nombre de la Madre / Padre / Cuidador
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <User className="w-4 h-4" />
            </span>
            <input 
              type="text" 
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej. Carolina Galvis"
              className="w-full text-sm py-2.5 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-navy-900 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Email input */}
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-navy-900" htmlFor="email">
            Tu Correo Principal
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Mail className="w-4 h-4" />
            </span>
            <input 
              type="email" 
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Ej. carolina@tuemail.com"
              className="w-full text-sm py-2.5 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-navy-900 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Tu Rol / Relación Selector */}
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-navy-900" htmlFor="role">
            Tu Rol / Relación con el niño/a
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <User className="w-4 h-4" />
            </span>
            <select
              id="role"
              name="role"
              required
              value={formData.role || ''}
              onChange={handleChange}
              className="w-full text-sm py-2.5 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-navy-900 focus:bg-white transition-all"
            >
              <option value="">Selecciona tu rol</option>
              <option value="Madre">Madre</option>
              <option value="Padre">Padre</option>
              <option value="Cuidador">Cuidador / Familiar</option>
              <option value="Terapeuta/Educador">Terapeuta / Educador</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
        </div>

        {/* Child Age Selector */}
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-navy-900" htmlFor="childAge">
            Edad de tu hijo/a
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Baby className="w-4 h-4" />
            </span>
            <select
              id="childAge"
              name="childAge"
              required
              value={formData.childAge}
              onChange={handleChange}
              className="w-full text-sm py-2.5 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-navy-900 focus:bg-white transition-all"
            >
              <option value="">Selecciona la edad de tu hijo</option>
              <option value="2-4">2 a 4 años (Pre-escolar temprano)</option>
              <option value="5-7">5 a 7 años (Pre-escolar / Primaria elemental)</option>
              <option value="8-11">8 a 11 años (Primaria intermedia)</option>
              <option value="12+">12 años o más (Adolescencia)</option>
            </select>
          </div>
        </div>

        {/* Consents checkbox */}
        <div className="flex items-start gap-2.5 pt-2">
          <input 
            type="checkbox" 
            id="consents"
            name="consents"
            required
            checked={formData.consents}
            onChange={handleChange}
            className="mt-1 w-4 h-4 rounded-sm border-slate-300 text-navy-900 focus:ring-navy-900"
          />
          <label htmlFor="consents" className="text-[10px] text-slate-500 leading-relaxed">
            Acepto los términos de privacidad de gabyneuropedia. Entiendo que recibiré el Checklist en mi correo y ocasionalmente comunicaciones informativas de neurodesarrollo. Puedo darme de baja en cualquier momento en un clic.
          </label>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="flex items-start gap-2 text-xs text-brand-orange bg-brand-orange/10 p-3 rounded-lg border border-brand-orange/20 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-orange hover:bg-brand-orange/95 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-widest py-3.5 px-4 rounded-lg shadow-md hover:shadow-lg hover:translate-y-[-1px] active:translate-y-[1px] transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          {isSubmitting ? 'Enviando...' : 'Quiero Descargar el Checklist Gratis'}
        </button>

      </form>
    </div>
  );
}
