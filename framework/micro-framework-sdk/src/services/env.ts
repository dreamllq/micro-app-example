
type LocaleEnv = Record<string, any>;
let _env:LocaleEnv;

export const setEnv = (e:LocaleEnv) => {
  _env = e;
};

export default new Proxy<LocaleEnv>({} as LocaleEnv, {
  get(_, p:string) {
    return _env[p];
  }
});
