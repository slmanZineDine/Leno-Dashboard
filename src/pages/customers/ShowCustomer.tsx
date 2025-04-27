// Third-Party =====> React-Router
import { useNavigate, useParams } from "react-router-dom";
// My-Components
import Loading from "@components/common/Loading/Loading";
import Profile from "@components/dashboard/profile/Profile";
// API
import {
  useGetCustomerQuery,
  useDeleteCustomerMutation,
} from "@redux/services/users/usersApiSlice";
// Libs
import toastifyMsg from "@libs/reactToastify/toastifyMessage";
import confirmDeletion from "@libs/sweetalert/confirmDeletion";
// Data
import { paths } from "@routes/paths";

const ShowCustomer = () => {
  // ################### REACT ROUTER HOOKS ###################
  const { prefix: customerId } = useParams() as TParamsType;
  const navigate = useNavigate();

  // ################### RTK QUERY ###################
  // ===== GET =====
  const { data: profile, isLoading, error } = useGetCustomerQuery(customerId);

  // ===== DELETE =====
  const [deleteCustomer, { isLoading: isDeleting }] =
    useDeleteCustomerMutation();

  // ################### ASYNC REQUEST ###################
  const handleDelete = async () => {
    const willDelete = await confirmDeletion();
    if (willDelete) {
      try {
        if (customerId) await deleteCustomer(+customerId).unwrap();
        navigate(paths.customers.root, { replace: true });

        toastifyMsg("Operation completed successfully", "success");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Loading isLoading={isLoading || isDeleting} error={error}>
      {profile && (
        <Profile
          editingPagePath={`${paths.customers.editCustomer}/${customerId}`}
          handleDelete={handleDelete}
          {...profile}
        />
      )}
    </Loading>
  );
};

export default ShowCustomer;
