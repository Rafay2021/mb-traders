'use server';
import 'server-only';
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
} from '../schemas/schema';

export async function loginAction(formdata: FormData) {
  const data = Object.fromEntries(formdata);
  const validatedData = loginSchema.safeParse(data);
  if (validatedData.success) {
    console.log(validatedData.data);
  } else {
    return;
  }
}

export async function registerAction(formdata: FormData) {
  const data = Object.fromEntries(formdata);
  const validatedData = registerSchema.safeParse(data);
  if (validatedData.success) {
    console.log(validatedData.data);
  } else {
    return;
  }
}

export async function forgotPasswordAction(formdata: FormData) {
  const data = Object.fromEntries(formdata);
  const validatedData = forgotPasswordSchema.safeParse(data);
  if (validatedData.success) {
    console.log(validatedData.data);
  } else {
    return;
  }
}
