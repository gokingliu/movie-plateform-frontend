export type ENV = 'production' | 'test' | 'development';

export interface HostNameEnvMap {
  [key: string]: ENV;
}

export interface EnvMap {
  [key: string]: {
    defaultApi: string;
    otherApi: string;
  };
}

export interface AxiosResponseData<T> {
  code: number;
  msg: string;
  result: T;
}
