import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Result, Spin } from 'antd';
import { setUserState } from 'src/store/modules/user.store';

const Home: FC = () => {
  /** DisplayName */
  Home.displayName = 'Home';

  const dispatch = useDispatch();

  const setName = () => dispatch(setUserState({ username: 'crotaliu', token: '1111' }));

  return (
    <>
      <Button onClick={setName}>设置用户名</Button>
      <Result icon={<Spin size="large" />} />
    </>
  );
};

export default Home;
