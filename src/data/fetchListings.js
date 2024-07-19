import axios from "axios";
import { get, patch, post, remove } from "../utils/Api";

// export const fetchallListings = async (page) => {
//   try {
//     const response = await get(`/api/home/all/?page=${page}`);
//     return response.results;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

export const fetchallListings = async (page, selectedPlace) => {
  try {
    let url = ""; // Define url here

    if (selectedPlace) {
      url = `/api/home/all/`;
      url += `?location=${selectedPlace}&page=${page}`;
    } else {
      url = `/api/home/all/?page=${page}`;
    }

    const response = await get(url);
    return response?.results;
  } catch (error) {
    throw new Error(error);
  }
};






export const fetchoneListing = async (data) => {
  try {
    const response = await post(`/api/home/get/`, data);
    return response.results;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchFilteredListings = async (data) => {
  try {
    const uri = `/api/home/all/?${data}`;
    const response = await get(uri);
    return response.results;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchPopularListings = async () => {
  try {
    const uri = `/api/home/all/?sort=popular`;
    const response = await get(uri);
    return response.results;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchHostListings = async () => {
  try {
    const authToken = localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    const response = await get("/api/listing/?self=true", config);
    return response.response;
  } catch (error) {
    throw new Error(error);
  }
};

export const createListing = async (data) => {
  try {
    const authToken = localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    const response = await post("/api/listing/", data, config);
    return response.response;
  } catch (error) {
    throw new Error(error);
  }
};

export const editListing = async (data) => {
  try {
    const authToken = localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    const response = await patch("/api/listing/", data, config);
    return response.response;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteListing = async (id) => {
  try {
    const authToken = localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    const response = await remove(`/api/listing/?object=${id}`, config);
    return response.response;
  } catch (error) {
    throw new Error(error);
  }
};



export const fetchFilteredListingsLocation = async (data) => {
  try {
    const uri = `/api/home/all/?${data}`;
    const response = await get(uri);
    return response.results;
  } catch (error) {
    throw new Error(error);
  }
};

