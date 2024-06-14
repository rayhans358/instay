import axios from "axios";
import { configClient } from "../configClient";

export async function getAllBookings() {
  return await axios.get(`${configClient.api_base_url}/bookings/get-all`);
}

export async function getBookingById(id) {
  return await axios.get(`${configClient.api_base_url}/bookings/get-id/${id}`);
}

export async function createBooking(bookData) {
  return await axios.post(
    `${configClient.api_base_url}/bookings/create-bookings`,
    bookData
  );
}
