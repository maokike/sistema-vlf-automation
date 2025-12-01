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
exports.createVLFReport = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const pdf_service_1 = require("./pdf.service");
function createVLFReport(data) {
    return __awaiter(this, void 0, void 0, function* () {
        // 1. Calculate automatic values
        const voltaje = data.tipo_construccion === 'NUEVA_CONSTRUCCION' ? 46000 : 35000;
        // Placeholder values for automatic data
        const resistencia = Math.random() * 10; // Placeholder
        const marca_cable = 'MARCA_EJEMPLO'; // Placeholder
        const punto_prueba = 'Subestación Principal - Interconexión Edificio B'; // Placeholder
        // 2. Save the report to the database
        const newReport = yield prisma_1.default.vlfReport.create({
            data: {
                cliente: data.cliente,
                proyecto: data.proyecto,
                distancia_cable: data.distancia_cable,
                voltaje: voltaje,
                resistencia: resistencia,
                marca_cable: marca_cable,
                punto_prueba: punto_prueba,
            },
        });
        // 3. Generate the PDF with the data of the newly created report
        const pdfBuffer = yield (0, pdf_service_1.generatePdf)(newReport);
        return { report: newReport, pdf: pdfBuffer };
    });
}
exports.createVLFReport = createVLFReport;
