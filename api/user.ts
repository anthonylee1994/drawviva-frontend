import { AxiosResponse } from "axios";
import { User } from "types/User";
import { apiClient } from "utils/apiClient";

interface UpdateUserParams {
  photo_url?: string;
  push_notification_subscription_attributes?: {
    auth?: string;
    endpoint?: string;
    p256dh?: string;
  };
}

const searchUsers = async (q: string): Promise<User[]> => {
  const response = await apiClient.get<{ q: string }, AxiosResponse<User[]>>(
    "/users",
    {
      params: {
        q,
      },
    }
  );

  return response.data;
};

const updateUser = async (params: UpdateUserParams): Promise<void> => {
  await apiClient.put<UpdateUserParams, AxiosResponse<undefined>>(
    "/me",
    params
  );
};

export const userAPI = Object.freeze({
  updateUser,
  searchUsers,
});
