import React, { FunctionComponent } from 'react';
import { Result, Spin } from 'antd';

const Register: FunctionComponent = () => (
  <>
    <h1>注册页面</h1>
    <Result icon={<Spin size="large" />} />
  </>
);

/** DisplayName */
Register.displayName = 'loading';

export default Register;
