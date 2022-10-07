import React, { FC } from 'react';
import { Avatar, Button, Popover } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useStoreDispatch, useStoreSelector, StoreState } from 'src/store';
import { actionLogout } from 'src/store/modules/user.store';
import { actionModal } from 'src/store/modules/modal.store';

const UserName: FC = () => {
  /** DisplayName */
  UserName.displayName = 'UserName';

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
  // 从 store 中获取 userName token
  const { userName, token } = useStoreSelector((state: StoreState) => state.user);
  // 调用 store 方法
  const dispatch = useStoreDispatch();
  // 路由跳转
  const navigate = useNavigate();

  /** Method */
  // 获取显示用户名
  const handleUserName = () => (token ? userName.substring(0, 1) : '登陆');
  // 获取头像背景颜色
  const avatarColor = (userName: string): string => {
    try {
      const index = parseInt(userName.charCodeAt(0).toString().split('').reverse().join().substring(0, 1), 10);
      return colorList[index || 0];
    } catch (e) {
      return colorList[0];
    }
  };
  // 登陆弹框
  const handleLogin = () => dispatch(actionModal({ modal: true }));

  /** ReactDOM */
  return (
    <Popover
      overlayClassName="top-bar__tooltip"
      placement="bottom"
      getPopupContainer={() => document.getElementById('TopBar') as HTMLElement}
      content={
        token ? (
          <Button className="button" type="link" onClick={() => dispatch(actionLogout())}>
            退 出
          </Button>
        ) : (
          <span className="buttons">
            <Button className="button" type="link" onClick={handleLogin}>
              登 陆
            </Button>

            <Button
              className="button"
              type="link"
              onClick={() => {
                navigate('/register');
              }}
            >
              注 册
            </Button>
          </span>
        )
      }
    >
      <Avatar
        className="top-bar__avatar"
        style={{ backgroundColor: avatarColor(userName) }}
        gap={6}
        size="large"
        onClick={handleLogin}
      >
        {handleUserName()}
      </Avatar>
    </Popover>
  );
};

export default UserName;
