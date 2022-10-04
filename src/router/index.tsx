import React, { lazy, Suspense, FunctionComponent } from 'react';
import { useRoutes, BrowserRouter, RouteObject } from 'react-router-dom';

// 页面切换 Loading
const Loading = lazy(() => import('src/components/common/loading'));
// 路由页面容器
const RouteComponent = lazy(() => import('src/components/common/route-component'));
// 403 页面
// const NotAuthorized = lazy(() => import('src/views/403'));
// 404 页面
const NotFound = lazy(() => import('src/views/404'));
// 登陆页面
const Login = lazy(() => import('src/views/login'));
// 首页
const Home = lazy(() => import('src/views/home'));

const RouterView = lazy(() => import('src/views/router-view'));

// 路由列表
const routerList: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/',
    element: <RouterView />,
    children: [{ path: 'login', element: <Login />, children: [] }],
  },
  // 匹配不到路径，跳转 404 页面
  { path: '*', element: <RouteComponent element={<NotFound />} title="404" /> },
];

// 避免兜底
const RenderRouter: FunctionComponent = () => {
  const element = useRoutes(routerList);
  return <Suspense fallback={<Loading message="页面加载中..." />}>{element}</Suspense>;
};

// 渲染路由
const Router: FunctionComponent = () => (
  <BrowserRouter>
    <RenderRouter />
  </BrowserRouter>
);

export default Router;
