import { Router } from 'express';
import { handleRegister, handleLogin } from '../controllers/auth.controller';
import { registerUser } from '../services/auth.service';
import prisma from '../lib/prisma';

const router = Router();

// Standard registration and login routes
router.post('/register', handleRegister);
router.post('/login', handleLogin);

// Special route to create the initial user.
// This should be used only once and then potentially removed for security.
router.post('/register-initial-user', async (req, res) => {
    try {
        const initialEmail = 'jenifervalencia01@example.com';
        // We check if an admin user already exists to prevent this from running multiple times
        const existingUser = await prisma.user.findUnique({ where: { email: initialEmail }});
        if (existingUser) {
            return res.status(409).json({ message: 'Initial user already exists.' });
        }

        const user = await registerUser({
            email: initialEmail,
            password: '111111' // The service will hash this password
        });
        res.status(201).json({ message: 'Initial user created successfully', userId: user.id });
    } catch (error) {
        console.error('Error creating initial user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
