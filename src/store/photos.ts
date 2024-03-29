import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Photo, PhotosMap } from "../models/Photo";
import type { AsyncThunkConfig as Config } from "./config";
import { collection, db } from "../firebase/";
import { getDocs, query, Timestamp, where } from "firebase/firestore";
import { RootState } from ".";
import { deleteFace, fetchPeople } from "./people";
import {
  FileInfo,
  getPhotos,
  deletePhoto as deletePhotoAsync,
  handleUpload,
  HandleUploadReturnType,
} from "../client/photos";
import { processFaces } from "../client/process";

import { photos as testPhotos } from "../data/photos";

import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface PhotosState {
  all: PhotosMap;
  selected: string[]; // Array of Photo IDs
}
const initialState: PhotosState = {
  all: {},
  selected: [],
};

// type definition is: <return type, first function arg type, AsyncThunk config>
export const fetchPhotos = createAsyncThunk<PhotosMap, string, Config>(
  "photo/fetch",
  async (userID) => {
    console.log(process.env);
    if (process.env.REACT_APP_TEST) {
      return testPhotos;
    }
    return getPhotos(userID);
  }
);

interface UploadPhotosArgs {
  photos: FileInfo[];
  userID: string;
}

export const uploadPhotos = createAsyncThunk<
  PhotosMap,
  UploadPhotosArgs,
  Config
>("photo/upload", async ({ photos, userID }, { rejectWithValue, dispatch }) => {
  // Uploads photos & returns photo IDs which include a face
  let uploadData: HandleUploadReturnType;
  try {
    uploadData = await handleUpload(photos, userID);
  } catch (err) {
    if (err instanceof AxiosError) {
      return rejectWithValue(
        (err.response && err.response.data) || err.message
      );
    } else if (err instanceof Error) {
      return rejectWithValue(err.message);
    } else {
      return rejectWithValue("Unknown error!");
    }
  }
  

  const { newPhotos, facePhotoIDs, facePhotosBase64 } = uploadData;
  if (facePhotoIDs.length !== 0) {
    // For photos with faces, update people-photo mappings using these photos
    const facesToast = toast.loading(`Processing faces of ${facePhotoIDs.length} photo(s)`);
    await processFaces(userID, facePhotosBase64, facePhotoIDs)
      .then((numFaces) => {
        toast.update(facesToast, {
          type: "success",
          render:
            `Processed ${numFaces} face` + (numFaces === 1 ? "" : "s"),
          isLoading: false,
          autoClose: 3000
        });
      })
      .catch((err) => {
        toast.update(facesToast, {
          render: `Error processing faces ${err}`,
          isLoading: false,
          autoClose: 3000
        });
      });
    // Refresh people faces
    await dispatch(fetchPeople(userID));
  }
  return newPhotos;
});

interface DeletePhotoArgs {
  userID: string;
  photoID: string;
}

export const deletePhoto = createAsyncThunk<string, DeletePhotoArgs, Config>(
  "photo/delete",
  async ({ userID, photoID }, { dispatch }) => {
    await deletePhotoAsync(photoID, userID)
    // Also delete people references to the photo
    await dispatch(deleteFace({ userID, photoID }));
    // Delete photo
    return photoID;
  }
);

export const deleteSelectedPhotos = createAsyncThunk<string[], string, Config>(
  "photo/deleteSelected",
  async (userID, { dispatch, getState }) => {
    const selectedPhotoIDs = getState().photos.selected;
    if (selectAllPhotos.length === 0) {
      throw Error("Expected non-empty selected photo IDs array");
    }
    
    await Promise.all(selectedPhotoIDs.map(async (photoID) => {
      await dispatch(deletePhoto({ userID, photoID }));
    }))
    await dispatch(fetchPeople(userID)); // Refresh people
    return selectedPhotoIDs;
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

/**
 * Photo reducer to upload, fetch, delete, edit photos
 */
const photosSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    selectPhoto(state, { payload }: PayloadAction<string>) {
      const isSelected = state.selected.includes(payload);
      if (!isSelected) {
        // If photo is not already selected, add
        state.selected.push(payload);
      } else {
        // Otherwise, deselect
        state.selected = state.selected.filter((id) => id !== payload);
      }
      return state;
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
          delete state.all[action.payload]; // remove key from photos map
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
          state.all[id].tags = state.all[id].tags.filter(
            (tag) => tag !== removedTag
          );
        }
      )
      .addCase(removePhotoTag.rejected, (state, action) => {
        // Toast notification
      })
      .addCase(uploadPhotos.fulfilled, (state, action) => {
        const newPhotos = action.payload;
        state.all = { ...state.all, ...newPhotos };
      })
      .addCase(uploadPhotos.rejected, (state, action) => {
        if (action.payload !== undefined) {
          toast.error(`Error: ${action.payload}`, {
            isLoading: false,
            autoClose: 3000,
          });
        }
      })
      .addCase(deleteSelectedPhotos.fulfilled, (state, action) => {
        toast.success(`Deleted ${action.payload.length} selected photos`);
      });
  },    
});


export const selectAllPhotos = (state: RootState) => state.photos.all;
export const selectSelectedPhotos = (state: RootState) => state.photos.selected;
export const selectNumSelectedPhotos = (state: RootState) => state.photos.selected.length;

export const { selectPhoto, clearSelection } = photosSlice.actions;
export default photosSlice.reducer;
