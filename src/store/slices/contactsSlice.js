import { createSlice } from "@reduxjs/toolkit";

// Пока редусер не нужен, работа идет через RTK
// возможно понадобиться в будущем

const initialState = {
  contacts: [],
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});

export const { increment, decrement, incrementByAmount } =
  contactsSlice.actions;

export default contactsSlice.reducer;
