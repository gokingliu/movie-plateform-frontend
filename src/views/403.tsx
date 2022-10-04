import React, { memo, FunctionComponent } from 'react';
import { Button, Result } from 'antd';

/**
 * @description 组件实现
 */
const NotAuthorized: FunctionComponent = memo(() => (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Button type="primary">Back Home</Button>}
  />
));

/**
 * @description 组件显示名
 */
NotAuthorized.displayName = 'NotFound';

export default NotAuthorized;
