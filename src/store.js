import { combineReducers, createStore } from 'redux';

import { firebaseReducer } from 'react-redux-firebase';
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import fbConfig from './firebase/config'


firebase.initializeApp(fbConfig)
firebase.firestore();

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
})
const initialState = { 

}

export const store = createStore(rootReducer, initialState)

export const rrfProps = {
    firebase,
    config: {},
    dispatch: store.dispatch,
    createFirestoreInstance
}

