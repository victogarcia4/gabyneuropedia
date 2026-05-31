const fs = require('fs');
const path = require('path');

// Usando la API nativa de Node.js para generar PDF con Puppeteer
async function generatePDF() {
  let puppeteer;

  try {
    // Intentar importar puppeteer
    puppeteer = require('puppeteer');
  } catch (error) {
    console.log('📦 Puppeteer no está instalado. Instalando...');
    const { execSync } = require('child_process');
    execSync('npm install --no-save puppeteer', { stdio: 'inherit' });
    puppeteer = require('puppeteer');
  }

  console.log('🚀 Iniciando generación de PDF...');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  const htmlPath = path.join(__dirname, 'public', 'checklist-tdah-24-puntos.html');
  const pdfPath = path.join(__dirname, 'public', 'checklist-tdah-24-puntos.pdf');

  console.log('📄 Cargando HTML desde:', htmlPath);

  // Cargar el archivo HTML
  await page.goto(`file://${htmlPath}`, {
    waitUntil: 'networkidle0'
  });

  console.log('🖨️  Generando PDF...');

  // Generar PDF con configuración optimizada
  await page.pdf({
    path: pdfPath,
    format: 'Letter',
    printBackground: true,
    margin: {
      top: '1.5cm',
      right: '1.5cm',
      bottom: '1.5cm',
      left: '1.5cm'
    },
    preferCSSPageSize: true
  });

  await browser.close();

  console.log('✅ PDF generado exitosamente en:', pdfPath);

  // Verificar el tamaño del archivo
  const stats = fs.statSync(pdfPath);
  const fileSizeInKB = (stats.size / 1024).toFixed(2);
  console.log(`📊 Tamaño del archivo: ${fileSizeInKB} KB`);

  return pdfPath;
}

// Ejecutar
generatePDF()
  .then((pdfPath) => {
    console.log('\n🎉 ¡Proceso completado!');
    console.log('El PDF está listo para usar en el funnel.');
  })
  .catch((error) => {
    console.error('❌ Error al generar PDF:', error);
    process.exit(1);
  });
