import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedIds: [],
  isSelectedAll: false,
  currentPage: 0,
  cached: {
    Items: [],
  },
  isFetching: false,
  selectedFolderId: 0,
};

export const sequencesSlice = createSlice({
  name: "sequences",
  initialState,
  reducers: {
    addSequenceId: (state, action) => {
      state.selectedIds = state.selectedIds.includes(action.payload)
        ? state.selectedIds.filter((id) => id !== action.payload)
        : [...state.selectedIds, action.payload];
    },
    clearSelectedIds: (state, action) => {
      state.selectedIds = [];
    },
    setCurrentSequencesPage: (state, action) => {
      state.currentPage = action.payload;
    },
    selectAllSequences: (state, action) => {
      state.isSelectedAll = action.payload;

      if (!action.payload) {
        state.selectedIds = [];
      }
    },
    setSequencesToCache: (state, action) => {
      state.cached = action.payload || { Items: [] };
      state.isFetching = false;
    },
    setSequencesRequestStatus: (state, action) => {
      state.isFetching = action.payload;
    },
    selectFolder: (state, action) => {
      state.selectedFolderId = action.payload;
    },
  },
});

export const {
  addSequenceId,
  clearSelectedIds,
  setCurrentSequencesPage,
  selectAllSequences,
  setSequencesRequestStatus,
  setSequencesToCache,
  selectFolder,
} = sequencesSlice.actions;

export default sequencesSlice.reducer;
