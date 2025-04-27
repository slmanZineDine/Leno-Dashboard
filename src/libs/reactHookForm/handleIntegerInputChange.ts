import { ChangeEvent } from "react";
import { UseFormSetValue } from "react-hook-form";

/**
 * Handles changes in numeric input fields.
 * Ensures input contains only numeric characters and optionally prevents leading zeros.
 *
 * @param event - The input change event
 * @param setValue - The function to update form values
 * @param fieldName - The name of the field to update
 * @param allowLeadingZeros - Whether leading zeros are allowed (default: false)
 */
const handleIntegerInputChange = (
  event: ChangeEvent<HTMLInputElement>,
  setValue: UseFormSetValue<any>,
  fieldName: string,
  allowLeadingZeros: boolean = false,
): void => {
  let numericValue = event.target.value.replace(/\D/g, "");

  // Remove leading zeros if not allowed
  if (!allowLeadingZeros && numericValue.startsWith("0")) {
    numericValue = numericValue.replace(/^0+/, "");
  }

  setValue(fieldName, numericValue);
};

export default handleIntegerInputChange;
