// Third-Party ====> i18next
import { useTranslation } from "react-i18next";
// My-Components
import NavDropdown from "@components/common/dropdown/NavDropdown";
import NotificationsList from "@components/common/navbar/notification/NotificationsList";
// My-Hooks
import useNotificaitions from "@hooks/notifications/useNotificaitions";
// Icons
import { RiNotification4Fill, RiNotification4Line } from "react-icons/ri";

const NavNotifications = () => {
  // ################### LOCALES ###################
  const { t } = useTranslation();

  // ################### CUSTOM HOOKS ###################
  const {
    unReadCount,
    setUnReadCount,
    notifications,
    handleMarkNotificationRead,
  } = useNotificaitions();

  return (
    <NavDropdown
      icon={
        <button
          className="navbar-icon relative"
          onClick={() => {
            if (unReadCount > 0) handleMarkNotificationRead();
          }}
        >
          {unReadCount > 0 ? (
            <>
              <RiNotification4Fill className="animate-wiggle" />
              <span className="flex-center absolute top-1 right-1 size-5 translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 text-xs text-white">
                {unReadCount}
              </span>
            </>
          ) : (
            <RiNotification4Line />
          )}
        </button>
      }
      dropdownClassName="end-4 overflow-hidden w-[calc(100%-2rem)] cmd:w-96"
    >
      <div className="border-border bg-activeBg border-b px-3 py-4 text-start text-xl">
        <h2 className="text-primary">{t("navbar.notifications")}</h2>
      </div>
      <NotificationsList
        notifications={notifications}
        unReadCount={unReadCount}
        setUnReadCount={setUnReadCount}
      />
    </NavDropdown>
  );
};

export default NavNotifications;
