import lodash from 'lodash';
import { AUTHORIZATION_TOKEN } from '../constants/StorageKey';
import useUser from '../models/useUser';
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

export const withAuth = (anyThing: any, authCode?: number) => {
  const currentPermissions = useUser.getState().user?.role.permissions || [];
  if (
    (authCode && currentPermissions.includes(authCode)) ||
    lodash.isNil(authCode)
  ) {
    return anyThing;
  } else {
    return null;
  }
};
