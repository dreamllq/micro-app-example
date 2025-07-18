import setPublicPath from '@alsi/micro-app-automation-webpack-plugin/public-path';

(async () => {
  await setPublicPath();
  const { default: env } = await import('./configs/env');
  const { setAppsData, initI18n, setEnv } = await import('@alsi/micro-framework-sdk');

  setEnv(env);

  const locales = await import('@alsi/micro-app-automation-webpack-plugin/locales');
  
  initI18n({
    messages: Object.keys(locales.default).reduce((acc, key) => {
      if (key === 'zhCn') {
        acc['zh-CN'] = locales.default[key];
      } else {
        acc[key] = locales.default[key];
      }
      return acc;
    }, {})
  });

  const appsData = await import('@alsi/micro-app-automation-webpack-plugin/main');
  console.log('appsData', appsData.default);
  setAppsData(appsData.default);
  import('./bootstrap');
})();