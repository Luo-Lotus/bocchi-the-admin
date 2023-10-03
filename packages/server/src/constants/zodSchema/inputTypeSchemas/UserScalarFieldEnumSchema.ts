import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','username','avatar','isBanned','roleId','createAt','updateAt','deleteAt','version','accountId']);

export default UserScalarFieldEnumSchema;
