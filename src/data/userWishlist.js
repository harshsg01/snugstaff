import { patch,get } from "../utils/Api"

export const addItemToWishlist = async (id) => {
  const username = localStorage.getItem("username");
  const authToken = localStorage.getItem("access_token");
  try {
    const payload = {
      username: username,
      patch_type: "add",
      items: [`${id}`],
    };
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    };
    const url = `/api/wishlist/`
    const response = await patch(url,payload,config);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};


export const removeItemToWishlist = async (id) => {
  const username = localStorage.getItem("username");
  const authToken = localStorage.getItem("access_token");
  try {
    const payload = {
      username: username,
      patch_type: "remove",
      items: [`${id}`],
    };
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    };
    const url = `/api/wishlist/`
    const response = await patch(url,payload,config);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllRoomTypesList= async()=>{
  try{
  const response = await  get(`/api/room/types/`)
  return response
  }catch (error) {
    throw new Error(error);
  }
}
