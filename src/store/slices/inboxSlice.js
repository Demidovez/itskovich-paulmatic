import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

export const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {
    doSomething: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {} = inboxSlice.actions;

export default inboxSlice.reducer;
