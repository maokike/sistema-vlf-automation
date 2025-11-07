"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePdf = generatePdf;
const puppeteer_1 = __importDefault(require("puppeteer"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
// We will create the template in the next step
const templatePath = path_1.default.join(__dirname, '../templates/report.template.html');
function generatePdf(reportData) {
    return __awaiter(this, void 0, void 0, function* () {
        // 1. Read the HTML template
        const htmlTemplate = yield promises_1.default.readFile(templatePath, 'utf-8');
        // 2. Inject data into the template
        const populatedHtml = htmlTemplate
            .replace('{{cliente}}', reportData.cliente)
            .replace('{{proyecto}}', reportData.proyecto)
            .replace('{{fecha_prueba}}', reportData.fecha_prueba.toLocaleDateString('es-ES'))
            .replace('{{voltaje}}', reportData.voltaje.toString())
            .replace('{{distancia_cable}}', reportData.distancia_cable.toString())
            .replace('{{resultado}}', reportData.resistencia > 0 ? "SATISFACTORIO" : "NO SATISFACTORIO"); // Example logic
        // Add more replacements as needed
        // 3. Launch Puppeteer
        const browser = yield puppeteer_1.default.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'], // Required for running in a container
        });
        const page = yield browser.newPage();
        // 4. Set the content and generate PDF
        yield page.setContent(populatedHtml, { waitUntil: 'networkidle0' });
        const pdfUint8Array = yield page.pdf({
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
        yield browser.close();
        // Convert Uint8Array to Buffer to satisfy TypeScript in strict environments
        return Buffer.from(pdfUint8Array);
    });
}
