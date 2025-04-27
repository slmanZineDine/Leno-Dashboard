// Third-Party =====> react-router-dom
import { useNavigate } from "react-router-dom";
// Third-Party =====> react-hook-form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// My-Components
import Button from "@components/common/buttons/Button";
import BoxContainer from "@components/common/box/BoxContainer";
import LoadingDots from "@components/common/Loading/LoadingDots";
import ErrorMessage from "@components/common/error/ErrorMessage";
import HeadingSection from "@components/common/sections/HeadingSection";
import BasicInformation from "@components/common/formParts/user/BasicInformation";
import PlaceInformation from "@components/common/formParts/user/PlaceInformation";
import AccountInformation from "@components/common/formParts/user/AccountInformation";
// API
import { useAddCustomerMutation } from "@redux/services/users/usersApiSlice";
// Libs
import toastifyMsg from "@libs/reactToastify/toastifyMessage";
// Data
import { paths } from "@routes/paths";
import { pathTitleMap } from "@routes/pathTitleMap";
// Validation
import {
  addCustomerSchema,
  type TAddCustomerForm,
} from "@validation/user/customer/addCustomerSchema";

const AddCustomer = () => {
  // ################### REACT-ROUTER HOOKS ###################
  const navigate = useNavigate();

  // ################### LOCALES ###################
  const { t } = useTranslation();

  // ################### RTK QUERY ###################
  const [addCustomer, { isLoading: isAdding, isError, error }] =
    useAddCustomerMutation();

  // ################### REACT HOOK FORM ###################
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<TAddCustomerForm>({
    mode: "onBlur",
    resolver: zodResolver(addCustomerSchema()),
  });

  // ################### ASYNC REQUEST ###################
  const onSubmit: SubmitHandler<TAddCustomerForm> = async (data) => {
    try {
      const { image, ...rest } = data;

      const filteredData = Object.fromEntries(
        Object.entries(rest).filter(([_, value]) => value !== ""),
      ) as Partial<TAddCustomerForm>;

      await addCustomer(filteredData).unwrap();

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

  return (
    <>
      {/* ========================== Main Heading ========================== */}
      <HeadingSection title={t(pathTitleMap["add-customer"])} />

      {/* ========================== Form ========================== */}
      <section className="container">
        <BoxContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* ========================== Basic Information ========================== */}
            <BasicInformation
              register={register}
              setValue={setValue}
              trigger={trigger}
              errors={errors}
              handleDeleteImage={handleDeleteImage}
            />

            {/* ========================== Account Information ========================== */}
            <AccountInformation
              register={register}
              setValue={setValue}
              errors={errors}
            />

            {/* ========================== Place Information ========================== */}
            <PlaceInformation
              register={register}
              setValue={setValue}
              errors={errors}
              isEditMode={true}
            />

            {/* ========================== Error ========================== */}
            {isError && <ErrorMessage error={error} />}

            {/* ========================== Button ========================== */}
            <div className="mt-12">
              {isAdding ? (
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
    </>
  );
};

export default AddCustomer;
