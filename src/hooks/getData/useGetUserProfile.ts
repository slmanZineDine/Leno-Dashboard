// React
import { useEffect, useState } from "react";
// Third-Party =====> redux
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  logOut,
  setCredential,
  selectIsAdmin,
  selectIsSupervisor,
} from "@redux/slices/auth/authSlice";
// API
import { usersApiSlice } from "@redux/services/users/usersApiSlice";
// Types
import type { TUser } from "@customTypes/user/user";

const useGetUserProfile = () => {
  // ################### REDUX HOOKS ###################
  const dispatch = useAppDispatch();
  const isAdmin = useAppSelector(selectIsAdmin);
  const isSupervisor = useAppSelector(selectIsSupervisor);

  // ################### REACT HOOKS ###################
  const [isLoading, setIsLoading] = useState(true);

  // ################### ASYNC REQUSET ###################
  const getProfile = async () => {
    let profile: TUser;

    try {
      if (isAdmin) {
        profile = await dispatch(
          usersApiSlice.endpoints.getAdminProfile.initiate(),
        ).unwrap();
      } else if (isSupervisor) {
        profile = await dispatch(
          usersApiSlice.endpoints.getAdminProfile.initiate(),
        ).unwrap();
      } else {
        dispatch(logOut());
        return;
      }

      const { id, firstName, lastName, image, email } = profile;

      dispatch(
        setCredential([
          { key: "userId", value: id },
          { key: "username", value: `${firstName} ${lastName}` },
          { key: "image", value: image },
          { key: "email", value: email },
        ]),
      );
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // ################### SIDE EFFECT ###################
  useEffect(() => {
    getProfile();
  }, []);

  return [isLoading];
};

export default useGetUserProfile;
