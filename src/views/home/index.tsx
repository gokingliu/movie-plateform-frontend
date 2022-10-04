import React, { memo, FunctionComponent } from 'react';
import { Result, Spin } from 'antd';

/**
 * @description 组件实现
 */
const Home: FunctionComponent = memo(() => <Result icon={<Spin size="large" />} />);

/**
 * @description 组件显示名
 */
Home.displayName = 'loading';

export default Home;
