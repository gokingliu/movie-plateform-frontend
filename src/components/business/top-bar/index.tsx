import React, { useState, FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AutoComplete, Avatar, Button, Popover } from 'antd';
import { YoutubeOutlined } from '@ant-design/icons';
import { StateType } from 'src/store';
import './index.less';

const TopBar: FC = () => {
  /** DisplayName */
  TopBar.displayName = 'Header';

  /** Data */
  // 颜色值数组
  const colorList = [
    '#f56a00',
    '#7265e6',
    '#ffbf00',
    '#00a2ae',
    '#1bb1d8',
    '#4e8414',
    '#3e9d88',
    '#44375f',
    '#d70e1e',
    '#925bc7',
  ];
  // 搜索结果
  const [result, setResult] = useState<string[]>([]);
  // 从 store 中获取 username token
  const { username, token } = useSelector((state: StateType) => state.user);
  // 调用 store 方法
  // const dispatch = useDispatch();
  // 路由跳转
  const navigate = useNavigate();
  const { Option } = AutoComplete;

  /** Method */
  // 搜索逻辑
  const handleSearch = (value: string) => {
    let res: string[];
    if (!value || value.indexOf('@') >= 0) {
      res = [];
    } else {
      res = ['gmail.com', '163.com', 'qq.com'].map((domain) => `${value}@${domain}`);
    }
    setResult(res);
  };
  // 获取显示用户名
  const handleUserName = () => (token ? username.substring(0, 1) : '登陆');
  // 获取头像背景颜色
  const avatarColor = (username: string): string => {
    try {
      const index = parseInt(username.charCodeAt(0).toString().split('').reverse().join().substring(0, 1), 10);
      return colorList[index || 0];
    } catch (e) {
      return colorList[1];
    }
  };
  // 登陆弹框
  const handleLogin = () => {
    // ...
  };
  // 跳转注册
  const linkToRegister = () => {
    // ...
    navigate('/register');
  };

  /** ReactDOM */
  return (
    <div id="topBar" className="top-bar">
      <YoutubeOutlined style={{ color: '#fff', fontSize: 30 }} />

      <AutoComplete style={{ width: 200 }} onSearch={handleSearch} placeholder="input here">
        {result.map((email: string) => (
          <Option key={email} value={email}>
            {email}
          </Option>
        ))}
      </AutoComplete>

      <Popover
        overlayClassName="top-bar__tooltip"
        placement="bottom"
        getPopupContainer={() => document.getElementById('topBar') as HTMLElement}
        content={
          token ? (
            <Button className="button" type="link">
              退 出
            </Button>
          ) : (
            <span className="buttons">
              <Button className="button" type="link" onClick={handleLogin}>
                登 陆
              </Button>
              <Button className="button" type="link" onClick={linkToRegister}>
                注 册
              </Button>
            </span>
          )
        }
      >
        <Avatar className="top-bar__avatar" style={{ backgroundColor: avatarColor(username) }} onClick={handleLogin}>
          {handleUserName()}
        </Avatar>
      </Popover>
    </div>
  );
};

export default TopBar;
