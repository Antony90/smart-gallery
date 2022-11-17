import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Photo } from "../models/Photo";
import type { AsyncThunkConfig as Config } from "./config";
import { app, db, usersRef, userID } from '../firebase/';
import { collection, doc, getDoc } from "firebase/firestore";

export type PhotoIDMap = Map<string, Photo>;

interface PhotosState {
  userID: string | null;
}
const initialState: PhotosState = {
  userID: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, { payload }: PayloadAction<string>) {
      state.userID = payload;
    },
  },
  
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
