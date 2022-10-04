import { ReactNode } from 'react';

export interface PropsErrorBoundary {
  children?: ReactNode;
}

export interface StateErrorBoundary {
  hasError: boolean;
}
