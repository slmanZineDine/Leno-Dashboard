import { useTranslation } from "react-i18next";
// My-Components
import StatisticBox from "@components/common/statistics/StatisticBox";
// Icons
import { HiUsers } from "react-icons/hi";
import { FaUsers } from "react-icons/fa6";
import { AiFillAlert } from "react-icons/ai";
import { GiShoppingBag } from "react-icons/gi";

const UsersStatistics = () => {
  const { t } = useTranslation();

  return (
    <section className="5xl:grid-cols-2 container mb-8 grid grid-cols-1 gap-6">
      <StatisticBox
        title={t("statistics.sections.users.title")}
        count={170}
        icon={<FaUsers />}
        bgColor="#34e32d"
      />
      <StatisticBox
        title={t("pages.customers")}
        count={166}
        icon={<HiUsers />}
        bgColor="#4880e2"
      />
      <StatisticBox
        title={t("common.products")}
        count={130}
        icon={<GiShoppingBag />}
        bgColor="#9985e7"
      />
      <StatisticBox
        title={t("pages.complaints")}
        count={7}
        icon={<AiFillAlert />}
        bgColor="#ff7c7c"
      />
    </section>
  );
};

export default UsersStatistics;
