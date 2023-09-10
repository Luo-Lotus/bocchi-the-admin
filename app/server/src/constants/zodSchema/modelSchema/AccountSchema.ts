import { z } from 'zod';

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  account: z.string(),
  password: z.string(),
  email: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  userId: z.number().int(),
  createAt: z.coerce.date(),
  updateAt: z.coerce.date(),
  deleteAt: z.coerce.date().nullable(),
  // omitted: version: z.number().int(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// ACCOUNT PARTIAL SCHEMA
/////////////////////////////////////////

export const AccountPartialSchema = AccountSchema.partial()

export type AccountPartial = z.infer<typeof AccountPartialSchema>

/////////////////////////////////////////
// ACCOUNT OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const AccountOptionalDefaultsSchema = AccountSchema.merge(z.object({
  createAt: z.coerce.date().optional(),
  updateAt: z.coerce.date().optional(),
  // omitted: version: z.number().int().optional(),
}))

export type AccountOptionalDefaults = z.infer<typeof AccountOptionalDefaultsSchema>

export default AccountSchema;
