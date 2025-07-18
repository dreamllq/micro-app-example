const SITE_ID = 'site-id';

export const setSiteId = (site) => {
  localStorage.setItem(SITE_ID, site);
};

export const getSiteId = () => localStorage.getItem(SITE_ID);

export const clearSiteId = () => {
  localStorage.removeItem(SITE_ID);
};
