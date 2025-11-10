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
exports.handleRegister = handleRegister;
exports.handleLogin = handleLogin;
const auth_service_1 = require("../services/auth.service");
function handleRegister(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body; // CAMBIÉ: username → email
            if (!email || !password) { // CAMBIÉ: username → email
                return res.status(400).json({ message: 'Email and password are required' });
            }
            const user = yield (0, auth_service_1.registerUser)({ email, password }); // CAMBIÉ: username → email
            res.status(201).json({ message: 'User created successfully', userId: user.id });
        }
        catch (error) {
            console.error('Registration error:', error);
            if (error instanceof Error && error.message.includes('Unique constraint failed')) {
                return res.status(409).json({ message: 'Email already exists' }); // CAMBIÉ: Username → Email
            }
            res.status(500).json({ message: 'Internal server error' });
        }
    });
}
function handleLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body; // CAMBIÉ: username → email
            if (!email || !password) { // CAMBIÉ: username → email - ¡FALTABA el ! antes de email!
                return res.status(400).json({ message: 'Email and password are required' });
            }
            const { token } = yield (0, auth_service_1.loginUser)({ email, password }); // CAMBIÉ: username → email
            res.status(200).json({ token });
        }
        catch (error) {
            console.error('Login error:', error);
            if (error instanceof Error && error.message.includes('Invalid')) {
                return res.status(401).json({ message: error.message });
            }
            res.status(500).json({ message: 'Internal server error' });
        }
    });
}
