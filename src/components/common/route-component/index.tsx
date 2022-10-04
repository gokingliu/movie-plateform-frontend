import { FC } from 'react';
import { RouteComponentProps } from 'src/types';

const RouteComponent: FC<RouteComponentProps> = ({ element, title }: RouteComponentProps) => {
  title && (document.title = title);

  return element;
};

/** DisplayName */
RouteComponent.displayName = 'RouteComponent';

export default RouteComponent;
