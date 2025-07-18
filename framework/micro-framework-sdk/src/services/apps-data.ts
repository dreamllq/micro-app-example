type LocaleAppsData = Record<string, any>;

let _appsData:LocaleAppsData;

export default new Proxy<LocaleAppsData>({} as LocaleAppsData, {
  get(_, p: string) {
    return _appsData[p];
  }
});

export const setAppsData = (data:LocaleAppsData) => {
  _appsData = data;
};