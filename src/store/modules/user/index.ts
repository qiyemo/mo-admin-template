/*
 * @Author: qiye
 * @LastEditors: qiye
 * @description: page description
 * @Date: 2023-04-07 10:08:43
 * @LastEditTime: 2023-05-26 17:23:41
 */
import { defineStore } from 'pinia';
import { LoginData, login as doLogin, logout as doLogout, getUserInfo } from '@/api/login';
import { setToken, clearToken, clearStorage } from '@/utils/auth';
import { UserState } from './types';
import { useAppStore } from '@/store';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    realName: undefined,
    avatar: undefined,
    avatarURL: undefined,
    email: undefined,
    phone: undefined,
    accountId: undefined,
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
      sessionStorage.setItem('currentInfo', JSON.stringify(partial));
    },

    // Reset user's information
    reset() {
      this.$reset();
    },

    // Get user's information
    async info() {
      const res = await getUserInfo();
      this.setInfo(res.data);
      // //添加水印
      // watermark.set(this.realName +"(" + this.phone + ")");
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        const param = {
          ...loginForm,
        };
        const res = await doLogin(param);
        // 设置token
        setToken(res.data.token);
        // 获取用户基本信息
        await this.info();
        // 获取用户权限信息 【菜单】
        const appStore = useAppStore();
        await appStore.fetchServerMenuConfig();
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    logoutCallBack() {
      this.reset();
      clearStorage();
    },
    // Logout
    async logout() {
      try {
        await doLogout();
      } finally {
        this.logoutCallBack();
      }
    },
  },
});

export default useUserStore;
