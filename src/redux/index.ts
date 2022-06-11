import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch as _useDispatch, useSelector as _useSelector } from 'react-redux';
import logger from 'redux-logger';
import auth from 'src/pages/auth/redux';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("redux");
    if (!serializedState) return undefined;
    else return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("redux", serializedState);
  } catch (err) {
    console.log(err);
  }
};

const reducer = combineReducers({ auth })

export type RootState = ReturnType<typeof reducer>;

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  preloadedState: undefined, // loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});

export const useDispatch = () => _useDispatch<typeof store.dispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = _useSelector;
