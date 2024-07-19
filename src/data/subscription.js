import { get, patch, post, remove } from "../utils/Api";

export const initiateSubscription = async (id, type) => {
  try {
    const uri = `/api/subscription/?id=${id}&initiate=true&action=${type}`;
    const authToken = localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    const response = await get(uri, config);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
