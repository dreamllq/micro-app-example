import { createI18n, I18n, type I18nOptions } from 'vue-i18n';
import { getLanguage } from './language';

export { useI18n } from 'vue-i18n';

type LocaleI18n = I18n<Record<string, any>, Record<string, any>, Record<string, any>, string, boolean>

let _i18n:LocaleI18n;

export const initI18n = ({ messages }) => {
  const options: I18nOptions = {
    legacy: false,
    locale: getLanguage(),
    fallbackLocale: 'zh-CN',
    messages: messages
  };
  
  _i18n = createI18n<false, typeof options, any>(options);
};

export default new Proxy<LocaleI18n>({} as LocaleI18n, {
  get(_target, p) {
    return _i18n[p];
  }
});