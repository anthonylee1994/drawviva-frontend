import { User } from "types/User";
import { AxiosResponse } from "axios";
import { apiClient } from "utils/apiClient";

const login = async (token: string): Promise<User> => {
  const response = await apiClient.post<{ token: string }, AxiosResponse<User>>(
    "/login",
    { token }
  );

  return response.data;
};

const fetchMe = async (): Promise<User> => {
  const response = await apiClient.get<undefined, AxiosResponse<User>>("/me");

  return response.data;
};

export const authAPI = Object.freeze({ login, fetchMe });
