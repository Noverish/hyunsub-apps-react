import { combineReducers } from "@reduxjs/toolkit";
import my from "./my/MyPageState";

export default combineReducers({
  [my.name]: my.reducer,
});
