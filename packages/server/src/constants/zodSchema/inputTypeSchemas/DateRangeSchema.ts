import { z } from 'zod';

export const DateRangeSchema = z
  .object({
    startAt: z.coerce.date(),
    endAt: z.coerce.date(),
  })
  .optional();
