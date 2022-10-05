import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Result, Spin } from 'antd';
import { actionUserState } from 'src/store/modules/user.store';

const Home: FC = () => {
  /** DisplayName */
  Home.displayName = 'Home';

  const dispatch = useDispatch();

  const setName = () => dispatch(actionUserState({ username: 'crotaliu', role: 1, token: '1111' }));

  return (
    <>
      <Button onClick={setName}>设置用户名</Button>
      <Result icon={<Spin size="large" />} />
    </>
  );
};

export default Home;
