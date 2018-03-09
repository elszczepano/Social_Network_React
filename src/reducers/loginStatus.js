import { LOGIN_STATUS } from '../actions';

const loginStatus = (state = false, action) => {
  switch (action.type) {
    case 'SWITCH_LOGIN_STATUS':
    return !state
  }
  return state;
}

export default loginStatus;
