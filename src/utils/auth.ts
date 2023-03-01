const TOKEN_KEY = 'hs-token';

const isLogin = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};

const getToken = (key = TOKEN_KEY) => {
  return localStorage.getItem(key);
};

const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const clearStorage = () => {
  localStorage.clear();
  sessionStorage.clear();
};

export { isLogin, getToken, setToken, clearToken, clearStorage };
