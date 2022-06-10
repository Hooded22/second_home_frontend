import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "../assets/constants";

export const request = axios.create({
  baseURL: BASE_URL,
  responseType: "json",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem("TOKEN");
  if (config.headers && token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
