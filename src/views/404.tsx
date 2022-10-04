import React, { memo, FunctionComponent } from 'react';
import { Button, Result } from 'antd';

/**
 * @description 组件实现
 */
const NotFound: FunctionComponent = memo(() => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary">Back Home</Button>}
  />
));

/**
 * @description 组件显示名
 */
NotFound.displayName = 'NotFound';

export default NotFound;
