import { combineReducers } from 'redux';
import user from './user.reducer';
import loginStatus from './login.reducer';
 
const userDetails = combineReducers({
  user,
  loginStatus
});
 
export default userDetails;
