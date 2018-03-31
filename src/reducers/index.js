import { combineReducers } from 'redux';
import loginStatus from './login.reducer';
import userDetails from './userDetails.reducer';
 
const reducers = combineReducers({
  loginStatus,
  userDetails
});
 
export default reducers;
