import { AxiosResponse } from "axios";
import { UserDraw } from "types/UserDraw";
import { apiClient } from "utils/apiClient";

export interface UserDrawParams {
  id?: number;
  user_id?: number;
  draw_id?: number;
  role?: string;
}

const createUserDraw = async (params: UserDrawParams): Promise<UserDraw> => {
  const response = await apiClient.post<
    UserDrawParams,
    AxiosResponse<UserDraw>
  >("/user_draws", params);

  return response.data;
};

const updateUserDraw = async (params: UserDrawParams): Promise<void> => {
  await apiClient.put<UserDrawParams, AxiosResponse<UserDraw>>(
    `/user_draws/${params.id}`,
    params
  );
};

const deleteUserDraw = async (id: number): Promise<void> => {
  await apiClient.delete<UserDrawParams, AxiosResponse<undefined>>(
    `/user_draws/${id}`
  );
};

export const userDrawAPI = Object.freeze({
  createUserDraw,
  updateUserDraw,
  deleteUserDraw,
});
