import { ENV, EnvMap, HostNameEnvMap } from 'src/types';

/**
 * 域名对应环境
 */
const hostNameEnvMap: HostNameEnvMap = {
  'gokingliu.xyz': 'production',
  'gokingliu.test.xyz': 'test',
  'gokingliu.dev.xyz': 'development',
};

/**
 * 根据打包类型和域名，判断当前环境
 */
// import.meta.env.MODE
const env: ENV =
  process.env.NODE_ENV === 'production'
    ? hostNameEnvMap[location.host] || 'development'
    : (process.env.NODE_ENV as ENV);

/**
 * http 请求环境配置
 */
const envMap: EnvMap = {
  // 生产环境
  production: {
    defaultApi: 'https://gokingliu.xyz',
    otherApi: '',
  },
  // 测试环境
  test: {
    defaultApi: 'https://gokingliu.test.xyz',
    otherApi: '',
  },
  // 开发环境
  development: {
    defaultApi: 'https://gokingliu.dev.xyz',
    otherApi: '',
  },
};

export const baseEnv = env ? envMap[env] : envMap.development;
