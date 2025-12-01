"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
// Standard registration and login routes
router.post('/register', auth_controller_1.handleRegister);
router.post('/login', auth_controller_1.handleLogin);
// Special route to create the initial user.
router.post('/register-initial-user', auth_controller_1.handleRegisterInitialUser);
exports.default = router;
