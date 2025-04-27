// My-Components
import Table from "../../tables/Table";
// Icons
import { FaUserLock } from "react-icons/fa6";

const PermissionInformation = () => {
  // ################### CONTENT ###################
  const tableHeader = [
    { id: 1, title: "الدور", isShow: true },
    { id: 2, title: "عرض", isShow: true },
    { id: 3, title: "إضافة", isShow: true },
    { id: 4, title: "تعديل", isShow: true },
    { id: 5, title: "حذف", isShow: true },
    { id: 6, title: "طباعة", isShow: true },
  ];

  return (
    <div className="mt-8 border-t-2 border-dashed pt-4">
      <h2 className="mb-8 flex items-center gap-2 text-xl font-bold">
        <FaUserLock />
        الصلاحيات
      </h2>
      {/* ========================== Table ========================== */}
      <Table
        tableHeader={tableHeader}
        minWidth="min-w-[700px]"
        coverClassName="mt-6"
      >
        <tr>
          <td>الموظفين</td>
          <td>
            <input type="checkbox" />
          </td>
          <td>
            <input type="checkbox" />
          </td>
          <td>
            <input type="checkbox" />
          </td>
          <td>
            <input type="checkbox" />
          </td>
          <td>
            <input type="checkbox" />
          </td>
        </tr>
      </Table>
    </div>
  );
};

export default PermissionInformation;
