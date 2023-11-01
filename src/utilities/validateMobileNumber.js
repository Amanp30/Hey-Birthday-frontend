/**
 * Validate the mobile number and country code.
 * @param {Object} data - The data object containing mobile number and country code.
 * @throws {Error} Throws an error with a specific message if validation fails.
 */
export function validateMobileNumber(data) {
  if (data?.mobno.country && !data?.mobno.mobileno) {
    throw new Error("Mobile No Required");
  }
  if (data?.mobno.mobileno && !data?.mobno.country) {
    throw new Error("Country Code is Required");
  }
  if (data?.mobno.mobileno && data?.mobno.mobileno.length !== 10) {
    throw new Error("Mobile No must be 10 Digits");
  }
}
