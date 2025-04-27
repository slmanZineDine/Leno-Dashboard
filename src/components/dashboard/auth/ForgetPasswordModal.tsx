// React
import { FormEvent, useState } from "react";
// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// My-Components
import ModelComponent from "@components/common/modal/ModelComponent";
import OTPCodeView from "@components/dashboard/auth/modal/OTPCodeView";
import ResetPasswordForm from "@components/dashboard/auth/modal/ResetPasswordForm";
import RequestVerificationCode from "@components/dashboard/auth/modal/RequestVerificationCode";
// My-Hooks
import usePhoneNumber from "@hooks/login/usePhoneNumber";
import useVerfiyPhone from "@hooks/login/useVerfiyPhone";
// Libs
import toastifyMsg from "@libs/reactToastify/toastifyMessage";
// Data
import { VERIFICATION_CODE } from "constants/constants";

type TForgetPasswordModalProps = {
  phone?: string;
  onModalClose: (isOpen: boolean) => void;
};

const ForgetPasswordModal = ({
  phone = "",
  onModalClose,
}: TForgetPasswordModalProps) => {
  // ################### REACT HOOKS ###################
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeEntered, setIsCodeEntered] = useState(false);

  // ################### LOCALES ###################
  const { t } = useTranslation();

  // ################### CUSTOM HOOKS ###################
  const [phoneNumber, handleChangePhoneNumber] = usePhoneNumber(phone);
  const {
    counter,
    setCounter,
    hasVerificationCode,
    handleGetVerificationCode,
    isRequesting,
  } = useVerfiyPhone({ phone: phoneNumber });

  // ################### ASYNC REQUEST ###################
  const handleEnterCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (verificationCode.length !== VERIFICATION_CODE) {
      toastifyMsg(t("toasts.enterVerificationCodeError"), "error");
    } else {
      setIsCodeEntered(true);
    }
  };

  // ################### HANDLER ###################
  const handleChangeVerificationCode = (code: string) =>
    setVerificationCode(code);

  if (isCodeEntered) {
    return (
      <ModelComponent
        modelTitle={t("modal.createNewPasswordTitle")}
        onModelClose={onModalClose}
      >
        <p className="mb-10 text-center">{t("modal.newPasswordMessage")}</p>
        <ResetPasswordForm
          phone={phoneNumber}
          code={verificationCode}
          setIsCodeWrong={setIsCodeEntered}
        />
      </ModelComponent>
    );
  }

  return (
    <ModelComponent
      modelTitle={
        hasVerificationCode
          ? t("modal.verifyPhoneTitle")
          : t("modal.forgotPasswordTitle")
      }
      onModelClose={onModalClose}
    >
      {hasVerificationCode ? (
        <form onSubmit={handleEnterCode}>
          <OTPCodeView
            phone={phoneNumber}
            verificationCode={verificationCode}
            handleChangeVerificationCode={handleChangeVerificationCode}
            counter={counter}
            setCounter={setCounter}
            handleGetVerificationCode={handleGetVerificationCode}
            isVerifying={false}
          />
        </form>
      ) : (
        <RequestVerificationCode
          phone={phoneNumber}
          handleGetVerificationCode={handleGetVerificationCode}
          handleChangePhoneNumber={handleChangePhoneNumber}
          isRequesting={isRequesting}
        />
      )}
    </ModelComponent>
  );
};

export default ForgetPasswordModal;
