import { combineReducers } from "@reduxjs/toolkit";
import albumList from "./album-list/AlbumListState";

export default combineReducers({
  [albumList.name]: albumList.reducer,
});
