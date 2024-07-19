import { get, patch } from "../utils/Api";

export const fetchWishList = async () => {
  try {
    const authToken = localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    const response = await get("/api/wishlist/?self=True", config);
    return response.response;
  } catch (error) {
    throw new Error(error);
  }
};

export const addtoWishList = async (data) => {
  try {
    const authToken = localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    const response = await patch("/api/wishlist/", data, config);
    return response.response;
  } catch (error) {
    throw new Error(error);
  }
};
