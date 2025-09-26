import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

export const login = (email, password) =>
  axios.post(`${API_URL}/login`, { email, password });

export const register = (nombre, email, password) =>
  axios.post(`${API_URL}/register`, {
    nombre,
    email,
    password,
    role: "estudiante",
  });

export const ping = (token) =>
  axios.get(`${API_URL}/ping`, {
    headers: { Authorization: `Bearer ${token}` },
  });
