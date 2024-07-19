import { get } from "../utils/Api";

export const sendVerificationEmail = async () => {
  try {
    const authToken = localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    const response = await get(`/api/forgot/`, config);
    return response.response;
  } catch (error) {
    throw new Error(error);
  }
};

export const verifyUserEmail = async (uri) => {
  try {
    const response = await get(uri);
    return response.status;
  } catch (error) {
    throw new Error(error);
  }
};