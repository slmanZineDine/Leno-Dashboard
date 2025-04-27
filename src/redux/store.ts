import { configureStore } from "@reduxjs/toolkit";
// API
import { apiSlice } from "./api/apiSlice";
// Slices
import app from "./slices/app/appSlice";
import auth from "./slices/auth/authSlice";
import permissions from "./slices/permissions/permissionsSlice";
import notifications from "./slices/notifications/notificationsSlice";
import { Environments } from "constants/enums";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth,
    app,
    permissions,
    notifications,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

  // Disable Redux DevTools
  devTools: import.meta.env.VITE_NODE_ENV === Environments.DEV,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
