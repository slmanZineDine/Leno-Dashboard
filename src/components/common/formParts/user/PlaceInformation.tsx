// React
import { ChangeEvent, useEffect, useState } from "react";
// Third-Party =====> react-hook-form
import {
  Path,
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  PathValue,
} from "react-hook-form";
// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// My-Components
import DashedBox from "@components/common/box/DashedBox";
import InputFieldset from "@components/common/Input/InputFieldset";
import SelectFieldset from "@components/common/select/SelectFieldset";
// Icons
import { FaLocationDot } from "react-icons/fa6";
// Data
import { CITIES, REGIONS } from "@data/index";

type TPlaceInformationProps<T extends FieldValues> = {
  isEditMode?: boolean;
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  errors: FieldErrors<T>;
};

const PlaceInformation = <T extends FieldValues>({
  isEditMode = false,
  register,
  setValue,
  errors,
}: TPlaceInformationProps<T>) => {
  // ################### LOCALE ###################
  const { t } = useTranslation();

  const [cityId, setCityId] = useState<string | Number>("");
  const [regionsList, setRegionsList] = useState<typeof REGIONS>([]);

  // ################### HANDLER ###################
  const handleSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
    setCityId(+event.target.value);
  };

  // ################### SIDE EFFECT ###################
  useEffect(() => {
    if (cityId) {
      setValue("city" as Path<T>, "" as PathValue<T, Path<T>>);

      const filteredRegion = REGIONS.filter(
        (region) => region.city_id === cityId,
      );

      setRegionsList(filteredRegion);
    }
  }, [cityId]);

  return (
    <DashedBox
      title={t("form.placeInformationHeading")}
      icon={<FaLocationDot className="text-2xl" />}
      contentClassName="grid grid-cols-1 md:grid-cols-3 gap-5"
    >
      <SelectFieldset
        initailValue={t("form.cityPlaceholder")}
        label={t("form.cityLabel")}
        value={cityId.toString()}
        options={CITIES}
        optionLabels={{ value: "id", displayValue: "name" }}
        isRequired={!isEditMode}
        onChange={handleSelectCity}
      />
      <SelectFieldset
        initailValue={t("form.regionPlaceholder")}
        label={t("form.regionLabel")}
        defaultValue=""
        options={regionsList}
        optionLabels={{ value: "id", displayValue: "name" }}
        isRequired={!isEditMode}
        error={errors}
        {...register("city" as Path<T>)}
      />
      <InputFieldset
        label={t("form.neighborhoodLabel")}
        placeholder={t("form.neighborhoodPlaceholder")}
        isRequired={false}
        error={errors}
        {...register("address" as Path<T>)}
      />
    </DashedBox>
  );
};

export default PlaceInformation;
