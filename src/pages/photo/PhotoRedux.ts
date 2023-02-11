import { combineReducers } from "@reduxjs/toolkit";
import albumList from "./album-list/AlbumListState";
import albumDetail from './album-detail/AlbumDetailState';
import albumUpload from './album-upload/AlbumUploadState';

export default combineReducers({
  [albumList.name]: albumList.reducer,
  [albumDetail.name]: albumDetail.reducer,
  [albumUpload.name]: albumUpload.reducer,
});
