import { signInWithGoogle } from '../../firebase'

import { checkingCredentials, login, logout } from './authSlice.js'

export function checkingAuthentication() {
  return async (dispatch) => {
    dispatch(checkingCredentials())
  }
}

export function startGoogleSignIn() {
  return async (dispatch) => {
    dispatch(checkingCredentials())
    const result = await signInWithGoogle()

    if (!result.ok) return dispatch(logout(result.errorMessage))
    dispatch(login(result))
  }
}
