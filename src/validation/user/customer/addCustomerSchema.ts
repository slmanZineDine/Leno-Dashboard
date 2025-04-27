// Third-Party =====> i18next
import { t } from "i18next";
// Third-Party =====> zod
import { z } from "zod";
// Common-Schema
import {
  imageSchema,
  emailSchema,
  birthdaySchema,
  phoneNumberSchema,
  passwordRulesSchema,
  stringMaxLengthSchema,
} from "@validation/common";
// Constants
import { NAME_MAX_LENGTH } from "constants/constants";

const addCustomerSchema = () =>
  z
    .object({
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
      password: passwordRulesSchema,
      password_confirmation: z.string(),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: t("errors:confirmPassword"),
      path: ["password_confirmation"],
    });

type TAddCustomerForm = z.infer<ReturnType<typeof addCustomerSchema>>;

export { addCustomerSchema, type TAddCustomerForm };
