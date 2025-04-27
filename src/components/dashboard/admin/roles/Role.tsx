// Third-Party =====> React-Router
import { Link } from "react-router-dom";
// Icons
import { IoEyeOutline } from "react-icons/io5";
// Data
import { paths } from "@routes/paths";
// Types
import type { TRole } from "@customTypes/role/role";

type TRoleProps = TRole & { index: number };

const Role = (props: TRoleProps) => {
  return (
    <>
      <td>{props?.index + 1}</td>
      <td className="capitalize">{props?.name}</td>
      <td>
        <div className="flex-center gap-2">
          <Link
            to={`${paths.roles.editRole}/${props?.name}`}
            className="icon-wraper edit-icon"
          >
            <IoEyeOutline />
          </Link>
        </div>
      </td>
    </>
  );
};

export default Role;
