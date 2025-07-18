import { type PermissionLogic } from '../type';
import CheckPermissionLogic from './check-permission-logic';
import { ref } from 'vue';
import { getPermissionKeys } from './permission-keys';
import { isUndefined, isArray } from 'lodash';
import isPromise from '@/utils/is-promise';

const _permissionKeys = ref<string[] | null>(null);

export const usePermissionProvider = () => {
  if (_permissionKeys.value === null) {
    const data = getPermissionKeys();
    console.log('data', data);
    

    if (isUndefined(data)) {
      if (_permissionKeys.value === null) {
        _permissionKeys.value = [];
      }
    } else if (isArray(data)) {
      if (_permissionKeys.value === null) {
        _permissionKeys.value = data;
      }
    } else if (isPromise(data)) {
      data.then((res) => {
        if (_permissionKeys.value === null && !isUndefined(res)) {
          _permissionKeys.value = res;
        }
      });
    } else {
      if (_permissionKeys.value === null) {
        _permissionKeys.value = [];
      }
    }
  }

  return { permissionKeys: _permissionKeys };
};

export const usePermission = (param: string | string[] | PermissionLogic) => {
  const hasPermission = ref(false);

  const checkPermissionLogic = new CheckPermissionLogic(param, _permissionKeys?.value || []);
  hasPermission.value = checkPermissionLogic.check();

  return { hasPermission };
};

export const checkPermission = (param: string | string[] | PermissionLogic) => {
  const checkPermissionLogic = new CheckPermissionLogic(param, _permissionKeys?.value || []);
  return checkPermissionLogic.check();
};