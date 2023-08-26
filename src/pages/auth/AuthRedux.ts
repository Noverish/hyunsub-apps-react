import { combineReducers } from '@reduxjs/toolkit';

import login from './login/LoginState';
import register from './register/RegisterState';

export default combineReducers({
  [login.name]: login.reducer,
  [register.name]: register.reducer,
});
