import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from './modules/user.store';

const reducer = combineReducers({ user });

const store = configureStore({ reducer });

export default store;
