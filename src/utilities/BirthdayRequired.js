/**
 * Validates required fields in the birthday data.
 *
 * @param {Object} data - The object to be checked.
 * @param {Array<Object>} requiredFields - An array of objects containing field and message.
 * @throws {Error} Throws an error if any required field is missing or has empty data.
 */

export const BirthdayRequired = async (data, requiredFields) => {
  const isNested = (field) => field.split(".").length > 1;

  for (const { field, message } of requiredFields) {
    if (!isNested(field)) {
      const hasData = data[field];

      if (!hasData) throw new Error(message);
    } else {
      const splitFieldArray = field.split(".");

      const gg = splitFieldArray.map((item) => {
        return [item];
      });

      const hasData = getNestedValue(data, splitFieldArray);
      if (!hasData) throw new Error(message);
    }
  }
};

function getNestedValue(obj, keys) {
  if (!obj) {
    return undefined;
  }

  if (keys.length === 0) {
    return obj;
  }

  const [key, ...remainingKeys] = keys;
  return getNestedValue(obj[key], remainingKeys);
}
