// React
import { PropsWithChildren } from "react";
// Third-Party =====> redux
import { store } from "@redux/store";
import { Provider } from "react-redux";
import { getCookies } from "@redux/slices/auth/authSlice";

// =================== Get Initial Values ===================
store.dispatch(getCookies());

const AppProvider = ({ children }: PropsWithChildren) => {
  return <Provider store={store}>{children}</Provider>;
};

export default AppProvider;
