import { X, BookOpen, Sparkles } from 'lucide-react';

interface EbookPromoModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemCount: number;
}

export default function EbookPromoModal({ isOpen, onClose, itemCount }: EbookPromoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-brand-gold/20">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-navy-950 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-brand-orange">
            <Sparkles className="w-6 h-6" />
            <h3 className="font-serif font-bold text-lg text-navy-950">
              Has marcado {itemCount} señales
            </h3>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Estás documentando señales importantes. El siguiente paso es <strong>aprender qué hacer con esta información</strong>.
          </p>

          <div className="bg-brand-mint/20 border border-teal-200 rounded-xl p-4 space-y-2">
            <h4 className="font-bold text-sm text-navy-950">
              📘 Ebook: "Sin Filtros! El cerebro de mi hijo no está roto"
            </h4>
            <p className="text-xs text-slate-600">
              Estrategias científicas explicadas sin tecnicismos. Aprende el Método C.L.A.R.O. completo para transformar el caos en claridad.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-slate-500 line-through text-xs">$47</span>
              <span className="text-brand-orange font-bold text-lg">$27</span>
              <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">-43%</span>
            </div>
          </div>

          <button
            onClick={() => {
              window.open('https://instagram.com/gabyneuropedia', '_blank');
              onClose();
            }}
            className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-bold text-sm py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4" /> Ver Detalles del Ebook
          </button>

          <button
            onClick={onClose}
            className="w-full text-slate-500 hover:text-navy-950 text-xs font-medium transition-colors"
          >
            Continuar con el checklist
          </button>
        </div>

      </div>
    </div>
  );
}
