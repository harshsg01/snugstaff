import { get, post } from "../utils/Api";


export const saveListingcerts = async (data) => {
    try {
      const authToken = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
          // 'Content-Type': 'multipart/form-data',
        },
      };
      const url = "/api/kyc/";
      const response = await post(url,data, config);
      return response.response;
    } catch (error) {
      throw new Error(error);
    }
  };
  