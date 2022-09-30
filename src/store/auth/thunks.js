import {
  signInWithGoogle,
  registerUserWithEmailPassword,
  loginWithEmailPassword,
  logoutFirebase
} from '../../firebase'

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

    if (!result.ok) return dispatch(logout(result))
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
    const { ok, uid, photoURL, errorMessage } =
      await registerUserWithEmailPassword({
        email,
        password,
        displayName
      })

    if (!ok) return dispatch(logout({ errorMessage }))
    dispatch(login({ uid, displayName, email, photoURL }))
  }
}

export function startLoginWithEmailPassword({ email, password }) {
  return async (dispatch) => {
    dispatch(checkingCredentials())
    const result = await loginWithEmailPassword({ email, password })

    if (!result.ok) return dispatch(logout(result))
    dispatch(login(result))
  }
}

export function startLogout() {
  return async (dispatch) => {
    await logoutFirebase()
    dispatch(logout())
  }
}
