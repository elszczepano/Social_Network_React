import { combineReducers } from 'redux';
import loginStatus from './login.reducer';
import userDetails from './userDetails.reducer';
import currentGroup from './currentGroup.reducer';
 
const reducers = combineReducers({
  loginStatus,
  userDetails,
  currentGroup
});
 
export default reducers;
