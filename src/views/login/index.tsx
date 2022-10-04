import React, { memo, FunctionComponent } from 'react';
import { Result, Spin } from 'antd';

/**
 * @description 组件实现
 */
const Login: FunctionComponent = memo(() => (
  <>
    <span>1231321313</span>
    <Result icon={<Spin size="large" />} />
  </>
));

/**
 * @description 组件显示名
 */
Login.displayName = 'loading';

export default Login;
