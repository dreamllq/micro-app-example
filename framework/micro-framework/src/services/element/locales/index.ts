import { getLanguage } from '@alsi/micro-framework-sdk';

export const loadLocal = async () => {
  const language = getLanguage();

  if (language === 'en') {
    return await import('./en');
  } else if (language === 'ja') {
    return await import('./ja');
  } else if (language === 'zh-CN') {
    return await import('./zh-cn');
  } else {
    return await import('./zh-cn');
  }
};