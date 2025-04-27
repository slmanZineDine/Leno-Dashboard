// Third-Party =====> zod
import { z } from "zod";
// Third-Party =====> i18next
import { t } from "i18next";
// Common-Schema
import { passwordRulesSchema, phoneNumberSchema } from "@validation/common";
// Constants
import { VERIFICATION_CODE } from "constants/constants";

const resetPasswordSchema = z
  .object({
    phone: phoneNumberSchema,
    code: z.string().trim().length(VERIFICATION_CODE),
    password: passwordRulesSchema,
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: t("errors:confirmPassword"),
    path: ["password_confirmation"], // Set the path of the error
  });

type resetPasswordFormType = z.infer<typeof resetPasswordSchema>;

export { resetPasswordSchema, type resetPasswordFormType };
