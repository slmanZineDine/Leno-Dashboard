// My-Components
import Can from "@components/guard/Can";
// Data
import { CURRENCY, orderStatusColors } from "constants/constants";
// Types
import type { TOrder } from "@customTypes/order";
import { OrderStatus, TOrderStatusValues } from "constants/enums";
import formateDateDay from "@utils/time/formatDateDay";

type TOrderProps = TOrder & {
  handleStoreOrder: (order: TOrder) => void;
  handleOpenCancelModal: (isOpen: boolean) => void;
};

const OrderRow = ({
  handleOpenCancelModal,
  handleStoreOrder,
  ...props
}: TOrderProps) => {
  return (
    <>
      <td>{props?.productName}</td>
      <td>{props?.customerName}</td>
      <td>
        <span
          className={`${orderStatusColors[props.status as TOrderStatusValues] ?? ""}`}
        >
          {props.status}
        </span>
      </td>
      <td>{formateDateDay(props?.orderDate)}</td>
      <td>{props?.quantity}</td>
      <td>
        {CURRENCY}
        {props?.price}
      </td>
      <td>
        {CURRENCY}
        {props?.price * props?.quantity}
      </td>
      <td>
        {props?.status === OrderStatus.Pending && (
          <Can action="delete" name="orders">
            <button
              className="btn btn-error btn-sm whitespace-nowrap text-white"
              onClick={() => {
                handleOpenCancelModal(true);
                handleStoreOrder(props);
              }}
            >
              Cancel
            </button>
          </Can>
        )}
      </td>
    </>
  );
};

export default OrderRow;
