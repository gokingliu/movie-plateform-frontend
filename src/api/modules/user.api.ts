import { AxiosResponse } from 'axios';
import { AxiosResponseData, RequestCheckUserName, RequestLogin, ResponseLogin, RequestRegister } from 'src/types';
import http from 'src/http';

const User = {
  /**
   * @description 用户名查重
   */
  CheckUserName(data: RequestCheckUserName): Promise<AxiosResponse<AxiosResponseData<boolean>>> {
    return http.post('/CheckUserName', data);
  },

  /**
   * @description 用户注册
   */
  Register(data: RequestRegister): Promise<AxiosResponse<AxiosResponseData<boolean>>> {
    return http.post('/Register', data);
  },

  /**
   * @description 用户登陆
   */
  Login(data: RequestLogin): Promise<AxiosResponse<AxiosResponseData<ResponseLogin>>> {
    return http.post('/Login', data);
  },
};

export default User;
