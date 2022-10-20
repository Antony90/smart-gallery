import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import { getFirebase } from 'react-redux-firebase';
import { createFirestoreInstance, getFirestore } from 'redux-firestore';

import fbConfig from '../firebase/config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import "firebase/compat/auth";

import rootReducer from './reducers/rootReducer';

firebase.initializeApp(fbConfig)
firebase.firestore();

// TODO move to firebase auth
export const provider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer,
    composeEnhancers(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))
    ),
)

export const rrfProps = {
    firebase,
    config: {},
    dispatch: store.dispatch,
    createFirestoreInstance
}

