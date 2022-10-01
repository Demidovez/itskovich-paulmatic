import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedIds: [],
  isSelectedAll: false,
  currentPage: 0,
  cached: [],
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
    setTasksToCache: (state, action) => {
      state.cached = action.payload;
    },
    executeCachedTask: (state, action) => {
      const executedTask = action.payload;
      state.cached = state.cached.map((task) =>
        task.id === executedTask.id ? executedTask : task
      );
    },
    skipCachedTask: (state, action) => {
      const skippedTask = action.payload;
      state.cached = state.cached.map((task) =>
        task.id === skippedTask.id ? skippedTask : task
      );
    },
  },
});

export const {
  addTasksId,
  clearSelectedIds,
  setCurrentTasksPage,
  selectAllTasks,
  setTasksToCache,
  executeCachedTask,
  skipCachedTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
