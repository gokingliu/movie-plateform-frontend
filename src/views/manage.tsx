import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import TopBar from 'src/components/business/top-bar';

const { Content, Header, Sider } = Layout;

const Client: FC = () => (
  <Layout>
    <Header>
      <TopBar />
    </Header>

    <Layout>
      <Sider>Sider</Sider>

      <Content>
        <Outlet />
      </Content>
    </Layout>
  </Layout>
);

/** DisplayName */
Client.displayName = 'Client';

export default Client;
