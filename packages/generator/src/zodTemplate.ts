import { DMMF } from '@prisma/generator-helper';
import { FieldTypes, PrismaDataTypeToZodMap } from './constants';
import { getEnumFields, getHasDefaultFields, getNotModelFields } from './utils';

const REGEX = /@zod=(.*)/;

/** 创建Model field */
const createField = (
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

  if (field.kind == 'enum') {
    return `${field.name}: ${field.type + 'Enum'}${
      field.isRequired ? '' : '.nullish()'
    }${isPartial ? '.optional()' : ''}`;
  }

  return `${field.name}:  ${PrismaDataTypeToZodMap[field.type as FieldTypes]}${
    field.isList ? '.array()' : ''
  }${field.isRequired ? '' : '.nullish()'}${isPartial ? '.optional()' : ''}`;
};
/** 创建Index文件 */
export const createIndex = (
  templates: {
    modelName: string;
  }[],
) => {
  return {
    modelName: '',
    fileName: 'index.ts',
    template: `${templates
      .map((item) => `export * from './${item.modelName}'`)
      .join(';')}`,
  };
};

/** 创建枚举的zod文件定义 */
export const generateZodEnumSchema = (_enum: DMMF.DatamodelEnum) => {
  const name = `${_enum.name}Enum`;
  const template = `
  import { z } from 'zod';

  export const ${name} = z.enum([${_enum.values
    .map((item) => `"${item.name}"`)
    .join(',')}]);

  export type ${name}Type = \`\${z.infer<typeof ${name}>}\`

  export default ${name};

  `;
  return {
    modelName: name,
    fileName: name + '.ts',
    template,
  };
};

/** 创建model的zod文件定义 */
export const generateZodModelSchema = (model: DMMF.Model) => {
  const modelName = model.name;
  const modelLowerCaseName = modelName.toLowerCase();
  const modelUpperCaseName = modelName.toUpperCase();
  const fields = getNotModelFields(model.fields);
  const hasDefaultFields = getHasDefaultFields(fields);
  const enumFields = getEnumFields(fields);
  const template = `
    import { z } from 'zod';
    ${
      enumFields.length
        ? `import {${enumFields
            .map((item) => `${item.type}Enum`)
            .join(',')}} from './'`
        : ''
    }

    /** ORIGIN ${modelUpperCaseName} SCHEMA */
    export const ${modelName}OriginSchema = z.object({
      ${fields.map((item) => createField(item, false, false))}
    });

    /** ${modelUpperCaseName} SCHEMA */
    export const ${modelName}Schema = z.object({
      ${fields.map((item) => createField(item))}
    });
    export type ${modelName} = z.infer<typeof ${modelName}Schema>;

    /** PARTIAL ${modelUpperCaseName} SCHEMA */
    export const ${modelName}PartialSchema = ${modelName}Schema.partial();

    export type ${modelName}Partial = z.infer<typeof ${modelName}PartialSchema>;

    /** DEFAULT PARTIAL ${modelUpperCaseName} SCHEMA */
    export const ${modelName}OptionalDefaultsSchema = ${modelName}Schema.merge(z.object({
      ${hasDefaultFields.map((item) => createField(item, true))}
    }));

    export type ${modelName}OptionalDefaults = z.infer<typeof ${modelName}OptionalDefaultsSchema>;

    export default ${modelName}Schema;
  `;
  return {
    modelName: modelName + 'Schema',
    fileName: `${modelName}Schema.ts`,
    template,
  };
};
