// React
import { useEffect } from "react";
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
import ProductDimensions from "@components/common/formParts/product/ProductDimensions";
import ProductInformation from "@components/common/formParts/product/ProductInformation";
// API
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "@redux/services/products/productsApiSlice";
// Utils
import getChangedFields from "@utils/global/getChangedFields";
// Libs
import toastifyMsg from "@libs/reactToastify/toastifyMessage";
// Data
import { paths } from "@routes/paths";
import { pathTitleMap } from "@routes/pathTitleMap";
// Validation
import {
  addProductSchema,
  type TAddProductForm,
} from "@validation/product/addProductSchema";

const EditProduct = () => {
  // ################### REACT-ROUTER HOOKS ###################
  const navigate = useNavigate();
  const { prefix: productId } = useParams() as TParamsType;

  // ################### LOCALES ###################
  const { t } = useTranslation();

  // ################### RTK QUERY ###################
  // ===== GET =====
  const { data: product, isLoading, error } = useGetProductQuery(productId);

  // ===== PUT =====
  const [
    updateProduct,
    { isLoading: isUpdating, isError, error: updateProductError },
  ] = useUpdateProductMutation();

  // ################### REACT HOOK FORM ###################
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, defaultValues },
  } = useForm<TAddProductForm>({
    mode: "onBlur",
    resolver: zodResolver(addProductSchema()),
  });

  // ################### ASYNC REQUEST ###################
  const onSubmit: SubmitHandler<TAddProductForm> = async (data) => {
    try {
      // Use this condition because React Hook Form (RHF) may initialize defaultValues as undefined.
      const changedFields = defaultValues
        ? getChangedFields(data, defaultValues)
        : {};

      if (Object.values(changedFields).length === 0) {
        toastifyMsg(t("toasts.noChangesError"), "error");
        return;
      }

      await updateProduct({
        data: changedFields,
        productId,
      }).unwrap();

      toastifyMsg(t("toasts.successMessage"), "success");
      navigate(paths.products.root, { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  // ################### SIDE EFFECT ###################
  useEffect(() => {
    if (product) {
      const {
        title,
        category,
        brand,
        price,
        description,
        minimumOrderQuantity,
        weight,
        dimensions,
      } = product;
      const { width, height, depth } = dimensions;

      reset({
        title,
        category,
        brand,
        price,
        description,
        minimumOrderQuantity,
        weight,
        width,
        height,
        depth,
      });
    }
  }, [product, reset]);

  return (
    <>
      {/* ========================== Main Heading ========================== */}
      <HeadingSection title={t(pathTitleMap["edit-product"])} />

      {/* ========================== Loading ========================== */}
      <Loading isLoading={isLoading} error={error}>
        {/* ========================== Form ========================== */}
        <section className="container">
          <BoxContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* ========================== Product Information ========================== */}
              <ProductInformation
                register={register}
                setValue={setValue}
                getValues={getValues}
                errors={errors}
                isEditMode={true}
              />

              {/* ========================== Product Dimensions ========================== */}
              <ProductDimensions
                register={register}
                setValue={setValue}
                errors={errors}
                isEditMode={true}
              />

              {/* ========================== Error ========================== */}
              {isError && <ErrorMessage error={updateProductError} />}

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

export default EditProduct;
