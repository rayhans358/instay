import axios from "axios";
import { configClient } from "../configClient";

export async function getUserPlaces() {
  return await axios.get(`${configClient.api_base_url}/places/get-user`);
}

export async function getAllPlaces() {
  return await axios.get(`${configClient.api_base_url}/places/get-all`);
}

export async function getPlaceById(id) {
  return await axios.get(`${configClient.api_base_url}/places/get-id/${id}`);
}

export async function createPlace(placeData) {
  return await axios.post(
    `${configClient.api_base_url}/places/create-places`,
    placeData
  );
}

export async function updatePlaces(id, placeData) {
  return await axios.put(
    `${configClient.api_base_url}/places/update-places/${id}`,
    placeData
  );
}
