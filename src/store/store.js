import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import { getFirebase } from 'react-redux-firebase';
import { createFirestoreInstance, getFirestore } from 'redux-firestore';

import fbConfig from '../firebase/config'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

import rootReducer from './reducers/rootReducer';

firebase.initializeApp(fbConfig)
firebase.firestore();


export const store = createStore(rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))
    ),
)

export const rrfProps = {
    firebase,
    config: {},
    dispatch: store.dispatch,
    createFirestoreInstance
}

