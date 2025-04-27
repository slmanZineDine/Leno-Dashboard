// Third-Party =====> zod
import { z } from "zod";
// Common-Schema
import {
  imageSchema,
  emailSchema,
  birthdaySchema,
  phoneNumberSchema,
  stringMaxLengthSchema,
} from "@validation/common";
import { NAME_MAX_LENGTH } from "constants/constants";

const updateCustomerSchema = () =>
  z.object({
    firstName: stringMaxLengthSchema(NAME_MAX_LENGTH),
    lastName: stringMaxLengthSchema(NAME_MAX_LENGTH),
    maidenName: stringMaxLengthSchema(NAME_MAX_LENGTH),
    gender: z.string(),
    email: z.union([emailSchema, z.literal("")]),
    phone: phoneNumberSchema,
    birthDate: z.union([birthdaySchema, z.literal("")]),
    city: z.string(),
    address: z.string(),
    image: imageSchema,
  });

type TUpdateCustomerForm = z.infer<ReturnType<typeof updateCustomerSchema>>;

export { updateCustomerSchema, type TUpdateCustomerForm };
