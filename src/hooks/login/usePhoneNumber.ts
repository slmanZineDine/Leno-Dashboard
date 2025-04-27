// React
import { SYRIA_COUNTRY_CODE } from "constants/constants";
import { ChangeEvent, useState } from "react";

// type TUsePhoneNumberProps = {
//     phone: string;
// }

const usePhoneNumber = (
  phone: string,
): [string, (event: ChangeEvent<HTMLInputElement>) => void] => {
  // ################### REACT HOOKS ###################
  const [phoneNumber, setPhoneNumber] = useState(
    phone.length === 0 ? SYRIA_COUNTRY_CODE : phone,
  );

  // ################### HANDLER ###################
  const handleChangePhoneNubumber = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, "");
    if (value.startsWith("9630")) {
      setPhoneNumber(value.replace(/^9630+\d/, "9639"));
    } else {
      setPhoneNumber(value);
    }
  };

  return [phoneNumber, handleChangePhoneNubumber];
};

export default usePhoneNumber;
