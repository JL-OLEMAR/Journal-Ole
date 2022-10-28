import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'

import { authSlice } from '../../../src/store/auth/authSlice.js'
import { Login } from '../../../src/auth/pages/Login.jsx'
import { notAuthenticatedState } from '../../store/fixtures/authFixtures.js'

const mockStartGoogleSignIn = jest.fn()
const mockStartLoginWithEmailPassword = jest.fn()

jest.mock('../../../src/store/auth/thunks.js', () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmailPassword: ({ email, password }) => {
    return () => mockStartLoginWithEmailPassword({ email, password })
  }
}))

// Override useDispatch
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn()
}))

const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
  preloadedState: {
    auth: notAuthenticatedState // Previous state
  }
})

describe('Tests in <Login />', () => {
  beforeEach(() => jest.clearAllMocks())

  test('should display the component correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    )

    // screen.debug()
    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1)
  })

  test('google button should call startGoogleSignIn', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    )

    const googleBtn = screen.getByLabelText('google-btn')

    fireEvent.click(googleBtn)
    expect(mockStartGoogleSignIn).toHaveBeenCalled()
  })

  test('onSubmit "LoginBtn" should call startLoginWithEmailPassword', () => {
    const email = 'test1@test.com'
    const password = '123456'

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    )

    const emailField = screen.getByRole('textbox', { name: 'E-mail' })
    const passwordField = screen.getByTestId('password')
    const loginForm = screen.getByLabelText('login-form')

    fireEvent.change(emailField, { target: { name: 'email', value: email } })
    fireEvent.change(passwordField, {
      target: { name: 'password', value: password }
    })
    fireEvent.submit(loginForm)
    expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
      email,
      password
    })
  })
})
