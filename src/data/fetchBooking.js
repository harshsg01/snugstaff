import { get, post } from "../utils/Api";

export const createBooking = async (data) => {
  try {
    const authToken = localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    const response = await post(`/api/bookings/`, data, config);
    return response.response;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchHostBookings = async () => {
  try {
    const authToken = localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    const response = await get(`/api/bookings/?self=true`, config);
    return response.response;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchHostBooking = async (bookingId) => {
  try {
    const authToken = localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    const response = await get(`/api/bookings/?id=${bookingId}`, config);
    return response.response;
  } catch (error) {
    throw new Error(error);
  }
}


export const confirmBookingRequest = async (id) => {
  try {
    const authToken = localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    const response = await get(`/api/orders/confirm/?id=${id}`, config);
    return response.response;
  } catch (error) {
    throw new Error(error);
  }
};

export const cancelBookingRequest = async (id) => {
  try {
    const authToken = localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    const response = await get(`/api/orders/cancel/?id=${id}`, config);
    return response.response;
  } catch (error) {
    throw new Error(error);
  }
};