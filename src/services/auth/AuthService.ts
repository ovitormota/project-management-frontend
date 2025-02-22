import axios from "axios";

const API_URL = "http://localhost:8080/api";

class AuthService {
  async login(username: string, password: string) {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
      });

      return response.data;
    } catch (error) {
      throw new Error("Credenciais inválidas!");
    }
  }

  async createUser(user: any) {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, user);
      return response.data;
    } catch (error) {
      throw new Error("Erro ao criar o usuário!");
    }
  }
}

export default new AuthService();
