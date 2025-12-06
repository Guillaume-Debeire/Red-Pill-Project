import { z } from 'zod';

// --- Signup schema ---
export const signupSchema = z.object({
	email: z.email('Email invalide'),
	password: z.string().min(6, 'Minimum 6 caractères'),
	username: z.string().min(3, 'Minimum 3 caractères')
});

export type SignupData = z.infer<typeof signupSchema>;

// --- Login schema ---
export const loginSchema = z.object({
	email: z.string().email('Email invalide'),
	password: z.string().min(1, 'Mot de passe requis')
});

export type LoginData = z.infer<typeof loginSchema>;
