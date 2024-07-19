import { get, post } from "../utils/Api";

export const sendEnquirytoAdmin = async (data) => {
  try {
    const response = await post("/api/enquire-us/", data);
    console.log(data)
    return response.response;
  } catch (error) {
    throw new Error(error);
  }
};

export const sendContactDetailstoAdmin = async (data) => {
  try {
    const response = await post("/api/contact-us/", data);
    return response.response;
  } catch (error) {
    throw new Error(error);
  }
};