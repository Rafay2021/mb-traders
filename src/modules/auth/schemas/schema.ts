import { z } from 'zod';

//Login Schema

export const loginSchema = z.object({
  email: z
    .email('Enter a valid email address')
    .trim()
    .max(254, 'Email cannot exceed 254 characters')
    .transform((email) => email.toLowerCase()),

  password: z
    .string()
    .min(1, 'Password is required')
    .max(128, 'Password cannot exceed 128 characters'),
});

export type LoginInput = z.input<typeof loginSchema>;
export type LoginData = z.output<typeof loginSchema>;

// Registration schema

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Name must contain at least 2 characters')
      .max(100, 'Name cannot exceed 100 characters'),

    email: z
      .email('Enter a valid email address')
      .trim()
      .max(254, 'Email cannot exceed 254 characters')
      .transform((email) => email.toLowerCase()),

    password: z
      .string()
      .min(8, 'Password must contain at least 8 characters')
      .max(128, 'Password cannot exceed 128 characters'),

    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterInput = z.input<typeof registerSchema>;
export type RegisterData = z.output<typeof registerSchema>;

// Forgot password Schema

export const forgotPasswordSchema = z.object({
  email: z
    .email('Enter a valid email address')
    .trim()
    .max(254, 'Email cannot exceed 254 characters')
    .transform((email) => email.toLowerCase()),
});

export type ForgotPasswordInput = z.input<typeof forgotPasswordSchema>;
export type ForgotPasswordData = z.output<typeof forgotPasswordSchema>;
