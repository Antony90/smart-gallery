import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Photo from "../models/photo";
import { RootState } from ".";
import type { AsyncThunkConfig as Config } from "./config";

export type PhotoIDMap = Map<string, Photo>;

interface PhotosState {
  all: PhotoIDMap;
  selected: string[]; // Array of Photo IDs
}
const initialState: PhotosState = {
  all: new Map(),
  selected: [],
};

// type definition is: <return type, first function arg type, AsyncThunk config>
export const fetchPhotos = createAsyncThunk<Photo[], void, Config>(
  "photo/fetch",
  async () => {
    // fetch photos
    throw new Error("Not implemented");
  }
);

export const deletePhoto = createAsyncThunk<string, string, Config>(
  "photo/delete",
  async (id: string) => {
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
        (state, action: PayloadAction<Photo[]>) => {
          action.payload.forEach((photo) => {
            state.all.set(photo.id, photo);
          });
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
          state.all.delete(action.payload);
        }
      )
      .addCase(deletePhoto.rejected, (state, action) => {
        // Toast notification
      })
      .addCase(
        addPhotoTag.fulfilled,
        (state, action: PayloadAction<PhotoIDTag>) => {
          const { id, tag } = action.payload;
          state.all.get(id)?.tags.push(tag);
        }
      )
      .addCase(addPhotoTag.rejected, (state, action) => {
        // Toast notification
      })
      .addCase(
        removePhotoTag.fulfilled,
        (state, action: PayloadAction<PhotoIDTag>) => {
          const { id, tag: removedTag } = action.payload;
          const photo = state.all.get(id);
          if (photo !== undefined) {
            const updatedTags = photo.tags.filter((tag) => tag !== removedTag);
            photo.tags = updatedTags; // TODO: check if photo is a pointer and if updated in Map
          }
        }
      )
      .addCase(addPhotoTag.rejected, (state, action) => {
        // Toast notification
      });
  },
});

export const { selectPhoto, clearSelection } = photosSlice.actions;
export default photosSlice.reducer;
