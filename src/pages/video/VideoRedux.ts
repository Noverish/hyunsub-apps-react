import { combineReducers } from "@reduxjs/toolkit";
import detail from "./detail/VideoDetailState";
import admin from './admin/VideoAdminState';

export default combineReducers({
  [detail.name]: detail.reducer,
  [admin.name]: admin.reducer,
});
