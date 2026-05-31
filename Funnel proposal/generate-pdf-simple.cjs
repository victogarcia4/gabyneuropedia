const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Generando PDF usando Chrome instalado en el sistema...');

const htmlPath = path.join(__dirname, 'public', 'checklist-tdah-24-puntos.html');
const pdfPath = path.join(__dirname, 'public', 'checklist-tdah-24-puntos.pdf');

// Verificar que el HTML existe
if (!fs.existsSync(htmlPath)) {
  console.error('❌ Error: No se encuentra el archivo HTML:', htmlPath);
  process.exit(1);
}

console.log('📄 HTML encontrado:', htmlPath);

// Buscar Chrome en las ubicaciones comunes de Windows
const chromePaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  path.join(process.env.LOCALAPPDATA, 'Google\\Chrome\\Application\\chrome.exe'),
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
];

let chromePath = null;
for (const p of chromePaths) {
  if (fs.existsSync(p)) {
    chromePath = p;
    console.log('✅ Navegador encontrado:', p);
    break;
  }
}

if (!chromePath) {
  console.error('❌ No se encontró Chrome ni Edge instalado.');
  console.log('\n📝 Solución manual:');
  console.log('1. Abre el archivo:', htmlPath);
  console.log('2. Presiona Ctrl+P');
  console.log('3. Selecciona "Guardar como PDF"');
  console.log('4. Guarda como:', pdfPath);
  process.exit(1);
}

try {
  // Usar Chrome en modo headless para generar PDF
  const fileUrl = `file:///${htmlPath.replace(/\\/g, '/')}`;

  console.log('🖨️  Generando PDF...');

  execSync(`"${chromePath}" --headless --disable-gpu --print-to-pdf="${pdfPath}" --no-margins "${fileUrl}"`, {
    stdio: 'inherit',
    timeout: 30000
  });

  // Verificar que el PDF se generó
  if (fs.existsSync(pdfPath)) {
    const stats = fs.statSync(pdfPath);
    const fileSizeInKB = (stats.size / 1024).toFixed(2);
    console.log(`\n✅ PDF generado exitosamente!`);
    console.log(`📊 Tamaño: ${fileSizeInKB} KB`);
    console.log(`📁 Ubicación: ${pdfPath}`);
  } else {
    throw new Error('El PDF no se generó correctamente');
  }

} catch (error) {
  console.error('❌ Error al generar PDF:', error.message);
  console.log('\n📝 Intenta la solución manual descrita arriba.');
  process.exit(1);
}
