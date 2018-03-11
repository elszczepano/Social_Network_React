export const signIn = status => {
  return {
    type: 'SIGN_IN',
    status
  }
}

export const signOut = status => {
  return {
    type: 'SIGN_OUT',
    status
  }
}
