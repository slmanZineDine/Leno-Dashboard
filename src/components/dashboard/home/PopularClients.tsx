// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// My-Components
import Table from "@components/common/tables/Table";
import BoxHeader from "@components/common/box/BoxHeader";
// Icons
import { RiUserStarFill } from "react-icons/ri";
// Data
import { customerData } from "@data/index";
import { CURRENCY } from "constants/constants";

const PopularClients = () => {
  // ################### LOCALES ###################
  const { t } = useTranslation();

  // ################### CONTENT ###################
  const tableHeader = [
    { id: 1, title: t("tables.name"), isShow: true },
    { id: 2, title: t("tables.completedOrders"), isShow: true },
    { id: 3, title: t("tables.totalPaid"), isShow: true },
  ];

  return (
    <div className="max-6xl:w-full w-1/2">
      <BoxHeader
        title={t("home.featuredCustomers")}
        icon={<RiUserStarFill className="text-heading text-2xl" />}
        className="mb-4"
      />

      {/* ========================== Table ========================== */}
      <Table
        tableHeader={tableHeader}
        minWidth="min-w-[400px]"
        coverClassName="mt-6"
        isLoading={false}
        noDataMsg="There are no featured customers."
      >
        {customerData.map((client) => (
          <tr key={client?.id}>
            <td>{client?.name}</td>
            <td>{client?.completedOrders}</td>
            <td>
              {CURRENCY}
              {client?.totalPaid}
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default PopularClients;
