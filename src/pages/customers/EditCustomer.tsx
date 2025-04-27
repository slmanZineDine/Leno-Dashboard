// React
import { useEffect, useState } from "react";
// Third-Party =====> react-router-dom
import { useNavigate, useParams } from "react-router-dom";
// Third-Party =====> react-hook-form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// My-Components
import Button from "@components/common/buttons/Button";
import Loading from "@components/common/Loading/Loading";
import BoxContainer from "@components/common/box/BoxContainer";
import LoadingDots from "@components/common/Loading/LoadingDots";
import ErrorMessage from "@components/common/error/ErrorMessage";
import HeadingSection from "@components/common/sections/HeadingSection";
import BasicInformation from "@components/common/formParts/user/BasicInformation";
import PlaceInformation from "@components/common/formParts/user/PlaceInformation";
import AccountInformation from "@components/common/formParts/user/AccountInformation";
// API
import {
  useGetCustomerQuery,
  useUpdateCustomerMutation,
} from "@redux/services/users/usersApiSlice";
// Utils
import getChangedFields from "@utils/global/getChangedFields";
// Libs
import toastifyMsg from "@libs/reactToastify/toastifyMessage";
// Data
import { paths } from "@routes/paths";
import { pathTitleMap } from "@routes/pathTitleMap";
// Validation
import {
  updateCustomerSchema,
  type TUpdateCustomerForm,
} from "@validation/user/customer/updateCustomerSchema";

const EditCustomer = () => {
  // ################### REACT-ROUTER HOOKS ###################
  const navigate = useNavigate();
  const { prefix: customerId } = useParams() as TParamsType;

  // ################### LOCALES ###################
  const { t } = useTranslation();

  // ################### REACT HOOKS ###################
  const [imageURL, setImageURL] = useState<string | null>(null);

  // ################### RTK QUERY ###################
  // ===== GET =====
  const { data: customer, isLoading, error } = useGetCustomerQuery(customerId);

  // ===== PUT =====
  const [
    updateCustomer,
    { isLoading: isUpdating, isError, error: updateCustomerError },
  ] = useUpdateCustomerMutation();

  // ################### REACT HOOK FORM ###################
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    formState: { errors, defaultValues },
  } = useForm<TUpdateCustomerForm>({
    mode: "onBlur",
    resolver: zodResolver(updateCustomerSchema()),
  });

  // ################### ASYNC REQUEST ###################
  const onSubmit: SubmitHandler<TUpdateCustomerForm> = async (data) => {
    try {
      // Use this condition because React Hook Form (RHF) may initialize defaultValues as undefined.
      const changedFields = defaultValues
        ? getChangedFields(data, defaultValues)
        : {};

      await updateCustomer({
        data: changedFields,
        customerId: customerId,
      }).unwrap();

      toastifyMsg(t("toasts.successMessage"), "success");
      navigate(paths.customers.root, { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  // ################### HANDLER ###################
  const handleDeleteImage = () => {
    setValue("image", "");
  };

  // ################### SIDE EFFECT ###################
  useEffect(() => {
    if (customer) {
      const {
        image,
        firstName,
        lastName,
        maidenName,
        gender,
        // birthDate,
        phone,
        email,
        address,
      } = customer;

      if (image) setImageURL(image);

      reset({
        firstName,
        lastName,
        maidenName,
        phone,
        gender: gender ?? "",
        // birthDate: birthDate ?? "",
        email: email ?? "",
        city: address?.city ?? "",
        address: address?.address ?? "",
      });
    }
  }, [customer, reset]);

  return (
    <>
      {/* ========================== Main Heading ========================== */}
      <HeadingSection title={t(pathTitleMap["edit-customer"])} />

      {/* ========================== Loading ========================== */}
      <Loading isLoading={isLoading} error={error}>
        {/* ========================== Form ========================== */}
        <section className="container">
          <BoxContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* ========================== Basic Information ========================== */}
              <BasicInformation
                currentImgUrl={imageURL}
                isEditMode={true}
                register={register}
                setValue={setValue}
                trigger={trigger}
                errors={errors}
                handleDeleteImage={handleDeleteImage}
              />

              {/* ========================== Account Information ========================== */}
              <AccountInformation
                isEditMode={true}
                register={register}
                setValue={setValue}
                errors={errors}
              />

              {/* ========================== Place Information ========================== */}
              <PlaceInformation
                register={register}
                errors={errors}
                setValue={setValue}
                isEditMode={true}
              />

              {/* ========================== Error ========================== */}
              {isError && <ErrorMessage error={updateCustomerError} />}

              {/* ========================== Button ========================== */}
              <div className="mt-12">
                {isUpdating ? (
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

export default EditCustomer;
