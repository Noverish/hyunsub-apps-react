import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch as _useDispatch, useSelector as _useSelector } from 'react-redux';
import logger from 'redux-logger';
import auth from 'src/pages/auth/AuthRedux';
import video from 'src/pages/video/VideoRedux';
import encode from 'src/pages/encode/EncodeRedux';
import drive from 'src/pages/drive/DriveRedux';
import toast from './toast';
import global from './global';

export const loadState = (): RootState | undefined => {
  try {
    const serializedState = localStorage.getItem("redux");
    if (!serializedState) return undefined;
    else return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: RootState) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem("redux", serializedState);
};

const reducer = combineReducers({ auth, video, encode, toast, global, drive });

export type RootState = ReturnType<typeof reducer>;

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    (process.env.NODE_ENV === `development`)
      ? getDefaultMiddleware().concat(logger)
      : getDefaultMiddleware(),
  preloadedState: undefined, // loadState(),
});

store.subscribe(() => {
  // saveState(store.getState());
});

export const useDispatch = () => _useDispatch<typeof store.dispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = _useSelector;
export const dispatch = store.dispatch;
