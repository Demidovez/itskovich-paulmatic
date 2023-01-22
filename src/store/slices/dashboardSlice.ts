import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeAccountId: 0,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setActiveAccountId: (state, action) => {
      state.activeAccountId = action.payload;
    },
  },
});

export const { setActiveAccountId } = dashboardSlice.actions;

export default dashboardSlice.reducer;
