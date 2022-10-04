import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import api from 'src/api';
import { StoreUserState } from 'src/types';

const userSlice = createSlice({
  // 命名空间
  name: 'user',
  // state 数据初始值
  initialState: {
    username: '',
    token: localStorage.getItem('token') || '',
  },
  // actions，在组件中可以直接通过 dispatch 进行触发
  reducers: {
    // 设置用户信息
    setUserState(state, action: PayloadAction<StoreUserState>) {
      const { username, token } = action.payload;
      state.username = username;
      state.token = token;
    },
  },
});

// 用户登录 (异步请求)
export const loginAction =
  (payload: { username: string; password: string }) =>
  async (dispatch: Dispatch): Promise<boolean> => {
    let flag = false;
    const { code, result } = await api.Login(payload);
    if (code === 0) {
      const token = window.atob(result?.token as string);
      if (['userName', 'loginTime', 'uuid', ';', '='].every((item) => token.includes(item))) {
        const tokenItem = token.split(';');
        if (tokenItem.every((item) => item.split('=').length === 2)) {
          flag = true;
          const username = tokenItem.find((item) => item.includes('userName'))?.split('=')[1] as string;
          localStorage.clear();
          dispatch(
            setUserState({
              username,
              token: result?.token as string,
            }),
          );
        }
      }
    }
    return flag;
  };

export const { setUserState } = userSlice.actions;

export default userSlice.reducer;
