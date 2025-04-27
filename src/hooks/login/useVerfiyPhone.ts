// React
import { FormEvent, MouseEvent, useState } from "react";
// Libs
import toastifyMsg from "@libs/reactToastify/toastifyMessage";
// Data
import {
  PHONE_LENGTH,
  WAITING_TIME,
  SYRIA_COUNTRY_CODE,
} from "constants/constants";

type TUseVerfiyPhoneProps = { phone: string };

const useVerfiyPhone = ({ phone }: TUseVerfiyPhoneProps) => {
  // ################### REACT HOOKS ###################
  const [counter, setCounter] = useState(0);
  const [isRequesting, setIsRequesting] = useState(false);
  const [hasVerificationCode, setHasVerificationCode] = useState(false);

  // ################### ASYNC REQUEST ###################
  const handleGetVerificationCode = async (
    event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    if (phone.startsWith(SYRIA_COUNTRY_CODE) && phone.length === PHONE_LENGTH) {
      try {
        setIsRequesting(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsRequesting(false);
        setHasVerificationCode(true);
        setCounter(WAITING_TIME);
      } catch (err) {
        console.error(err);
      }
    } else {
      toastifyMsg("Invalid Phone.", "error");
    }
  };

  return {
    counter,
    setCounter,
    hasVerificationCode,
    setHasVerificationCode,
    handleGetVerificationCode,
    isRequesting,
  };
};

export default useVerfiyPhone;
