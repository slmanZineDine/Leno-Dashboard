// Third-Party =====> zod
import { z } from "zod";
// Schema
import { passwordSchema, stringMaxLengthSchema } from "@validation/common";
// Constansts
import { NAME_MAX_LENGTH } from "constants/constants";

const loginSchema = () =>
  z.object({
    username: stringMaxLengthSchema(NAME_MAX_LENGTH),
    password: passwordSchema,
  });

type TLoginForm = z.infer<ReturnType<typeof loginSchema>>;

export { loginSchema, type TLoginForm };
