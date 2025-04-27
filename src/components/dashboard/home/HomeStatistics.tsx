// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// My-Components
import ComplaintsList from "./ComplaintsList";
import StatisticBoxPro from "@components/common/statistics/StatisticBoxPro";
// icons
import { FaStar } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi";
import { GiShoppingBag } from "react-icons/gi";
import { MdPointOfSale } from "react-icons/md";
// Data
import { CURRENCY } from "constants/constants";

const HomeStatistics = () => {
  // ################### LOCALES ###################
  const { t } = useTranslation();

  return (
    <div className="4xl:grid-rows-3 container mb-8 grid grid-cols-4 grid-rows-[200px_496px] gap-4">
      <StatisticBoxPro
        title={t("home.totalSales")}
        icon={<MdPointOfSale />}
        containerClassName="bg-sales-gradient bg- col-span-4 c2xl:col-span-2"
        countUpOptions={{
          decimals: 0,
          decimal: ".",
          prefix: CURRENCY,
          end: 500_000,
        }}
      />
      <StatisticBoxPro
        title={t("home.users")}
        icon={<HiUsers />}
        containerClassName="bg-users-gradient col-span-4 c2xl:col-span-2 c2xl:col-start-3"
        countUpOptions={{ end: 200 }}
      />
      <ComplaintsList />
      <StatisticBoxPro
        title={t("home.products")}
        icon={<GiShoppingBag className="text-white" />}
        containerClassName="bg-booking-gradient text-white col-span-4 row-start-3 4xl:col-span-2 4xl:col-start-3 4xl:row-start-2"
        countUpOptions={{ end: 194 }}
      />
      <StatisticBoxPro
        title={t("home.ratings")}
        icon={<FaStar className="text-white" />}
        containerClassName="bg-ratings-gradient col-span-4 row-start-4 text-white 4xl:col-span-2 4xl:col-start-3 4xl:row-start-3"
        countUpOptions={{ end: 372 }}
      />
    </div>
  );
};

export default HomeStatistics;
