# Instrucciones para Generar el PDF de 24 Puntos

## Método 1: Usando el Navegador (Más Fácil)

1. Abre el archivo `checklist-tdah-24-puntos.html` en Google Chrome o Microsoft Edge
2. Presiona `Ctrl + P` (o `Cmd + P` en Mac) para abrir el diálogo de impresión
3. En "Destino", selecciona **"Guardar como PDF"**
4. Configura las opciones:
   - Orientación: **Vertical**
   - Tamaño de papel: **Letter** (8.5" x 11")
   - Márgenes: **Predeterminados**
   - Escala: **100%**
   - ✅ Activar "Gráficos de fondo"
5. Haz clic en **"Guardar"**
6. Guarda el archivo como `checklist-tdah-24-puntos.pdf` en la carpeta `public/`

## Método 2: Usando Herramientas en Línea

### Opción A: CloudConvert
1. Ve a https://cloudconvert.com/html-to-pdf
2. Sube el archivo `checklist-tdah-24-puntos.html`
3. Haz clic en "Convert"
4. Descarga el PDF generado

### Opción B: HTML to PDF Online
1. Ve a https://www.sejda.com/html-to-pdf
2. Arrastra el archivo HTML o pega la URL local
3. Ajusta configuraciones si es necesario
4. Descarga el PDF

## Método 3: Usando Node.js (Para Desarrolladores)

Si tienes Node.js instalado, puedes usar Puppeteer:

```bash
# Instalar puppeteer
npm install puppeteer

# Crear script (convert-to-pdf.js)
const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto(`file://${path.join(__dirname, 'checklist-tdah-24-puntos.html')}`, {
    waitUntil: 'networkidle0'
  });
  
  await page.pdf({
    path: 'checklist-tdah-24-puntos.pdf',
    format: 'Letter',
    printBackground: true,
    margin: {
      top: '1.5cm',
      right: '1.5cm',
      bottom: '1.5cm',
      left: '1.5cm'
    }
  });
  
  await browser.close();
  console.log('PDF generado exitosamente!');
})();

# Ejecutar
node convert-to-pdf.js
```

## Verificación del PDF

Después de generar el PDF, verifica que:

✅ Contenga exactamente 6 páginas
✅ Página 1: Portada con disclaimer
✅ Páginas 2-4: Los 24 ítems del checklist (8 por sección)
✅ Página 5: Tabla de interpretación y recomendaciones
✅ Página 6: Promoción del ebook + contacto
✅ Todos los estilos se hayan aplicado correctamente
✅ Los checkboxes sean visibles y marcables
✅ El texto sea legible (tamaño mínimo 12px)

## Ubicación Final

El PDF debe quedar en:
```
Funnel proposal/public/checklist-tdah-24-puntos.pdf
```

Este es el archivo que será descargado cuando los usuarios completen el formulario.

---

**Nota:** Si prefieres un diseño más profesional con herramientas de diseño gráfico, puedes usar el contenido del HTML como guía y recrearlo en:
- Adobe InDesign
- Canva (https://www.canva.com)
- Figma
- Microsoft Word (exportar a PDF)
