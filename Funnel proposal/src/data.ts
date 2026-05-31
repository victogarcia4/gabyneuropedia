import { ChecklistItem, Testimonial, FAQItem, CopyworkSection } from './types';

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'b1',
    category: 'behavioral',
    text: 'Se distrae con mucha facilidad ante estímulos irrelevantes y suele extraviar objetos de uso diario.',
    explanation: 'La inatención es un rasgo central del espectro del TDAH, pero también se ve alterada por fatiga visual, privación de sueño o estrés emocional.'
  },
  {
    id: 'b2',
    category: 'behavioral',
    text: 'Se le hace difícil permanecer sentado y suele retorcerse en el asiento o mover constantemente las manos de forma inquieta.',
    explanation: 'La hiperactividad física se debe a una necesidad de autorregulación del cerebro, pero también aparece ante fatiga crónica o aburrimiento severo.'
  },
  {
    id: 'b3',
    category: 'behavioral',
    text: 'Suele responder de forma precipitada antes de que se complete la pregunta o interrumpe bruscamente actividades de otros.',
    explanation: 'La impulsividad es un marcador común en el neurodesarrollo. Requiere evaluar si es generalizada o si responde a problemas de gestión emocional.'
  },
  {
    id: 'd1',
    category: 'differential',
    text: 'Tiene hábitos de sueño irregulares o duerme constantemente menos de 9-10 horas por noche.',
    explanation: 'La privación o fragmentación de sueño imita de forma idéntica la inatención y la baja tolerancia a la frustración (síndrome de pseudo-TDAH).'
  },
  {
    id: 'd2',
    category: 'differential',
    text: 'Supera regularmente las 1.5 a 2 horas diarias de pantallas (celular, tablet, videojuegos).',
    explanation: 'La sobreestimulación dopaminérgica de las pantallas altera los circuitos de gratificación a largo plazo, imitando el déficit atencional cuando están apagadas.'
  },
  {
    id: 'd3',
    category: 'differential',
    text: 'Se muestra ansioso, le preocupan mucho las cosas de forma recurrente, o tiene rasgos perfeccionistas exagerados.',
    explanation: 'Los trastornos de ansiedad infantiles a menudo se manifiestan como inquietud motora y distracción, confundiéndose fácilmente con hiperactividad.'
  },
  {
    id: 'e1',
    category: 'emotional',
    text: 'Explota con rabietas intensas ante la frustración rutinaria y tarda más de lo habitual en calmarse.',
    explanation: 'La desregulación emocional es común en niños con TDAH debido a la inmadurez de las funciones ejecutivas, pero también acompaña al duelo o estrés.'
  },
  {
    id: 'e2',
    category: 'emotional',
    text: 'Suele rechazar o resistirse fuertemente a realizar tareas que requieran un esfuerzo mental sostenido.',
    explanation: 'La evitación de tareas puede ser señal de una disfunción ejecutiva para planificar/comenzar, o de un bloqueo ante el miedo a fracasar.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Carolina G.',
    role: 'Mamá de Lucas (8 años)',
    text: 'Estábamos abrumados con las notas del colegio sugiriendo TDAH. Hacer este checklist interactivo nos abrió los ojos: nos dimos cuenta de que la falta de rutina de sueño de Lucas explicaba la mitad de sus síntomas de inatención. La consulta diferencial es todo.'
  },
  {
    name: 'Andrés M.',
    role: 'Papá de Sofía (6 años)',
    text: 'El enfoque de la Dra. Gaby es oro puro. No te estigmatiza ni te juzga; te educa científicamente. Descargar este checklist nos permitió ir preparados a la cita médica con las dudas correctas, evitando etiquetas apresuradas.'
  },
  {
    name: 'Verónica S.',
    role: 'Mamá de Santi (10 años)',
    text: 'El cambio en nuestra casa comenzó cuando dejamos el pánico y tomamos información seria. Esta guía te da un mapa claro. Dejé de sentir culpa y aprendí a ver a mi hijo sin filtros.'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'Si mi hijo tiene varios ítems marcados, ¿significa que tiene TDAH?',
    answer: 'No. Este checklist es una herramienta informativa y de tamizaje inicial para guiar tu observación. El TDAH es un diagnóstico clínico complejo que solo un especialista cualificado (neuropediatra, psiquiatra infantil o neuropsicólogo) puede confirmar tras una evaluación formal.'
  },
  {
    question: '¿Qué es el "Diagnóstico Diferencial"?',
    answer: 'Es el proceso médico para determinar si los síntomas observados (como inatención o impulsividad) obedecen realmente al TDAH o a otros factores fisiológicos, sensoriales o emocionales. El sueño fragmentado, la ansiedad infantil, la baja agudeza visual/auditiva, o el abuso de pantallas pueden simular síntomas de TDAH de forma perfecta.'
  },
  {
    question: '¿Tengo que medicar si se diagnostica TDAH?',
    answer: 'La medicación nunca es el primer y único paso obligatorio. El tratamiento del TDAH es siempre integral: incluye psicoeducación a padres, adaptaciones escolares, terapia de conducta y apoyo pedagógico. El tratamiento farmacológico se evalúa de manera personalizada y ética, solo si el impacto en la calidad de vida y el desarrollo del niño lo ameritan.'
  },
  {
    question: '¿Cómo me ayuda este Checklist para la consulta con el especialista?',
    answer: 'Te ayuda a recopilar observaciones objetivas y ordenadas. En lugar de decirle al médico "mi hijo se distrae", podrás especificar: "le cuesta terminar tareas secuenciales o se activa exageradamente tras el uso de pantallas". Esto hace la consulta médica un 300% más eficiente.'
  }
];

// Complete copywriting deliverables requested in the prompt
export const COPYWRITE_DELIVERABLES: CopyworkSection[] = [
  {
    title: '1. Encabezado & Hero Section (Copy de Captación)',
    description: 'Espacio de entrada magnético diseñado para convertir el miedo en una búsqueda activa de respuestas.',
    originalText: `HEADLINE principal (H1): ¿Es insolencia, falta de límites... o hay algo más en su cerebro?
SUBHEADLINE (H2): Despeja la incertidumbre. Descarga el Checklist de Observación Diferencial diseñado para padres preocupados. Aprende a distinguir las señales atencionales de factores cotidianos de su entorno antes de emitir un diagnóstico definitivo.
BOTÓN DE ACCIÓN (CTA): Quiero descargar el Checklist Gratuito ahora`,
    copywritingCommentary: 'La mención a "algo más en su cerebro" introduce de forma empática la perspectiva del neurodesarrollo, eliminando la culpa del padre ("mala crianza") y del niño ("insolente"). El subheadline adelanta el valor del diagnóstico diferencial, que es el puente directo hacia la venta del ebook de Dra. Gaby.'
  },
  {
    title: '2. Agitación del Dolor y Empatía (Los Puntos de Dolor)',
    description: 'Puntos que resuenan emocionalmente con la frustración y el cansancio diario de los padres.',
    originalText: `- El desgaste de las mañanas: El recordar la misma instrucción 10 veces seguidas y sentir que no te escucha.
- La etiqueta escolar constante: Recibir notas sobre su conducta o rendimiento, sintiéndote juzgado por profesores y otros padres.
- El laberinto de opiniones: Escuchar teorías contradictorias de internet que te llenan de angustia y miedo al futuro medicado.
- La incertidumbre de la sospecha: Preguntarte en silencio si estás siendo demasiado exigente o si de verdad necesita ayuda especializada.`,
    copywritingCommentary: 'Describimos escenas sumamente de la vida diaria en lugar de listados de síntomas médicos duros. Los padres aumentan su conexión con la marca al sentirse vistos en su realidad cotidiana.'
  },
  {
    title: '3. Presentación del Lead Magnet (Solución de Valor)',
    description: 'Explicación del recurso y beneficios de la descarga para preparar el terreno educativo.',
    originalText: `¿Qué contiene el Checklist "¿TDAH o algo más?"?
- Matriz de 3 dimensiones de observación clínica (Conductual, Emocional y Ambiente de Pantallas/Sueño).
- Guía de terminología para traducir conductas domésticas en datos relevantes para la cita con su pediatra.
- El Método C.L.A.R.O. introductorio para organizar un entorno protector en casa.
Tres beneficios de la descarga digital:
1. Paz mental inmediata: Dejarás de adivinar y empezarás a observar bajo un marco científico estructurado.
2. Preparación óptima para consulta: Sabrás exactamente qué responder en tu próxima cita médica con términos objetivos.
3. Protección contra etiquetas: Hablarás con el colegio desde la seguridad del conocimiento autónomo.`,
    copywritingCommentary: 'Se asocia la descarga con el beneficio psicológico supremo que busca el padre: "Paz mental" y "seguridad". Esto fomenta la tasa de conversión.'
  },
  {
    title: '4. Autoridad & Transición Estructurada al Funnel (Bio & Soft Sell)',
    description: 'Construcción del perfil médico de Gabyneuropedia y redirección suave a su infoproducto estrella.',
    originalText: `Quién te acompaña: Dra. María Gabriela Jiménez Méndez
Neuropediatra, formada en el prestigioso Hospital Sant Joan de Déu (Barcelona, España). Con años de experiencia asistiendo a niños con desafíos del neurodesarrollo en diversos países, y escritora de textos clave sobre el autismo e intervenciones clínicas infantiles.
Su filosofía: "La etiqueta de TDAH no define a tu hijo. Su cerebro no está roto, solo funciona bajo otro tipo de conexiones. Mi misión es darte la ciencia sin tecnicismos para que tomes el control."
¿Listo para dar el siguiente paso?
Si ya descargaste tu Checklist, tienes la mitad del mapa. Para entender de verdad el cerebro de tu hijo, descubre nuestro renombrado Ebook "Sin Filtros: El Cerebro de Mi Hijo No Está Roto". Un manual definitivo que profundiza en las soluciones cotidianas que necesitas hoy mismo.`,
    copywritingCommentary: 'La transición utiliza el principio de consistencia: el usuario ya ha tomado la decisión inicial de descargar el manual gratuito; ahora está calificado para valorar la información premium del Ebook, reduciendo la fricción para el Soft-Sell.'
  }
];

export const VISUAL_STYLE_GUIDE = {
  colors: [
    { name: 'Warm Cream (Fondo principal)', hex: '#FFFBF5', use: 'Fondo de la página para transmitir calidez, calma y limpieza, emulando un consultorio premium o un entorno amigable.' },
    { name: 'Classic Navy (Tipografía y Autoridad)', hex: '#0B1C3C', use: 'Color estructural. Se utiliza para el texto principal y encabezados robustos, expresando seguridad, rigidez científica y autoridad médica.' },
    { name: 'Sage Green (Acento de paz)', hex: '#E8F3EE', use: 'Fondos suaves para las tarjetas de beneficio y la sección interactiva. Transmite bienestar, salud orgánica y neurodesarrollo.' },
    { name: 'Brand Gold (Atención)', hex: '#F4D35E', use: 'Para llamados de atención secundarios, insignias de la especialista y estrellas de valoración, iluminando el diseño.' },
    { name: 'Brand Orange (Llamado a la Acción)', hex: '#FF6B00', use: 'Color de conversión. Se reserva exclusivamente para botones de envío de formulario, botones de descarga principal, y el precio del Ebook (upsell).' }
  ],
  typography: {
    serif: 'Playfair Display (para títulos significativos, transmitiendo sofisticación y estatus científico).',
    sans: 'Plus Jakarta Sans (para cuerpos de texto, etiquetas y campos de formulario, garantizando máxima legibilidad).'
  },
  iconography: [
    'Lucide icons de líneas delgadas y minimalistas.',
    'Evitar ilustraciones médicas hiperreales de cerebros o medicamentos. Preferir íconos estilizados que representen bienestar (viento, cerebro punteado, carpetas ordenadas, caritas empáticas).'
  ],
  layoutGuidelines: [
    'Uso de un layout unificado de una sola pantalla extendida (Single-Page Layout) para maximizar la conversión.',
    'Espaciado generoso (padding de py-16 o py-20) para evitar que el usuario se sienta abrumado (Anti-ruido visual).',
    'Las tarjetas de contenido deben tener bordes sutiles y sombras extremadamente ligeras para denotar elegancia.'
  ]
};
