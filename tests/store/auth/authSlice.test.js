import {
  authSlice,
  checkingCredentials,
  login,
  logout
} from '../../../src/store/auth/authSlice.js'
import {
  authenticatedState,
  demoUser,
  initialState
} from '../fixtures/authFixtures.js'

describe('Tests in authSlice', () => {
  test('should return the initial state and be called "auth"', () => {
    const state = authSlice.reducer(initialState, {})

    expect(state).toEqual(initialState)
    expect(authSlice.name).toBe('auth')
  })

  test('should authenticated', () => {
    const state = authSlice.reducer(initialState, login(demoUser))

    expect(state).toEqual({
      status: 'authenticated',
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null
    })
  })

  test('should logout without arguments', () => {
    const state = authSlice.reducer(authenticatedState, logout())

    expect(state).toEqual({
      status: 'not-authenticated',
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: undefined
    })
  })

  test('should logout and display the errorMessage', () => {
    const errorMessage = 'Credentials are not correct'
    const state = authSlice.reducer(
      authenticatedState,
      logout({ errorMessage })
    )

    expect(state).toEqual({
      status: 'not-authenticated',
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage
    })
  })

  test('should change the status to checking', () => {
    const state = authSlice.reducer(initialState, checkingCredentials())

    expect(state.status).toBe('checking')
  })
})
