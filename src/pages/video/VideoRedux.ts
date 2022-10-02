import { combineReducers } from "@reduxjs/toolkit";
import list from "./list/VideoListState";
import detail from "./detail/VideoDetailState";
import admin from './admin/VideoAdminState';
import search from './search/VideoSearchState';

export default combineReducers({
  [list.name]: list.reducer,
  [detail.name]: detail.reducer,
  [admin.name]: admin.reducer,
  [search.name]: search.reducer,
});
