import { useState } from 'react';
import { COPYWRITE_DELIVERABLES, VISUAL_STYLE_GUIDE } from '../data';
import { Eye, Copy, ClipboardCheck, Palette, FileText, ChevronRight, Share2, Database } from 'lucide-react';

export default function CopywriterDashboard() {
  const [activeSection, setActiveSection] = useState<'copywriting' | 'styleguide' | 'leads'>('copywriting');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(key);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const fetchLeads = async () => {
    setIsLoading(true);
    setError(null);
    const scriptUrl = (import.meta as any).env?.VITE_GOOGLE_SHEET_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbzDFPfPHTbi6Dnwd4CMVuiLKm6APMWgiGbcELDTRFN-UoO31WIoXQZ5TnS1RF4UxPkYxg/exec";
    try {
      const response = await fetch(scriptUrl);
      if (!response.ok) {
        throw new Error("No se pudo conectar con el servidor de Google Sheets.");
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setLeads(data);
      } else {
        throw new Error("El Apps Script de tu Google Sheet no ha sido configurado con el método doGet.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error al cargar la base de datos.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['Fecha y Hora', 'Nombre', 'Email', 'Rol', 'Edad del Hijo/a'];
    const csvRows = [headers.join(',')];
    
    leads.forEach(lead => {
      const values = [
        new Date(lead.date).toLocaleString(),
        `"${lead.name.replace(/"/g, '""')}"`,
        `"${lead.email.replace(/"/g, '""')}"`,
        `"${lead.role.replace(/"/g, '""')}"`,
        `"${lead.childAge}"`
      ];
      csvRows.push(values.join(','));
    });
    
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_gabyneuropedia_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="funnel-secrets" className="py-16 bg-[#fafafa] border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-widest text-[#2c3e50] uppercase bg-slate-200/80 py-1 px-3.5 rounded-full inline-flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5" /> PANEL DE ESTRATEGIA
            </span>
            <h2 className="text-3xl font-serif font-bold text-navy-950">
              Estrategia, Copy, Estilo y Leads
            </h2>
            <p className="text-slate-600 text-sm max-w-xl">
              Diseñado exclusivamente para el administrador y estratega de la aplicación.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 self-start md:self-auto">
            <button
              onClick={() => setActiveSection('copywriting')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                activeSection === 'copywriting'
                  ? 'bg-white text-navy-950 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" /> Copy de la Landing
            </button>
            <button
              onClick={() => setActiveSection('styleguide')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                activeSection === 'styleguide'
                  ? 'bg-white text-navy-950 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Palette className="w-4 h-4" /> Manual de Estilo
            </button>
            <button
              onClick={() => {
                setActiveSection('leads');
                fetchLeads();
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                activeSection === 'leads'
                  ? 'bg-white text-navy-950 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Database className="w-4 h-4" /> Base de Datos
            </button>
          </div>
        </div>

        {/* Dashboard Panels */}
        {activeSection === 'copywriting' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Box: Hierarchy Navigation */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-navy-950 uppercase tracking-widest border-b pb-3 mb-2">
                Esquema de Secciones
              </h3>
              <div className="space-y-1">
                {COPYWRITE_DELIVERABLES.map((section, idx) => (
                  <div 
                    key={idx}
                    className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-50 text-xs font-semibold text-slate-700 hover:text-navy-950 cursor-default group"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] text-slate-500 font-bold group-hover:bg-navy-900 group-hover:text-brand-gold transition-all shrink-0">
                        {idx + 1}
                      </span>
                      <span className="truncate">{section.title}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-all shrink-0" />
                  </div>
                ))}
              </div>
              <div className="bg-brand-mint/40 border border-teal-800/10 rounded-xl p-4.5 text-xs text-slate-500 leading-relaxed space-y-2">
                <div className="flex items-center gap-1.5 font-bold uppercase text-teal-800 tracking-wider">
                  <span className="w-1.5 h-1.5 bg-teal-600 rounded-full" /> Nota del Estratega
                </div>
                Este copy está redactado para generar micro-sí, calmar la culpabilidad de los padres y cuidadores, y establecer una necesidad lógica indiscutible del diagnóstico diferencial.
              </div>
            </div>

            {/* Right Box: Copy Blocks with Clipboard Buttons */}
            <div className="lg:col-span-8 space-y-6">
              {COPYWRITE_DELIVERABLES.map((section, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all p-6 space-y-4">
                  <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3">
                    <div>
                      <h4 className="font-serif font-bold text-base md:text-lg text-navy-800">
                        {section.title}
                      </h4>
                      <p className="text-[10px] text-slate-500 tracking-wide uppercase mt-1">
                        Ubicación: {section.description}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopy(section.originalText, `copy-${idx}`)}
                      className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-lg border transition-all shrink-0 ${
                        copiedId === `copy-${idx}`
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-slate-50 text-slate-600 hover:text-navy-950 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {copiedId === `copy-${idx}` ? (
                        <>
                          <ClipboardCheck className="w-3.5 h-3.5 text-emerald-600" /> ¡Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copiar Copy
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                    {/* Copyblock text wrapper */}
                    <div className="md:col-span-8 bg-slate-50/50 p-4 rounded-xl border border-slate-100 select-all font-sans text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                      {section.originalText}
                    </div>

                    {/* Marketing rationale */}
                    <div className="md:col-span-4 bg-[#fffaf0] p-4.5 rounded-xl border border-brand-gold/20 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-brand-orange">
                          ¿Por qué funciona?
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed italic">
                          {section.copywritingCommentary}
                        </p>
                      </div>
                      <div className="pt-3 text-right">
                        <span className="text-[9px] text-slate-400 font-bold uppercase">Gabyneuropedia Funnel</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-sm space-y-10">
            
            {/* Color section description */}
            <div className="space-y-4">
              <h3 className="text-lg font-serif font-bold text-navy-950 border-b pb-3 flex items-center gap-2">
                <Palette className="w-5 h-5 text-brand-orange" /> Paleta de Colores Exclusiva
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {VISUAL_STYLE_GUIDE.colors.map((color, idx) => (
                  <div key={idx} className="border border-slate-100 p-4 rounded-2xl flex flex-col items-center text-center space-y-3">
                    <div 
                      className="w-16 h-16 rounded-full shadow-inner border border-slate-200"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div>
                      <h4 className="text-xs font-bold text-navy-950">{color.name}</h4>
                      <code className="text-[10px] bg-slate-100 py-0.5 px-2 rounded mt-1 inline-block font-mono text-slate-600">{color.hex}</code>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed">{color.use}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography & Iconography */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-100 pt-8">
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#2c3e50]">
                  ✒️ Tipografías Seleccionadas
                </h4>
                <div className="space-y-4 bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                  <div>
                    <h5 className="font-serif font-bold text-lg text-navy-950">Tipografía Serif (Estatal)</h5>
                    <p className="text-xs text-slate-600 mt-1">{VISUAL_STYLE_GUIDE.typography.serif}</p>
                  </div>
                  <div>
                    <h5 className="font-sans font-bold text-base text-navy-950">Tipografía Sans (Legible)</h5>
                    <p className="text-xs text-slate-600 mt-1">{VISUAL_STYLE_GUIDE.typography.sans}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#2c3e50]">
                  ✨ Normas de Layout y Diseño
                </h4>
                <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 text-xs text-slate-600 space-y-3 leading-relaxed">
                  {VISUAL_STYLE_GUIDE.layoutGuidelines.map((guideline, gridx) => (
                    <div key={gridx} className="flex gap-2">
                      <span className="text-brand-orange font-bold font-sans">0{gridx+1}.</span>
                      <span>{guideline}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-slate-200">
                    <span className="font-bold text-navy-950">Ecosistema de Iconografía: </span> 
                    {VISUAL_STYLE_GUIDE.iconography.join(' ')}
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {activeSection === 'leads' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
              <div className="space-y-1">
                <h3 className="text-lg font-serif font-bold text-navy-950 flex items-center gap-2">
                  <Database className="w-5 h-5 text-brand-orange" /> Base de Datos de Leads (Google Sheet)
                </h3>
                <p className="text-xs text-slate-500">
                  Registros globales obtenidos en tiempo real de tu Google Sheet.
                </p>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={fetchLeads}
                  disabled={isLoading}
                  className="bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider py-2 px-4 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer border border-slate-200"
                >
                  {isLoading ? 'Cargando...' : 'Refrescar'}
                </button>
                <button
                  onClick={handleExportCSV}
                  disabled={leads.length === 0 || isLoading}
                  className="bg-navy-900 hover:bg-navy-950 disabled:bg-slate-300 text-white text-xs font-bold uppercase tracking-wider py-2 px-4 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  Exportar CSV
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-12 text-slate-400 text-xs flex flex-col items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-brand-orange border-t-transparent rounded-full animate-spin"></span>
                <span>Conectando con Google Sheets y cargando registros...</span>
              </div>
            ) : error ? (
              <div className="bg-brand-orange/5 border border-brand-orange/20 rounded-2xl p-6 text-xs text-slate-600 space-y-4">
                <div className="font-bold text-brand-orange text-sm">⚠️ Error al cargar los datos</div>
                <p>{error}</p>
                <div className="border-t pt-4 space-y-2">
                  <p className="font-bold text-navy-950">Cómo activar la lectura desde Google Sheets:</p>
                  <p>Para que el panel pueda leer los registros de tu Google Sheet, debes añadir la función <strong>doGet(e)</strong> en tu Apps Script:</p>
                  <pre className="bg-slate-900 text-slate-200 p-4 rounded-lg select-all overflow-x-auto font-mono text-[10px] leading-relaxed">
{`function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rows = sheet.getDataRange().getValues();
    var leads = [];
    
    // Omitir cabecera
    for (var i = 1; i < rows.length; i++) {
      var row = rows[i];
      leads.push({
        date: row[0],
        name: row[1],
        email: row[2],
        role: row[3],
        childAge: row[4],
        consents: row[5] === "Aceptado"
      });
    }
    
    leads.reverse(); // Nuevos registros primero
    
    return ContentService.createTextOutput(JSON.stringify(leads))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`}
                  </pre>
                  <p className="mt-2 text-slate-500">Una vez que pegues este código en Apps Script, simplemente haz clic en <strong>Nueva implementación</strong> (New deployment) y vuelve a desplegarlo como <strong>Aplicación Web</strong> con acceso para <strong>Cualquier persona</strong> (Anyone), tal como hiciste anteriormente.</p>
                </div>
              </div>
            ) : leads.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                No hay ningún lead registrado en tu hoja de cálculo de Google Sheets.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-slate-100">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 font-bold text-slate-600">
                      <th className="p-3">Fecha y Hora</th>
                      <th className="p-3">Nombre</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Rol</th>
                      <th className="p-3">Edad Hijo/a</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {leads.map((lead: any, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-50/50 text-slate-700">
                        <td className="p-3 font-mono text-[10px] text-slate-400">
                          {lead.date ? new Date(lead.date).toLocaleString() : 'N/A'}
                        </td>
                        <td className="p-3 font-semibold text-navy-950">{lead.name}</td>
                        <td className="p-3">{lead.email}</td>
                        <td className="p-3">
                          <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-medium">
                            {lead.role}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="bg-brand-gold/10 text-brand-orange px-2 py-0.5 rounded text-[10px] font-bold">
                            {lead.childAge} años
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
