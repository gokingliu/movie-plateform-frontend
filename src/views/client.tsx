import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import TopBar from 'src/components/business/top-bar';

const { Content, Header } = Layout;

const Client: FC = () => (
  <Layout>
    <Header>
      <TopBar />
    </Header>

    <Content>
      <Outlet />
    </Content>
  </Layout>
);

/** DisplayName */
Client.displayName = 'Client';

export default Client;
