import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDXmGSfoQ48yYb2kUXYRJmfro1Nx0uApIw',
  authDomain: 'ecommerce-271ff.firebaseapp.com',
  projectId: 'ecommerce-271ff',
  storageBucket: 'ecommerce-271ff.appspot.com',
  messagingSenderId: '504896613516',
  appId: '1:504896613516:web:c510ce629d51229b359fa9',
  measurementId: 'G-98DEPH3X77',
}

firebase.initializeApp(firebaseConfig)

export default firebase
