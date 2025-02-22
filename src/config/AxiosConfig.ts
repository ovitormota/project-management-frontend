import axios from "axios";

const API_URL = "http://localhost:8080/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      config.headers["Authorization"] = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
