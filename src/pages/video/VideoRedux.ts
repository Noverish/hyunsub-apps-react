import { combineReducers } from "@reduxjs/toolkit";
import list from "./list/VideoListState";
import detail from "./detail/VideoDetailState";
import upload from './upload/VideoUploadState';
import search from './search/VideoSearchState';

export default combineReducers({
  [list.name]: list.reducer,
  [detail.name]: detail.reducer,
  [upload.name]: upload.reducer,
  [search.name]: search.reducer,
});
