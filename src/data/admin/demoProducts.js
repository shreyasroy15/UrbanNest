import { products as initialProducts } from '../products';

const STORAGE_KEY = 'urbannest_admin_products';

export const getAdminProducts = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
    return initialProducts;
  }
  return JSON.parse(data);
};

export const saveAdminProducts = (productsList) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(productsList));
};

export const resetAdminProducts = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
  return initialProducts;
};
