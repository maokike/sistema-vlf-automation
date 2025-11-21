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
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_service_1 = require("../services/auth.service");
const prisma_1 = __importDefault(require("../lib/prisma"));
const router = (0, express_1.Router)();
// Standard registration and login routes
router.post('/register', auth_controller_1.handleRegister);
router.post('/login', auth_controller_1.handleLogin);
// Special route to create the initial user.
// This should be used only once and then potentially removed for security.
router.post('/register-initial-user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const initialEmail = 'jenifervalencia01@example.com';
        // We check if an admin user already exists to prevent this from running multiple times
        const existingUser = yield prisma_1.default.user.findUnique({ where: { email: initialEmail } });
        if (existingUser) {
            return res.status(409).json({ message: 'Initial user already exists.' });
        }
        const user = yield (0, auth_service_1.registerUser)({
            email: initialEmail,
            password: '111111' // The service will hash this password
        });
        res.status(201).json({ message: 'Initial user created successfully', userId: user.id });
    }
    catch (error) {
        console.error('Error creating initial user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}));
exports.default = router;
