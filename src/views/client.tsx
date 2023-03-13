import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import TopBar from '@/components/business/top-bar';

const Client: FC = () => (
  <Layout>
    <Layout.Header>
      <TopBar />
    </Layout.Header>

    <Layout.Content>
      <Outlet />
    </Layout.Content>
  </Layout>
);

/** DisplayName */
Client.displayName = 'Client';

export default Client;
