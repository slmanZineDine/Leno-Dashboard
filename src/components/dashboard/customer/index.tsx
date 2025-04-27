// Third-Party =====> React-Router
import { Link } from "react-router-dom";
// My-Components
import Can from "@components/guard/Can";
import UserWithImage from "@components/common/tables/UserWithImage";
import LoadingSpinner from "@components/common/Loading/LoadingSpinner";
// API
import { useDeleteCustomerMutation } from "@redux/services/users/usersApiSlice";
// Icons
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
// Libs
import toastifyMsg from "@libs/reactToastify/toastifyMessage";
import confirmDeletion from "@libs/sweetalert/confirmDeletion";
// Data
import { paths } from "@routes/paths";
// Types
import type { TUser } from "@customTypes/user/user";

type TCustomerProps = TUser;

const Customer = (props: TCustomerProps) => {
  // ################### RTK QUERY ###################
  // ===== DELETE =====
  const [deleteCustomer, { isLoading: isDeleting }] =
    useDeleteCustomerMutation();

  // ################### ASYNC REQUEST ###################
  const handleDelete = async () => {
    const willDelete = await confirmDeletion();
    if (willDelete) {
      try {
        await deleteCustomer(props?.id).unwrap();

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
          username={`${props?.firstName} ${props?.lastName}`}
          link={`${paths.customers.root}/${props?.id}`}
          imageURL={props?.image}
        />
      </td>
      <td>{props?.phone}</td>
      <td>{props?.address?.country}</td>
      <td>
        {isDeleting ? (
          <LoadingSpinner size="loading-md" color="text-primary" />
        ) : (
          <div className="flex-center gap-2">
            <Can action="update" name="customers">
              <Link
                to={`${paths.customers.editCustomer}/${props?.id}`}
                className="icon-wraper edit-icon"
              >
                <MdOutlineModeEdit />
              </Link>
            </Can>
            <Can action="delete" name="customers">
              <button
                className="icon-wraper delete-icon"
                onClick={handleDelete}
              >
                <RiDeleteBin6Line />
              </button>
            </Can>
          </div>
        )}
      </td>
    </>
  );
};

export default Customer;
