import { createRouter, createWebHistory } from 'vue-router';

export default ({ routes, base, defaultPage, keepAlive }: {routes: any[], base?:string, defaultPage?:string, keepAlive?:{
  open?: boolean,
  max?: number,
  include?:any,
  exclude?:any
}}) => createRouter({
  history: createWebHistory(base),
  routes: [
    ...(defaultPage ? [
      {
        path: '/',
        redirect: defaultPage
      }
    ] : []),
    {
      path: '/',
      component: () => import('./components/base-wrapper.vue'),
      children: routes,
      props: { keepAlive }
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('./components/not-found.vue'),
      meta: {
        title: '404',
        routerTabIgnore: true 
      }
    }
  ]
});