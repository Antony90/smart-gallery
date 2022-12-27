import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AsyncThunkConfig as Config } from "./config";
import { RootState } from ".";
import { People } from "../models/Person";
import {
  getPeople,
  renamePerson as renamePersonRequest,
  deleteFace as deleteFaceRequest,
} from "../client/process";

const initialState: People = {};

// type definition is: <return type, first function arg type, AsyncThunk config>
export const fetchPeople = createAsyncThunk<People, string, Config>(
  "face/fetchPeople",
  async (userID, { getState }) => {
    // fetch photos
    return await getPeople(userID);
  }
);

interface RenamePersonArgs {
  personID: string;
  name: string;
}

export const renamePerson = createAsyncThunk<
  RenamePersonArgs,
  RenamePersonArgs,
  Config
>("face/renamePerson", async ({ personID, name }, { getState }) => {
  const userID = getState().auth.userID;
  await renamePersonRequest(userID, personID, name);
  return { personID, name };
});

interface DeleteFaceResponse {
  photoID: string;
  personIDs: string[];
}
interface DeleteFaceArgs {
  userID: string;
  photoID: string;
}

export const deleteFace = createAsyncThunk<DeleteFaceResponse, DeleteFaceArgs, Config>(
  "face/deleteFace",
  async ({ userID, photoID }, { getState }) => {
    // Returns list of people that referenced the photo
    const personIDs = await deleteFaceRequest(userID, photoID);
    return { photoID, personIDs };
  }
);

const faceSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchPeople.fulfilled,
        (state, action: PayloadAction<People>) => {
          return action.payload;
        }
      )
      .addCase(
        renamePerson.fulfilled,
        (state, action: PayloadAction<RenamePersonArgs>) => {
          const { personID, name } = action.payload;
          state[personID].name = name;
        }
      )
      .addCase(
        deleteFace.fulfilled,
        (state, action: PayloadAction<DeleteFaceResponse>) => {
          const { photoID: deletedPhotoID, personIDs } = action.payload;
          // For each person, remove the photo from their collection
          personIDs.forEach(personID => {
            const person = state[personID];
            person.photoIDs = person.photoIDs.filter(phID => phID !== deletedPhotoID);
          });
        }
      );
  },
});

export const selectPeople = (state: RootState) => state.people;

export default faceSlice.reducer;