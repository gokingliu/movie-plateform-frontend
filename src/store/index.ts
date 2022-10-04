import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from './modules/user.store';

const reducer = combineReducers({ user });

const store = configureStore({ reducer });

export type StateType = ReturnType<typeof reducer>;
export default store;
