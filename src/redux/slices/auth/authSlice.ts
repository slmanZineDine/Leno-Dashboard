// Redux
import type { RootState } from "@redux/store";
import { createSlice } from "@reduxjs/toolkit";
// Third-Party
import Cookies from "js-cookie";
// Data
import { UserRoles } from "constants/enums";
// Types
import type { TAuth } from "@customTypes/auth/auth";

const initialState: TAuth = {
  token: null,
  deviceToken: null,
  // isLogging: null,

  // ===== Credentials =====
  userId: null,
  username: null,
  image: null,
  email: null,

  // ===== User Type =====
  role: null,
  isAdmin: false,
  isSupervisor: false,
};
interface IActionPayload {
  key: keyof TAuth;
  value: any;
}

interface IAction {
  payload: IActionPayload[];
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCookies(state: TAuth, action: IAction) {
      if (Array.isArray(action.payload)) {
        action.payload.forEach(({ key, value }) => {
          const val = typeof value === "string" ? value : String(value);

          // ===== Store inside Redux =====
          (state[key] as typeof value) = val;

          // ===== Store inside Cookies ====
          Cookies.set(key, val, {
            secure: true,
            sameSite: "strict",
          });
        });
      } else {
        throw new Error("The parameter should be an array of objects.");
      }
    },
    getCookies(state: TAuth) {
      state.token = Cookies.get("token") ?? null;

      const role = Cookies.get("role") ?? null;

      state.role = role;
      state.isAdmin = role === UserRoles.Admin;
      state.isSupervisor = role === UserRoles.Supervisor;
    },
    setCredential(state: TAuth, action: IAction) {
      if (Array.isArray(action.payload)) {
        action.payload.forEach(({ key, value }) => {
          (state[key] as typeof value) = value;
        });
      } else {
        throw new Error("The parameter should be an array of objects.");
      }
    },
    logOut() {
      const cookiesData = ["token", "isLogging", "role"];
      for (let i = 0; i < cookiesData.length; i++)
        Cookies.remove(cookiesData[i]);

      window.location.reload();
    },
  },
});

// ========================== Token ==========================
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentDeviceToken = (state: RootState) =>
  state.auth.deviceToken;

// ========================== Credentials ==========================
export const selectCurrenTUserId = (state: RootState) => state.auth.userId;
export const selectCurrenTUsername = (state: RootState) => state.auth.username;
export const selectCurrentImage = (state: RootState) => state.auth.image;
export const selectCurrentEmail = (state: RootState) => state.auth.email;

// ========================== User Type ==========================
export const selectCurrentRole = (state: RootState) => state.auth.role;
export const selectIsAdmin = (state: RootState) => state.auth.isAdmin;
export const selectIsSupervisor = (state: RootState) => state.auth.isSupervisor;

export const { setCookies, getCookies, setCredential, logOut } =
  authSlice.actions;
export default authSlice.reducer;
