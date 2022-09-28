import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./slices/contactsSlice";
import b2bFilterReducer from "./slices/b2bFilterSlice";
import tablesReducer from "./slices/tablesSlice";
import tasksReducer from "./slices/tasksSlice";
import { contactsApi } from "./api/contacts";
import { personsApi } from "./api/persons";
import { companiesApi } from "./api/companies";
import { tasksApi } from "./api/tasks";

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: b2bFilterReducer,
    tables: tablesReducer,
    tasks: tasksReducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
    [personsApi.reducerPath]: personsApi.reducer,
    [companiesApi.reducerPath]: companiesApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    contactsApi.middleware,
    personsApi.middleware,
    companiesApi.middleware,
    tasksApi.middleware,
  ],
});
