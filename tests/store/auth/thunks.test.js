import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  signInWithGoogle
} from '../../../src/firebase/providers.js'
import {
  checkingCredentials,
  login,
  logout
} from '../../../src/store/auth/authSlice.js'
import { clearNotesLogout } from '../../../src/store/journal/journalSlice.js'
import {
  checkingAuthentication,
  startCreatingUserWithEmailPassword,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogout
} from '../../../src/store/auth/thunks.js'
import { demoUser } from '../fixtures/authFixtures.js'

jest.mock('../../../src/firebase/providers.js')

describe('Tests in AuthThunks', () => {
  const dispatch = jest.fn()

  beforeEach(() => jest.clearAllMocks())

  test('should invoke the checkingCredentials', async () => {
    await checkingAuthentication()(dispatch)
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
  })

  test('startGoogleSignIn should call checkingCredentials and login', async () => {
    const loginData = { ok: true, ...demoUser }

    // from firebase, mockResolvedValue for promises
    await signInWithGoogle.mockResolvedValue(loginData)

    // from AuthThunk
    await startGoogleSignIn()(dispatch)
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(loginData))
  })

  test('startGoogleSignIn should call checkingCredentials and logout with errorMessage', async () => {
    const loginData = { ok: false, errorMessage: 'A mistake on google' }

    // from firebase
    await signInWithGoogle.mockResolvedValue(loginData)

    // from AuthThunk
    await startGoogleSignIn()(dispatch)
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(logout(loginData))
  })

  test('startLoginWithEmailPassword should call checkingCredentials and login', async () => {
    const loginData = { ok: true, ...demoUser }
    const formData = { email: demoUser.email, password: '123456' }

    // from firebase
    await loginWithEmailPassword.mockResolvedValue(loginData)

    // from AuthThunk
    await startLoginWithEmailPassword(formData)(dispatch)
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(loginData))
  })

  test('startLoginWithEmailPassword should call checkingCredentials and logout with errorMessage', async () => {
    const loginData = { ok: false, errorMessage: 'A mistake on google' }
    const formData = { email: '', password: '' }

    // from firebase
    await loginWithEmailPassword.mockResolvedValue(loginData)

    // from AuthThunk
    await startLoginWithEmailPassword(formData)(dispatch)
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(logout(loginData))
  })

  test('startCreatingUserWithEmailPassword should call checkingCredentials and login', async () => {
    const loginData = { ok: true, ...demoUser }
    const formData = {
      email: demoUser.email,
      password: '123456',
      displayName: demoUser.displayName
    }

    // from firebase
    await registerUserWithEmailPassword.mockResolvedValue(loginData)

    // from AuthThunk
    await startCreatingUserWithEmailPassword(formData)(dispatch)
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(demoUser))
  })

  test('startCreatingUserWithEmailPassword should call logout with errorMessage', async () => {
    const loginData = { ok: false, errorMessage: 'A mistake on google' }
    const formData = { email: '', password: '', displayName: '' }
    const errorMessage = loginData.errorMessage

    // from firebase
    await registerUserWithEmailPassword.mockResolvedValue(loginData)

    // from AuthThunk
    await startCreatingUserWithEmailPassword(formData)(dispatch)
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage }))
  })

  test('startLogout should call clearNotesLogout and logout', async () => {
    // from AuthThunk
    await startLogout()(dispatch)
    expect(logoutFirebase).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout())
    expect(dispatch).toHaveBeenCalledWith(logout())
  })
})
