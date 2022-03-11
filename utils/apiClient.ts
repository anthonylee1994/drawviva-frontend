import axios from "axios";

axios.defaults.baseURL = process.env.API_BASE_URL;

console.log("process.env.API_BASE_URL", process.env.API_BASE_URL);

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axios.interceptors.response.use((config) => {
  if (config.headers && typeof config.headers.authorization === "string") {
    localStorage.setItem("token", config.headers.authorization.split(" ")[1]);
  }

  return config;
});

export const apiClient = axios;
