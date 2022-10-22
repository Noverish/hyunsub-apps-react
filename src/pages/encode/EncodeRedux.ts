import { combineReducers } from "@reduxjs/toolkit";
import home from './home/EncodeHomeState';

export default combineReducers({
  [home.name]: home.reducer,
});
