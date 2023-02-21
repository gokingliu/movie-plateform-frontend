import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { StoreModalState } from '@/types';

const ModalSlice = createSlice({
  // 命名空间
  name: 'modal',
  // state 数据初始值
  initialState: {
    modal: false,
  },
  // actions，在组件中可以直接通过 dispatch 进行触发
  reducers: {
    // 设置登陆弹框显隐状态
    actionModalState(state, action: PayloadAction<StoreModalState>) {
      const { modal } = action.payload;
      state.modal = modal;
    },
  },
});

// 登陆弹框方法
const actionModal =
  (payload: StoreModalState) =>
  (dispatch: Dispatch): void => {
    dispatch(actionModalState(payload));
  };

export { actionModal };

export const { actionModalState } = ModalSlice.actions;

export default ModalSlice.reducer;
