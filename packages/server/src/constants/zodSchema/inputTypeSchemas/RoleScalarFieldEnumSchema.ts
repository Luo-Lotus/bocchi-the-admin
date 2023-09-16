import { z } from 'zod';

export const RoleScalarFieldEnumSchema = z.enum(['id','roleName','permissions','version']);

export default RoleScalarFieldEnumSchema;
