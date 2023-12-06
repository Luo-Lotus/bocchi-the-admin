import { z } from "zod";

/** ORIGIN ACCOUNT SCHEMA */
export const AccountOriginSchema = z.object({
  id: z.number().int(),
  account: z.string(),
  password: z.string(),
  email: z.string().nullish(),
  phoneNumber: z.string().nullish(),
  createAt: z.coerce.date(),
  updateAt: z.coerce.date(),
  deleteAt: z.coerce.date().nullish(),
  version: z.number().int(),
});

/** ACCOUNT SCHEMA */
export const AccountSchema = z.object({
  id: z.number().int(),
  account: z.string(),
  password: z
    .string()
    .regex(
      /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/,
      "密码必须包含数字与字母且大于6位小于15位",
    ),
  email: z.string().nullish(),
  phoneNumber: z.string().nullish(),
  createAt: z.coerce.date(),
  updateAt: z.coerce.date(),
  deleteAt: z.coerce.date().nullish(),
  version: z.number().int(),
});
export type Account = z.infer<typeof AccountSchema>;

/** PARTIAL ACCOUNT SCHEMA */
export const AccountPartialSchema = AccountSchema.partial();

export type AccountPartial = z.infer<typeof AccountPartialSchema>;

/** DEFAULT PARTIAL ACCOUNT SCHEMA */
export const AccountOptionalDefaultsSchema = AccountSchema.merge(
  z.object({
    id: z.number().int().optional(),
    createAt: z.coerce.date().optional(),
    updateAt: z.coerce.date().optional(),
    version: z.number().int().optional(),
  }),
);

export type AccountOptionalDefaults = z.infer<
  typeof AccountOptionalDefaultsSchema
>;

export default AccountSchema;
