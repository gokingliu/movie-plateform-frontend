import { AxiosResponseConfig, RequestCheckUserName, RequestLogin, ResponseLogin, RequestRegister } from 'src/types';
import http from 'src/http';

const User = {
  /**
   * @description 用户名查重
   */
  CheckUserName(data: RequestCheckUserName): Promise<AxiosResponseConfig<boolean>> {
    return http.post('/CheckUserName', data);
  },

  /**
   * @description 用户注册
   */
  Register(data: RequestRegister): Promise<AxiosResponseConfig<boolean>> {
    return http.post('/Register', data);
  },

  /**
   * @description 用户登陆
   */
  Login(data: RequestLogin): Promise<AxiosResponseConfig<ResponseLogin>> {
    return http.post('/Login', data);
  },
};

export default User;
