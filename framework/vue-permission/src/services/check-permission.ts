import { OptionCheckPermission } from '@/type';


let _checkPermission: OptionCheckPermission;

export const setCheckPermission = (checkPermission: OptionCheckPermission) => {
  _checkPermission = checkPermission;
};

export const checkPermission:OptionCheckPermission = (key, permissionKeys) => _checkPermission(key, permissionKeys);