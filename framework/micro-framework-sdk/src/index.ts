export { default as init } from './init';

export {
  setSiteId, getSiteId, clearSiteId 
} from './services/site';

export { getLanguage, setLanguage } from './services/language';

export { getLoginUserInfo, initLoginUserInfo } from './services/login-user';

export * as bus from './services/bus';

export { default as appsData, setAppsData } from './services/apps-data';

export {
  default as i18n, initI18n, useI18n 
} from './services/locales';

export { default as env, setEnv } from './services/env';

export { default as global } from './services/global';

export { router } from './services/router';
