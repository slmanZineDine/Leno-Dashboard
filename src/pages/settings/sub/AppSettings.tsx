// React
import { useState } from "react";
// Third-Party =====> react-hook-form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// My-Components
import Button from "@components/common/buttons/Button";
import DashedBox from "@components/common/box/DashedBox";
import Loading from "@components/common/Loading/Loading";
import InputField from "@components/common/Input/InputField";
import BoxContainer from "@components/common/box/BoxContainer";
import LoadingDots from "@components/common/Loading/LoadingDots";
import HeadingSection from "@components/common/sections/HeadingSection";

// Icons
import { FcInfo } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { IoShareSocial } from "react-icons/io5";
import { RiInstagramFill, RiWhatsappFill } from "react-icons/ri";
import {
  FaFacebook,
  FaXTwitter,
  FaEarthAsia,
  FaLocationDot,
} from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
// Libs
import toastifyMsg from "@libs/reactToastify/toastifyMessage";
// Validation
import {
  settingsSchema,
  settingsSchemaFormType,
} from "@validation/settings/settingsSchema";
import handleNumericInputChange from "@libs/reactHookForm/handleIntegerInputChange";

const AppSettings = () => {
  const { t } = useTranslation();
  // ################### REACT HOOK ###################
  const [isSettingsUpdating, setIsSettingsUpdating] = useState(false);

  // ################### REACT HOOK FORM ###################
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<settingsSchemaFormType>({
    mode: "onBlur",
    resolver: zodResolver(settingsSchema),
  });

  // ################### ASYNC REQUEST ###################
  const onSubmit: SubmitHandler<settingsSchemaFormType> = async (_) => {
    try {
      setIsSettingsUpdating(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSettingsUpdating(false);

      toastifyMsg("Operation completed successfully", "success");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* ========================== Main Heading ========================== */}
      <HeadingSection title={t("settings.mainSettings")} />

      {/* ========================== Loading ========================== */}
      <Loading isLoading={false}>
        {/* ========================== Form ========================== */}
        <section className="container">
          <BoxContainer>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <h2 className="mb-8 flex items-center gap-2 text-xl font-bold">
                <FcInfo className="text-xl" />
                {t("settings.mainSettings")}
              </h2>
              <div className="4xl:grid-cols-2 grid grid-cols-1 gap-4">
                <InputField
                  label={t("settings.websiteName")}
                  placeholder={t("settings.placeholders.websiteName")}
                  isRequired={false}
                  inputClassName="input-field ps-14! pe-2!"
                  icon={<FaEarthAsia />}
                  error={errors}
                  {...register("app_name")}
                />
                <InputField
                  type="tel"
                  label={t("settings.phone")}
                  placeholder={t("settings.placeholders.phone")}
                  isRequired={false}
                  inputClassName="input-field ps-14! pe-2!"
                  icon={<FaPhoneAlt />}
                  error={errors}
                  {...register("phone", {
                    onChange: (event) =>
                      handleNumericInputChange(event, setValue, "phone"),
                  })}
                />
              </div>
              <InputField
                label={t("settings.location")}
                placeholder={t("settings.placeholders.location")}
                isRequired={false}
                inputClassName="input-field ps-14! pe-2!"
                icon={<FaLocationDot />}
                error={errors}
                {...register("location")}
                containerClassName="my-4"
              />
              <div className="my-4">
                <div>
                  <label className="text-md text-heading mb-2 block">
                    {t("settings.aboutUs")}
                  </label>
                  <textarea
                    placeholder={t("settings.placeholders.aboutUs")}
                    className="input-field border-border min-h-24 w-full resize-y rounded-md border p-2"
                    {...register("about_us")}
                  ></textarea>
                </div>
              </div>
              <DashedBox
                title={t("settings.socialMedia")}
                icon={<IoShareSocial className="text-2xl" />}
              >
                <div className="4xl:grid-cols-2 grid grid-cols-1 gap-4">
                  <InputField
                    type="url"
                    label={t("settings.website")}
                    placeholder={t("settings.placeholders.website")}
                    isRequired={false}
                    inputClassName="input-field ps-14! pe-2!"
                    icon={<FaEarthAsia />}
                    error={errors}
                    {...register("web_site")}
                  />
                  <InputField
                    label={t("settings.email")}
                    placeholder={t("settings.placeholders.email")}
                    isRequired={false}
                    inputClassName="input-field ps-14! pe-2!"
                    icon={<MdEmail />}
                    error={errors}
                    {...register("email")}
                  />
                  <InputField
                    type="url"
                    label={t("settings.facebook")}
                    placeholder={t("settings.placeholders.facebook")}
                    isRequired={false}
                    inputClassName="input-field ps-14! pe-2!"
                    icon={<FaFacebook />}
                    error={errors}
                    {...register("facebook")}
                  />
                  <InputField
                    type="url"
                    label={t("settings.instagram")}
                    placeholder={t("settings.placeholders.instagram")}
                    isRequired={false}
                    inputClassName="input-field ps-14! pe-2!"
                    icon={<RiInstagramFill />}
                    error={errors}
                    {...register("instagram")}
                  />
                  <InputField
                    type="tel"
                    label={t("settings.whatsapp")}
                    placeholder={t("settings.placeholders.whatsapp")}
                    isRequired={false}
                    inputClassName="input-field ps-14! pe-2!"
                    icon={<RiWhatsappFill />}
                    error={errors}
                    {...register("whatsapp", {
                      onChange: (event) =>
                        handleNumericInputChange(event, setValue, "whatsapp"),
                    })}
                  />
                  <InputField
                    type="url"
                    label={t("settings.x")}
                    placeholder={t("settings.placeholders.x")}
                    isRequired={false}
                    inputClassName="input-field ps-14! pe-2!"
                    icon={<FaXTwitter />}
                    error={errors}
                    {...register("twitter")}
                  />
                </div>
              </DashedBox>

              {/* ========================== Button ========================== */}
              <div className="mt-12">
                {isSettingsUpdating ? (
                  <LoadingDots />
                ) : (
                  <Button color="primary" type="submit">
                    {t("buttons.save")}
                  </Button>
                )}
              </div>
            </form>
          </BoxContainer>
        </section>
      </Loading>
    </>
  );
};

export default AppSettings;
