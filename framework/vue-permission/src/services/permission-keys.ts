import { type PermissionKeys } from '@/type';
import { cloneDeep, isArray, isFunction } from 'lodash';
import isPromise from '@/utils/is-promise';
import Deferred from 'simple-deferred2';

let _permissionKeys:PermissionKeys;

export const getPermissionKeys = () => {
  console.log('g1', _permissionKeys);
  
  if (isArray(_permissionKeys)) {
    return cloneDeep(_permissionKeys);
  } else if (isFunction(_permissionKeys)) {
    const data = _permissionKeys();
    if (isArray(data)) {
      return data;
    } else if (isPromise(data)) {
      const deferred = new Deferred<string[] | undefined>();
      data.then((res) => {
        if (isArray(res)) {
          deferred.resolve!(res);
        } else {
          deferred.resolve!(undefined);
        }
      });
      return deferred.promise;
    }
  }
};

export const setPermissionKeys = (permissionKeys: PermissionKeys) => {
  _permissionKeys = permissionKeys;
};