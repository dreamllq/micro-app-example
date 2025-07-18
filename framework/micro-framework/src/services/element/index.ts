import { loadLocal } from './locales';

export const getElementConfig = async () => {
  const { elementLocal } = await loadLocal();
  return { locale: elementLocal };
};