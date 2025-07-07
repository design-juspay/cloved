import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyD2aRkOI4iCwiZOW5kEejrL9jv9JvytKpo",
  authDomain: "storybook-452807.firebaseapp.com",
  databaseURL: "https://storybook-452807-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "storybook-452807",
  storageBucket: "storybook-452807.firebasestorage.app",
  messagingSenderId: "567047894553",
  appId: "1:567047894553:web:1cd999e1c9bf9b81ff5c88"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app)

export default app 