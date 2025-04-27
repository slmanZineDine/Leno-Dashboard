import { ChangeEvent } from "react";
import { UseFormSetValue } from "react-hook-form";

// Remove non-numeric characters

const handleSyrianPhoneNumber = (
  event: ChangeEvent<HTMLInputElement>,
  setValue: UseFormSetValue<any>,
  fieldName: string,
) => {
  const value = event.target.value.replace(/\D/g, "");
  if (value.startsWith("9630")) {
    setValue(fieldName, value.replace(/^9630+\d/, "9639"));
  } else {
    setValue(fieldName, value);
  }
};

export default handleSyrianPhoneNumber;
