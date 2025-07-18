import { Config } from './type';

let _config:Config;
export const setConfig = (config:Config) => {
  _config = config;
};

export const getConfig = () => _config;