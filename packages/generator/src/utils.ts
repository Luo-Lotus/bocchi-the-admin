import type { DMMF } from '@prisma/generator-helper';
import path from 'path';
import fs from 'fs';
import prettier from 'prettier';
export const getHasDefaultFields = (fields: DMMF.Field[]) => {
  return fields.filter((item) => item.hasDefaultValue);
};

export const getNotModelFields = (fields: DMMF.Field[]) => {
  return fields.filter(
    (item) => !(item.kind === 'object' && !!item.relationName),
  );
};

export const getEnumFields = (fields: DMMF.Field[]) => {
  return fields.filter((item) => item.kind === 'enum');
};

export const writeFiles = (
  list: { fileName: string; template: string }[],
  relationPath = '',
) => {
  const savePath = path.join(__dirname, '../../', relationPath);
  if (!fs.existsSync(savePath)) {
    fs.mkdirSync(savePath, { recursive: true });
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
        err && console.log(err);
      },
    );
  });
};
