#!/usr/bin/env tsx
import { generatorHandler } from '@prisma/generator-helper';

import type {
  GeneratorManifest,
  GeneratorOptions,
} from '@prisma/generator-helper';
import { generateZodTemplate } from './src/zodTemplate';
import { writeFiles } from './src/utils';

export function onManifest(): GeneratorManifest {
  return {
    defaultOutput: './types',
    prettyName: 'My Type Generator',
  };
}

export async function onGenerate(options: GeneratorOptions) {
  try {
    console.log(JSON.stringify(options.dmmf.datamodel, null, 2));
    handleZodTemplate(options);
  } catch (e) {
    console.error(e);
  }
}

const handleZodTemplate = (options: GeneratorOptions) => {
  writeFiles(options.dmmf.datamodel.models.map(generateZodTemplate));
};
generatorHandler({
  onManifest: onManifest,
  onGenerate: onGenerate,
});
