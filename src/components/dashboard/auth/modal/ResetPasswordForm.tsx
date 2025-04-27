// Third-Party =====> react-hook-form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// My-Components
import Button from "@components/common/buttons/Button";
import LoadingDots from "@components/common/Loading/LoadingDots";
import InputFieldset from "@components/common/Input/InputFieldset";
// My-Hooks
import useStoreLogin from "@hooks/login/useStoreLogin";
// API
import { useLoginMutation } from "@redux/services/auth/authApiSlice";
// Types
import {
  resetPasswordSchema,
  type resetPasswordFormType,
} from "@validation/auth/resetPasswordSchema";
// Data
import { ADMIN_INFO } from "constants/constants";

type TResetPasswordFormProps = {
  phone: string;
  code: string;
  setIsCodeWrong: (isWrong: boolean) => void;
};

const ResetPasswordForm = ({
  phone,
  code,
  setIsCodeWrong,
}: TResetPasswordFormProps) => {
  // ################### CUSTOM HOOKS ###################
  const storeData = useStoreLogin();

  // ################### LOCALES ###################
  const { t } = useTranslation();

  // ################### REACT HOOK FORM ###################
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<resetPasswordFormType>({
    mode: "onBlur",
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { code, phone },
  });

  // ################### RTK QUERY ###################
  // ===== POST =====
  const [login, { isLoading }] = useLoginMutation();

  // ################### ASYNC REQUEST ###################
  const onSubmit: SubmitHandler<resetPasswordFormType> = async () => {
    try {
      const user = await login({
        username: ADMIN_INFO.username,
        password: ADMIN_INFO.password,
      }).unwrap();

      storeData(user);
    } catch (err) {
      setIsCodeWrong(true);
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
      <InputFieldset
        type="password"
        label={t("form.newPasswordLabel")}
        placeholder={t("form.newPasswordPlaceholder")}
        inputClassName="ps-14! pe-2!"
        containerClassName="mb-4"
        error={errors}
        {...register("password")}
      />
      <InputFieldset
        type="password"
        label={t("form.confirmPasswordLabel")}
        placeholder={t("form.confirmPasswordPlaceholder")}
        inputClassName="ps-14! pe-2!"
        containerClassName="mb-12"
        error={errors}
        {...register("password_confirmation")}
      />
      {isLoading ? (
        <LoadingDots />
      ) : (
        <Button
          color="primary"
          type="submit"
          disabled={!isValid}
          className={`${!isValid ? "!hover:bg-blue-200 cursor-not-allowed bg-blue-200!" : ""}`}
        >
          {t("buttons.save")}
        </Button>
      )}
    </form>
  );
};

export default ResetPasswordForm;
