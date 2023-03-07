
import axios from "axios";
import { useAppStore } from '@/stores/useAppStore';
import { redirectTo } from "../shared/utils/history";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const http = axios.create({
  withCredentials: true,
  baseURL,
});

export const noTokenHttp = axios.create({
  baseURL
});

// Add a request interceptor
http.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');

  if (!token) {
    toast.error(`Authorization Fail!`);
    return redirectTo('/');
  }

  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${token && token}`,
    // Cookies:`jwt=${token}`,
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
http.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data

  return response;
}, function (error) {

  if (error?.response?.status == 401) {
    redirectTo("/");
    toast.error(`Authorization Fail!`);
  }
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default http;