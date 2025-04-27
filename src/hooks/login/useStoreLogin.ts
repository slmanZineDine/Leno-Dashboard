// Third-Party =====> redux
import { useAppDispatch } from "@redux/hooks";
import { setCookies, setCredential } from "@redux/slices/auth/authSlice";
// Third-Party =====> react-router-dom
import { useLocation, useNavigate } from "react-router-dom";
// Libs
import toastifyMsg from "@libs/reactToastify/toastifyMessage";
// Data
import { paths } from "@routes/paths";
import { UserRoles } from "constants/enums";
import { ADMIN_INFO, SUPERVISOR_INFO } from "constants/constants";

const useStoreLogin = () => {
  // ################### REDUX HOOKS ###################
  const dispatch = useAppDispatch();

  // ################### REACT-ROUTER HOOKS ###################
  const navigate = useNavigate();
  const { state } = useLocation();
  const to = state?.from || paths.home.root; // Redirect user to page has came from

  // ################### HANDLER ###################
  const storeUserData = (user: any) => {
    const { accessToken, id, username, firstName, lastName } = user;

    const isAdmin = ADMIN_INFO.username === username;
    const isSupervisor = SUPERVISOR_INFO.username === username;
    const role = isAdmin ? "admin" : "supervisor";

    if (isAdmin || isSupervisor) {
      dispatch(
        setCookies([
          { key: "token", value: accessToken },
          { key: "role", value: role },
        ]),
      );
      dispatch(
        setCredential([
          { key: "token", value: accessToken },
          { key: "userId", value: id },
          { key: "username", value: `${firstName} ${lastName}` },
          {
            key: "role",
            value: isAdmin ? UserRoles.Admin : UserRoles.Supervisor,
          },
          { key: "isAdmin", value: isAdmin },
          { key: "isSupervisor", value: isSupervisor },
        ]),
      );

      // Store Data
      navigate(to, { replace: true });
    } else {
      toastifyMsg("Invalid Credentials.", "error");
    }
  };

  return storeUserData;
};

export default useStoreLogin;
