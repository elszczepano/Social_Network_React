export const LOGIN_STATUS = 'LOGIN_STATUS';

export function setLogged(status) {
  return {
    type: LOGIN_STATUS,
    status
  }
}
