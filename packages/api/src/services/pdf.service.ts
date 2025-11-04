import puppeteer from 'puppeteer';
import { VLFReport } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';

// We will create the template in the next step
const templatePath = path.join(__dirname, '../templates/report.template.html');

export async function generatePdf(reportData: VLFReport): Promise<Buffer> {
  // 1. Read the HTML template
  const htmlTemplate = await fs.readFile(templatePath, 'utf-8');

  // 2. Inject data into the template
  const populatedHtml = htmlTemplate
    .replace('{{cliente}}', reportData.clientName)
    .replace('{{proyecto}}', reportData.projectName)
    .replace('{{fecha_prueba}}', reportData.createdAt.toLocaleDateString('es-ES'))
    .replace('{{voltaje}}', reportData.testVoltageVolts.toString())
    .replace('{{distancia_cable}}', reportData.cableLengthMeters.toString())
    .replace('{{resultado}}', reportData.testResult);
    // Add more replacements as needed

  // 3. Launch Puppeteer
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'], // Required for running in a container
  });
  const page = await browser.newPage();

  // 4. Set the content and generate PDF
  await page.setContent(populatedHtml, { waitUntil: 'networkidle0' });
  const pdfUint8Array = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: {
      top: '1in',
      right: '1in',
      bottom: '1in',
      left: '1in',
    },
  });

  // 5. Close the browser
  await browser.close();

  // Convert Uint8Array to Buffer to satisfy TypeScript in strict environments
  return Buffer.from(pdfUint8Array);
}
