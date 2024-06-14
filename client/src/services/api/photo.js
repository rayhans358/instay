import axios from "axios";
import { configClient } from "../configClient";

export async function uploadPhotoByLink(photoLink) {
  return await axios.post(`${configClient.api_base_url}/photo/upload-by-link`, {
    link: photoLink,
  });
}

export function uploadPhotoByFile(data) {
  return axios.post(`${configClient.api_base_url}/photo/upload-by-file`, data, {
    headers: { "Content-type": "multipart/form-data" },
  });
}
/* You just need to use the given code if you want to delete images in Visual Studio Code (VSCode). If there is no need to delete the image, then there is no need to use the code.
export async function removePhoto(filename) {
  return await axios.delete(`${configClient.api_base_url}/photo/delete-photo`, {
    data: { filename },
  });
}*/
