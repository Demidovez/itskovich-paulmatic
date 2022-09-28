import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedIds: [],
  isSelectedAll: false,
  currentPage: 0,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTasksId: (state, action) => {
      state.selectedIds = state.selectedIds.includes(action.payload)
        ? state.selectedIds.filter((id) => id !== action.payload)
        : [...state.selectedIds, action.payload];
    },
    clearSelectedIds: (state, action) => {
      state.selectedIds = [];
    },
    setCurrentTasksPage: (state, action) => {
      state.currentPage = action.payload;
    },
    selectAllTasks: (state, action) => {
      state.isSelectedAll = action.payload;

      if (!action.payload) {
        state.selectedIds = [];
      }
    },
  },
});

export const {
  addTasksId,
  clearSelectedIds,
  setCurrentTasksPage,
  selectAllTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
