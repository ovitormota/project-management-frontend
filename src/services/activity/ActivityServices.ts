import axiosInstance from "@/config/AxiosConfig";
import type { Activity } from "@/interfaces/Types";

const API_URL = "/activities";

const getActivities = async (): Promise<Activity[]> => {
  try {
    const response = await axiosInstance.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching activities:", error);
    throw error;
  }
};

const getActivityById = async (id: number | string): Promise<Activity> => {
  try {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching activity:", error);
    throw error;
  }
};

const createActivity = async (activity: Activity): Promise<void> => {
  try {
    await axiosInstance.post(API_URL, activity);
  } catch (error) {
    console.error("Error creating activity:", error);
    throw error;
  }
};

const updateActivity = async (activity: Activity): Promise<void> => {
  try {
    await axiosInstance.put(`${API_URL}/${activity.id}`, activity);
  } catch (error) {
    console.error("Error updating activity:", error);
    throw error;
  }
};

const deleteActivity = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting activity:", error);
    throw error;
  }
};

export default {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
};
