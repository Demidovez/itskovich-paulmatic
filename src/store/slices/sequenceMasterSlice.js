import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    FolderId: 0,
    Name: "",
    Model: {
      Steps: [],
      ContactIds: [],
      Schedule: [],
      Settings: {},
    },
  },
};

export const sequenceMasterSlice = createSlice({
  name: "sequenceMaster",
  initialState,
  reducers: {
    saveFolderIdSequence: (state, action) => {
      state.data.FolderId = action.payload;
    },
    saveNameSequence: (state, action) => {
      state.data.Name = action.payload;
    },
    saveStepsSequence: (state, action) => {
      state.data.Model.Steps = action.payload;
    },
    saveContactIdsSequence: (state, action) => {
      state.data.Model.ContactIds = action.payload;
    },
    saveScheduleSequence: (state, action) => {
      state.data.Model.Schedule = action.payload;
    },
    saveSettingsSequence: (state, action) => {
      state.data.Model.Settings = action.payload;
    },
  },
});

export const {
  saveFolderIdSequence,
  saveNameSequence,
  saveStepsSequence,
  saveContactIdsSequence,
  saveScheduleSequence,
  saveSettingsSequence,
} = sequenceMasterSlice.actions;

export default sequenceMasterSlice.reducer;
