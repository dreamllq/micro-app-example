import { setConfig } from './config';
import { Config } from './type';

export default (config:Config) => {
  setConfig(config);
};