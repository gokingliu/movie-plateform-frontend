import React, { FC } from 'react';
import { Button, Result } from 'antd';

const NotFound: FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary">Back Home</Button>}
  />
);

/** DisplayName */
NotFound.displayName = 'NotFound';

export default NotFound;
