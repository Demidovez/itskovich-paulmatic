import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pages: {
    Steps: {
      isDone: false,
      label: "Шаги",
    },
    Schedule: {
      isDone: false,
      label: "Расписание",
    },
    People: {
      isDone: true,
      // isDone: false,
      label: "Люди",
    },
    Duration: {
      isDone: true,
      label: "Продолжительность",
    },
  },
  data: {
    FolderId: 0,
    Name: "",
    TimeZoneId: 56,
    LogStartName: new Date().toString(),
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
    setLogStartNameSequence: (state, action) => {
      state.data.LogStartName = action.payload;
    },
    saveFolderIdSequence: (state, action) => {
      state.data.FolderId = action.payload;
    },
    saveNameSequence: (state, action) => {
      state.data.Name = action.payload;
    },
    saveStepsSequence: (state, action) => {
      state.data.Model.Steps = action.payload;
      state.pages.Steps.isDone = state.data.Model.Steps.length > 0;
    },
    saveContactIdsSequence: (state, action) => {
      state.data.Model.ContactIds = action.payload;
      // state.pages.People.isDone = state.data.Model.ContactIds.length > 0;
    },
    saveScheduleSequence: (state, action) => {
      state.data.Model.Schedule = action.payload;
      state.pages.Schedule.isDone = state.data.Model.Schedule.some(
        (day) => day.length > 0
      );
    },
    saveSettingsSequence: (state, action) => {
      state.data.Model.Settings = action.payload;
    },
    saveTimeZoneSequence: (state, action) => {
      state.data.TimeZoneId = action.payload;
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
  saveTimeZoneSequence,
  setLogStartNameSequence,
} = sequenceMasterSlice.actions;

export default sequenceMasterSlice.reducer;
