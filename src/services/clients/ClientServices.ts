import type { Client } from "@/interfaces/Types";
import axios from "axios";

const API_URL = "http://localhost:8080/api/clients";

const getClients = async (): Promise<Client[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
};

const getClientById = async (id: number | string): Promise<Client> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching client:", error);
    throw error;
  }
};

const createClient = async (client: Client): Promise<Client> => {
  try {
    const response = await axios.post(API_URL, client);
    return response.data;
  } catch (error) {
    console.error("Error creating client:", error);
    throw error;
  }
};

const updateClient = async (client: Client): Promise<Client> => {
  try {
    const response = await axios.put(`${API_URL}/${client.id}`, client);
    return response.data;
  } catch (error) {
    console.error("Error updating client:", error);
    throw error;
  }
};

const deleteClient = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
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
