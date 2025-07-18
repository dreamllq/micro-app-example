export type LogicConfig<T> = {
  and?: LogicConfig<T>[];
  or?: LogicConfig<T>[];
  not?: LogicConfig<T>;
  value?: T;
};

export type PermissionKey = string;

export type PermissionKeyConfig = Record<string, Record<string, PermissionKey>>;
export type PermissionModuleConfig = Record<string, string>;

export type RoleDependConfig = Record<PermissionKey, PermissionKey[]>;
export type RoleMessageConfig = Record<PermissionKey, {
  name: string;
  type: 'auth';
  dependModule: LogicConfig<string>;
}>;
export type RolePageRoleMap = Record<string, {
  name: string;
  key: string;
  permissionsKey: PermissionKey[];
  dependModule: LogicConfig<string>;
}>;

export type PermissionLogic = {
  and?: PermissionLogic[];
  or?: PermissionLogic[];
  not?: PermissionLogic;
  value?: string | string[];
};

export type MenuItemConfig = {
  key: string;
  label: string;
  icon?: string;
  children?: MenuItemConfig[];
  subPages?: string[];
  permissionKey?: string | string[] | PermissionLogic;
};

export type MenuConfig = Record<string, MenuItemConfig>;