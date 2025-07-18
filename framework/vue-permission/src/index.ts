import VPermission from './components/permission.vue';
import VPermissionProvider from './components/permission-provider.vue';
import { usePermission, checkPermission } from '@/services/use-permission';
import { type CreatePermission, type Permission, type CheckPermission } from './type';
import { setPermissionKeys } from './services/permission-keys';
import { setCheckPermission } from './services/check-permission';

export const createPermission = ({ permissionKeys, checkPermission }:CreatePermission) => {
  setPermissionKeys(permissionKeys);
  setCheckPermission(checkPermission);
  return {
    install(app) {
      app.component('VPermission', VPermission);
      app.component('VPermissionProvider', VPermissionProvider);
    } 
  } as Permission;
};

export { usePermission, checkPermission };

export {
  type Permission, type CreatePermission, type CheckPermission 
};