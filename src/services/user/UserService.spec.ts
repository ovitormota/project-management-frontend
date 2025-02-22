import axiosInstance from "@/config/AxiosConfig";
import { Role, type User } from "@/interfaces/Types";
import { describe, expect, it, vi } from "vitest";
import UserService from "./UserService";

vi.mock("@/config/axiosConfig");

describe("UserService", () => {
  const mockUser: User = {
    id: 1,
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    password: "password",
    role: Role.ADMIN,
  };

  it("should fetch all users successfully", async () => {
    const mockUsers: User[] = [mockUser];
    (axiosInstance.get as any).mockResolvedValue({ data: mockUsers });

    const result = await UserService.getUsers();
    expect(result).toEqual(mockUsers);
    expect(axiosInstance.get).toHaveBeenCalledWith("/users");
  });

  it("should throw an error when fetching all users fails", async () => {
    (axiosInstance.get as any).mockRejectedValue(new Error("API Error"));

    await expect(UserService.getUsers()).rejects.toThrow("API Error");
    expect(axiosInstance.get).toHaveBeenCalledWith("/users");
  });

  it("should fetch a user by ID successfully", async () => {
    (axiosInstance.get as any).mockResolvedValue({ data: mockUser });

    const result = await UserService.getUserById(1);
    expect(result).toEqual(mockUser);
    expect(axiosInstance.get).toHaveBeenCalledWith("/users/1");
  });

  it("should throw an error when fetching a user by ID fails", async () => {
    (axiosInstance.get as any).mockRejectedValue(new Error("API Error"));

    await expect(UserService.getUserById(1)).rejects.toThrow("API Error");
    expect(axiosInstance.get).toHaveBeenCalledWith("/users/1");
  });

  it("should create a user successfully", async () => {
    (axiosInstance.post as any).mockResolvedValue({ data: mockUser });

    const result = await UserService.createUser(mockUser);
    expect(result).toEqual(mockUser);
    expect(axiosInstance.post).toHaveBeenCalledWith("/users", mockUser);
  });

  it("should throw an error when creating a user fails", async () => {
    (axiosInstance.post as any).mockRejectedValue(new Error("API Error"));

    await expect(UserService.createUser(mockUser)).rejects.toThrow("API Error");
    expect(axiosInstance.post).toHaveBeenCalledWith("/users", mockUser);
  });

  it("should update a user successfully", async () => {
    (axiosInstance.put as any).mockResolvedValue({ data: mockUser });

    const result = await UserService.updateUser(mockUser);
    expect(result).toEqual(mockUser);
    expect(axiosInstance.put).toHaveBeenCalledWith("/users/1", mockUser);
  });

  it("should throw an error when updating a user fails", async () => {
    (axiosInstance.put as any).mockRejectedValue(new Error("API Error"));

    await expect(UserService.updateUser(mockUser)).rejects.toThrow("API Error");
    expect(axiosInstance.put).toHaveBeenCalledWith("/users/1", mockUser);
  });

  it("should delete a user successfully", async () => {
    (axiosInstance.delete as any).mockResolvedValue({});

    await UserService.deleteUser(1);
    expect(axiosInstance.delete).toHaveBeenCalledWith("/users/1");
  });

  it("should throw an error when deleting a user fails", async () => {
    (axiosInstance.delete as any).mockRejectedValue(new Error("API Error"));

    await expect(UserService.deleteUser(1)).rejects.toThrow("API Error");
    expect(axiosInstance.delete).toHaveBeenCalledWith("/users/1");
  });
});
