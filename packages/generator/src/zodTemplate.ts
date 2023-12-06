import type { DMMF } from '@prisma/generator-helper';
import { FieldTypes, PrismaDataTypeToZodMap } from './constants';
import { filterHasDefaultFields, filterModelFields } from './utils';

const REGEX = /@zod=(.*)/;

const generateField = (
  field: DMMF.Field,
  isPartial = false,
  useDocumention = true,
) => {
  if (useDocumention) {
    const customZods = field.documentation?.split('\n') || [];

    // 如果存在 @zod= 开头的注释文档，直接应用注释中的zod表达式
    for (const item of customZods) {
      const result = item.match(REGEX)?.[1];
      if (result) {
        return `${field.name}: ${result}${
          field.isRequired ? '' : '.nullish()'
        }${isPartial ? '.optional()' : ''}`;
      }
    }
  }

  return `${field.name}:  ${PrismaDataTypeToZodMap[field.type as FieldTypes]}${
    field.isList ? '.array()' : ''
  }${field.isRequired ? '' : '.nullish()'}${isPartial ? '.optional()' : ''}`;
};

export const generateZodTemplate = (model: DMMF.Model) => {
  const modelName = model.name;
  const modelLowerCaseName = modelName.toLowerCase();
  const modelUpperCaseName = modelName.toUpperCase();
  const fields = filterModelFields(model.fields);
  const hasDefaultFields = filterHasDefaultFields(fields);
  const template = `
    import { z } from 'zod';

    /** ORIGIN ${modelUpperCaseName} SCHEMA */
    export const ${modelName}OriginSchema = z.object({
      ${fields.map((item) => generateField(item, false, false))}
    });

    /** ${modelUpperCaseName} SCHEMA */
    export const ${modelName}Schema = z.object({
      ${fields.map((item) => generateField(item))}
    });
    export type ${modelName} = z.infer<typeof ${modelName}Schema>;

    /** PARTIAL ${modelUpperCaseName} SCHEMA */
    export const ${modelName}PartialSchema = ${modelName}Schema.partial();

    export type ${modelName}Partial = z.infer<typeof ${modelName}PartialSchema>;

    /** DEFAULT PARTIAL ${modelUpperCaseName} SCHEMA */
    export const ${modelName}OptionalDefaultsSchema = ${modelName}Schema.merge(z.object({
      ${hasDefaultFields.map((item) => generateField(item, true))}
    }));

    export type ${modelName}OptionalDefaults = z.infer<typeof ${modelName}OptionalDefaultsSchema>;

    export default ${modelName}Schema;
  `;
  return {
    modelName: modelName,
    fileName: `${modelName}Schema.ts`,
    template,
  };
};
