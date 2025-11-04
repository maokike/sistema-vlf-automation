import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.service';

export async function handleRegister(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = await registerUser({ username, password });
    res.status(201).json({ message: 'User created successfully', userId: user.id });
  } catch (error) {
    console.error('Registration error:', error);
    // Check for unique constraint violation
    if (error instanceof Error && error.message.includes('Unique constraint failed')) {
      return res.status(409).json({ message: 'Username already exists' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function handleLogin(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const { token } = await loginUser({ username, password });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    if (error instanceof Error && error.message.includes('Invalid')) {
        return res.status(401).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
}
