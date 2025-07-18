
const _global:Record<string, any> = {};

export default new Proxy<Record<string, any>>({} as Record<string, any>, {
  get(_, p: string) {
    return _global[p];
  },
  set(_, p:string, newValue) {
    _global[p] = newValue;
    return true;
  }
});