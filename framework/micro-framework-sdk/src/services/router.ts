import { getConfig } from '@/config';
import { Router } from 'vue-router';

export const router = new Proxy({} as Router, {
  get(_target, p) {
    return getConfig().router[p];
  }
});