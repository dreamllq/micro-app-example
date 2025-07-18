
import { getLanguage } from '@alsi/micro-framework-sdk';

export const init = async () => {
  const language = getLanguage();
  if (language === 'en') {
    // 默认，不需要做什么
  } else if (language === 'ja') {
    return await import('./locales/ja');
  } else if (language === 'zh-CN') {
    return await import('./locales/zh-cn');
  } else {
    return await import('./locales/zh-cn');
  }
};