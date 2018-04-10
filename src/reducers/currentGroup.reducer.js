const currentGroup = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ID':
      return action.groupId;
    case 'REMOVE_ID':
      return {};
    default:
      return state;
  }
}

export default currentGroup;
