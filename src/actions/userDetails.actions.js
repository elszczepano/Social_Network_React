export const getDetails = user => {
  return {
    type: 'GET_DETAILS',
    user
  }
}
export const removeDetails = () => {
  return {
    type: 'REMOVE_DETAILS'
  }
}
