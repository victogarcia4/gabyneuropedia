import { useState } from 'react';
import { Award, BookOpen, GraduationCap, Heart } from 'lucide-react';

export default function AboutExpert() {
  // Lista secuencial de fuentes alternativas para la foto de la Dra. Gaby:
  // 1. Busca archivos locales en tu carpeta 'public/' para que puedas colocar tu foto ahí con cualquiera de estos nombres.
  // 2. Imagen real de su sitio web oficial (GoDaddy CDN).
  // 3. Imagen de reserva premium en Unsplash filtrada para coincidir con sus rasgos (médica sonriente con cabello largo oscuro y lentes).
  const fallbackUrls = [
    '/dra-gaby-estetoscopio.png',
    '/dra-gaby-estetoscopio.jpg',
    '/dra-gaby.png',
    '/dra-gaby.jpg',
    'https://img1.wsimg.com/isteam/ip/9f22e577-e86d-46e8-ae9a-1df7d0c2df48/WhatsApp%20Image%202022-02-12%20at%209.21.44%20PM.jpeg',
    'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=600'
  ];

  const [fallbackIndex, setFallbackIndex] = useState(0);

  const handleImageError = () => {
    if (fallbackIndex < fallbackUrls.length - 1) {
      setFallbackIndex((prev) => prev + 1);
    }
  };

  const imageSrc = fallbackUrls[fallbackIndex];

  return (
    <section id="sobre-mi" className="py-16 md:py-24 bg-navy-950 text-white relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-12 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image with Frame */}
          <div className="col-span-1 lg:col-span-5 flex justify-center">
            <div className="relative">
              {/* Gold decorative border */}
              <div className="absolute -inset-3 rounded-2xl border border-brand-gold/40 pointer-events-none" />
              {/* Backing decorative element */}
              <div className="absolute inset-0 bg-navy-900 rounded-2xl transform rotate-3" />
              
              {/* Main Photo of Dra. Gaby */}
              <div className="relative z-10 w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img 
                  src={imageSrc} 
                  onError={handleImageError}
                  alt="Dra. María Gabriela Jiménez Méndez" 
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                
                {/* Float tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-navy-950/90 backdrop-blur-sm border border-white/10 p-3 rounded-lg">
                  <p className="text-brand-gold text-xs font-bold tracking-wider uppercase">Dra. María Gabriela</p>
                  <p className="text-white/80 text-[10px] uppercase tracking-wide">Hospital Sant Joan de Déu • Barcelona</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Copy & Experience */}
          <div className="col-span-1 lg:col-span-7 flex flex-col space-y-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-brand-gold uppercase bg-white/5 py-1 px-3 rounded-full">
                La experta detrás del método
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mt-3 leading-tight">
                Dra. María Gabriela Jiménez Méndez
              </h2>
              <p className="text-xl text-white/90 font-serif italic mt-1 text-slate-300">
                Fundadora de Gabyneuropedia • Ciencia con Corazón
              </p>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
              Soy Médica Neuropediatra con formación de especialización realizada en el prestigioso 
              <strong> Hospital Sant Joan de Déu en Barcelona, España</strong>. Durante años, he acompañado a cientos de familias 
              a recorrer el laberinto de la neurodivergencia, traduciendo diagnósticos rígidos en planes activos que salvan la convivencia familiar. 
              Soy autora de libros enfocados en el bienestar infantil (como <em>El Autismo Puertas Adentro</em>) y locutora certificada.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="flex gap-3 items-start">
                <div className="p-2 rounded-lg bg-white/5 text-brand-gold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Especialidad de Élite</h4>
                  <p className="text-xs text-slate-400 mt-1">Neuropediatría clínica infantil por Barcelona, España.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-2 rounded-lg bg-white/5 text-brand-gold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Escritora y Conferencista</h4>
                  <p className="text-xs text-slate-400 mt-1">Autora de textos formativos para terapeutas y padres.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-2 rounded-lg bg-white/5 text-brand-gold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Divulgadora Científica</h4>
                  <p className="text-xs text-slate-400 mt-1">Creadora de @gabyneuropedia, uniendo rigor médico y calidez humana.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-2 rounded-lg bg-white/5 text-brand-gold">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Enfoque Humano primero</h4>
                  <p className="text-xs text-slate-400 mt-1">Un cerebro diferente no está &ldquo;roto&rdquo;; necesita una mirada distinta.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <blockquote className="text-slate-300 italic text-xs max-w-md">
                &ldquo;Ninguna etiqueta clínica debería ser más grande que el amor y la comprensión que un niño recibe en su hogar.&rdquo;
              </blockquote>
              <div className="flex gap-2">
                <span className="text-[10px] tracking-wide text-brand-gold bg-brand-gold/10 py-1 px-2.5 rounded font-bold uppercase">LUZ</span>
                <span className="text-[10px] tracking-wide text-brand-gold bg-brand-gold/10 py-1 px-2.5 rounded font-bold uppercase">HSJD Barcelona</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
