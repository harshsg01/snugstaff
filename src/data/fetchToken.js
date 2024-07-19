import { post } from "../utils/Api";

export const fetchToken = async () => {
  try {
    const authToken = localStorage.getItem("refresh_token");
    const data = {
      refresh_token: authToken,
      grant_type: "refresh_token",
      client_id: import.meta.env.VITE_API_CLIENT_ID,
      client_secret: import.meta.env.VITE_API_CLIENT_SECRET,
    };
    const response = await post("/api/oauth/token/", data);
    console.log(response);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
