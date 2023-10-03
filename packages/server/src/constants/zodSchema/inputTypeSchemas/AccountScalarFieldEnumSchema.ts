import { z } from 'zod';

export const AccountScalarFieldEnumSchema = z.enum(['id','account','password','email','phoneNumber','createAt','updateAt','deleteAt','version']);

export default AccountScalarFieldEnumSchema;
