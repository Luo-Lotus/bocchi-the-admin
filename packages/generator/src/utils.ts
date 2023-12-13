import type { DMMF } from '@prisma/generator-helper';
import path from 'path';
import fs from 'fs';
import prettier from 'prettier';

/** 帅选关联其他模型字段 */
export const getRelationModelFields = (fields: DMMF.Field[]) => {
  return fields.filter((item) => item.relationName);
};

/** 筛选出类型为日期的字段 */
export const getDateFields = (fields: DMMF.Field[]) => {
  return fields.filter((item) => item.type === 'DateTime');
};

/** 筛选出没有默认值的字段 */
export const getHasDefaultFields = (fields: DMMF.Field[]) => {
  return fields.filter((item) => item.hasDefaultValue);
};

/** 筛选出类型不是model的字段 */
export const getNotModelFields = (fields: DMMF.Field[]) => {
  return fields.filter(
    (item) => !(item.kind === 'object' && !!item.relationName),
  );
};

/** 筛选出类型是字段 */
export const getEnumFields = (fields: DMMF.Field[]) => {
  return fields.filter((item) => item.kind === 'enum');
};

export const writeFiles = async (
  list: { fileName: string; template: string }[],
  relationPath = '',
) => {
  const savePath = path.join(__dirname, '../../', relationPath);
  if (!fs.existsSync(savePath)) {
    fs.mkdirSync(savePath, { recursive: true });
  }
  for (const item of list) {
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
  }
};
