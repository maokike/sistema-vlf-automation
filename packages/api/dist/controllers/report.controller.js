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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReport = createReport;
const report_service_1 = require("../services/report.service");
function createReport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            // The user ID is now available from the authenticated request
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized: User ID is missing' });
            }
            const { clientName, projectName, cableLengthMeters, workType } = req.body;
            // Basic validation
            if (!clientName || !projectName || !cableLengthMeters || !workType) {
                return res.status(400).json({ message: 'Missing required fields' });
            }
            // Call the service to create the report and generate the PDF, now with userId
            const { report, pdf } = yield (0, report_service_1.createVLFReport)({
                clientName,
                projectName,
                cableLengthMeters,
                workType,
                userId,
            });
            // Set headers to tell the browser it's a PDF file
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=dictamen-${report.id}.pdf`);
            // Send the PDF buffer as the response
            res.status(200).send(pdf);
        }
        catch (error) {
            console.error('Error creating report:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
}
