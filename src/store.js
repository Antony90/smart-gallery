import { firebaseReducer, firestoreReducer } from 'react-redux-firebase';
import { combineReducers, createStore } from 'redux';
import { createFirestoreInstance } from 'redux-firestore';
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import fbConfig from './firebase/config'

firebase.initializeApp(fbConfig)
firebase.firestore();

const rootReducer = combineReducers({
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export const store = createStore(rootReducer, {})

export const rrfProps = {
    firebase,
    config: {},
    dispatch: store.dispatch,
    createFirestoreInstance
}

