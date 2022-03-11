import { AxiosResponse } from "axios";
import { Draw } from "types/Draw";
import { apiClient } from "utils/apiClient";

export interface DrawParams {
  id?: number;
  name?: string;
  image_url?: string;
}

const fetchDraws = async (): Promise<Draw[]> => {
  const response: AxiosResponse = await apiClient.get<
    undefined,
    AxiosResponse<Draw[]>
  >("/draws");
  return response.data;
};

const createDraw = async (params: DrawParams): Promise<Draw> => {
  const response = await apiClient.post<DrawParams, AxiosResponse<Draw>>(
    "/draws",
    params
  );

  return response.data;
};

const updateDraw = async (params: DrawParams): Promise<void> => {
  await apiClient.put<DrawParams, AxiosResponse<Draw>>(
    `/draws/${params.id}`,
    params
  );
};

const deleteDraw = async (id: number): Promise<void> => {
  await apiClient.delete<DrawParams, AxiosResponse<undefined>>(`/draws/${id}`);
};

export const drawAPI = Object.freeze({
  fetchDraws,
  createDraw,
  updateDraw,
  deleteDraw,
});
