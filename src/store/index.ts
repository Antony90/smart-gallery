import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

import photosReducer, { fetchPhotos } from "./photos";
import authReducer from "./auth";
import peopleReducer, { fetchPeople } from "./people";

const store = configureStore({
  reducer: {
    photos: photosReducer,
    people: peopleReducer,
    auth: authReducer
  },
})
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export function fetchData (userID: string) {
  return (dispatch: AppDispatch) => {
    dispatch(fetchPhotos(userID));
    dispatch(fetchPeople(userID));
  }
}