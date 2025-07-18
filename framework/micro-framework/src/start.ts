import { init as momentInit } from './services/moment';
import { getElementConfig } from './services/element';
import { createApp } from 'vue';
import App from './components/app.vue';
import { StartFunction } from './type';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import createRouter from './router';
import createPermission from './permission';
import { init as sdkInit } from '@alsi/micro-framework-sdk';
import { isBoolean } from 'lodash';

export const start: StartFunction = async ({ base, defaultPage, layout, fullView, i18n, routes = [], permissionOptions, beforeMount, getLoginUser, beforeLayoutMount, performance, keepAlive }) => {
  const router = createRouter({
    routes,
    base,
    defaultPage,
    keepAlive
  });
  sdkInit({
    getLoginUser,
    router
  });
  await momentInit();
  const elementConfig = await getElementConfig();
  const app = createApp(App, {
    fullView,
    layout,
    beforeLayoutMount
  });
  app.use(ElementPlus, elementConfig);

  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
  app.use(i18n);
  app.use(router);
  const permission = createPermission(permissionOptions);
  app.use(permission);

  if (isBoolean(performance)) {
    app.config.performance = performance;
  }

  if (beforeMount) {
    await beforeMount({
      app,
      router,
      i18n,
      permission 
    });
  }

  app.mount('#app');
};