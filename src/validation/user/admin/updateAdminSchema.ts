// Third-Party =====> zod
import { z } from "zod";
// Common-Schema
import {
  imageSchema,
  birthdaySchema,
  emailSchema,
  phoneNumberSchema,
  stringMaxLengthSchema,
} from "@validation/common";
import { NAME_MAX_LENGTH } from "constants/constants";

const updateAdminSchema = () =>
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

type TUpdateAdminForm = z.infer<ReturnType<typeof updateAdminSchema>>;

export { updateAdminSchema, type TUpdateAdminForm };
