import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import api from 'src/api';
import { StoreLoginAction, StoreUserState } from 'src/types';

const UserSlice = createSlice({
  // 命名空间
  name: 'user',
  // state 数据初始值
  initialState: {
    username: '',
    role: 0,
    token: '',
  },
  // actions，在组件中可以直接通过 dispatch 进行触发
  reducers: {
    // 设置用户信息
    actionUserState(state, action: PayloadAction<StoreUserState>) {
      localStorage.clear();
      const { username, token } = action.payload;
      [state.username, state.token] = [username, token];
      if (token) {
        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
      }
    },
  },
});

// 解密 token
const decodeToken = (token: string): Map<string, string> | void => {
  const mapToken = new Map();
  try {
    const deToken = window.atob(token);
    if (['userName', 'role', 'loginTime', 'uuid', ';', '='].every((item) => deToken.includes(item))) {
      const deTokenMapArr = deToken.split(';');
      if (deTokenMapArr.every((item) => item.split('=').length === 2)) {
        deTokenMapArr.forEach((item) => {
          const map = item.split('=');
          mapToken.set(map[0], map[1]);
        });
        return mapToken;
      }
    }
  } catch (e) {
    console.error(e);
  }
};

// 设置用户信息 state
const commitActionUserState = (dispatch: Dispatch, token: string): boolean | void => {
  try {
    const mapToken = decodeToken(token);
    if (mapToken) {
      const username = mapToken.get('username');
      const roleStr = mapToken.get('role');
      const loginTime = mapToken.get('loginTime');
      if (username && roleStr && loginTime) {
        if (Date.now() - parseInt(loginTime, 10) < 7 * 24 * 60 * 60) {
          const role = parseInt(roleStr, 10);
          dispatch(actionUserState({ username, role, token }));
          return true;
        }
      }
    }
  } catch (e) {
    console.error(e);
  }
};

// 检查 token 可用性
const actionValidToken =
  () =>
  (dispatch: Dispatch): boolean | void => {
    try {
      const token = localStorage.getItem('token');
      if (token) return commitActionUserState(dispatch, token);
    } catch (e) {
      console.error(e);
    }
  };

// 用户登录 (异步请求)
const actionLogin =
  (payload: StoreLoginAction) =>
  async (dispatch: Dispatch): Promise<boolean | void> => {
    try {
      const {
        data: { code, result },
      } = await api.Login(payload);
      if (code === 0 && result?.token) return commitActionUserState(dispatch, result.token);
    } catch (e) {
      console.error(e);
    }
  };

// 用户退出
const actionLogout =
  () =>
  (dispatch: Dispatch): void => {
    dispatch(actionUserState({ username: '', role: 0, token: '' }));
  };

export { actionValidToken, actionLogin, actionLogout };

export const { actionUserState } = UserSlice.actions;

export default UserSlice.reducer;
