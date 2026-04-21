import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000"
});

export async function fetchProducts() {
  const { data } = await api.get("/api/products");
  return data;
}

export async function registerUser(payload) {
  const { data } = await api.post("/api/auth/register", payload);
  return data;
}

export async function loginUser(payload) {
  const { data } = await api.post("/api/auth/login", payload);
  return data;
}

export async function createOrder(payload) {
  const { data } = await api.post("/api/orders", payload);
  return data;
}
