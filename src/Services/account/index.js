import Cookies from "js-cookie";
import api from "../api";

const userid = Cookies.get("userid");

function unauthorizedClientError(e) {
  const message = "Unauthorized client from server";
  const errormessage = e.response.data.message;
  if (message === errormessage) {
    window.location.href = "/auth/login";
  }
}
export const AccountDetailsEndpoint = async (id) => {
  try {
    const response = await api.get(
      `${process.env.REACT_APP_API}/account-details/${id}`
    );
    return response?.data;
  } catch (error) {
    unauthorizedClientError(error);
    throw error;
  }
};
export const deleteAccountEndpoint = async (id) => {
  try {
    const response = await api.get(
      `${process.env.REACT_APP_API}/delete-account/${userid}`
    );
    return response?.data;
  } catch (error) {
    unauthorizedClientError(error);
    throw error;
  }
};

export const UpdateAccountEndpoint = async (id, data) => {
  try {
    const response = await api.post(
      `${process.env.REACT_APP_API}/account-details/update/${id}`,
      data
    );
    return response?.data;
  } catch (error) {
    unauthorizedClientError(error);
    throw error;
  }
};
