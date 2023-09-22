window.__VERSION__ = __VERSION__;
window.__APP_VERSIONS__ = __APP_VERSIONS__;
window.__APPS__ = __APPS__;
console.log(__APP_VERSIONS__);
console.log(__PROJECT__);
import setPublicPath from '@alsi/micro-app-automation-webpack-plugin/public-path';
import * as env from './configs/env';

const filterKeys = [];
const menuFilter = (arr, cb) => arr.map(item1 => ({
  ...item1,
  children: item1.children.filter(item2 => cb(item2))
}));

(async () => {
  await setPublicPath();
  const { setAppsData, initI18n, setEnv } = await import('@alsi/micro-framework-sdk');

  setEnv(env);

  const locales = await import('@alsi/micro-app-automation-webpack-plugin/locales');
  initI18n({
    messages: {
      'zh-CN': locales.default.zhCn,
      'en': locales.default.en,
      'ja': locales.default.ja
    }
  });

  const appsData = await import('@alsi/micro-app-automation-webpack-plugin/main');
  console.log('appsData', appsData.default);
  appsData.default.roleConfig.MENU_LIST = menuFilter(appsData.default.roleConfig.MENU_LIST, (item) => !filterKeys.includes(item.key));
  setAppsData(appsData.default);
  

  import('./bootstrap');
})();