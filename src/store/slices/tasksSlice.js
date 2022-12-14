import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedIds: [],
  isSelectedAll: false,
  currentPage: 0,
  cached: {},
  isFetching: false,
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
      state.isFetching = false;
    },
    setTasksRequestStatus: (state, action) => {
      state.isFetching = action.payload;
    },
    executeCachedTask: (state, action) => {
      const { id, Status, Alertness } = action.payload || {};
      state.cached.Items = state.cached.Items.map((task) =>
        task.id === id ? { ...task, Status, Alertness } : task
      );
    },
    skipCachedTask: (state, action) => {
      const { id, Status, Alertness } = action.payload || {};
      state.cached.Items = state.cached.Items.map((task) =>
        task.id === id ? { ...task, Status, Alertness } : task
      );
    },
    replyCachedTask: (state, action) => {
      const { id, Status, Alertness } = action.payload || {};
      state.cached.Items = state.cached.Items.map((task) =>
        task.id === id ? { ...task, Status, Alertness } : task
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
  replyCachedTask,
  setTasksRequestStatus,
} = tasksSlice.actions;

export default tasksSlice.reducer;
