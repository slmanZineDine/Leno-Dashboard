// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// My-Components
import StatisticBox from "./StatisticBox";
// Icons
import {
  FaUserLock,
  FaUserCheck,
  FaUserClock,
  FaUserMinus,
} from "react-icons/fa6";

const statusDetails = [
  { id: 1, name: "active", value: 70, icon: <FaUserCheck />, color: "#4ade80" },
  { id: 2, name: "pending", value: 5, icon: <FaUserClock />, color: "#facc15" },
  {
    id: 3,
    name: "suspended",
    value: 4,
    icon: <FaUserLock />,
    color: "#fb923c",
  },
  { id: 4, name: "banned", value: 3, icon: <FaUserMinus />, color: "#f87171" },
];

const UserStatusStatistics = () => {
  // ################### LOCALES ###################
  const { t } = useTranslation();

  return (
    <>
      {statusDetails.map((status) => (
        <StatisticBox
          key={status.id}
          title={t(`common.${status.name}`)}
          count={status?.value}
          icon={status.icon}
          bgColor={status.color}
        />
      ))}
    </>
  );
};

export default UserStatusStatistics;
