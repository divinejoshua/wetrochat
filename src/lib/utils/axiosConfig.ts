import { getApiKey } from "@/app/actions";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.WETROCLOUD_API_KEY,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
