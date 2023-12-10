export const PrismaDataTypeToZodMap = {
  Int: 'z.coerce.number().int()',
  String: 'z.string()',
  Boolean: 'z.boolean()',
  DateTime: 'z.coerce.date()',
  Json: 'z.any()',
  Float: 'z.coerce.number().int()',
  Bytes: 'z.coerce.number().int()',
  BigInt: 'z.coerce.number().int()',
  Decimal: 'z.coerce.number().int()',
} as const;

export type FieldTypes = keyof typeof PrismaDataTypeToZodMap;
