// // Module imports
// import {
// 	getApps,
// 	initializeApp,
// } from 'firebase/app'





// // Local Constants
// const firebaseConfig = {
// 	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
// 	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// 	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
// 	databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
// 	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// 	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
// 	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
// 	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
// }





// // Local variables
// let firebase = getApps()[0]





// if (!firebase) {
// 	firebase = initializeApp(firebaseConfig)
// }





// export { firebase }





// Module imports
import firebase from 'firebase/app'
/* eslint-disable import/no-unassigned-import */
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
// import 'firebase/storage'
/* eslint-enable import/no-unassigned-import */





// Constants
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
}





// Variables
let auth = null
let database = null
let firestore = null
// let storage = null





if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
}

if (!auth) {
	auth = firebase.auth()
}

if (!database) {
	database = firebase.database()
}

if (!firestore) {
	firestore = firebase.firestore()
}

// if (!storage) {
// 	storage = firebase.storage()
// }





export default firebase
export {
	auth,
	database,
	firebase,
	firestore,
	// storage,
}
