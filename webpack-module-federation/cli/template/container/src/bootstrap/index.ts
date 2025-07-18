import { start } from '@alsi/micro-framework';
import Layout from './layout.vue';
import { i18n, appsData } from '@alsi/micro-framework-sdk';

start({
  defaultPage: '/app',
  fullView: [/login\//],
  layout: Layout,
  i18n,
  permissionOptions: {
    permissionKeys: async () => [],
    checkPermission: () => true
  },
  routes: appsData.routes,
  getLoginUser: async () => ({}),
  beforeLayoutMount: async () => {},
  beforeMount: ({ app, router, i18n, permission }) => { }
});