import firebase from 'firebase'

import config from './config'

firebase.initializeApp(config.firebase)

export const provider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export default firebase
