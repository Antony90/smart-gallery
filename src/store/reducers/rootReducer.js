import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore';

import photoReducer from './photoReducer'
import albumReducer from './albumReducer';


const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    photos: photoReducer,
    album: albumReducer
})

export default rootReducer;