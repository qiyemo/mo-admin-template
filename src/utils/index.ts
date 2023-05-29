import md5Fn from 'md5';

export const routeBase = () => {
  return `${import.meta.env.VITE_ROUTE_BASE}`;
};

export const md5 = (str: string) => {
  return md5Fn(str);
};
