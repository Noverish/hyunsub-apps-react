import { combineReducers } from "@reduxjs/toolkit";
import list from "./list/VideoListState";
import detail from "./detail/VideoDetailState";

export default combineReducers({
  [list.name]: list.reducer,
  [detail.name]: detail.reducer,
});
