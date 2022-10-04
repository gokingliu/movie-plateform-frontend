import { AxiosResponse } from 'axios';

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

export interface AxiosCommon {
  [key: string]: string | number | boolean;
}

export interface AxiosResponseConfig<T> extends AxiosResponse {
  code?: number;
  msg?: string;
  result?: T;
}

export interface AxiosSourceCancelConfig {
  token: undefined;
  cancel: null;
}
