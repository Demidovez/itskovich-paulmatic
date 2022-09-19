import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./slices/contactsSlice";
import { contactsApi } from "./api/contacts";
import { personsApi } from "./api/persons";
import { companiesApi } from "./api/companies";

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
    [personsApi.reducerPath]: personsApi.reducer,
    [companiesApi.reducerPath]: companiesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    contactsApi.middleware,
    personsApi.middleware,
    companiesApi.middleware,
  ],
});
