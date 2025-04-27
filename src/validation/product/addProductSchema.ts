// Third-Party =====> zod
import { z } from "zod";
// Data
import {
  DESCRIPTION_MAX_LENGTH,
  MAX_PRICE,
  MAX_QUANTITY,
  MIN_PRICE,
  MIN_QUANTITY,
  NAME_MAX_LENGTH,
  TITLE_MAX_LENGTH,
  MAX_WEIGHT,
  MIN_WEIGHT,
  WEIGHT_UNIT,
  MIN_DEPTH,
  MAX_DEPTH,
  DEPTH_UNIT,
  MIN_WIDTH,
  MAX_WIDTH,
  WIDTH_UNIT,
  MIN_HEIGHT,
  MAX_HEIGHT,
  HEIGHT_UNIT,
} from "constants/constants";
import {
  numericRangeSchema,
  requiredFieldSchema,
  stringMaxLengthSchema,
} from "@validation/common";

const addProductSchema = () =>
  z.object({
    title: stringMaxLengthSchema(TITLE_MAX_LENGTH),
    category: requiredFieldSchema,
    brand: stringMaxLengthSchema(NAME_MAX_LENGTH),
    price: numericRangeSchema(MIN_PRICE, MAX_PRICE, "", true),
    description: stringMaxLengthSchema(DESCRIPTION_MAX_LENGTH),
    weight: z.union([
      numericRangeSchema(MIN_WEIGHT, MAX_WEIGHT, WEIGHT_UNIT),
      z.literal(""), // Allow empty strings explicitly
    ]),
    minimumOrderQuantity: numericRangeSchema(
      MIN_QUANTITY,
      MAX_QUANTITY,
      "",
      true,
    ),
    width: numericRangeSchema(MIN_WIDTH, MAX_WIDTH, WIDTH_UNIT),
    depth: numericRangeSchema(MIN_DEPTH, MAX_DEPTH, DEPTH_UNIT),
    height: numericRangeSchema(MIN_HEIGHT, MAX_HEIGHT, HEIGHT_UNIT),
  });

type TAddProductForm = z.infer<ReturnType<typeof addProductSchema>>;

export { addProductSchema, type TAddProductForm };
