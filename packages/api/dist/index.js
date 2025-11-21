"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const report_routes_1 = __importDefault(require("./routes/report.routes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 4000; // Render uses port 4000 by default for web services
// Middlewares
app.use((0, cors_1.default)()); // Enable Cross-Origin Resource Sharing
app.use(express_1.default.json()); // Enable parsing of JSON bodies
// API Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/reports', report_routes_1.default);
// Health check route
app.get('/', (req, res) => {
    res.status(200).send('API for VLF Automation is running!');
});
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
