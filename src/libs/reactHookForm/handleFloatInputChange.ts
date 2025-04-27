import { ChangeEvent } from "react";
import { UseFormSetValue } from "react-hook-form";

/**
 * Handles changes in numeric input fields.
 * Ensures input contains only valid floating-point numbers or integers.
 * Prevents invalid characters, leading dots, and multiple dots.
 *
 * @param event - The input change event
 * @param setValue - The function to update form values
 * @param fieldName - The name of the field to update
 */
const handleFloatInputChange = (
  event: ChangeEvent<HTMLInputElement>,
  setValue: UseFormSetValue<any>,
  fieldName: string,
): void => {
  let inputValue = event.target.value;

  // Remove invalid characters (anything other than digits and a single dot)
  inputValue = inputValue.replace(/[^0-9.]/g, "");

  // Remove leading dots
  if (inputValue.startsWith(".")) {
    inputValue = inputValue.replace(/^\.+/, "");
  }

  // Prevent multiple dots in the input
  const parts = inputValue.split(".");
  if (parts.length > 2) {
    inputValue = `${parts[0]}.${parts[1]}`;
  }

  // Remove multiple zeros
  if (inputValue.startsWith("0")) {
    inputValue = inputValue.replace(/^0+/, "0");
  }

  // Update the form value
  setValue(fieldName, inputValue);
};

export default handleFloatInputChange;
