export const initialState = {
  status: 'checking',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null
}

export const authenticatedState = {
  status: 'authenticated',
  uid: '123ABC',
  email: 'test1@test.com',
  displayName: 'Test1 User',
  photoURL: 'https://demo.jpg',
  errorMessage: null
}

export const notAuthenticatedState = {
  status: 'not-authenticated',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null
}

export const demoUser = {
  uid: 'ABC123',
  email: 'test1@test.com',
  displayName: 'Test1 User',
  photoURL: 'https://demo.jpg'
}
