import { LOGIN_STATUS } from '../actions';

const loginStatus = (state = [], action) => {
  switch (action.type) {
    case LOGIN_STATUS:
    return {
      ...state,
      ...action.data
    };
    default:
    return state;
  }
}

export default loginStatus;
