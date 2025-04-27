// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// My-Components
import Table from "@components/common/tables/Table";
import BestProdcut from "@components/dashboard/home/BestProdcut";
import TableRowList from "@components/common/tableRows/TableRowList";
// Data
import { bestProducts } from "@data/index";

const BestProducts = () => {
  // ################### LOCALES ###################
  const { t } = useTranslation();

  // ################### CONTENT ###################
  const tableHeader = [
    { id: 1, title: t("tables.product"), isShow: true },
    { id: 2, title: t("tables.price"), isShow: true },
    { id: 3, title: t("tables.order"), isShow: true },
    { id: 4, title: t("tables.rating"), isShow: true },
  ];

  return (
    <Table
      tableHeader={tableHeader}
      minWidth="min-w-[700px]"
      coverClassName="mt-6"
    >
      <TableRowList
        records={bestProducts}
        renderItem={(record) => <BestProdcut {...record} />}
        colCount={tableHeader.length}
      />
    </Table>
  );
};

export default BestProducts;
