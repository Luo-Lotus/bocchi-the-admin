#!/usr/bin/env ts-node

import { generatorHandler } from '@prisma/generator-helper';

import type {
  GeneratorManifest,
  GeneratorOptions,
} from '@prisma/generator-helper';

export function onManifest(): GeneratorManifest {
  return {
    defaultOutput: './types',
    prettyName: 'My Type Generator',
  };
}

export async function onGenerate(options: GeneratorOptions) {
  console.log(JSON.stringify(options.dmmf.datamodel, null, 2));
}

generatorHandler({
  onManifest: onManifest,
  onGenerate: onGenerate,
});

const template = (options: GeneratorOptions) => {
  const { dmmf } = options;
  dmmf.datamodel.models.map((model) => {
    return `
      import { z } from 'zod';
      
      /////////////////////////////////////////
      // ${model.name.toUpperCase()} SCHEMA
      /////////////////////////////////////////
      
      export const ${model.name}Schema = z.object({
        ${model.fields
          .map((field) => {
            return `${field.name}: ${field.type}${
              field.isRequired ? '.nullish()' : ''
            }`;
          })
          .join(',\n')}
        id: z.number().int(),
        account: z.string(),
        password: z.string().regex(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/,'密码必须包含数字与字母且大于6位小于15位'),
        email: z.string().nullish(),
        phoneNumber: z.string().nullish(),
        createAt: z.coerce.date(),
        updateAt: z.coerce.date(),
        deleteAt: z.coerce.date().nullish(),
        version: z.number().int(),
      })
      
      export type ${model.name} = z.infer<typeof ${model.name}Schema>
      
      /////////////////////////////////////////
      // ${model.name.toUpperCase()} PARTIAL SCHEMA
      /////////////////////////////////////////
      
      export const ${model.name}PartialSchema = ${model.name}Schema.partial()
      
      export type ${model.name}Partial = z.infer<typeof ${
        model.name
      }PartialSchema>
      
      /////////////////////////////////////////
      // ${model.name.toUpperCase()} OPTIONAL DEFAULTS SCHEMA
      /////////////////////////////////////////
      
      export const ${model.name}OptionalDefaultsSchema = ${
        model.name
      }Schema.merge(z.object({
        ${model.fields
          .filter((field) => !field.isRequired)
          .map((field) => {
            return `${field.name}: ${field.type}${
              field.isRequired ? '.optional()' : ''
            }`;
          })}
      }))
      
      export type ${model.name}OptionalDefaults = z.infer<typeof ${
        model.name
      }OptionalDefaultsSchema>
      
      export default ${model.name}Schema;
      `;
  });
};
