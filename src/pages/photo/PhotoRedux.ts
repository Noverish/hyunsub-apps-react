import { combineReducers } from "@reduxjs/toolkit";
import albumList from "./album-list/AlbumListState";
import albumDetail from './album-detail/AlbumDetailState';

export default combineReducers({
  [albumList.name]: albumList.reducer,
  [albumDetail.name]: albumDetail.reducer,
});
