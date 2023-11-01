import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API}`,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  // use this for csruf protection
  //   const xsrfToken = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
  //   if (xsrfToken) {
  //     config.headers["X-XSRF-TOKEN"] = xsrfToken[1];
  //   }

  var token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token.toString()}`;
  }
  config.headers["Content-Type"] = "multipart/form-data";

  return config;
});

export default api;
