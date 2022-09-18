import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./slices/contactsSlice";
import { contactsApi } from "./api/contacts";

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});
