import axiosInstance from "@/config/AxiosConfig";
import type { User } from "@/interfaces/Types";

const API_URL = "/users";

const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axiosInstance.get<User[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const getUserById = async (id: number | string): Promise<User> => {
  try {
    const response = await axiosInstance.get<User>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

const createUser = async (user: User): Promise<User> => {
  try {
    const response = await axiosInstance.post<User>(API_URL, user);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

const updateUser = async (user: User): Promise<User> => {
  try {
    const response = await axiosInstance.put<User>(
      `${API_URL}/${user.id}`,
      user
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

const deleteUser = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
