// React
import { useState } from "react";
// Third-Party =====> react-router-dom
import { useNavigate } from "react-router-dom";
// Third-Party =====> react-hook-form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
// Third-Party =====> i18next
import { useTranslation } from "react-i18next";
// My-Components
import Button from "@components/common/buttons/Button";
import LoadingDots from "@components/common/Loading/LoadingDots";
import InputFieldset from "@components/common/Input/InputFieldset";
// Data
import { paths } from "@routes/paths";
// Validation
import {
  passwordSchema,
  passwordFormType,
} from "@validation/auth/passwordSchema";

const ChangePasswordForm = () => {
  // ################### REACT-ROUTER HOOKS ###################
  const navigate = useNavigate();

  // ################### REACT HOOKS ###################
  const [isPasswordChanging, setIsPasswordChanging] = useState(false);
  const { t } = useTranslation();

  // ################### REACT HOOK FORM ###################
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<passwordFormType>({
    mode: "onBlur",
    resolver: zodResolver(passwordSchema),
  });

  // ################### ASYNC REQUEST ###################
  const onSubmit: SubmitHandler<passwordFormType> = async (_) => {
    try {
      setIsPasswordChanging(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      navigate(paths.home.root, { replace: true });
    } catch (err) {
      console.log(err);
    } finally {
      setIsPasswordChanging(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6 grid grid-cols-1">
        <InputFieldset
          type="password"
          label={t("form.passwordLabel")}
          placeholder={t("form.passwordPlaceholder")}
          inputClassName="ps-14! pe-2!"
          error={errors}
          {...register("old_password")}
        />
      </div>
      <div className="3xl:grid-cols-2 mb-8 grid grid-cols-1 items-center gap-6">
        <InputFieldset
          type="password"
          label={t("form.newPasswordLabel")}
          placeholder={t("form.newPasswordPlaceholder")}
          inputClassName="ps-14! pe-2!"
          error={errors}
          {...register("new_password")}
        />
        <InputFieldset
          type="password"
          label={t("form.confirmPasswordLabel")}
          placeholder={t("form.confirmPasswordPlaceholder")}
          inputClassName="ps-14! pe-2!"
          error={errors}
          {...register("new_password_confirmation")}
        />
      </div>

      {/* ========================== Rules ========================== */}
      <details>
        <summary className="text-heading mb-2 cursor-pointer font-bold underline underline-offset-4">
          {t("form.passwordRules")}
        </summary>
        <ul className="text-heading list-disc ps-8">
          <li>{t("form.passwordRule1")}</li>
          <li>{t("form.passwordRule2")}</li>
          <li>{t("form.passwordRule3")}</li>
        </ul>
      </details>

      {/* ========================== Button ========================== */}
      <div className="ms-auto mt-12 w-fit">
        {isPasswordChanging ? (
          <LoadingDots />
        ) : (
          <Button color="primary" type="submit" size="md">
            {t("buttons.save")}
          </Button>
        )}
      </div>
    </form>
  );
};

export default ChangePasswordForm;
