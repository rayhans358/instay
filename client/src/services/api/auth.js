import axios from "axios";
import { configClient } from "../configClient";

export async function test() {
  return await axios.get(`${configClient.api_base_url}/auth/test`);
}

export async function registerUser({ name, email, password }) {
  return await axios.post(`${configClient.api_base_url}/auth/register`, {
    name,
    email,
    password,
  });
}

export async function loginUser({ email, password }) {
  return await axios.post(`${configClient.api_base_url}/auth/login`, {
    email,
    password,
  });
}

export async function profileUser() {
  return await axios.get(`${configClient.api_base_url}/auth/profile`);
}

export async function logoutUser() {
  return await axios.post(`${configClient.api_base_url}/auth/logout`);
}
