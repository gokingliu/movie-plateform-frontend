import React, { FunctionComponent } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import Router from 'src/router';
import ErrorBoundary from 'src/components/common/error-boundary';

const App: FunctionComponent = () => (
  <ErrorBoundary>
    <ConfigProvider locale={zhCN} componentSize="middle">
      <Router />
    </ConfigProvider>
  </ErrorBoundary>
);

export default App;
