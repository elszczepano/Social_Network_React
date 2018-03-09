import { combineReducers } from 'redux';
import user from './user';
import loginStatus from './loginStatus';
 
const userDetails = combineReducers({
  user,
  loginStatus
})
 
export default userDetails
