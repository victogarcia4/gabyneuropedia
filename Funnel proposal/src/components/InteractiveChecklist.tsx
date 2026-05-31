import { useState, useEffect } from 'react';
import { CHECKLIST_ITEMS } from '../data';
import { ClipboardList, CheckCircle, Info, RotateCcw, AlertTriangle } from 'lucide-react';
import EbookPromoModal from './EbookPromoModal';

interface InteractiveChecklistProps {
  onFormScrollRequest: () => void;
}

export default function InteractiveChecklist({ onFormScrollRequest }: InteractiveChecklistProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState<string | null>(null);
  const [showEbookModal, setShowEbookModal] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);

  const handleToggleItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    setSelectedItems([]);
    setShowExplanation(null);
  };

  // Counting selections by category to provide real-time custom feedback
  const behavioralCount = selectedItems.filter(id => id.startsWith('b')).length;
  const differentialCount = selectedItems.filter(id => id.startsWith('d')).length;
  const emotionalCount = selectedItems.filter(id => id.startsWith('e')).length;
  const totalCount = selectedItems.length;

  // Show ebook promo modal when user selects 5+ items
  useEffect(() => {
    if (totalCount >= 5 && !hasShownModal) {
      setShowEbookModal(true);
      setHasShownModal(true);
    }
  }, [totalCount, hasShownModal]);

  // Real-time medical-grade feedback summary
  const getFeedbackMessage = () => {
    if (totalCount === 0) {
      return {
        title: 'Comienza tu autoevaluación',
        text: 'Selecciona las conductas observables en tu hijo para recibir una lectura preliminar de nuestros indicadores.',
        colorClass: 'text-slate-500 bg-slate-50 border-slate-200'
      };
    }

    if (differentialCount > 0 && behavioralCount > 0) {
      return {
        title: '⚠️ Señales mixtas detectadas (Requiere Diagnóstico Diferencial)',
        text: 'Hay rasgos comunes del TDAH, pero también factores de alerta ambiental (sueño, pantallas o estrés). En niños, la privación de sueño y el bombardeo dopaminérgico de pantallas imitan de forma perfecta al TDAH. El libro "Sin Filtros! El cerebro de mi hijo no está roto" profundiza en cómo aislar estos factores antes de considerar medicación.',
        colorClass: 'text-brand-orange bg-brand-orange/5 border-brand-orange/20'
      };
    }

    if (differentialCount > 1) {
      return {
        title: '🌱 Altas señales ambientales (Pseudo-TDAH posible)',
        text: 'Los hábitos de sueño y sobreestimulación de pantallas seleccionados son los principales causantes de "falsa inatención" infantil. Corregir estas variables es el primer paso recomendado antes de diagnósticos permanentes. Descubre el protocolo completo en nuestro ebook "Sin Filtros!".',
        colorClass: 'text-teal-800 bg-brand-mint/40 border-teal-800/10'
      };
    }

    if (behavioralCount > 1) {
      return {
        title: '🔎 Indicadores conductuales presentes',
        text: 'Has seleccionado marcadores habituales de inatención o impulsividad. El paso idóneo es registrar estas conductas objetivamente para documentar la frecuencia. El ebook "Sin Filtros! El cerebro de mi hijo no está roto" incluye hojas de trabajo detalladas para preparar tu consulta médica.',
        colorClass: 'text-navy-700 bg-[#ebf3ff] border-navy-700/10'
      };
    }

    return {
      title: 'Primeras observaciones documentadas',
      text: 'Sigue seleccionando para refinar las conclusiones preliminares. Recuerda: este ejercicio entrena tu ojo clínico como padre o cuidador para ser el mejor aliado de tu pediatra. No reemplaza una evaluación profesional.',
      colorClass: 'text-slate-700 bg-slate-50 border-slate-200'
    };
  };

  const feedback = getFeedbackMessage();

  return (
    <div id="checklist-playground" className="bg-white rounded-3xl border border-navy-800/10 shadow-xl p-6 md:p-10 space-y-8">
      
      {/* Block Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-navy-800/10 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-brand-mint rounded-xl text-teal-800">
            <ClipboardList className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-serif font-bold text-navy-950">Playground de Observación</h3>
            <p className="text-xs text-slate-500">Prueba interactiva rápida • Resultados preliminares al instante</p>
          </div>
        </div>
        
        {totalCount > 0 && (
          <button 
            onClick={handleReset}
            className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-navy-900 transition-colors uppercase tracking-wider self-end md:self-center"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Limpiar Todo
          </button>
        )}
      </div>

      {/* Grid of Checklist Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CHECKLIST_ITEMS.map((item) => {
          const isSelected = selectedItems.includes(item.id);
          const isExplaining = showExplanation === item.id;
          
          let cardBorderColor = 'border-slate-100 bg-slate-50/50';
          if (isSelected) {
            if (item.category === 'behavioral') cardBorderColor = 'border-navy-700 bg-blue-50/10';
            else if (item.category === 'differential') cardBorderColor = 'border-brand-orange bg-brand-orange/5';
            else cardBorderColor = 'border-teal-700 bg-teal-50/5';
          }

          return (
            <div 
              key={item.id}
              className={`transition-all duration-200 border rounded-2xl p-4 flex flex-col justify-between ${cardBorderColor}`}
            >
              <div className="flex items-start gap-3">
                {/* Custom Checkbox */}
                <button
                  onClick={() => handleToggleItem(item.id)}
                  className={`mt-1 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                    isSelected 
                      ? 'bg-navy-900 border-navy-900 text-brand-gold' 
                      : 'border-slate-300 hover:border-slate-400 bg-white'
                  }`}
                >
                  {isSelected && <CheckCircle className="w-3.5 h-3.5" />}
                </button>

                {/* Text Content */}
                <div className="flex-1 space-y-2">
                  <p className={`text-xs md:text-sm leading-relaxed ${isSelected ? 'text-navy-950 font-medium' : 'text-slate-600'}`}>
                    {item.text}
                  </p>
                  
                  {/* Explanatory Snippet inside the card */}
                  {isExplaining && (
                    <div className="text-[11px] leading-relaxed text-slate-500 bg-black/5 p-2.5 rounded-lg border-l-2 border-slate-400 flex items-start gap-1.5 animate-fadeIn">
                      <AlertTriangle className="w-3 h-3 text-slate-500 shrink-0 mt-0.5" />
                      <span>{item.explanation}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Float Info/Explanation Button */}
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className={`text-[10px] uppercase tracking-wider font-bold ${
                  item.category === 'behavioral' ? 'text-navy-700' : item.category === 'differential' ? 'text-brand-orange' : 'text-teal-700'
                }`}>
                  {item.category === 'behavioral' ? 'Marcador TDAH' : item.category === 'differential' ? 'Factor de Ruido Env' : 'Área Socio-Emocional'}
                </span>
                
                <button
                  onClick={() => setShowExplanation(isExplaining ? null : item.id)}
                  className="p-1 text-slate-400 hover:text-navy-950 transition-colors rounded-full"
                  title="Ver explicación neuropediátrica"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic Feedback Box */}
      <div className={`border-l-4 rounded-r-2xl p-5 md:p-6 transition-all duration-350 ${feedback.colorClass}`}>
        <h4 className="font-serif font-semibold text-sm md:text-base leading-snug">
          {feedback.title}
        </h4>
        <p className="text-xs md:text-sm text-slate-600 leading-relaxed mt-2">
          {feedback.text}
        </p>

        {totalCount > 0 && (
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
            <span>🔴 Conductuales: {behavioralCount}</span>
            <span>🟢 Ambientales: {differentialCount}</span>
            <span>🔵 Emocionales: {emotionalCount}</span>
          </div>
        )}
      </div>

      {/* Action Prompt */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
        <p className="text-xs text-slate-500 max-w-md text-center sm:text-left leading-relaxed">
          Esto es solo un ensayo. Para abrir el <strong>Checklist Oficial interactivo</strong> con la escala completa de 24 puntos, marcarlo en HTML y generar tu PDF al final, rellena nuestro formulario de captación.
        </p>
        <button
          onClick={onFormScrollRequest}
          className="bg-brand-orange hover:bg-brand-orange/95 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          Ir a Completar Checklist Principal
        </button>
      </div>

      {/* Ebook Promo Modal */}
      <EbookPromoModal
        isOpen={showEbookModal}
        onClose={() => setShowEbookModal(false)}
        itemCount={totalCount}
      />

    </div>
  );
}
