import puppeteer from 'puppeteer';
import { VlfReport } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';

const templatePath = path.join(__dirname, '../templates/report.template.html');

export async function generatePdf(reportData: VlfReport): Promise<Buffer> {
  const htmlTemplate = await fs.readFile(templatePath, 'utf-8');

  const populatedHtml = htmlTemplate
    .replace('{{cliente}}', reportData.cliente)
    .replace('{{proyecto}}', reportData.proyecto)
    .replace('{{fecha_prueba}}', reportData.fecha_prueba.toLocaleDateString('es-ES'))
    .replace('{{voltaje}}', reportData.voltaje.toString())
    .replace('{{distancia_cable}}', reportData.distancia_cable.toString())
    .replace('{{resultado}}', reportData.resistencia > 0 ? "SATISFACTORIO" : "NO SATISFACTORIO");

  // Launch Puppeteer, pointing to the system-installed Chromium
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/bin/chromium-browser', // Path for Alpine Linux Chromium
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage', // Recommended for running in Docker
      '--single-process'
    ],
  });

  const page = await browser.newPage();

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

  await browser.close();

  return pdfUint8Array;
}
