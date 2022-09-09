import { combineReducers } from "@reduxjs/toolkit";
import my from "./my/MyPageState";
import login from "./login/LoginState";
import register from "./register/RegisterState";

export default combineReducers({
  [my.name]: my.reducer,
  [login.name]: login.reducer,
  [register.name]: register.reducer,
});
