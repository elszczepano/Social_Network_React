const loginStatus = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return true;
    case 'SIGN_OUT':
      return false;
    default:
      if(!localStorage.getItem("token")) return false;
      return true;
  }
}

export default loginStatus;
