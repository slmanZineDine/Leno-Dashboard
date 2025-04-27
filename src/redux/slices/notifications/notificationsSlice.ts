import { RootState } from "@redux/store";
import { createSlice } from "@reduxjs/toolkit";
// Type
import type { TNotification } from "@customTypes/notification/notification";

type TNotificationsSlice = {
  notifications: TNotification[];
  pagination: TPagination;
};

const initialState: TNotificationsSlice = {
  notifications: [],
  pagination: { pageCount: 0, currentPage: 1 },
};

const notificationsSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
  },
});

// ========================== Selectors ==========================
export const selectNotificaitions = (state: RootState) =>
  state.notifications.notifications;
export const selectPaginaiton = (state: RootState) =>
  state.notifications.pagination;

export const { setNotifications, setPagination } = notificationsSlice.actions;
export default notificationsSlice.reducer;
