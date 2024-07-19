import { get, patch, post, remove } from "../utils/Api";

export const editReview = async (data) => {
    console.log(data)
    try {
      const authToken = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const response = await post("/api/reviews/", data, config);
      return response.response;
    } catch (error) {
      throw new Error(error);
    }
  };


export const editReview1 = async (data) => {
  console.log(data)
  try {
    const authToken = localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    const response = await patch("/api/reviews/", data, config);
    return response.response;
  } catch (error) {
    throw new Error(error);
  }
};