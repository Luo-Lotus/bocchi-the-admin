#!/usr/bin/env tsx
import { generatorHandler } from '@prisma/generator-helper';

import type {
  GeneratorManifest,
  GeneratorOptions,
} from '@prisma/generator-helper';
import {
  createIndex,
  generateZodEnumSchema,
  generateZodModelSchema,
} from './src/zodTemplate';
import { writeFiles } from './src/utils';
import config from './config';
import { generateTRPCTemplate } from './src/trpcTemplate';

export function onManifest(): GeneratorManifest {
  return {
    defaultOutput: './types',
    prettyName: 'My Type Generator',
  };
}

export async function onGenerate(options: GeneratorOptions) {
  try {
    console.log(JSON.stringify(options.dmmf.datamodel, null, 2));
    await handleZodTemplate(options);
    await handleTRPCTemplate(options);
  } catch (e) {
    console.error(e);
  }
}

const handleZodTemplate = async (options: GeneratorOptions) => {
  const enumSchema = options.dmmf.datamodel.enums.map(generateZodEnumSchema);
  const modelSchema = options.dmmf.datamodel.models.map(generateZodModelSchema);

  const templates = modelSchema.concat(enumSchema);
  templates.push(createIndex(templates));
  await writeFiles(templates, config.zod.outputPath);
};

const handleTRPCTemplate = async (options: GeneratorOptions) => {
  const routers = options.dmmf.datamodel.models.map(generateTRPCTemplate);

  await writeFiles(routers, config.trpc.outputPath);
};

generatorHandler({
  onManifest: onManifest,
  onGenerate: onGenerate,
});
