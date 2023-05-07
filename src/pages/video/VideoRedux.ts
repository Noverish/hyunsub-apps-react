import { combineReducers } from '@reduxjs/toolkit';

import admin from './admin/VideoAdminState';

export default combineReducers({
  [admin.name]: admin.reducer,
});
