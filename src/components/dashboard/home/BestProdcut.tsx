// My-Components
import StarsRating from "@components/common/statistics/StarsRating";
// Data
import { CURRENCY } from "constants/constants";
// Types
import type { TBestPorudct } from "@customTypes/product";

const BestProdcut = (props: TBestPorudct) => {
  return (
    <>
      <td>{props?.title}</td>
      <td>
        {CURRENCY} {props?.price}
      </td>
      <td>{props?.order_count}</td>
      <td>
        <div className="flex-center">
          <StarsRating rating={props?.product_rating} />
        </div>
      </td>
    </>
  );
};

export default BestProdcut;
