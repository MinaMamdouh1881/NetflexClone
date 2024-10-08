import z from 'zod';

export const signUpFirstSchema = z.object({
  email: z.string().email('Invalid email address'),
});
