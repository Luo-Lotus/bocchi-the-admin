import { z } from 'zod';

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.number().int(),
  account: z.string(),
  password: z.string(),
  email: z.string().nullish(),
  phoneNumber: z.string().nullish(),
  createAt: z.coerce.date(),
  updateAt: z.coerce.date(),
  deleteAt: z.coerce.date().nullish(),
  version: z.number().int(),
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
  id: z.number().int().optional(),
  createAt: z.coerce.date().optional(),
  updateAt: z.coerce.date().optional(),
  version: z.number().int().optional(),
}))

export type AccountOptionalDefaults = z.infer<typeof AccountOptionalDefaultsSchema>

export default AccountSchema;
