import { get, post } from "../utils/Api";

export const fetchallCurrency = async () => {
  try {
    const response = await get("/api/currency/");
    return response.response;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchallAmeneties = async () => {
  try {
    const response = await get("/api/ameneties/");
    return response.response;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchallAmenetiesCategories = async () => {
  try {
    const response = await get("/api/ameneties/categories/");
    return response.response;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchallRoomTypes = async () => {
  try {
    const response = await get("/api/room/types");
    return response.response;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchallPropTypes = async () => {
  try {
    const response = await get("/api/property/types/");
    return response.response;
  } catch (error) {
    throw new Error(error);
  }
};

export const saveImage = async (data) => {
  try {
    console.log(data, "data")
    const response = await post("/api/images/", data);
    return response.response;
  } catch (error) {
    throw new Error(error);
  }
}