// React
import { useEffect, useState } from "react";
// Third-Party =====> redux
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  setPagination,
  setNotifications,
  selectNotificaitions,
} from "@redux/slices/notifications/notificationsSlice";
// Data
import { NOTIFICATIONS } from "@data/index";

const useNotificaitions = () => {
  // ################### REDUX HOOKS ###################
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectNotificaitions);

  // ################### REACT HOOKS ###################
  const [unReadCount, setUnReadCount] = useState(0);

  // ################### HADNDLER ###################
  // ===== Get User's Notification
  const handleGetNotification = async () => {
    try {
      dispatch(setNotifications(NOTIFICATIONS));
      dispatch(
        setPagination({
          currentPage: 1,
          pageCount: Math.ceil(NOTIFICATIONS.length / 3),
        }),
      );
      setUnReadCount(3);
    } catch (err) {
      console.log(err);
    }
  };

  // ===== Mark As Readed
  const handleMarkNotificationRead = async () => {
    try {
      // setUnReadCount(0);
    } catch (err) {
      console.log(err);
    }
  };

  // ################### SIDE EFFECT ###################
  useEffect(() => {
    handleGetNotification();
  }, []);

  // useEffect(() => {
  //   if (firebaseNotification) {
  //     setUnReadCount(unReadCount + 1);
  //     dispatch(setNotifications([firebaseNotification, ...notifications]));

  //     // Add and Play notification sound
  //     const notificationAudio = new Audio(notificationSound);
  //     if (isUserInteracted) {
  //       notificationAudio.play();
  //     }

  //     if (!isUserInteracted) {
  //       document.addEventListener("click", handleUserInteraction);
  //     }

  //     return () => {
  //       document.removeEventListener("click", handleUserInteraction);
  //     };
  //   }
  // }, [firebaseNotification]);

  return {
    unReadCount,
    setUnReadCount,
    notifications,
    handleMarkNotificationRead,
  };
};

export default useNotificaitions;
