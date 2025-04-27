// Third-Party =====> React-Router
import { Link } from "react-router-dom";
// My-Components
import Can from "@components/guard/Can";
import UserWithImage from "@components/common/tables/UserWithImage";
import StarsRating from "@components/common/statistics/StarsRating";
import LoadingSpinner from "@components/common/Loading/LoadingSpinner";
// API
import { useDeleteProductMutation } from "@redux/services/products/productsApiSlice";
// Icons
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
// Data
import { paths } from "@routes/paths";
import { CURRENCY } from "constants/constants";
// Libs
import toastifyMsg from "@libs/reactToastify/toastifyMessage";
import confirmDeletion from "@libs/sweetalert/confirmDeletion";
// Types
import type { TProduct } from "@customTypes/product";

const Product = (props: TProduct) => {
  // ################### RTK QUERY ###################
  // ===== DELETE =====
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  // ################### ASYNC REQUEST ###################
  const handleDelete = async () => {
    const willDelete = await confirmDeletion();
    if (willDelete) {
      try {
        await deleteProduct(props?.id).unwrap();

        toastifyMsg("Operation completed successfully", "success");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <td>
        <UserWithImage username={props?.title} imageURL={props?.thumbnail} />
      </td>
      <td>{props?.brand}</td>
      <td>{props?.category}</td>
      <td>
        {CURRENCY}
        {props?.price}
      </td>
      <td>
        <div className="flex-center">
          <StarsRating rating={props?.rating} />
        </div>
      </td>
      <td>
        {isDeleting ? (
          <LoadingSpinner size="loading-md" color="text-primary" />
        ) : (
          <div className="flex-center gap-2">
            <Can action="update" name="products">
              <Link
                to={`${paths.products.editProduct}/${props?.id}`}
                className="icon-wraper edit-icon"
              >
                <MdOutlineModeEdit />
              </Link>
            </Can>
            <Can action="delete" name="products">
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

export default Product;
