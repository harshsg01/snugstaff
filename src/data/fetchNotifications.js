import { get, patch } from "../utils/Api";

export const fetchNotifications = async () => {
  try {
    const authToken = localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    const response = await get("/api/notifications/", config);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
