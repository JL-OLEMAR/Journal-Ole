import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

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
