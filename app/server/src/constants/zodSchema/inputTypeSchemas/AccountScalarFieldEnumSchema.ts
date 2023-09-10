import { z } from 'zod';

export const AccountScalarFieldEnumSchema = z.enum(['account','password','email','phoneNumber','userId','createAt','updateAt','deleteAt','version']);

export default AccountScalarFieldEnumSchema;
