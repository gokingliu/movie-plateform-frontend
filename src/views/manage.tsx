import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import TopBar from '@/components/business/top-bar';

const Client: FC = () => (
  <Layout>
    <Layout.Header>
      <TopBar />
    </Layout.Header>

    <Layout>
      <Layout.Sider>Sider</Layout.Sider>

      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout>
  </Layout>
);

/** DisplayName */
Client.displayName = 'Client';

export default Client;
