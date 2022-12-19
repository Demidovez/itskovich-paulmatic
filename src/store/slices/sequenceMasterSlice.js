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
  isEditing: false,
  data: {
    Spec: {
      accountId: null,
      id: null,
      FolderID: 0,
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
  },
};

export const sequenceMasterSlice = createSlice({
  name: "sequenceMaster",
  initialState,
  reducers: {
    initMaster: (state, action) => {
      state.data = action.payload;
    },
    updatedSteps: (state, action) => {
      state.data.Spec.Model.Steps = action.payload;
      state.isEditing = true;
      console.log("updatedSteps");
    },
    saveJobs: (state, action) => {
      state.data.Spec.Model.Schedule = action.payload;
      state.isEditing = true;
      console.log("saveJobs");
    },
    setLogStartNameSequence: (state, action) => {
      state.data.Spec.LogStartName = action.payload;
      state.isEditing = true;
      console.log("setLogStartNameSequence");
    },
    saveFolderIdSequence: (state, action) => {
      state.data.Spec.FolderID = action.payload;
      state.isEditing = true;
      console.log("saveFolderIdSequence");
    },
    saveNameSequence: (state, action) => {
      state.data.Spec.Name = action.payload;
      state.isEditing = true;
      console.log("saveNameSequence");
    },
    saveStepsSequence: (state, action) => {
      state.data.Spec.Model.Steps = action.payload;
      state.pages.Steps.isDone = state.data.Spec.Model.Steps.length > 0;
      state.isEditing = true;
      console.log("saveStepsSequence");
    },
    saveContactIdsSequence: (state, action) => {
      state.data.Spec.Model.ContactIds = action.payload;
      state.isEditing = true;
      console.log("saveContactIdsSequence");
    },
    saveScheduleSequence: (state, action) => {
      state.data.Spec.Model.Schedule = action.payload;
      state.pages.Schedule.isDone = state.data.Spec.Model.Schedule.some(
        (day) => day.length > 0
      );
      state.isEditing = true;
      console.log("saveScheduleSequence");
    },
    saveSettingsSequence: (state, action) => {
      state.data.Spec.Model.Settings = action.payload;
      state.isEditing = true;
      console.log("saveSettingsSequence");
    },
    saveTimeZoneSequence: (state, action) => {
      state.data.Spec.TimeZoneId = action.payload;
      state.isEditing = true;
      console.log("saveTimeZoneSequence");
    },
    doneMaster: () => {
      return initialState;
    },
  },
});

export const {
  initMaster,
  updatedSteps,
  saveFolderIdSequence,
  saveNameSequence,
  saveStepsSequence,
  saveContactIdsSequence,
  saveScheduleSequence,
  saveSettingsSequence,
  saveTimeZoneSequence,
  setLogStartNameSequence,
  doneMaster,
  saveJobs,
} = sequenceMasterSlice.actions;

export default sequenceMasterSlice.reducer;
