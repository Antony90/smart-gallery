import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Photo, PhotosMap } from "../models/Photo";
import type { AsyncThunkConfig as Config } from "./config";
import { collection, db } from '../firebase/';
import { getDocs, query, Timestamp, where } from "firebase/firestore";
import { RootState } from ".";
import { deleteFace } from "./people";


interface PhotosState {
  all: PhotosMap;
  selected: string[]; // Array of Photo IDs
}
const initialState: PhotosState = {
  all: {},
  selected: [],
};

const photosRef = collection<Photo>(db, 'photos');

// type definition is: <return type, first function arg type, AsyncThunk config>
export const fetchPhotos = createAsyncThunk<PhotosMap, void, Config>(
  "photo/fetch",
  async (_, { getState }) => {
    // fetch photos
    const userID = getState().auth.userID;
    const q = query(photosRef);//, where("userID", "==", userID)); 
    const photos: PhotosMap = {};
    (await getDocs(q)).forEach((doc) => {
      const photo = { ...doc.data(), id: doc.id, };
      if (photo.createdAt instanceof Timestamp) {
        photo.createdAt = photo.createdAt.toString();
      }
      photos[photo.id] = photo;
    })
    console.log(photos);
    return photos;
  }
);

export const deletePhoto = createAsyncThunk<string, string, Config>(
  "photo/delete",
  async (id: string, { dispatch }) => {
    console.log(id);
    // Also delete people references to the photo
    await dispatch(deleteFace(id));
    // Delete photo
    return id;
  }
);
export interface PhotoIDTag {
  id: string;
  tag: string;
}

export const addPhotoTag = createAsyncThunk<PhotoIDTag, PhotoIDTag, Config>(
  "photo/addtag",
  async ({ id, tag }: PhotoIDTag) => {
    // Add tag to photo with ID
    return { id, tag };
  }
);

export const removePhotoTag = createAsyncThunk<PhotoIDTag, PhotoIDTag, Config>(
  "photo/removetag",
  async ({ id, tag }: PhotoIDTag) => {
    // Remove tag from photo with ID
    return { id, tag };
  }
);

const photosSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    selectPhoto(state, { payload }: PayloadAction<string>) {
      const isSelected = state.selected.find((id) => id === payload);
      if (isSelected) {
        // If photo is not already selected, add
        state.selected.push(payload);
      } else {
        // Otherwise, deselect
        state.selected = state.selected.filter((id) => id !== payload);
      }
    },
    clearSelection(state) {
      state.selected = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchPhotos.fulfilled,
        (state, action: PayloadAction<PhotosMap>) => {
          state.all = action.payload;
        }
      )
      .addCase(fetchPhotos.rejected, (state, action) => {
        // Toast notification, component updated
      })
      .addCase(fetchPhotos.pending, (state, action) => {
        // Loading state
      })
      .addCase(
        deletePhoto.fulfilled,
        (state, action: PayloadAction<string>) => {
          // state.all = state.all.filter(({ id }) => id !== action.payload);
        }
      )
      .addCase(deletePhoto.rejected, (state, action) => {
        // Toast notification
      })
      .addCase(
        addPhotoTag.fulfilled,
        (state, action: PayloadAction<PhotoIDTag>) => {
          const { id, tag } = action.payload;
          state.all[id].tags.push(tag);
        }
        )
      .addCase(addPhotoTag.rejected, (state, action) => {
        // Toast notification
      })
      .addCase(
        removePhotoTag.fulfilled,
        (state, action: PayloadAction<PhotoIDTag>) => {
          const { id, tag: removedTag } = action.payload;
          state.all[id].tags = state.all[id].tags.filter((tag) => (
            tag !== removedTag
          ))
        }
      )
      .addCase(removePhotoTag.rejected, (state, action) => {
        // Toast notification
      });
  },
});

export const selectAllPhotos = (state: RootState) => state.photos.all;
export const selectSelectedPhotos = (state: RootState) => state.photos.selected;

export const { selectPhoto, clearSelection } = photosSlice.actions;
export default photosSlice.reducer;
