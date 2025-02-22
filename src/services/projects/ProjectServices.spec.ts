import axiosInstance from "@/config/AxiosConfig";
import type { Project } from "@/interfaces/Types";
import { describe, expect, it, vi } from "vitest";
import ProjectServices from "./ProjectServices";

vi.mock("@/config/axiosConfig");

describe("ProjectServices", () => {
  const mockProject: Project = {
    id: 1,
    name: "Test Project",
    description: "This is a test project",
    status: "In Progress",
    startDate: "2023-09-01",
    endDate: "2023-09-30",
    client: null,
    activities: [],
  };

  it("should fetch all projects successfully", async () => {
    const mockProjects: Project[] = [mockProject];
    (axiosInstance.get as any).mockResolvedValue({ data: mockProjects });

    const result = await ProjectServices.getProjects();
    expect(result).toEqual(mockProjects);
    expect(axiosInstance.get).toHaveBeenCalledWith("/projects");
  });

  it("should throw an error when fetching all projects fails", async () => {
    (axiosInstance.get as any).mockRejectedValue(new Error("API Error"));

    await expect(ProjectServices.getProjects()).rejects.toThrow("API Error");
    expect(axiosInstance.get).toHaveBeenCalledWith("/projects");
  });

  it("should fetch a project by ID successfully", async () => {
    (axiosInstance.get as any).mockResolvedValue({ data: mockProject });

    const result = await ProjectServices.getProjectById(1);
    expect(result).toEqual(mockProject);
    expect(axiosInstance.get).toHaveBeenCalledWith("/projects/1");
  });

  it("should throw an error when fetching a project by ID fails", async () => {
    (axiosInstance.get as any).mockRejectedValue(new Error("API Error"));

    await expect(ProjectServices.getProjectById(1)).rejects.toThrow(
      "API Error"
    );
    expect(axiosInstance.get).toHaveBeenCalledWith("/projects/1");
  });

  it("should create a project successfully", async () => {
    (axiosInstance.post as any).mockResolvedValue({ data: mockProject });

    const result = await ProjectServices.createProject(mockProject);
    expect(result).toEqual(mockProject);
    expect(axiosInstance.post).toHaveBeenCalledWith("/projects", mockProject);
  });

  it("should throw an error when creating a project fails", async () => {
    (axiosInstance.post as any).mockRejectedValue(new Error("API Error"));

    await expect(ProjectServices.createProject(mockProject)).rejects.toThrow(
      "API Error"
    );
    expect(axiosInstance.post).toHaveBeenCalledWith("/projects", mockProject);
  });

  it("should update a project successfully", async () => {
    (axiosInstance.put as any).mockResolvedValue({ data: mockProject });

    const result = await ProjectServices.updateProject(mockProject);
    expect(result).toEqual(mockProject);
    expect(axiosInstance.put).toHaveBeenCalledWith("/projects/1", mockProject);
  });

  it("should throw an error when updating a project fails", async () => {
    (axiosInstance.put as any).mockRejectedValue(new Error("API Error"));

    await expect(ProjectServices.updateProject(mockProject)).rejects.toThrow(
      "API Error"
    );
    expect(axiosInstance.put).toHaveBeenCalledWith("/projects/1", mockProject);
  });

  it("should delete a project successfully", async () => {
    (axiosInstance.delete as any).mockResolvedValue({});

    await ProjectServices.deleteProject(1);
    expect(axiosInstance.delete).toHaveBeenCalledWith("/projects/1");
  });

  it("should throw an error when deleting a project fails", async () => {
    (axiosInstance.delete as any).mockRejectedValue(new Error("API Error"));

    await expect(ProjectServices.deleteProject(1)).rejects.toThrow("API Error");
    expect(axiosInstance.delete).toHaveBeenCalledWith("/projects/1");
  });
});
