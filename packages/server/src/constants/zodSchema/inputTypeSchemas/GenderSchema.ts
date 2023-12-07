import { z } from 'zod';

export const GenderSchema = z.enum(['MALE','FEMALE']);

export type GenderType = `${z.infer<typeof GenderSchema>}`

export default GenderSchema;
