const loginStatus = (state = false, action) => {
  switch (action.type) {
    case 'SWITCH_LOGIN_STATUS':
      return !state;
    default:
      return state;
  }
}

export default loginStatus;
