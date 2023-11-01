function logError(error, options = { isTable: true }) {
  if (!error || !error.response) return;

  const { response, request } = error;
  const errorInfo = {
    status: response.status,
    message: Array.isArray(response.data?.message)
      ? response.data.message.join(", ")
      : response.data?.message || response.statusText || "Unknown Error",
  };

  console.error("Error From URL:", request.responseURL, response.data);

  if (options.isTable) console.table(errorInfo);
  else
    console.error(
      "Error Status:",
      errorInfo.status,
      "Error Message:",
      errorInfo.message
    );
}

export default logError;
