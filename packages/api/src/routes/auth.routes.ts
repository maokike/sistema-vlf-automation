import { Router } from 'express';
import { handleRegister, handleLogin, handleRegisterInitialUser } from '../controllers/auth.controller';

const router = Router();

// Standard registration and login routes
router.post('/register', handleRegister);
router.post('/login', handleLogin);

// Special route to create the initial user.
router.post('/register-initial-user', handleRegisterInitialUser);

export default router;
