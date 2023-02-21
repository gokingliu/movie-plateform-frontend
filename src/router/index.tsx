import React, { lazy, Suspense, FunctionComponent } from 'react';
import { useRoutes, BrowserRouter, RouteObject } from 'react-router-dom';

// 页面切换 Loading
const Loading = lazy(() => import('@/components/common/loading'));
// 路由页面容器
const RouteComponent = lazy(() => import('@/components/common/route-component'));
// 403 页面
// const NotAuthorized = lazy(() => import('@/views/403'));
// 404 页面
const NotFound = lazy(() => import('@/views/404'));
// 登陆页面
const Register = lazy(() => import('@/views/register'));
// 客户端布局页面
const Client = lazy(() => import('@/views/client'));
// 首页
const Home = lazy(() => import('@/views/home'));

// 路由列表
const routerList: RouteObject[] = [
  {
    path: '/',
    element: <Client />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: '/register',
    element: <Register />,
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
