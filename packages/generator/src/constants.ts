export const PrismaDataTypeToZodMap = {
  Int: 'z.number().int()',
  String: 'z.string()',
  Boolean: 'z.boolean()',
  DateTime: 'z.coerce.date()',
  Json: 'z.any()',
  Float: 'z.number().int()',
  Bytes: 'z.number().int()',
  BigInt: 'z.number().int()',
  Decimal: 'z.number().int()',
} as const;

export type FieldTypes = keyof typeof PrismaDataTypeToZodMap;
