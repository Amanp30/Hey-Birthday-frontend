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

export const importListEndpoint = async (code) => {
  try {
    const response = await api.get(
      `${process.env.REACT_APP_API}/import-list/${code}/${userid}`
    );
    return response?.data;
  } catch (error) {
    unauthorizedClientError(error);
    throw error;
  }
};

export const yourListsEndpoint = async (id) => {
  try {
    const response = await api.get(
      `${process.env.REACT_APP_API}/your-lists/${userid}`
    );
    return response?.data;
  } catch (error) {
    unauthorizedClientError(error);
    throw error;
  }
};

export const increaseAllowEndpoint = async (id, times) => {
  try {
    const response = await api.get(
      `${process.env.REACT_APP_API}/increase-limit/${id}/${times}`
    );
    return response?.data;
  } catch (error) {
    unauthorizedClientError(error);
    throw error;
  }
};

export const deleteListsEndpoint = async (id) => {
  try {
    const response = await api.get(
      `${process.env.REACT_APP_API}/delete-list/${id}`
    );
    return response?.data;
  } catch (error) {
    unauthorizedClientError(error);
    throw error;
  }
};

export const getListDataEndpoint = async (id) => {
  try {
    const response = await api.get(
      `${process.env.REACT_APP_API}/list/${userid}`
    );
    return response?.data;
  } catch (error) {
    unauthorizedClientError(error);
    throw error;
  }
};

export const newListDataEndpoint = async (data) => {
  try {
    const response = await api.post(
      `${process.env.REACT_APP_API}/new-list/${userid}`,
      data
    );
    return response?.data;
  } catch (error) {
    unauthorizedClientError(error);
    throw error;
  }
};
