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
// Icons
import { TbDimensions } from "react-icons/tb";
// Libs
import handleFloatInputChange from "@libs/reactHookForm/handleFloatInputChange";

type TPlaceInformationProps<T extends FieldValues> = {
  isEditMode?: boolean;
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  errors: FieldErrors<T>;
};

const ProductDimensions = <T extends FieldValues>({
  isEditMode = false,
  register,
  setValue,
  errors,
}: TPlaceInformationProps<T>) => {
  // ################### LOCALE ###################
  const { t } = useTranslation();

  return (
    <DashedBox
      title={t("form.dimensionsTitle")}
      icon={<TbDimensions className="text-2xl" />}
      contentClassName="grid grid-cols-1 md:grid-cols-3 gap-5"
    >
      <InputFieldset
        label={t("form.widthLabel")}
        placeholder={t("form.widthPlaceholder")}
        isRequired={!isEditMode}
        error={errors}
        {...register("width" as Path<T>, {
          onChange: (event) => handleFloatInputChange(event, setValue, "width"),
        })}
      />
      <InputFieldset
        label={t("form.heightLabel")}
        placeholder={t("form.heightPlaceholder")}
        isRequired={!isEditMode}
        error={errors}
        {...register("height" as Path<T>, {
          onChange: (event) =>
            handleFloatInputChange(event, setValue, "height"),
        })}
      />
      <InputFieldset
        label={t("form.depthLabel")}
        placeholder={t("form.depthPlaceholder")}
        isRequired={!isEditMode}
        error={errors}
        {...register("depth" as Path<T>, {
          onChange: (event) => handleFloatInputChange(event, setValue, "depth"),
        })}
      />
    </DashedBox>
  );
};

export default ProductDimensions;
