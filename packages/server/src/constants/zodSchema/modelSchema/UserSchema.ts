import { z } from 'zod';

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int(),
  username: z.string(),
  avatar: z.string(),
  isBanned: z.boolean(),
  roleId: z.number().int(),
  createAt: z.coerce.date(),
  updateAt: z.coerce.date(),
  deleteAt: z.coerce.date().nullish(),
  version: z.number().int(),
  accountId: z.number().int(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// USER PARTIAL SCHEMA
/////////////////////////////////////////

export const UserPartialSchema = UserSchema.partial()

export type UserPartial = z.infer<typeof UserPartialSchema>

/////////////////////////////////////////
// USER OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const UserOptionalDefaultsSchema = UserSchema.merge(z.object({
  id: z.number().int().optional(),
  isBanned: z.boolean().optional(),
  createAt: z.coerce.date().optional(),
  updateAt: z.coerce.date().optional(),
  version: z.number().int().optional(),
}))

export type UserOptionalDefaults = z.infer<typeof UserOptionalDefaultsSchema>

export default UserSchema;
