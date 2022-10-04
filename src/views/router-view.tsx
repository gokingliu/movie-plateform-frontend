import React, { memo, FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';

const RouterView: FunctionComponent = memo(() => (
  <div>
    <h1>Dashboard</h1>
    <Outlet />
  </div>
));

RouterView.displayName = 'RouterView';

export default RouterView;
