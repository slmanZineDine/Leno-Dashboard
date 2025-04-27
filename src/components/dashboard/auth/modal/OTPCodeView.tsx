// React
import { Dispatch, FormEvent, MouseEvent, SetStateAction } from "react";
// Third-Party =====> react-otp-input
import OtpInput from "react-otp-input";
// Third-Party =====> react-i18next
import { useTranslation } from "react-i18next";
// My-Components
import Button from "@components/common/buttons/Button";
import CountDown from "@components/common/countDown/CountDown";
import LoadingDots from "@components/common/Loading/LoadingDots";
// Constants
import { VERIFICATION_CODE } from "constants/constants";

type TOTPCodeViewProps = {
  phone: string;
  verificationCode: string;
  counter: number;
  setCounter: Dispatch<SetStateAction<number>>;
  handleChangeVerificationCode: (code: string) => void;
  handleGetVerificationCode: (
    event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>,
  ) => void;
  isVerifying: boolean;
};

const OTPCodeView = ({
  phone,
  verificationCode,
  counter,
  setCounter,
  handleChangeVerificationCode,
  handleGetVerificationCode,
  isVerifying,
}: TOTPCodeViewProps) => {
  // ################### LOCALES ###################
  const { t } = useTranslation();

  return (
    <>
      <p className="text-center">
        {t("modal.enterVerificationCodePrompt", { code: VERIFICATION_CODE })}
        &nbsp;
        <span className="font-extrabold">{phone}</span>:
      </p>
      <div className="mt-10 mb-12">
        <OtpInput
          value={verificationCode}
          onChange={handleChangeVerificationCode}
          numInputs={VERIFICATION_CODE}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} style={{}} />}
          inputType="number"
          shouldAutoFocus={true}
          containerStyle="w-full flex-center gap-2 flex-row my-4"
          inputStyle="w-12 h-12 text-center text-black text-lg bg-white border border-black dark:border-none"
        />
      </div>
      <div className="flex-center my-4">
        {counter === 0 ? (
          <button
            type="button"
            className="flex-center border-border size-16 rounded-full border text-center text-xs font-bold hover:border-2 dark:border-white"
            onClick={handleGetVerificationCode}
          >
            {t("button.resend")} <br /> {t("button.code")}
          </button>
        ) : (
          <CountDown initalValue={counter} onCounterFinishing={setCounter} />
        )}
      </div>
      {isVerifying ? (
        <LoadingDots />
      ) : (
        <Button
          color="primary"
          type="submit"
          disabled={verificationCode.length !== VERIFICATION_CODE}
          className={`${verificationCode.length !== VERIFICATION_CODE ? "!hover:bg-blue-200 cursor-not-allowed bg-blue-200!" : ""}`}
        >
          {t("buttons.send")}
        </Button>
      )}
    </>
  );
};

export default OTPCodeView;
