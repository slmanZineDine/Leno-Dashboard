// React
import { ChangeEvent, FormEvent, MouseEvent } from "react";
// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// My-Components
import Button from "@components/common/buttons/Button";
import InputField from "@components/common/Input/InputField";
import LoadingDots from "@components/common/Loading/LoadingDots";
// Icons
import { FiPhone } from "react-icons/fi";
// Constants
import { PHONE_LENGTH } from "constants/constants";

type TRequestVerificationCodeProps = {
  phone: string;
  handleGetVerificationCode: (
    event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>,
  ) => void;
  handleChangePhoneNumber: (event: ChangeEvent<HTMLInputElement>) => void;
  isRequesting: boolean;
};

const RequestVerificationCode = ({
  phone,
  handleGetVerificationCode,
  handleChangePhoneNumber,
  isRequesting,
}: TRequestVerificationCodeProps) => {
  // ################### LOCALES ###################
  const { t } = useTranslation();

  return (
    <form onSubmit={handleGetVerificationCode}>
      <div className="mt-10 mb-12">
        <p className="text-heading mb-4">{t("modal.enterPhonePrompt")}</p>
        <InputField
          placeholder="Enter your phone"
          isRequired={false}
          icon={<FiPhone />}
          containerClassName="mb-4"
          inputClassName="login-input ps-14! pe-2!"
          value={phone}
          onChange={handleChangePhoneNumber}
        />
      </div>

      {isRequesting ? (
        <LoadingDots />
      ) : (
        <Button
          color="primary"
          type="submit"
          disabled={phone.length !== PHONE_LENGTH}
          className={`${phone.length !== PHONE_LENGTH ? "!hover:bg-blue-200 cursor-not-allowed bg-blue-200!" : ""}`}
        >
          {t("buttons.send")}
        </Button>
      )}
    </form>
  );
};

export default RequestVerificationCode;
