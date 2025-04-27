/** ----------------------------------------------
 * Get the fields that have changed from the default values.
 *
 * This utility function compares the provided data object with the default values
 * and returns an object containing only the fields that have changed.
 *
 * @template T - The type of the objects being compared.
 * @param {T} data - The new data object to compare.
 * @param {T} defaultValues - The default values object to compare against.
 * @returns {Partial<T>} An object containing only the changed fields.
 ---------------------------------------------- */

const getChangedFields = <T extends object>(
  data: T,
  defaultValues: T,
): Partial<T> => {
  return Object.keys(data).reduce((acc, key) => {
    const typedKey = key as keyof T; // Type assertion to ensure typed indexing
    // Add `data[typedKey]` to the condition statement to exclude falsy values
    // (e.g., undefined, null, empty string, etc.)
    if (data[typedKey] !== defaultValues[typedKey]) {
      if (typedKey === "image" && data[typedKey] instanceof File) {
        acc[typedKey] = data[typedKey];
      } else if (typedKey !== "image") {
        acc[typedKey] = data[typedKey];
      }
    }
    return acc;
  }, {} as Partial<T>);
};

export default getChangedFields;
