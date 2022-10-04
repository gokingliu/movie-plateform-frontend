import React, { memo, FC } from 'react';
import { Result, Spin } from 'antd';
import { PropsLoading } from 'src/types';

/**
 * @description 组件实现
 */
const Loading: FC<PropsLoading> = memo((props: PropsLoading) => (
  <Result icon={<Spin size="large" />} title={props.message} />
));

/**
 * @description 组件显示名
 */
Loading.displayName = 'loading';

export default Loading;
