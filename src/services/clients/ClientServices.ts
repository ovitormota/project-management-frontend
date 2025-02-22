import axiosInstance from "@/config/AxiosConfig";
import type { Client } from "@/interfaces/Types";

const API_URL = "/clients";

const getClients = async (): Promise<Client[]> => {
  try {
    const response = await axiosInstance.get<Client[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
};

const getClientById = async (id: number | string): Promise<Client> => {
  try {
    const response = await axiosInstance.get<Client>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching client:", error);
    throw error;
  }
};

const createClient = async (client: Client): Promise<Client> => {
  try {
    const response = await axiosInstance.post<Client>(API_URL, client);
    return response.data;
  } catch (error) {
    console.error("Error creating client:", error);
    throw error;
  }
};

const updateClient = async (client: Client): Promise<Client> => {
  try {
    const response = await axiosInstance.put<Client>(
      `${API_URL}/${client.id}`,
      client
    );
    return response.data;
  } catch (error) {
    console.error("Error updating client:", error);
    throw error;
  }
};

const deleteClient = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting client:", error);
    throw error;
  }
};

export default {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
