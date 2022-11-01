import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'

import { authSlice } from '../../../src/store/auth/authSlice.js'
import { Register } from '../../../src/auth/pages/Register.jsx'
import { notAuthenticatedState } from '../../store/fixtures/authFixtures.js'

const mockStartCreatingUserWithEmailPassword = jest.fn()

jest.mock('../../../src/store/auth/thunks.js', () => ({
  startCreatingUserWithEmailPassword: (formState) => {
    return () => mockStartCreatingUserWithEmailPassword(formState)
  }
}))

const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
  preloadedState: {
    auth: notAuthenticatedState // Previous state
  }
})

// Override useDispatch
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn()
}))

describe('Tests in <Register />', () => {
  beforeEach(() => jest.clearAllMocks())

  test('should display the component correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    )

    expect(screen.getAllByText('Sign up').length).toBeGreaterThanOrEqual(1)
  })

  test.only('onSubmit "RegisterBtn" should call startCreatingUserWithEmailPassword', () => {
    const displayName = 'Test2'
    const email = 'test2@test.com'
    const password = '123456'

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    )

    const nameField = screen.getByRole('textbox', { name: 'Name' })
    const emailField = screen.getByRole('textbox', { name: 'E-mail' })
    const passwordField = screen.getByLabelText('password')
    const registerForm = screen.getByLabelText('register-form')

    fireEvent.change(nameField, {
      target: { name: 'displayName', value: displayName }
    })
    fireEvent.change(emailField, { target: { name: 'email', value: email } })
    fireEvent.change(passwordField, {
      target: { name: 'password', value: password }
    })
    fireEvent.submit(registerForm)
    expect(mockStartCreatingUserWithEmailPassword).toHaveBeenCalledWith({
      displayName,
      email,
      password
    })
  })
})
