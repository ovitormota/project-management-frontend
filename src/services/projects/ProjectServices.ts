import type { Project } from "@/interfaces/Types";
import axios from "axios";

const API_URL = "http://localhost:8080/api/projects";

const getProjects = async (): Promise<Project[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

const getProjectById = async (id: number | string): Promise<Project> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
};

const createProject = async (project: Project): Promise<Project> => {
  try {
    const response = await axios.post(API_URL, project);
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

const updateProject = async (project: Project): Promise<Project> => {
  try {
    const response = await axios.put(`${API_URL}/${project.id}`, project);
    return response.data;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

const deleteProject = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
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
