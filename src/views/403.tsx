import React, { FC } from 'react';
import { Button, Result } from 'antd';

const NotAuthorized: FC = () => (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Button type="primary">Back Home</Button>}
  />
);

/** DisplayName */
NotAuthorized.displayName = 'NotAuthorized';

export default NotAuthorized;
