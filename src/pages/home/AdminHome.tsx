// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// My-Components
import BoxHeader from "@components/common/box/BoxHeader";
import BestProducts from "@components/dashboard/product/BestProducts";
import PopularClients from "@components/dashboard/home/PopularClients";
import HomeStatistics from "@components/dashboard/home/HomeStatistics";
import HeadingSection from "@components/common/sections/HeadingSection";
import RecentActivities from "@components/dashboard/home/RecentActivities";
// Icons
import { GiShoppingBag } from "react-icons/gi";
// Data
import { pathTitleMap } from "@routes/pathTitleMap";

const AdminHome = () => {
  // ################### LOCALES ###################
  const { t } = useTranslation();

  return (
    <>
      {/* ========================== Main Heading ========================== */}
      <HeadingSection title={t(pathTitleMap["/"])} hasBreadcrumbs={false} />

      {/* ========================== Statistics ========================== */}
      <HomeStatistics />

      {/* ========================== Best Selling Services ========================== */}
      <section className="container my-12">
        <BoxHeader
          title={t("home.mostRequestedServices")}
          icon={<GiShoppingBag className="text-heading text-2xl" />}
        />
        <BestProducts />
      </section>

      {/* ========================== Best Selling Services ========================== */}
      <section className="max-6xl:flex-col container flex justify-between gap-4">
        <PopularClients />
        <RecentActivities />
      </section>
    </>
  );
};

export default AdminHome;
