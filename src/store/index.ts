import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from './modules/user.store';

const reducer = combineReducers({ user });

const store = configureStore({ reducer });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type StoreState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
type StoreDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useStoreSelector: TypedUseSelectorHook<StoreState> = useSelector;
export const useStoreDispatch: () => StoreDispatch = useDispatch;

export default store;
