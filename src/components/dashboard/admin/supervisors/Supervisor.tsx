// Third-Party =====> React-Router
import { Link } from "react-router-dom";
// My-Components
import UserWithImage from "@components/common/tables/UserWithImage";
// Icons
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
// Libs
import toastifyMsg from "@libs/reactToastify/toastifyMessage";
import confirmDeletion from "@libs/sweetalert/confirmDeletion";
// Data
import { paths } from "@routes/paths";
import { ACCOUNT_STATUS_COLORS } from "constants/constants";

const Supervisor = (props: {
  id: number;
  name: string;
  phone: string;
  country: string;
  status: string;
}) => {
  // ################### ASYNC REQUEST ###################
  const handleDelete = async () => {
    const willDelete = await confirmDeletion();
    if (willDelete) {
      try {
        toastifyMsg("Operation completed successfully", "success");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <td>
        <UserWithImage
          username={props?.name}
          link={`${paths.supervisors.root}/4`}
          imageURL="https://dummyjson.com/icon/ellaa/128"
        />
      </td>
      <td>{props?.phone}</td>
      <td>{props?.country}</td>
      <td>
        <span className={ACCOUNT_STATUS_COLORS[props?.status]}>
          {props?.status}
        </span>
      </td>
      <td>
        <div className="flex-center gap-2">
          <Link
            to={`${paths.supervisors.editSupervisor}/4`}
            className="icon-wraper edit-icon"
          >
            <MdOutlineModeEdit />
          </Link>

          <button className="icon-wraper delete-icon" onClick={handleDelete}>
            <RiDeleteBin6Line />
          </button>
        </div>
      </td>
    </>
  );
};

export default Supervisor;
