const userDetails = (state = {}, action) => {
  switch (action.type) {
    case 'GET_DETAILS':
      return action.user;
    case 'REMOVE_DETAILS':
      return {};
    default:
      return state;
  }
}

export default userDetails;
