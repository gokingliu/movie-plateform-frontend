import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { baseEnv } from './config';
import { AxiosResponseData } from 'src/types';

class HTTP {
  axios; // Axios 实例

  constructor(commonOptions: AxiosRequestConfig) {
    this.axios = axios.create({ ...commonOptions });

    // 应用拦截器
    this.axios.interceptors.request.use(this.requestSuccessHandle, this.requestErrorHandle);
    this.axios.interceptors.response.use(this.responseSuccessHandle, this.responseErrorHandle);
  }

  /**
   * @description 拦截器
   */
  // 请求成功拦截器
  requestSuccessHandle = (config: AxiosRequestConfig) => config;

  // 请求失败拦截器
  requestErrorHandle = (e: AxiosError) => Promise.reject(e);

  // 回包成功拦截器
  responseSuccessHandle = (response: AxiosResponse<AxiosResponseData<never>>) => {
    let msg = '未知错误';
    if (!response || !response.data) msg = '接口错误';
    if (response.data.code === 0) return response;
    if (response.data.msg) msg = response.data.msg;

    console.error(msg);
    return Promise.reject(response.data);
  };

  // 回包失败拦截器
  responseErrorHandle = (e: AxiosError) => {
    let msg = '未知错误';
    if (axios.isCancel(e)) return Promise.reject(e);
    if (!e.response || !e.response.data) msg = '网络错误';

    console.error(msg);
    return Promise.reject(e);
  };

  /**
   * @description get post put delete 请求方法
   */
  get = (url: string, options: AxiosRequestConfig = {}) => this.axios.get(url, { ...options });

  post = (url: string, data = {}, options: AxiosRequestConfig = {}) => this.axios.post(url, data, { ...options });

  put = (url: string, data = {}, options: AxiosRequestConfig = {}) => this.axios.put(url, data, { ...options });

  delete = (url: string, options: AxiosRequestConfig = {}) => this.axios.delete(url, { ...options });
}

export default new HTTP({
  baseURL: baseEnv.defaultApi,
  headers: { 'x-requested-with': 'XMLHttpRequest' },
  timeout: 60000,
  withCredentials: true,
});
