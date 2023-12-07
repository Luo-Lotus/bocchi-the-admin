import { z } from 'zod';

export const GenderEnum = z.enum(['MALE', 'FEMALE']);

export type GenderEnumType = `${z.infer<typeof GenderEnum>}`;

export default GenderEnum;
