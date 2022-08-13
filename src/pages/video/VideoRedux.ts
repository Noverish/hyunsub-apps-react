import { combineReducers } from "@reduxjs/toolkit";
import list from "./list/VideoListState";
import detail from "./detail/VideoDetailState";
import upload from './upload/VideoUploadState';

export default combineReducers({
  [list.name]: list.reducer,
  [detail.name]: detail.reducer,
  [upload.name]: upload.reducer,
});
