export const setStorageItem = (key: string, item: any) => {
  let value: any;
  if (typeof item === 'string') {
    value = item;
  } else {
    value = JSON.stringify(item);
  }
  localStorage.setItem(key, value);
};

export const getStorageString = (key: string) => {
  return localStorage.getItem(key);
};

export const getStorageJSON = (key: string) => {
  const value = localStorage.getItem(key);
  return value && JSON.parse(value);
};

export const removeStorageItem = (key: string) => {
  localStorage.removeItem(key);
};
