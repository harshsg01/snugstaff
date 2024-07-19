import { post } from "../utils/Api";

export const addComplainceDocuments = async (data) => {
  try {
    // const authToken = localStorage.getItem("access_token");
    const authToken = "VK79fAz9hdJPWoK2loGdGnnTnCj7bi";
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    console.log(data)
    const response = await post("/api/kyc/", data, config);
    return response.response;
  } catch (error) {
    throw new Error(error);
  }
};
