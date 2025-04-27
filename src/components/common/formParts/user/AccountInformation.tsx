// Third-Party =====> react-hook-form
import {
  Path,
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// My-Components
import DashedBox from "@components/common/box/DashedBox";
import InputFieldset from "@components/common/Input/InputFieldset";
// Libs
import handleSyrianPhoneNumber from "@libs/reactHookForm/handleSyrianPhoneNumber";
// Icons
import { MdAccountCircle } from "react-icons/md";
// Data
import { SYRIA_COUNTRY_CODE } from "constants/constants";

type TAccountInformationProps<T extends FieldValues> = {
  isEditMode?: boolean;
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  errors: FieldErrors<T>;
};

const AccountInformation = <T extends FieldValues>({
  isEditMode = false,
  register,
  setValue,
  errors,
}: TAccountInformationProps<T>) => {
  // ################### LOCALE ###################
  const { t } = useTranslation();

  return (
    <DashedBox
      title={t("form.accountInformationHeading")}
      icon={<MdAccountCircle className="text-2xl" />}
      contentClassName={`grid grid-cols-1 md:grid-cols-2 ${isEditMode ? "" : "lg:grid-cols-4"} gap-5`}
    >
      <InputFieldset
        label={t("form.phoneLabel")}
        placeholder={t("form.phonePlaceholder")}
        error={errors}
        isRequired={!isEditMode}
        defaultValue={SYRIA_COUNTRY_CODE}
        dir="ltr"
        {...register("phone" as Path<T>, {
          onChange: (event) =>
            handleSyrianPhoneNumber(event, setValue, "phone"),
        })}
      />
      <InputFieldset
        label={t("form.emailLabel")}
        placeholder={t("form.emailPlaceholder")}
        error={errors}
        isRequired={false}
        {...register("email" as Path<T>)}
      />
      {!isEditMode && (
        <>
          <InputFieldset
            type="password"
            label={t("form.passwordLabel")}
            placeholder={t("form.passwordPlaceholder")}
            inputClassName="ps-14! pe-2!"
            dir="ltr"
            error={errors}
            {...register("password" as Path<T>)}
          />
          <InputFieldset
            type="password"
            label={t("form.confirmPasswordLabel")}
            placeholder={t("form.confirmPasswordPlaceholder")}
            inputClassName="ps-14! pe-2!"
            dir="ltr"
            error={errors}
            {...register("password_confirmation" as Path<T>)}
          />
        </>
      )}
    </DashedBox>
  );
};

export default AccountInformation;
