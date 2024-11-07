import { get } from "./api";

export const fetchUsers = async () => {
  try {
    const response = await get(`/admin/users`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
