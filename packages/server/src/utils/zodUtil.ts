import { ZodError, z } from 'zod';
import { SortOrderSchema } from '../constants/zodSchema';

export const formatErrorMessage = (message: string) => {
  return JSON.parse(message)
    .map((_: any) => _.message)
    .join(',');
};

export const isZodError = (error: Error) => {
  return error instanceof ZodError;
};

export const createQueryRouterInputSchema = <
  T extends ReturnType<typeof z.object>,
>(
  filterSchema: T,
) =>
  z.object({
    sort: z.record(filterSchema.keyof(), SortOrderSchema).optional(),
    filter: filterSchema.optional(),
    page: z.object({
      current: z.number(),
      pageSize: z.number(),
    }),
  });
