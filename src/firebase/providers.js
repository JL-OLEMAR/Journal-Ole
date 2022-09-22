import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from 'firebase/auth'

import { FirebaseAuth } from './config.js'

const googleProvider = new GoogleAuthProvider()

export async function signInWithGoogle() {
  try {
    const { user } = await signInWithPopup(FirebaseAuth, googleProvider)
    // const credentials = GoogleAuthProvider.credentialFromResult(result)
    const { displayName, email, photoURL, uid } = user

    return { ok: true, displayName, email, photoURL, uid }
  } catch (error) {
    // const errorCode = error.errorCode
    const errorMessage = error.message

    return { ok: false, errorMessage }
  }
}

export async function registerUserWithEmailPassword({
  email,
  password,
  displayName
}) {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    )
    const { uid, photoURL } = resp.user

    await updateProfile(FirebaseAuth.currentUser, { displayName })

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName
    }
  } catch (error) {
    const errorMessage = error.message

    return { ok: false, errorMessage }
  }
}

export async function loginWithEmailPassword({ email, password }) {
  try {
    const { user } = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    )

    const { displayName, photoURL, uid } = user

    return { ok: true, displayName, email, photoURL, uid }
  } catch (error) {
    const errorMessage = error.message

    return { ok: false, errorMessage }
  }
}
