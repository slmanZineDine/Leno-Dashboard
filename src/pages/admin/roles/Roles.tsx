// My-Components
import Table from "@components/common/tables/Table";
import BoxHeader from "@components/common/box/BoxHeader";
import Role from "@components/dashboard/admin/roles/Role";
import TableRowList from "@components/common/tableRows/TableRowList";
import HeadingSection from "@components/common/sections/HeadingSection";
// Icons
import { FaIdCard } from "react-icons/fa6";
// Type
import type { TRole } from "@customTypes/role/role";

const ROLES: TRole[] = [
  { id: 1, name: "admin" },
  { id: 2, name: "supervisor" },
  { id: 3, name: "customer" },
];

const Roles = () => {
  // ################### CONTENT ###################
  const tableHeader = [
    { id: 1, title: "Num", isShow: true },
    { id: 2, title: "Name", isShow: true },
    { id: 3, title: "", isShow: true },
  ];

  return (
    <>
      {/* ========================== Main Heading ========================== */}
      <HeadingSection title="Roles" />

      {/* ========================== Content ========================== */}
      <section className="container">
        <div className="flex justify-end">
          <BoxHeader
            title="Roles List"
            icon={<FaIdCard className="text-heading text-2xl" />}
          />
        </div>

        {/* ========================== Table ========================== */}
        <Table
          tableHeader={tableHeader}
          minWidth="min-w-[350px]"
          coverClassName="mt-6"
        >
          <TableRowList
            records={ROLES}
            renderItem={(record, i) => <Role index={i} {...record} />}
            isLoading={false}
            colCount={tableHeader.length}
            noRecordMsg="There are no roles."
          />
        </Table>
      </section>
    </>
  );
};

export default Roles;
