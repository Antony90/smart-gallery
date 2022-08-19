import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore';

import photoReducer from './photoReducer'
import albumReducer from './albumReducer';
import filterReducer from './filterReducer';


const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    photos: photoReducer,
    album: albumReducer,
    filter: filterReducer
})

export default rootReducer;