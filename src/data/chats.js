import { get, patch } from "../utils/Api";

export const getChatGroup = async () => {
  try {
    const authToken = localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    const response = await get("/api/chat/?host=True", config);
    return response.response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getChats = async (id) => {
  try {
    const authToken = localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    const response = await get(`/api/chat/?chat=${id}&results=30`, config);
    return response.response;
  } catch (error) {
    throw new Error(error);
  }
};

export const sendNewMessage = async (data) => {
  try {
    const authToken = localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    const response = await patch("/api/chat/", data, config);
    return response;
  } catch (error) {
    throw new Error(error);
  }
}