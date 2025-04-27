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
import ProductDimensions from "@components/common/formParts/product/ProductDimensions";
import ProductInformation from "@components/common/formParts/product/ProductInformation";
// API
import { useAddProductMutation } from "@redux/services/products/productsApiSlice";
// Libs
import toastifyMsg from "@libs/reactToastify/toastifyMessage";
// Validation
import {
  addProductSchema,
  type TAddProductForm,
} from "@validation/product/addProductSchema";
// Data
import { paths } from "@routes/paths";
import { pathTitleMap } from "@routes/pathTitleMap";

const AddProduct = () => {
  // ################### REACT-ROUTER HOOKS ###################
  const navigate = useNavigate();

  // ################### LOCALES ###################
  const { t } = useTranslation();

  // ################### RTK QUERY ###################
  const [addProduct, { isLoading: isAdding, isError, error }] =
    useAddProductMutation();

  // ################### REACT HOOK FORM ###################
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TAddProductForm>({
    mode: "onBlur",
    resolver: zodResolver(addProductSchema()),
  });
  // ################### ASYNC REQUEST ###################
  const onSubmit: SubmitHandler<TAddProductForm> = async (data) => {
    try {
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== ""),
      ) as Partial<TAddProductForm>;

      await addProduct(filteredData).unwrap();
      toastifyMsg(t("toasts.successMessage"), "success");
      navigate(paths.products.root, { replace: true });
    } catch (err) {
      console.log(err);
    }
  };
  console.log(errors);

  return (
    <>
      {/* ========================== Main Heading ========================== */}
      <HeadingSection title={t(pathTitleMap["add-product"])} />

      {/* ========================== Form ========================== */}
      <section className="container">
        <BoxContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* ========================== Product Information ========================== */}
            <ProductInformation
              register={register}
              setValue={setValue}
              errors={errors}
            />

            {/* ========================== Product Dimensions ========================== */}
            <ProductDimensions
              register={register}
              setValue={setValue}
              errors={errors}
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

export default AddProduct;
