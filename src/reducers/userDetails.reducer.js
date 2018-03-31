const userDetails = (state, action) => {
  switch (action.type) {
    case 'GET_DETAILS':
      return action.user;
    default:
      return null;
  }
}

export default userDetails;
