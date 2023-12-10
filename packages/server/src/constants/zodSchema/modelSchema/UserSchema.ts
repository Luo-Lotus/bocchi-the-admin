import { z } from "zod";

/** ORIGIN USER SCHEMA */
export const UserOriginSchema = z.object({
  id: z.coerce.number().int(),
  username: z.string(),
  avatar: z.string(),
  isBanned: z.boolean(),
  roleId: z.coerce.number().int(),
  createAt: z.coerce.date(),
  updateAt: z.coerce.date(),
  deleteAt: z.coerce.date().nullish(),
  version: z.coerce.number().int(),
  accountId: z.coerce.number().int(),
});

/** USER SCHEMA */
export const UserSchema = z.object({
  id: z.coerce.number().int(),
  username: z.string(),
  avatar: z.string(),
  isBanned: z.boolean(),
  roleId: z.coerce.number().int(),
  createAt: z.coerce.date(),
  updateAt: z.coerce.date(),
  deleteAt: z.coerce.date().nullish(),
  version: z.coerce.number().int(),
  accountId: z.coerce.number().int(),
});
export type User = z.infer<typeof UserSchema>;

/** PARTIAL USER SCHEMA */
export const UserPartialSchema = UserSchema.partial();

export type UserPartial = z.infer<typeof UserPartialSchema>;

/** DEFAULT PARTIAL USER SCHEMA */
export const UserOptionalDefaultsSchema = UserSchema.merge(
  z.object({
    id: z.coerce.number().int().optional(),
    isBanned: z.boolean().optional(),
    createAt: z.coerce.date().optional(),
    updateAt: z.coerce.date().optional(),
    version: z.coerce.number().int().optional(),
  }),
);

export type UserOptionalDefaults = z.infer<typeof UserOptionalDefaultsSchema>;

export default UserSchema;
