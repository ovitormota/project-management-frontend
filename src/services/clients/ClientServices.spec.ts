import axiosInstance from "@/config/axiosConfig";
import type { Client } from "@/interfaces/Types";
import { describe, expect, it } from "vitest";
import ClientServices from "./ClientServices";

vi.mock("@/config/axiosConfig");

describe("ClientServices", () => {
  const mockClient: Client = {
    id: 1,
    name: "Client Test",
    email: "client@test.com",
  };

  it("should fetch all clients successfully", async () => {
    const mockClients: Client[] = [mockClient];
    (axiosInstance.get as any).mockResolvedValue({ data: mockClients });

    const result = await ClientServices.getClients();
    expect(result).toEqual(mockClients);
    expect(axiosInstance.get).toHaveBeenCalledWith("/clients");
  });

  it("should throw an error when fetching all clients fails", async () => {
    (axiosInstance.get as any).mockRejectedValue(new Error("API Error"));

    await expect(ClientServices.getClients()).rejects.toThrow("API Error");
    expect(axiosInstance.get).toHaveBeenCalledWith("/clients");
  });

  it("should fetch a client by ID successfully", async () => {
    (axiosInstance.get as any).mockResolvedValue({ data: mockClient });

    const result = await ClientServices.getClientById(1);
    expect(result).toEqual(mockClient);
    expect(axiosInstance.get).toHaveBeenCalledWith("/clients/1");
  });

  it("should throw an error when fetching a client by ID fails", async () => {
    (axiosInstance.get as any).mockRejectedValue(new Error("API Error"));

    await expect(ClientServices.getClientById(1)).rejects.toThrow("API Error");
    expect(axiosInstance.get).toHaveBeenCalledWith("/clients/1");
  });

  it("should create a client successfully", async () => {
    (axiosInstance.post as any).mockResolvedValue({ data: mockClient });

    const result = await ClientServices.createClient(mockClient);
    expect(result).toEqual(mockClient);
    expect(axiosInstance.post).toHaveBeenCalledWith("/clients", mockClient);
  });

  it("should throw an error when creating a client fails", async () => {
    (axiosInstance.post as any).mockRejectedValue(new Error("API Error"));

    await expect(ClientServices.createClient(mockClient)).rejects.toThrow(
      "API Error"
    );
    expect(axiosInstance.post).toHaveBeenCalledWith("/clients", mockClient);
  });

  it("should update a client successfully", async () => {
    (axiosInstance.put as any).mockResolvedValue({ data: mockClient });

    const result = await ClientServices.updateClient(mockClient);
    expect(result).toEqual(mockClient);
    expect(axiosInstance.put).toHaveBeenCalledWith("/clients/1", mockClient);
  });

  it("should throw an error when updating a client fails", async () => {
    (axiosInstance.put as any).mockRejectedValue(new Error("API Error"));

    await expect(ClientServices.updateClient(mockClient)).rejects.toThrow(
      "API Error"
    );
    expect(axiosInstance.put).toHaveBeenCalledWith("/clients/1", mockClient);
  });

  it("should delete a client successfully", async () => {
    (axiosInstance.delete as any).mockResolvedValue({});

    await ClientServices.deleteClient(1);
    expect(axiosInstance.delete).toHaveBeenCalledWith("/clients/1");
  });

  it("should throw an error when deleting a client fails", async () => {
    (axiosInstance.delete as any).mockRejectedValue(new Error("API Error"));

    await expect(ClientServices.deleteClient(1)).rejects.toThrow("API Error");
    expect(axiosInstance.delete).toHaveBeenCalledWith("/clients/1");
  });
});
