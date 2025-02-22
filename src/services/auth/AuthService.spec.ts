import axios from "axios";
import { describe, it, expect, vi } from "vitest";
import AuthService from "./AuthService";

vi.mock("axios");

describe("AuthService", () => {
  it("should return a token when logging in with correct credentials", async () => {
    const mockToken = "fake-jwt-token";
    (axios.post as any).mockResolvedValue({ data: mockToken });

    const result = await AuthService.login("user", "password");

    expect(result).toBe(mockToken);
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:8080/api/auth/login",
      {
        username: "user",
        password: "password",
      }
    );
  });

  it("should throw an error when logging in with invalid credentials", async () => {
    (axios.post as any).mockRejectedValue(new Error("Credenciais inválidas!"));

    await expect(AuthService.login("user", "password")).rejects.toThrow(
      "Credenciais inválidas!"
    );
  });

  it("should return a success message when creating a user", async () => {
    const mockResponse = "User created successfully!";
    (axios.post as any).mockResolvedValue({ data: mockResponse });

    const userData = {
      username: "newUser",
      email: "email@test.com",
      password: "123456",
      firstName: "John",
      lastName: "Doe",
      role: "USER",
    };

    const result = await AuthService.createUser(userData);

    expect(result).toBe(mockResponse);
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:8080/api/auth/signup",
      userData
    );
  });

  it("should throw an error when failing to create a user", async () => {
    (axios.post as any).mockRejectedValue(
      new Error("Erro ao criar o usuário!")
    );

    await expect(AuthService.createUser({})).rejects.toThrow(
      "Erro ao criar o usuário!"
    );
  });
});
