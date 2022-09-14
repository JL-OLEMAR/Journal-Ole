import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import { FirebaseAuth } from './config'

const googleProvider = new GoogleAuthProvider()

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider)
    // const credentials = GoogleAuthProvider.credentialFromResult(result)
    const { displayName, email, photoURL, uid } = result.user

    return { ok: true, displayName, email, photoURL, uid }
  } catch (error) {
    // const errorCode = error.errorCode
    const errorMessage = error.message

    return { ok: false, errorMessage }
  }
}
