import { z } from 'zod';

export const RoleScalarFieldEnumSchema = z.enum(['id','roleName','permissions','version','test']);

export default RoleScalarFieldEnumSchema;
