import { defineStore } from 'pinia';
import { UserState } from './types';
import { LoginData, login as doLogin, logout as doLogout, getUserInfo } from '@/api/login';
import { setToken, clearToken, clearStorage } from '@/utils/auth';

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
        // 在登录页面，获取用户权限信息 【菜单】
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
