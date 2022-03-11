import axios, { AxiosResponse } from "axios";
import { apiClient } from "utils/apiClient";

interface UploadImageResponse {
  url: string;
}

const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await apiClient.post<
    FormData,
    AxiosResponse<UploadImageResponse>
  >("/upload", formData);
  return response.data.url;
};

export const uploadAPI = Object.freeze({
  uploadImage,
});
