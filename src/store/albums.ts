import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { AsyncThunkConfig as Config } from "./config";
import { RootState } from ".";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

import { Album } from "../models/Album";
import { 
  getAlbums, 
  createAlbum as createAlbumAsync,
  deleteAlbum as deleteAlbumAsync
} from "../client/albums";

interface AlbumsState {
  all: Album[];
}
const initialState: AlbumsState = {
  all: [],
};

// type definition is: <return type, first function arg type, AsyncThunk config>


export const fetchAlbums = createAsyncThunk<Album[], string, Config>(
  "album/fetch",
  getAlbums
);


type CreateAlbumArgs = {
  userID: string;
  name: string;
}

export const createAlbum = createAsyncThunk<
  Album,
  CreateAlbumArgs,
  Config
>("album/create", async ({ name, userID }, { getState }) => {
  const photoIDs = getState().photos.selected;
  return await createAlbumAsync(photoIDs, name, userID);
});


type DeleteAlbumArgs = {
  albumID: string;
  userID: string;
}

export const deleteAlbum = createAsyncThunk<
  string,
  DeleteAlbumArgs,
  Config
>("album/delete", async ({ albumID, userID }) => {
  await deleteAlbumAsync(albumID, userID);
  return albumID;
});

// interface DeletePhotoArgs {
//   userID: string;
//   photoID: string;
// }

// export const deletePhoto = createAsyncThunk<string, DeletePhotoArgs, Config>(
//   "photo/delete",
//   async ({ userID, photoID }, { dispatch }) => {
//     // Also delete people references to the photo
//     await dispatch(deleteFace({ userID, photoID }));
//     // Delete photo
//     return photoID;
//   }
// );
// export interface PhotoIDTag {
//   id: string;
//   tag: string;
// }

// export const addPhotoTag = createAsyncThunk<PhotoIDTag, PhotoIDTag, Config>(
//   "photo/addtag",
//   async ({ id, tag }: PhotoIDTag) => {
//     // Add tag to photo with ID
//     return { id, tag };
//   }
// );

// export const removePhotoTag = createAsyncThunk<PhotoIDTag, PhotoIDTag, Config>(
//   "photo/removetag",
//   async ({ id, tag }: PhotoIDTag) => {
//     // Remove tag from photo with ID
//     return { id, tag };
//   }
// );

const albumsSlice = createSlice({
  name: "album",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchAlbums.fulfilled,
        (state, action: PayloadAction<Album[]>) => {
            state.all = action.payload;
        }
      )
      .addCase(createAlbum.fulfilled, (state, action: PayloadAction<Album>) => {
        state.all.push(action.payload);
      })
      .addCase(deleteAlbum.fulfilled, (state, action: PayloadAction<string>) => {
        // Filter out the deleted album ID
        state.all = state.all.filter(({ id }) => id != action.payload );
      });
  },
});

export const selectAllAlbums = (state: RootState) => state.albums.all;

export const {} = albumsSlice.actions;
export default albumsSlice.reducer;
