import { z } from 'zod';

/////////////////////////////////////////
// ROLE SCHEMA
/////////////////////////////////////////

export const RoleSchema = z.object({
  id: z.number().int(),
  roleName: z.string(),
  permissions: z.number().int().array(),
  // omitted: version: z.number().int(),
})

export type Role = z.infer<typeof RoleSchema>

/////////////////////////////////////////
// ROLE PARTIAL SCHEMA
/////////////////////////////////////////

export const RolePartialSchema = RoleSchema.partial()

export type RolePartial = z.infer<typeof RolePartialSchema>

/////////////////////////////////////////
// ROLE OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const RoleOptionalDefaultsSchema = RoleSchema.merge(z.object({
  id: z.number().int().optional(),
  // omitted: version: z.number().int().optional(),
}))

export type RoleOptionalDefaults = z.infer<typeof RoleOptionalDefaultsSchema>

export default RoleSchema;
