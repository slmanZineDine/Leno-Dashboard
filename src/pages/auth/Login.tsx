// React
import { lazy, Suspense, useState } from "react";
// Third-Party =====> react-hook-form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// My-Components
import Button from "@components/common/buttons/Button";
import InputField from "@components/common/Input/InputField";
import ModelSkeleton from "@components/common/Loading/ModelSkeleton";
import LoadingSpinner from "@components/common/Loading/LoadingSpinner";
// My-Hooks
import useStoreLogin from "@hooks/login/useStoreLogin";
// API
import { useLoginMutation } from "@redux/services/auth/authApiSlice";
// Icons
import { FaRegUser } from "react-icons/fa6";
import { PiHandWavingFill } from "react-icons/pi";
// SVG
import LoginSvg from "@assets/svg/login.svg?react";
// Libs
import isRTKError from "@libs/reactToolkitQuery/isRTKError";
import toastifyMsg from "@libs/reactToastify/toastifyMessage";
// Validation
import { type TLoginForm, loginSchema } from "@validation/auth/loginSchema";
import LanguageSwitcher from "@components/dashboard/auth/LanguageSwitcher";
import { ADMIN_INFO, SUPERVISOR_INFO } from "constants/constants";

// Dynamic Import
const ForgetPasswordModal = lazy(
  () => import("@components/dashboard/auth/ForgetPasswordModal"),
);

const Login = () => {
  // ################### REACT HOOKS ###################
  // ===== Modal =====
  const [showForgetPasswordModal, setShowForgetPasswordModal] = useState(false);

  // ################### LOCALES ###################
  const { t } = useTranslation();

  // ################### CUSTOM HOOKS ###################
  const storeData = useStoreLogin();

  // ################### REACT HOOK FORM ###################
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginForm>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema()),
  });

  // ################### RTK QUERY ###################
  // ===== POST =====
  const [login, { isLoading }] = useLoginMutation();

  // ################### HANDLER ###################
  const onSubmit: SubmitHandler<TLoginForm> = async (data) => {
    try {
      const user = await login(data).unwrap();

      storeData(user);
    } catch (err) {
      if (isRTKError(err)) {
        toastifyMsg(err.data?.message, "error");
      } else {
        console.log(err);
      }
    }
  };

  return (
    <main className="flex-between">
      <section className="flex min-h-screen w-full flex-col items-start justify-start bg-white pt-6 pb-6 md:w-7/12">
        <div className="container md:px-16">
          <div className="flex-center mx-auto mb-4 block w-60">
            <h2 className="text-primary text-8xl font-extrabold">Leno</h2>
          </div>
          <h2 className="flex-center mt-2 mb-8 gap-2 text-2xl font-bold">
            {t("login.welcomeMessage")}
            <PiHandWavingFill className="text-3xl text-yellow-500" />
          </h2>

          <details>
            <summary className="text-heading mb-2 cursor-pointer font-bold underline underline-offset-4">
              {t("login.adminCredentials")}
            </summary>
            <ul className="text-heading list-disc ps-8">
              <li>Username: {ADMIN_INFO.username}</li>
              <li>Password: {ADMIN_INFO.password}</li>
            </ul>
          </details>
          <details>
            <summary className="text-heading mb-2 cursor-pointer font-bold underline underline-offset-4">
              {t("login.supervisorCredentials")}
            </summary>
            <ul className="text-heading list-disc ps-8">
              <li>Username: {SUPERVISOR_INFO.username}</li>
              <li>Password: {SUPERVISOR_INFO.password}</li>
            </ul>
          </details>

          {/* ========================== Form ========================== */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <InputField
              label={t("login.usernameLabel")}
              placeholder={t("login.usernamePlaceholder")}
              isRequired={false}
              icon={<FaRegUser />}
              containerClassName="mb-4"
              inputClassName="login-input ps-14! pe-2!"
              error={errors}
              {...register("username")}
            />
            <InputField
              type="password"
              label={t("login.passwordLabel")}
              placeholder={t("login.passwordPlaceholder")}
              isRequired={false}
              containerClassName=""
              inputClassName="login-input ps-14! pe-2!"
              error={errors}
              {...register("password")}
            />
            <button
              type="button"
              className="hover:text-primary ms-auto block text-sm transition-colors duration-300"
              onClick={() => setShowForgetPasswordModal(true)}
            >
              {t("login.forgotPassword")}
            </button>

            <Button
              color="primary"
              className="mt-8"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && (
                <LoadingSpinner color="text-white" size="loading-sm" />
              )}
              {t("login.loginButton")}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <LanguageSwitcher />
          </div>
        </div>
      </section>
      <section className="flex-center hidden h-screen w-6/12 md:flex">
        <LoginSvg className="max-w-[35rem]" />
      </section>

      {/* ========================== Modals ========================== */}
      <Suspense fallback={<ModelSkeleton />}>
        {showForgetPasswordModal && (
          <ForgetPasswordModal
            onModalClose={() => setShowForgetPasswordModal(false)}
          />
        )}
      </Suspense>
    </main>
  );
};

export default Login;
