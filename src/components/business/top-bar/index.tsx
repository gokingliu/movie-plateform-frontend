import React, { FC } from 'react';
import { GithubOutlined } from '@ant-design/icons';
import Search from './modules/search';
import UserName from './modules/username';
import Login from 'src/components/business/login';
import './index.less';

const TopBar: FC = () => {
  /** DisplayName */
  TopBar.displayName = 'Header';

  /** ReactDOM */
  return (
    <>
      <div id="TopBar" className="top-bar">
        <GithubOutlined style={{ color: '#fff', fontSize: 36 }} />

        <Search />

        <UserName />
      </div>

      <Login />
    </>
  );
};

export default TopBar;
