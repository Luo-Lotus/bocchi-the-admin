import { AUTHORIZATION_TOKEN } from '../constants/StorageKey';
import {
  getStorageString,
  removeStorageItem,
  setStorageItem,
} from './storageUtil';

export const setToken = (token: string) => {
  setStorageItem(AUTHORIZATION_TOKEN, token);
};

export const getToken = () => {
  return getStorageString(AUTHORIZATION_TOKEN);
};

export const clearToken = () => {
  removeStorageItem(AUTHORIZATION_TOKEN);
};
