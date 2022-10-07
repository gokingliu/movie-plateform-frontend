import React, { FC } from 'react';
import { Button, Result, Spin } from 'antd';
import { useStoreDispatch } from 'src/store';
import { actionModal } from 'src/store/modules/modal.store';
import { actionUserState } from 'src/store/modules/user.store';

const Home: FC = () => {
  /** DisplayName */
  Home.displayName = 'Home';

  // 调用 store 方法
  const dispatch = useStoreDispatch();

  const setName = () => dispatch(actionUserState({ userName: 'crotaliu', role: 1, token: '1111', remember: true }));

  const setModal = () => dispatch(actionModal({ modal: true }));

  return (
    <>
      <Button onClick={setName}>设置用户名</Button>
      <Button onClick={setModal}>打开登录弹窗</Button>
      <Result icon={<Spin size="large" />} />
    </>
  );
};

export default Home;
