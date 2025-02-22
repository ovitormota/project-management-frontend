import type { DashboardIndicators } from "@/interfaces/Types";
import axios from "axios";

const API_URL = "http://localhost:8080/api/dashboard";

const getDashboardIndicators = async (): Promise<DashboardIndicators> => {
  try {
    const response = await axios.get<DashboardIndicators>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar indicadores do dashboard:", error);
    throw error;
  }
};

export default {
  getDashboardIndicators,
};
