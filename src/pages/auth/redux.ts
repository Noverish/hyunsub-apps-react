import { combineReducers } from "@reduxjs/toolkit";
import login from './login/LoginState';
import my from "./my/MyPageState";
import register from './register/RegisterState';

export default combineReducers({
  [login.name]: login.reducer,
  [register.name]: register.reducer,
  [my.name]: my.reducer,
});
