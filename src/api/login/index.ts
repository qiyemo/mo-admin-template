import axios from 'axios';

export interface LoginData {
  username: string;
  password: string;
}

export const login = (data: LoginData): Promise<any> => axios.post('/login', data);
export const logout = (): Promise<any> => axios.delete('/logout');

export const getUserInfo = (): Promise<any> => axios.get('/user/config/current/user/info');

export const listMenu = (): Promise<any> => axios.get('/user/config/current/menu/list');
