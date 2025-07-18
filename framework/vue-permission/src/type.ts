import { Plugin } from 'vue';

export interface PermissionLogic {
  and?: PermissionLogic[],
  or?: PermissionLogic[],
  not?: PermissionLogic,
  value?: string | string[]
}

export type Permission = Plugin;

export type PermissionKeys = string[] | (()=>string[]) | (()=>Promise<string[]>)

export type CheckPermission = (param: string | string[] | PermissionLogic) => boolean;

export type OptionCheckPermission = (key:string, permissionKeys: string[]) => boolean
export interface CreatePermission {
  permissionKeys: PermissionKeys,
  checkPermission: OptionCheckPermission
}