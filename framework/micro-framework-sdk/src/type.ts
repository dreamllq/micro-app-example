import { type Router } from 'vue-router';
export type InitFunction = (args:Config)=>void

export interface Config {
  getLoginUser:()=>any,
  router: Router
}