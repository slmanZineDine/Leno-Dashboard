// React
import { UIEvent, useEffect } from "react";
// My-Components
import ExcerptNotification from "@components/common/navbar/notification/ExcerptNotification";
// Types
import type { TNotification } from "@customTypes/notification/notification";
import { useAppSelector } from "@redux/hooks";
import {
  selectPaginaiton,
  // setNotifications,
  // setPagination,
} from "@redux/slices/notifications/notificationsSlice";

import LoadingSpinner from "@components/common/Loading/LoadingSpinner";

type TNotificationsListProps = {
  notifications: TNotification[];
  unReadCount: number;
  setUnReadCount: (count: number) => void;
};

const NotificationsList = ({
  notifications,
  unReadCount,
  setUnReadCount,
}: TNotificationsListProps) => {
  // ################### REDUX HOOKS ###################
  // const dispatch = useAppDispatch();
  const pagination = useAppSelector(selectPaginaiton);

  // ################### HANDLER ###################
  // ===== PAGINATION =====
  const handlePagination = async (event: UIEvent<HTMLElement>) => {
    const { scrollTop, offsetHeight, scrollHeight } = event.currentTarget;
    const fullHeigth = scrollTop + offsetHeight;

    const { pageCount, currentPage } = pagination;

    if (fullHeigth >= scrollHeight && pageCount > currentPage) {
      try {
        // const res = await getAllNotifications(currentPage + 1).unwrap();
        // dispatch(
        //   setPagination({
        //     ...pagination,
        //     currentPage: currentPage + 1,
        //   }),
        // );
        // dispatch(
        //   setNotifications([...notifications, ...res.data.notifications]),
        // );
      } catch (err) {
        console.log(err);
      }
    }
  };

  // ################### SIDE EFFECT ###################
  useEffect(() => {
    // Clean Up For Reset Read Count To Zero **After** User Close Notification Dropdown
    // This Action Should Only Occure **After** To Preserve First Time Opening Count.
    return () => {
      if (unReadCount > 0) setUnReadCount(0);
    };
  }, []);

  return (
    <ul
      className="navbar-scroll max-h-96 overflow-y-auto"
      onScroll={handlePagination}
    >
      {notifications.length > 0 ? (
        notifications.map((notification, i) => (
          <li
            key={i}
            className={`border-border border-b p-3 ${i < unReadCount ? "dark:bg-primary/5 bg-sky-100" : "hover:bg-hover"} `}
          >
            <ExcerptNotification
              title={notification?.title}
              body={notification?.body}
              created_at={notification?.created_at}
            />
          </li>
        ))
      ) : (
        <li className="flex-center h-full p-3">لا يوجد اشعارت.</li>
      )}
      {false && (
        <li className="flex-center p-4">
          <LoadingSpinner />
        </li>
      )}
    </ul>
  );
};

export default NotificationsList;
