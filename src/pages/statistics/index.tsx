// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// My-Components
import HeadingSection from "@components/common/sections/HeadingSection";
import UsersStatistics from "@components/dashboard/statistics/UsersStatistics";
import ProductsByCountry from "@components/dashboard/statistics/ProductsByCountry";
import RatingsStatistics from "@components/dashboard/statistics/ratings/RatingsStatistics";
import OrdersStatistics from "@components/dashboard/orders/OrdersStatistics";
// Data
import { pathTitleMap } from "@routes/pathTitleMap";
import StatisticBoxPro from "@components/common/statistics/StatisticBoxPro";
import { IoCart } from "react-icons/io5";

const Statistics = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* ========================== Main Heading ========================== */}
      <HeadingSection title={t(pathTitleMap["statistics"])} />

      {/* ========================== Users ========================== */}
      <UsersStatistics />

      {/* ========================== Services Ratings & Orders ========================== */}
      <section className="4xl:flex-row container mb-8 flex flex-col-reverse gap-6">
        <RatingsStatistics />
        <StatisticBoxPro
          title={t("statistics.sections.orders.totalOrders")}
          icon={<IoCart className="text-white" />}
          containerClassName="bg-booking-gradient text-center p-6! text-white w-full"
          headerContainer="4xl:max-[1100]:flex-center 4xl:max-[1100]:flex-col"
          countUpClassName="4xl:max-[1100]:text-xl"
          countUpOptions={{ end: 240 }}
        />
      </section>

      {/* ========================== Orders ========================== */}
      <OrdersStatistics />

      {/* ========================== Services By City ========================== */}
      <ProductsByCountry />
    </>
  );
};

export default Statistics;
