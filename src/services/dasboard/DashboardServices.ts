import axiosInstance from "@/config/AxiosConfig";
import type { DashboardIndicators } from "@/interfaces/Types";

const API_URL = "/dashboard";

const getDashboardIndicators = async (): Promise<DashboardIndicators> => {
  try {
    const response = await axiosInstance.get<DashboardIndicators>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar indicadores do dashboard:", error);
    throw error;
  }
};

export default {
  getDashboardIndicators,
};
