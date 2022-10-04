import { RouteProps } from 'react-router';
import { ReactElement } from 'react';

export interface RouteComponentProps extends RouteProps {
  element: ReactElement;
  title?: string;
}
