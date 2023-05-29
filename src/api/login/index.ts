/*
 * @Author: qiye
 * @LastEditors: qiye
 * @description: page description
 * @Date: 2023-04-07 10:08:43
 * @LastEditTime: 2023-05-26 19:04:36
 */
import axios from 'axios';

export interface LoginData {
  username: string;
  password: string;
}

export const login = (data: LoginData): Promise<any> => axios.post('/system/login', data);
export const logout = (): Promise<any> => axios.delete('/system/logout');

export const getUserInfo = (): Promise<any> => axios.get('/system/current-user-info');

export const listMenu = (): Promise<any> => axios.get('/user/config/current/menu/list');
