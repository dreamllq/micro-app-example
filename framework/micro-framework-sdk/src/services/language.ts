const supportLanguages = [
  'zh-CN',
  'en',
  'ja'
];

const getBrowserLanguage = () => {
  const language = navigator.language;
  if (language.startsWith('zh')) {
    return 'zh-CN';
  } else if (language.startsWith('en')) {
    return 'en';
  } else if (language.startsWith('ja')) {
    return 'ja';
  } else {
    return 'zh-CN';
  }
};

const getStorageLanguage = () => {
  const language = localStorage.getItem('language');

  if (language && supportLanguages.includes(language)) {
    return language;
  }

  return null;
};

export const setLanguage = (language: string) => {
  if (supportLanguages.includes(language)) {
    localStorage.setItem('language', language);
  } else {
    localStorage.setItem('language', 'zh-CN');
  }
};

export const getLanguage = () => {
  const storageLanguage = getStorageLanguage();
  const browserLanguage = getBrowserLanguage();

  return storageLanguage || browserLanguage;
};