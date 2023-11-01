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

export const getDashboardDataEndpoint = async (id) => {
  try {
    const response = await api.get(
      `${process.env.REACT_APP_API}/dashboard-data/${userid}`
    );
    return response?.data;
  } catch (error) {
    unauthorizedClientError(error);
    throw error;
  }
};

export const getBirthdayData = async (id) => {
  try {
    const response = await api.get(
      `${process.env.REACT_APP_API}/birthday/${id}`
    );
    return response?.data;
  } catch (error) {
    unauthorizedClientError(error);
    throw error;
  }
};

export const getBirthdayListEndpoint = async () => {
  try {
    const response = await api.get(
      `${process.env.REACT_APP_API}/birthday-list/${userid}`
    );
    return response?.data;
  } catch (error) {
    unauthorizedClientError(error);
    throw error;
  }
};
export const deleteBirthdayEndpoint = async (id) => {
  try {
    const response = await api.get(
      `${process.env.REACT_APP_API}/birthday/delete/${id}/${userid}`
    );
    return response?.data;
  } catch (error) {
    unauthorizedClientError(error);
    throw error;
  }
};

export const newBirthdayEndpoint = async (data) => {
  try {
    const response = await api.post(
      `${process.env.REACT_APP_API}/birthday/new/${userid}`,
      data
    );
    return response?.data;
  } catch (error) {
    unauthorizedClientError(error);
    throw error;
  }
};

export const updateBirthdayEndpoint = async (id, data) => {
  try {
    const response = await api.post(
      `${process.env.REACT_APP_API}/birthday/update/${id}/${userid}`,
      data
    );
    return response?.data;
  } catch (error) {
    unauthorizedClientError(error);
    throw error;
  }
};
