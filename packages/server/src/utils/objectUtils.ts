// Exclude keys from user
export function exclude<T extends object, Key extends keyof T>(
  obj: T,
  keys: Key[],
): Omit<T, Key> {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as Key)),
  ) as any;
}

export const paramsToFilter = (params: Record<string, any>) => {
  return Object.entries(params).reduce(
    (obj, [key, value]) => {
      if (typeof value === 'string') {
        obj[key] = { contains: value };
      } else if (Array.isArray(value)) {
        obj[key] = { hasSome: value };
      } else if (value?.startAt && value?.endAt) {
        obj[key] = { gte: value.startAt, lte: value.endAt };
      } else if (typeof value === 'object') {
        /* empty */
      } else {
        obj[key] = value;
      }
      return obj;
    },
    {} as Record<string, any>,
  );
};
