import { combineReducers } from "@reduxjs/toolkit";
import my from "./my/MyPageState";
import login from "./login/LoginState";

export default combineReducers({
  [my.name]: my.reducer,
  [login.name]: login.reducer,
});
