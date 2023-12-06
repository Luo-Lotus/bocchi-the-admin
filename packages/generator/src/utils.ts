import type { DMMF } from '@prisma/generator-helper';
import path from 'path';
import fs from 'fs';
import prettier from 'prettier';
export const filterHasDefaultFields = (fields: DMMF.Field[]) => {
  return fields.filter((item) => item.hasDefaultValue);
};

export const filterModelFields = (fields: DMMF.Field[]) => {
  return fields.filter(
    (item) => !(item.kind === 'object' && !!item.relationName),
  );
};

export const writeFiles = (
  list: { fileName: string; template: string }[],
  relationPath = '',
) => {
  const savePath = path.join(__dirname, '../../', relationPath);
  if (!fs.existsSync(savePath)) {
    fs.mkdirSync(savePath);
  }
  list.forEach(async (item) => {
    const formattedTemplate =
      (await prettier
        .format(item.template, {
          parser: 'typescript',
        })
        .catch((e) => {
          console.log(e);
        })) || '';

    fs.writeFile(
      path.join(savePath, item.fileName),
      formattedTemplate,
      (err) => {
        console.log(err);
      },
    );
  });
};
