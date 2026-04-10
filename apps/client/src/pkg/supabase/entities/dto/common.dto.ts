import { z } from 'zod';

// bad request response schema
export const SBadRequestRes = z.object({
  error: z.string().default('Bad Request'),
  message: z.string().default('The request could not be understood due to invalid syntax or missing parameters'),
});

// unauthorized response schema
export const SUnauthorizedRes = z.object({
  error: z.string().default('Unauthorized'),
  message: z.string().default('Unauthorized request'),
});

// not found response schema
export const SNotFoundRes = z.object({
  error: z.string().default('Not Found'),
  message: z.string().default('The requested resource could not be found'),
});

// unprocessable entity response schema
export const SUnprocessableEntityRes = z.object({
  error: z.string().default('Unprocessable Entity'),
  message: z.string().default('The request could not be processed due to invalid data'),
});

// internal server error response schema
export const SInternalErrorRes = z.object({
  error: z.string().default('Internal Server Error'),
  message: z.string().default('An unexpected error occurred. Please try again later'),
});
