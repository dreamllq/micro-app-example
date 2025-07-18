import start from 'foundation/start';
import hpProjectConfig from 'hp-config/project-config';
import mdfProjectConfig from 'mdf-config/project-config';
import wmsProjectConfig from 'wms-config/project-config';
import { PLATFORM } from '@/constants/platform';
import { env } from '@alsi/micro-framework-sdk';
const { WEB_BIZ } = env;
const configs = {
  [PLATFORM.COMPLETE_EDITION]: hpProjectConfig,
  [PLATFORM.SHORT_EDITION]: mdfProjectConfig
};

start({
  loadConfig(userInfo:{ tenant: { platform: PLATFORM; platformList?: PLATFORM[] } }) {
    let config; 
    if (WEB_BIZ === 'wms') {
      config = wmsProjectConfig;
    } else {
      if (Array.isArray(userInfo.tenant.platformList)) {
        const platform = Object.keys(configs).find((item) => userInfo.tenant.platformList!.includes(item as PLATFORM));
        config = platform ? configs[platform as PLATFORM] : configs[PLATFORM.COMPLETE_EDITION];
      } else {
        config = configs[userInfo.tenant.platform as PLATFORM];
      }
    }

    document.title = config.title;
    replaceFavicon(config.logo.favicon);
    return config;
  }
});

const replaceFavicon = (src) => {
  const link = document.createElement('link');
  link.rel = 'shortcut icon';
  link.href = src; // 替换为新的 favicon 图片路径
 
  // 获取 head 元素，并移除旧的 link 标签
  const head = document.querySelector('head');
  const oldLink = document.querySelector('link[rel="shortcut icon"]');
  if (oldLink) {
    head?.removeChild(oldLink);
  }
 
  // 添加新的 link 标签到 head 元素
  head?.appendChild(link);
};