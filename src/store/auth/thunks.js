import { signInWithGoogle, registerUserWithEmailPassword } from '../../firebase'

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

export function startCreatingUserWithEmailPassword({
  email,
  password,
  displayName
}) {
  return async (dispatch) => {
    dispatch(checkingCredentials())
    const resp = await registerUserWithEmailPassword({
      email,
      password,
      displayName
    })

    console.log(resp)
  }
}
