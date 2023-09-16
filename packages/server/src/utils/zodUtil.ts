import { ZodError } from 'zod';

export const formatErrorMessage = (message: string) => {
  return JSON.parse(message)
    .map((_: any) => _.message)
    .join(',');
};

export const isZodError = (error: Error) => {
  return error instanceof ZodError;
};
