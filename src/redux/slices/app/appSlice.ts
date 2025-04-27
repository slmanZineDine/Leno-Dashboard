import { RootState } from "@redux/store";
import { createSlice } from "@reduxjs/toolkit";

type TApp = {
  theme: string;
  isShowAside: boolean;
};

const initialState: TApp = {
  theme: localStorage.getItem("theme") || "light",
  isShowAside: document.body.clientWidth > 991,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setIsShowAside: (state, action) => {
      state.isShowAside = action.payload;
    },
  },
});

// ========================== Selectors ==========================
export const selectCurrentTheme = (state: RootState) => state.app.theme;
export const selectIsShowAside = (state: RootState) => state.app.isShowAside;

export const { setTheme } = appSlice.actions;
export default appSlice.reducer;
