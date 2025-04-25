import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,
  timeout: 15000,
});

export const protectedInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,
  timeout: 15000,
});

protectedInstance.interceptors.request.use((req) => {
  // Check token + refresh or sign out before sending the requests

  return req;
});
