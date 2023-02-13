import axios from "axios";

const baseURL = import.meta.env.VITE_CHAT_WIC_API || "http://localhost:8080";

export const http  = axios.create({
    baseURL,
});
