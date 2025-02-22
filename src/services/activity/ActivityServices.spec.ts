import axiosInstance from "@/config/AxiosConfig";
import type { Activity } from "@/interfaces/Types";
import { describe, expect, it, vi } from "vitest";
import ActivityServices from "./ActivityServices";

vi.mock("@/config/axiosConfig");

describe("ActivityServices", () => {
  const mockActivity: Activity = {
    id: 1,
    name: "Test Activity",
    description: "This is a test activity",
    status: "In Progress",
    startDate: "2023-09-01",
    endDate: "2023-09-30",
    project: null,
  };

  it("should fetch all activities successfully", async () => {
    const mockActivities: Activity[] = [mockActivity];
    (axiosInstance.get as any).mockResolvedValue({ data: mockActivities });

    const result = await ActivityServices.getActivities();
    expect(result).toEqual(mockActivities);
    expect(axiosInstance.get).toHaveBeenCalledWith("/activities");
  });

  it("should throw an error when fetching all activities fails", async () => {
    (axiosInstance.get as any).mockRejectedValue(new Error("API Error"));

    await expect(ActivityServices.getActivities()).rejects.toThrow("API Error");
    expect(axiosInstance.get).toHaveBeenCalledWith("/activities");
  });

  it("should fetch an activity by ID successfully", async () => {
    (axiosInstance.get as any).mockResolvedValue({ data: mockActivity });

    const result = await ActivityServices.getActivityById(1);
    expect(result).toEqual(mockActivity);
    expect(axiosInstance.get).toHaveBeenCalledWith("/activities/1");
  });

  it("should throw an error when fetching an activity by ID fails", async () => {
    (axiosInstance.get as any).mockRejectedValue(new Error("API Error"));

    await expect(ActivityServices.getActivityById(1)).rejects.toThrow(
      "API Error"
    );
    expect(axiosInstance.get).toHaveBeenCalledWith("/activities/1");
  });

  it("should create an activity successfully", async () => {
    (axiosInstance.post as any).mockResolvedValue({});

    await ActivityServices.createActivity(mockActivity);
    expect(axiosInstance.post).toHaveBeenCalledWith(
      "/activities",
      mockActivity
    );
  });

  it("should throw an error when creating an activity fails", async () => {
    (axiosInstance.post as any).mockRejectedValue(new Error("API Error"));

    await expect(ActivityServices.createActivity(mockActivity)).rejects.toThrow(
      "API Error"
    );
    expect(axiosInstance.post).toHaveBeenCalledWith(
      "/activities",
      mockActivity
    );
  });

  it("should update an activity successfully", async () => {
    (axiosInstance.put as any).mockResolvedValue({});

    await ActivityServices.updateActivity(mockActivity);
    expect(axiosInstance.put).toHaveBeenCalledWith(
      "/activities/1",
      mockActivity
    );
  });

  it("should throw an error when updating an activity fails", async () => {
    (axiosInstance.put as any).mockRejectedValue(new Error("API Error"));

    await expect(ActivityServices.updateActivity(mockActivity)).rejects.toThrow(
      "API Error"
    );
    expect(axiosInstance.put).toHaveBeenCalledWith(
      "/activities/1",
      mockActivity
    );
  });

  it("should delete an activity successfully", async () => {
    (axiosInstance.delete as any).mockResolvedValue({});

    await ActivityServices.deleteActivity(1);
    expect(axiosInstance.delete).toHaveBeenCalledWith("/activities/1");
  });

  it("should throw an error when deleting an activity fails", async () => {
    (axiosInstance.delete as any).mockRejectedValue(new Error("API Error"));

    await expect(ActivityServices.deleteActivity(1)).rejects.toThrow(
      "API Error"
    );
    expect(axiosInstance.delete).toHaveBeenCalledWith("/activities/1");
  });
});
