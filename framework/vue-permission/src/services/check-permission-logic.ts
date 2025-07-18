import { type PermissionLogic } from '../type';
import { isString, isArray, isUndefined, isObject } from 'lodash';
import { checkPermission } from './check-permission';

const DEFAULT_PERMISSION = true;
export default class CheckPermissionLogic {
  param;
  permissions: string[];

  constructor(param, permissions: string[]) {
    this.param = param;
    this.permissions = permissions;
  }

  check(): boolean {
    if (isString(this.param)) {
      return this.checkStringValueLogic(this.param);
    } else if (isArray(this.param)) {
      return this.checkArrayValueLogic(this.param);
    } else if (isObject(this.param)) {
      return this.checkLogic(this.param);
    } else {
      return DEFAULT_PERMISSION;
    }
  }

  private checkLogic(logic: PermissionLogic): boolean {
    if (isArray(logic.and)) {
      return this.checkAndLogic(logic.and);
    } if (isArray(logic.or)) {
      return this.checkOrLogic(logic.or);
    } if (!isUndefined(logic.not)) {
      return this.checkNotLogic(logic.not);
    } if (!isUndefined(logic.value)) {
      return this.checkValueLogic(logic.value);
    } else {
      return DEFAULT_PERMISSION;
    }
  }

  private checkAndLogic(and: PermissionLogic[]): boolean {
    if (and.length === 0) return true;
    return and.reduce((acc, logic) => acc && this.checkLogic(logic), true);
  }

  private checkOrLogic(or: PermissionLogic[]):boolean {
    if (or.length === 0) return true;
    return or.reduce((acc, logic) => acc || this.checkLogic(logic), false);
  }

  private checkNotLogic(not: PermissionLogic): boolean {
    return !this.checkLogic(not);
  }

  private checkValueLogic(item: string | string[]): boolean {
    if (isString(item)) {
      return this.checkStringValueLogic(item);
    } else if (isArray(item)) {
      return this.checkArrayValueLogic(item);
    } else {
      return DEFAULT_PERMISSION;
    }
  }

  private checkStringValueLogic(item: string): boolean {
    if (isString(item)) {
      return checkPermission(item, this.permissions);
    } else {
      return DEFAULT_PERMISSION;
    }
  }

  private checkArrayValueLogic(item:string[]): boolean {
    return item.reduce((acc, key) => acc && this.checkStringValueLogic(key), true);
  }
}
