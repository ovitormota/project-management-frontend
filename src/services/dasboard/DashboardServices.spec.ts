import { describe, expect, it, vi } from "vitest";
import DashboardServices from "./DashboardServices";
import axiosInstance from "@/config/axiosConfig";

vi.mock("@/config/AxiosConfig");

describe("DashboardService", () => {
  it("should return dashboard indicators when the API request is successful", async () => {
    const mockData = { indicator1: 100, indicator2: 200 };
    (axiosInstance.get as any).mockResolvedValue({ data: mockData });

    const result = await DashboardServices.getDashboardIndicators();

    expect(result).toEqual(mockData);
    expect(axiosInstance.get).toHaveBeenCalledWith("/dashboard");
  });

  it("should throw an error when the API request fails", async () => {
    (axiosInstance.get as any).mockRejectedValue(new Error("API Error"));

    await expect(DashboardServices.getDashboardIndicators()).rejects.toThrow(
      "API Error"
    );
  });
});
