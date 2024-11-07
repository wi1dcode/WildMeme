import { get, post, remove } from "./api";

export const getAllMemes = async () => {
  const response = await fetch("https://api.imgflip.com/get_memes");
  return await response.json();
};

export const fetchMemes = async () => {
  try {
    const response = await get(`/memes/all`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMemeById = async (id) => {
  try {
    const response = await get(`/memes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createMeme = async (formData) => {
  try {
    const response = await post(`/memes/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteMemeById = async (id) => {
  try {
    const response = await remove(`/memes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
