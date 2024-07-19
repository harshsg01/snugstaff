import { get} from "../utils/Api";

export const fetchHostTotalpayment = async () => {
    try {
      const authToken = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const response = await get("/payments/self/", config);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };


export const fetchHostMonthlySinglepayment = async (paymentId) => {
    try {
      const authToken = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const response = await get(`/payments/single/month/${paymentId}/`, config);
      return response;
    } catch (error) {
      throw new Error(error);
    }
};


export const fetchHostSubscriptionSinglepayment = async (paymentId) => {
  try {
    const authToken = localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    const response = await get(`/payments/single/subscription/${paymentId}/`, config);
    console.log(response)
    return response;
  } catch (error) {
    throw new Error(error);
  }
};


  