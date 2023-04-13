
import axios from "axios";
import { redirectTo } from "../shared/utils/history";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_API_ENV === "dev" ? "http://localhost:8080" : "https://backend-collection-ideas.onrender.com";

export const http = axios.create({
  withCredentials: true,
  baseURL
});

export const noTokenHttp = axios.create({
  withCredentials: true,
  baseURL
});

// Add a request interceptor
http.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');

  if (!token) {
    console.log("token when send request", token);
    // toast.error(`Authorization Fail!`);
    return redirectTo('/');
  }

  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${token && token}`,
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

  console.log("error when receive response", error?.response);

  if (error?.response?.status == 401) {
    redirectTo("/");
    toast.error(`Authorization Fail!`);
  }
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default http;