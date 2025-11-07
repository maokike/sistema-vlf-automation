import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.service';

export async function handleRegister(req: Request, res: Response) {
  try {
    const { email, password } = req.body; // CAMBIÉ: username → email
    if (!email || !password) { // CAMBIÉ: username → email
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await registerUser({ email, password }); // CAMBIÉ: username → email
    res.status(201).json({ message: 'User created successfully', userId: user.id });
  } catch (error) {
    console.error('Registration error:', error);
    if (error instanceof Error && error.message.includes('Unique constraint failed')) {
      return res.status(409).json({ message: 'Email already exists' }); // CAMBIÉ: Username → Email
    }
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function handleLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body; // CAMBIÉ: username → email
    if (!email || !password) { // CAMBIÉ: username → email - ¡FALTABA el ! antes de email!
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const { token } = await loginUser({ email, password }); // CAMBIÉ: username → email
    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    if (error instanceof Error && error.message.includes('Invalid')) {
        return res.status(401).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
}