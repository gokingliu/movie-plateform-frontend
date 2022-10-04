import { memo, FC } from 'react';
import { RouteComponentProps } from 'src/types';

/**
 * @description 组件实现
 */
const RouteComponent: FC<RouteComponentProps> = memo(({ element, title }: RouteComponentProps) => {
  title && (document.title = title);

  return element;
});

/**
 * @description 组件显示名
 */
RouteComponent.displayName = 'RouteComponent';

export default RouteComponent;
