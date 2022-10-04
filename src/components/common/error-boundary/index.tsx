import React, { Component, ReactNode } from 'react';
import { Button, Result } from 'antd';
import { PropsErrorBoundary, StateErrorBoundary } from 'src/types';

/** Class Component */
class ErrorBoundary extends Component<PropsErrorBoundary, StateErrorBoundary> {
  state: StateErrorBoundary = {
    hasError: false,
  };

  errorResult = (
    <Result
      status="error"
      title="逻辑错误"
      subTitle="请刷新页面再次尝试"
      extra={<Button type="primary">刷新</Button>}
    />
  );

  static getDerivedStateFromError(): StateErrorBoundary {
    return { hasError: true };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.errorResult;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
