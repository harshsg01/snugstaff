import { get, patch } from "../utils/Api";

export const fetchUser = async () => {
  try {
    const authToken = localStorage.getItem("access_token");
    if(!authToken) {
      throw new Error("Please login first");
    }
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    const response = await get("/api/getuser/", config);
    return response.response;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateUser = async (data) => {
  try {
    const authToken = localStorage.getItem("access_token");
    const config = {
      headers: {
        "Authorization": `Bearer ${authToken}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await patch("/api/profile/", data, config);
    return response.response;
  } catch (error) {
    throw new Error(error);
  }
};

export const convertToHost = async (data) => {
  try {
    const authToken = localStorage.getItem("access_token");
    const config = {
      headers: {
        "Authorization": `Bearer ${authToken}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await patch("/api/profile/", data, config);
    return response.response;
  } catch (error) {
    throw new Error(error);
  }
};