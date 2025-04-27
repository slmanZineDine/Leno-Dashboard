// Third-Party =====> zod
import { z } from "zod";
// Third-Party =====> i18next
import { t } from "i18next";
// Common-Schema
import { passwordRulesSchema } from "@validation/common";
// Constants
import { MIN_PASSWORD_LENGTH } from "constants/constants";

const passwordSchema = z
  .object({
    old_password: z
      .string()
      .trim()
      .min(MIN_PASSWORD_LENGTH, { message: t("errors:passwordLength") }),
    new_password: passwordRulesSchema,
    new_password_confirmation: z.string(),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: t("errors:confirmPassword"),
    path: ["new_password_confirmation"],
  });

type passwordFormType = z.infer<typeof passwordSchema>;

export { passwordSchema, type passwordFormType };
