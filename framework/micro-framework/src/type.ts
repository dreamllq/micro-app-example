import { CreatePermission, Permission } from '@alsi/vue-permission';
import { Component, App } from 'vue';
import { I18n } from 'vue-i18n';
import { Router } from 'vue-router';

export type StartFunction = (args:{
  base?:string, 
  performance?:boolean,
  defaultPage?:string,
  fullView?:RegExp[], 
  layout?: Component,
  i18n: I18n,
  routes?: any[],
  permissionOptions?: CreatePermission,
  keepAlive?:{
    open?: boolean,
    max?: number,
    include?:any,
    exclude?:any
  }
  getLoginUser:()=>any,
  beforeMount?:(args:{ app: App, router:Router, i18n:I18n, permission:Permission }) => Promise<void> | void,
  beforeLayoutMount?:(options: { userInfo:any })=>Promise<void>
}) => Promise<void>;