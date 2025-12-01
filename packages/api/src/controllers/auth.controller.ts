import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.service';
import prisma from '../lib/prisma';

export async function handleRegisterInitialUser(req: Request, res: Response) {
  try {
    const userCount = await prisma.user.count();
    if (userCount > 0) {
      return res.status(403).json({ message: 'Initial user already exists. This endpoint is disabled.' });
    }

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await registerUser({ email, password });
    res.status(201).json({ message: 'Initial user created successfully', userId: user.id });
  } catch (error) {
    console.error('Initial user registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function handleRegister(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await registerUser({ email, password });
    res.status(201).json({ message: 'User created successfully', userId: user.id });
  } catch (error) {
    console.error('Registration error:', error);
    // Check for unique constraint violation
    if (error instanceof Error && error.message.includes('Unique constraint failed')) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function handleLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const { token } = await loginUser({ email, password });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    if (error instanceof Error && error.message.includes('Invalid')) {
        return res.status(401).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
}
