// Third-Party =====> zod
import { z } from "zod";
// Third-Party =====> react-i18next
import { t } from "i18next";
// Constants
import {
  urlRegexp,
  AGE_LIMIT,
  pwdRegexp,
  MAX_FILE_SIZE,
  PHONE_LENGTH,
  SYRIA_COUNTRY_CODE,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  ACCEPTED_IMAGE_TYPES,
} from "constants/constants";
// Utils
import formatBytes from "utils/global/formatBytyes";

// =================== String Field ===================
export const requiredFieldSchema = z
  .string()
  .trim()
  .min(1, { message: t("errors:required") });

export const stringMaxLengthSchema = (length: number) => {
  return requiredFieldSchema.max(length, {
    message: t("errors:lengthError", {
      length,
    }),
  });
};
export const emailSchema = requiredFieldSchema.email(t("errors:emailError"));
export const urlSchema = requiredFieldSchema.refine(
  (value) => z.string().regex(urlRegexp).safeParse(value).success,
  { message: t("errors:url") },
);
export const passwordSchema = z
  .string()
  .trim()
  .min(MIN_PASSWORD_LENGTH, {
    message: t("errors:passwordLength", {
      min: MIN_PASSWORD_LENGTH,
    }),
  })
  .max(MAX_PASSWORD_LENGTH, {
    message: t("errors:passwordMaxLength", {
      max: MAX_PASSWORD_LENGTH,
    }),
  });

export const passwordRulesSchema = passwordSchema.regex(pwdRegexp, {
  message: t("errors:passwordRule"),
});

// =================== Numeric Field ===================
export const numericRangeSchema = (
  min: number,
  max: number,
  unit?: string,
  isGreaterThan: boolean = false, // Decide between "greater" or "greater or equal"
) => {
  const tUnit = unit ? t(`common.${unit}`, { unit }) : "";
  const tMsg = isGreaterThan ? "rangeErrorStrict" : "rangeError";

  return z.union([
    z
      .string()
      .regex(/^\d+(\.\d+)?$/, {
        message: t("errors:numericValue"),
      })
      .refine(
        (value) => {
          const numericValue =
            typeof value === "number" ? value : parseFloat(value);
          const isValidMin = isGreaterThan
            ? numericValue > min
            : numericValue >= min;

          return isValidMin && numericValue <= max;
        },
        {
          message: t(`errors:${tMsg}`, { min, max, unit: tUnit }),
        },
      ),
    z.number(),
  ]);
};

// =================== Date Field ===================
export const birthdaySchema = z
  .string()
  .date()
  .refine(
    (date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();
      return (
        age > AGE_LIMIT ||
        (age === AGE_LIMIT &&
          (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)))
      );
    },
    { message: t(`errors:ageError`, { limit: AGE_LIMIT }) },
  );

// =================== Phone ===================
export const phoneNumberSchema = z
  .string()
  .startsWith(SYRIA_COUNTRY_CODE, {
    message: t("errors:phonePrefix", { prefix: SYRIA_COUNTRY_CODE }),
  })
  .length(PHONE_LENGTH, {
    message: t("errors:phoneLength", { length: PHONE_LENGTH }),
  });

// =================== File Field ===================
export const imageSchema = z
  .union([
    z.string(),
    z
      .instanceof(File, { message: t("errors:required") })
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: `${t("errors:imageSize")} ${formatBytes(MAX_FILE_SIZE)}.`,
      })
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: t("errors:imageType"),
      }),
  ])
  .optional();
