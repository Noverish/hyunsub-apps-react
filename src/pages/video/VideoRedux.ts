import { combineReducers } from "@reduxjs/toolkit";
import list from "./list/VideoListState";

export default combineReducers({
  [list.name]: list.reducer,
});
