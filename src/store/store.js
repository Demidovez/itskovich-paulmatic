import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./slices/contactsSlice";
import b2bFilterReducer from "./slices/b2bFilterSlice";
import tablesReducer from "./slices/tablesSlice";
import tasksReducer from "./slices/tasksSlice";
import commonReducer from "./slices/commonSlice";
import sequencesReducer from "./slices/sequencesSlice";
import sequenceMasterReducer from "./slices/sequenceMasterSlice";
import inboxReducer from "./slices/inboxSlice";
import dashboardReducer from "./slices/dashboardSlice";
import { contactsApi } from "./api/contacts";
import { personsApi } from "./api/persons";
import { companiesApi } from "./api/companies";
import { tasksApi } from "./api/tasks";
import { commonApi } from "./api/common";
import { sequencesApi } from "./api/sequences";
import { notificationsApi } from "./api/notifications";
import { foldersApi } from "./api/folders";
import { inboxApi } from "./api/inbox";
import { loginApi } from "./api/login";
import { dashboardApi } from "./api/dashboard";

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: b2bFilterReducer,
    tables: tablesReducer,
    tasks: tasksReducer,
    common: commonReducer,
    sequences: sequencesReducer,
    sequenceMaster: sequenceMasterReducer,
    inbox: inboxReducer,
    dashboard: dashboardReducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
    [personsApi.reducerPath]: personsApi.reducer,
    [companiesApi.reducerPath]: companiesApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [commonApi.reducerPath]: commonApi.reducer,
    [sequencesApi.reducerPath]: sequencesApi.reducer,
    [notificationsApi.reducerPath]: notificationsApi.reducer,
    [foldersApi.reducerPath]: foldersApi.reducer,
    [inboxApi.reducerPath]: inboxApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    contactsApi.middleware,
    personsApi.middleware,
    companiesApi.middleware,
    tasksApi.middleware,
    commonApi.middleware,
    sequencesApi.middleware,
    notificationsApi.middleware,
    foldersApi.middleware,
    inboxApi.middleware,
    loginApi.middleware,
    dashboardApi.middleware,
  ],
});
