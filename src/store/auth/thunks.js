import { checkingCredentials } from './authSlice.js'

export function checkingAuthentication() {
  return async (dispatch) => {
    dispatch(checkingCredentials())
  }
}

export function startGoogleSignIn() {
  return async (dispatch) => {
    dispatch(checkingCredentials())
  }
}
