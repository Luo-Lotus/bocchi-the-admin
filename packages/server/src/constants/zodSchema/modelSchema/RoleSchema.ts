import { z } from "zod";

/** ORIGIN ROLE SCHEMA */
export const RoleOriginSchema = z.object({
  id: z.number().int(),
  roleName: z.string(),
  permissions: z.number().int().array(),
  version: z.number().int(),
});

/** ROLE SCHEMA */
export const RoleSchema = z.object({
  id: z.number().int(),
  roleName: z.string(),
  permissions: z.number().int().array(),
  version: z.number().int(),
});
export type Role = z.infer<typeof RoleSchema>;

/** PARTIAL ROLE SCHEMA */
export const RolePartialSchema = RoleSchema.partial();

export type RolePartial = z.infer<typeof RolePartialSchema>;

/** DEFAULT PARTIAL ROLE SCHEMA */
export const RoleOptionalDefaultsSchema = RoleSchema.merge(
  z.object({
    id: z.number().int().optional(),
    version: z.number().int().optional(),
  }),
);

export type RoleOptionalDefaults = z.infer<typeof RoleOptionalDefaultsSchema>;

export default RoleSchema;
