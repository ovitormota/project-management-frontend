import axiosInstance from "@/config/AxiosConfig";
import type { Project } from "@/interfaces/Types";

const API_URL = "/projects";

const getProjects = async (): Promise<Project[]> => {
  try {
    const response = await axiosInstance.get<Project[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

const getProjectById = async (id: number | string): Promise<Project> => {
  try {
    const response = await axiosInstance.get<Project>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
};

const createProject = async (project: Project): Promise<Project> => {
  try {
    const response = await axiosInstance.post<Project>(API_URL, project);
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

const updateProject = async (project: Project): Promise<Project> => {
  try {
    const response = await axiosInstance.put<Project>(
      `${API_URL}/${project.id}`,
      project
    );
    return response.data;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

const deleteProject = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

export default {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
