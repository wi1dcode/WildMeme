import { post, get } from "./api";

export const registerUser = async (userData) => {
  try {
    const response = await post(`/user/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await post(`/user/login`, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const validateToken = async () => {
  try {
    const response = await get(`/user/session`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMe = async () => {
  try {
    const response = await get(`/user/userinfo`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
