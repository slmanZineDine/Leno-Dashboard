// Third-Party =====> react-hook-form
import {
  Path,
  PathValue,
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";
// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// My-Components
import SingleSelect from "@components/common/select/SingleSelect";
import InputFieldset from "@components/common/Input/InputFieldset";
import TextareaFieldset from "@components/common/Input/TextareaFieldset";
import FieldsetContainer from "@components/common/fieldset/FieldsetContainer";
// API
import { useGetCategoriesQuery } from "@redux/services/products/productsApiSlice";
// Icons
import { FcInfo } from "react-icons/fc";
// Libs
import handleNumericInputChange from "@libs/reactHookForm/handleIntegerInputChange";
// Types
import type { TCategory } from "@customTypes/product";
import handleFloatInputChange from "@libs/reactHookForm/handleFloatInputChange";

type TProductInformationProps<T extends FieldValues> = {
  isEditMode?: boolean;
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  getValues?: UseFormGetValues<T>;
  errors: FieldErrors<T>;
};

const ProductInformation = <T extends FieldValues>({
  isEditMode = false,
  register,
  setValue,
  getValues,
  errors,
}: TProductInformationProps<T>) => {
  // ################### LOCALE ###################
  const { t } = useTranslation();

  // ################### RTK QUERY ###################
  const { data: categories, isFetching } = useGetCategoriesQuery();

  // ################### HANDLER ###################
  // ========== Category Selection
  const handleSelectCategory = (option: TCategory) => {
    setValue("category" as Path<T>, option.slug as PathValue<T, Path<T>>);
  };

  return (
    <>
      <h2 className="mb-8 flex items-center gap-2 text-xl font-bold">
        <FcInfo className="text-xl" />
        {t("form.basicInformationHeading")}
      </h2>

      <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <InputFieldset
          label={t("form.titleLabel")}
          placeholder={t("form.titlePlaceholder")}
          isRequired={!isEditMode}
          error={errors}
          {...register("title" as Path<T>)}
        />

        <FieldsetContainer
          label={t("form.categoryLabel")}
          name={register("category" as Path<T>).name}
          error={errors}
          isRequired={!isEditMode}
        >
          <SingleSelect
            initialValue={t("form.categoryPlaceholder")}
            onOptionSelect={handleSelectCategory}
            options={categories ?? []}
            optionLabels={{ value: "slug", displayValue: "name" }}
            selectedValue={getValues ? getValues("category" as Path<T>) : ""}
            isFetching={isFetching}
          />
        </FieldsetContainer>

        <InputFieldset
          label={t("form.brandLabel")}
          placeholder={t("form.brandPlaceholder")}
          isRequired={!isEditMode}
          error={errors}
          {...register("brand" as Path<T>)}
        />

        <InputFieldset
          label={t("form.priceLabel")}
          placeholder={t("form.pricePlaceholder")}
          isRequired={!isEditMode}
          error={errors}
          {...register("price" as Path<T>, {
            onChange: (event) =>
              handleFloatInputChange(event, setValue, "price"),
          })}
        />
      </div>

      <div>
        <TextareaFieldset
          label={t("form.descriptionLabel")}
          placeholder={t("form.descriptionPlaceholder")}
          isRequired={!isEditMode}
          error={errors}
          {...register("description" as Path<T>)}
        />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <InputFieldset
          label={t("form.weightLabel")}
          placeholder={t("form.weightPlaceholder")}
          isRequired={false}
          error={errors}
          {...register("weight" as Path<T>, {
            onChange: (event) =>
              handleFloatInputChange(event, setValue, "weight"),
          })}
        />

        <InputFieldset
          label={t("form.minimumOrderQuantityLabel")}
          placeholder={t("form.minimumOrderQuantityPlaceholder")}
          isRequired={!isEditMode}
          error={errors}
          {...register("minimumOrderQuantity" as Path<T>, {
            onChange: (event) =>
              handleNumericInputChange(event, setValue, "minimumOrderQuantity"),
          })}
        />
      </div>
    </>
  );
};

export default ProductInformation;
