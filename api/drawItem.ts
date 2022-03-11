import { AxiosResponse } from "axios";
import { DrawItem } from "types/DrawItem";
import { apiClient } from "utils/apiClient";

export interface DrawItemParams {
  id?: number;
  name?: string;
  image_url?: string;
}

const createDrawItem = async (
  drawId: number,
  params: DrawItemParams
): Promise<DrawItem> => {
  const response = await apiClient.post<
    DrawItemParams,
    AxiosResponse<DrawItem>
  >(`/draws/${drawId}/draw_items`, params);

  return response.data;
};

const luckyPick = async (drawId: number): Promise<DrawItem> => {
  const response = await apiClient.post<undefined, AxiosResponse<DrawItem>>(
    `/draws/${drawId}/draw`
  );

  return response.data;
};

const updateDrawItem = async (params: DrawItemParams): Promise<void> => {
  await apiClient.put<DrawItemParams, AxiosResponse<void>>(
    `/draw_items/${params.id}`,
    params
  );
};

const deleteDrawItem = async (id: number): Promise<void> => {
  await apiClient.delete<DrawItemParams, AxiosResponse<void>>(
    `/draw_items/${id}`
  );
};

export const drawItemAPI = Object.freeze({
  createDrawItem,
  updateDrawItem,
  deleteDrawItem,
  luckyPick,
});
