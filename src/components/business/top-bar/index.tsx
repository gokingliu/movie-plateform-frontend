import React, { FC } from 'react';
import { YoutubeOutlined } from '@ant-design/icons';
import Search from './modules/search';
import UserName from './modules/username';
import './index.less';

const TopBar: FC = () => {
  /** DisplayName */
  TopBar.displayName = 'Header';

  /** ReactDOM */
  return (
    <div id="TopBar" className="top-bar">
      <YoutubeOutlined style={{ color: '#fff', fontSize: 40 }} />

      <Search />

      <UserName />
    </div>
  );
};

export default TopBar;
