import {
  DefineLocaleMessage
} from 'vue-i18n'
import * as Locales from './locales/index'

type _zhCn = typeof Locales['zhCn'];
declare module 'vue-i18n' {
  // define the locale messages schema
  export interface DefineLocaleMessage extends _zhCn {};
}