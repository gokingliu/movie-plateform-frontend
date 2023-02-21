import { AxiosResponse } from 'axios';
import { AxiosResponseData, RequestCheckUserName, RequestLogin, ResponseLogin, RequestRegister } from '@/types';
import http from '@/http';

const User = {
  /**
   * @description 用户名查重
   */
  CheckUserName(data: RequestCheckUserName): Promise<AxiosResponse<AxiosResponseData<boolean>>> {
    return http.post('/trpc.MovieService.operation.User/CheckUserName', data);
  },

  /**
   * @description 用户注册
   */
  Register(data: RequestRegister): Promise<AxiosResponse<AxiosResponseData<boolean>>> {
    return http.post('/trpc.MovieService.operation.User/Register', data);
  },

  /**
   * @description 用户登陆
   */
  Login(data: RequestLogin): Promise<AxiosResponse<AxiosResponseData<ResponseLogin>>> {
    return http.post('/trpc.MovieService.operation.User/Login', data);
  },
};

export default User;
