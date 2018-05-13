export const setId = groupId => {
  return {
    type: 'SET_ID',
    groupId
  }
}
export const removeId = () => {
  return {
    type: 'REMOVE_ID'
  }
}
