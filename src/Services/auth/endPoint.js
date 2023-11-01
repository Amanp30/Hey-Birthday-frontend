import axios from "axios";

export const SingupEndpoint = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/signup`,
      data
    );
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const LoginEndpoint = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/login`,
      data
    );
    return response?.data;
  } catch (error) {
    throw error;
  }
};
