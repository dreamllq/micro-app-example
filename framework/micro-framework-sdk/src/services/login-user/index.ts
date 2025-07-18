import { getConfig } from '../../config';

let _info: any;

export const initLoginUserInfo = async () => {
  _info = await getConfig().getLoginUser();
};

export const getLoginUserInfo = () => _info;