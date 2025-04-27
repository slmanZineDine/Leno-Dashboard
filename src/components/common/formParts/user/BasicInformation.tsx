// Third-Party =====> react-hook-form
import {
  Path,
  PathValue,
  FieldErrors,
  FieldValues,
  UseFormTrigger,
  UseFormSetValue,
  UseFormRegister,
} from "react-hook-form";
// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// My-Components
import ImgUploader from "@components/common/upload/ImgUploader";
import InputFieldset from "@components/common/Input/InputFieldset";
import SelectFieldset from "@components/common/select/SelectFieldset";
// Icons
import { FcInfo } from "react-icons/fc";
import { MdError } from "react-icons/md";
// Data
import { GENDER } from "@data/index";

type TBasicInformation<T extends FieldValues> = {
  isEditMode?: boolean;
  register: UseFormRegister<T>;
  trigger: UseFormTrigger<T>;
  setValue: UseFormSetValue<T>;
  errors: FieldErrors<T>;
  currentImgUrl?: string | null;
  handleDeleteImage: () => void;
};

const BasicInformation = <T extends FieldValues>({
  isEditMode = false,
  register,
  trigger,
  setValue,
  errors,
  currentImgUrl,
  handleDeleteImage,
}: TBasicInformation<T>) => {
  // ################### LOCALE ###################
  const { t } = useTranslation();

  // ################### HANDLER ###################
  const handleUploadImage = (file: File) => {
    setValue("image" as Path<T>, file as PathValue<T, Path<T>>);
    trigger("image" as Path<T>);
  };

  return (
    <>
      <h2 className="mb-8 flex items-center gap-2 text-xl font-bold">
        <FcInfo className="text-xl" />
        {t("form.basicInformationHeading")}
      </h2>
      <div className="mb-5 grid grid-cols-1 items-center gap-5 md:grid-cols-4">
        <div className="flex-center mb-8 flex-col md:mb-0">
          <ImgUploader
            currentImgUrl={currentImgUrl}
            onImageUpload={handleUploadImage}
            onImageDelete={handleDeleteImage}
            containerSize="size-40"
          />
          {errors.image && (
            <small className="flex items-center gap-2 text-red-400">
              <MdError className="text-md mt-1 shrink-0 self-start" />
              {errors.image?.message as string}
            </small>
          )}
        </div>
        <InputFieldset
          label={t("form.firstNameLabel")}
          placeholder={t("form.firstNamePlaceholder")}
          isRequired={!isEditMode}
          error={errors}
          {...register("firstName" as Path<T>)}
        />
        <InputFieldset
          label={t("form.lastNameLabel")}
          placeholder={t("form.lastNamePlaceholder")}
          isRequired={!isEditMode}
          error={errors}
          {...register("lastName" as Path<T>)}
        />
        <InputFieldset
          label={t("form.middleNameLabel")}
          placeholder={t("form.middleNamePlaceholder")}
          isRequired={!isEditMode}
          error={errors}
          {...register("maidenName" as Path<T>)}
        />
      </div>
      <div className="cxl:grid-cols-2 grid grid-cols-1 items-start gap-5">
        <SelectFieldset
          initailValue={t("form.genderPlaceholder")}
          label={t("form.genderLabel")}
          // defaultValue=""
          options={GENDER}
          optionLabels={{ value: "label", displayValue: "label" }}
          isRequired={false}
          error={errors}
          {...register("gender" as Path<T>)}
        />
        <InputFieldset
          type="date"
          label={t("form.birthDateLabel")}
          placeholder={t("form.birthDatePlaceholder")}
          error={errors}
          isRequired={false}
          {...register("birthDate" as Path<T>)}
        />
      </div>
    </>
  );
};

export default BasicInformation;
