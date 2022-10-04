import React, { Component, ReactNode } from 'react';
import { Button, Result } from 'antd';
import { PropsErrorBoundary, StateErrorBoundary } from 'src/types';

/**
 * @description 组件实现
 */
class ErrorBoundary extends Component<PropsErrorBoundary, StateErrorBoundary> {
  state: StateErrorBoundary = {
    hasError: false,
  };

  errorResult = (
    <Result
      status="error"
      title="Submission Failed"
      subTitle="Please check and modify the following information before resubmitting."
      extra={<Button type="primary">Refresh</Button>}
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
