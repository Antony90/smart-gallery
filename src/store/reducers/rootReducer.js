import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore';

import photoReducer from './photoReducer'
import albumReducer from './albumReducer';
import filterReducer from './filterReducer';
import userReducer from './userReduer';


const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    user: userReducer,
    photos: photoReducer,
    albums: albumReducer,
    filter: filterReducer,
})

export default rootReducer;