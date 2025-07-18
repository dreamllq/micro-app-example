import { map } from 'lodash';

export default () => {
  const a = [
    1,
    2,
    4
  ];
  return map(a, item => item + 1); 
};