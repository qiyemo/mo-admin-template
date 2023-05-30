/*
 * @Author: qiye
 * @LastEditors: qiye
 * @description: page description
 * @Date: 2023-01-04 16:36:49
 * @LastEditTime: 2023-05-30 09:52:16
 */
import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from '@/utils/auth';
import router from '@/router';
import { IsUtils, ObjectUtils } from 'motl';

const { isObject } = IsUtils;
const { emptyStrToNull } = ObjectUtils;

export interface HttpResponse<Response> {
  status: number;
  msg: string;
  code: string;
  data: Response;
}

const LOGIN_URL = '/system/login';
const BASE_URL_WHITE_LIST: string[] = [];
const TOKEN_FAILD: string[] = ['401'];

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}

const toLogin = () => {
  router.push('/login');
};

axios.interceptors.request.use(
  (config: any) => {
    // 除了 登录 所有请求必须携带 token
    const token = getToken();
    if (token && config.url != LOGIN_URL) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Token = `${token}`;
    }

    // 对象的空字符串属性值设置为 null
    const data = config.data;
    if (data && isObject(data)) {
      const param = emptyStrToNull(data);
      config.data = param;
    }
    return config;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);

// 添加拦截器
axios.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    // 白名单，直接返回，业务自己处理
    if (BASE_URL_WHITE_LIST.includes(<string>response.config.baseURL)) {
      return response.data;
    }

    // 导出 下载
    if (IsUtils.isBlob(response.data)) {
      if (response.status === 200) {
        return response;
      } else {
        $Message.error('下载失败');
        return;
      }
    }

    const res = response.data;
    // 如果不是返回 200 则提示错误信息
    if (res.code !== '200') {
      if (TOKEN_FAILD.includes(res.code)) {
        $Message.info('token失效 重新登录');
        toLogin();
        return;
      }
      $Message.error(res.msg);
      return Promise.reject(new Error(res.msg || 'Error'));
    }
    return res;
  },
  (error) => {
    $Message(error.msg || '服务异常');
    return Promise.reject(error);
  }
);
