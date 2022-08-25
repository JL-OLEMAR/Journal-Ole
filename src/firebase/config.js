// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCWpLve5lmZ5IsgW0xYDTGalYOV_EzfQDU',
  authDomain: 'ole-react-redux.firebaseapp.com',
  projectId: 'ole-react-redux',
  storageBucket: 'ole-react-redux.appspot.com',
  messagingSenderId: '653089811891',
  appId: '1:653089811891:web:b2d971ad1dc19bff4e6fc6'
}

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig)
export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB = getFirestore(FirebaseApp)
