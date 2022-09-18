import { combineReducers } from "@reduxjs/toolkit";
import albumList from "./album-list/AlbumListState";
import albumDetail from './album-detail/AlbumDetailState';
import albumViewer from './album-viewer/AlbumViewerState';
import albumUpload from './album-upload/AlbumUploadState';

export default combineReducers({
  [albumList.name]: albumList.reducer,
  [albumDetail.name]: albumDetail.reducer,
  [albumViewer.name]: albumViewer.reducer,
  [albumUpload.name]: albumUpload.reducer,
});
