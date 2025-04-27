// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// My-Components
import Can from "@components/guard/Can";
import OrdersTable from "@components/dashboard/orders/OrdersTable";
import HeadingSection from "@components/common/sections/HeadingSection";
import OrdersStatistics from "@components/dashboard/orders/OrdersStatistics";
// Data
import { pathTitleMap } from "@routes/pathTitleMap";

const Orders = () => {
  // ################### LOCALES ###################
  const { t } = useTranslation();

  return (
    <>
      {/* ========================== Main Heading ========================== */}
      <HeadingSection title={t([pathTitleMap["orders"]])} />

      {/* ========================== Statistics ========================== */}
      <Can action="view" name="statistics">
        <OrdersStatistics />
      </Can>

      {/* ========================== Orders Table ========================== */}
      <OrdersTable />
    </>
  );
};

export default Orders;
