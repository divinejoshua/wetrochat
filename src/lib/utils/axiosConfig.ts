import { getApiKey } from "@/app/actions";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WETROCLOUD_BASE_URL,
});

export default axiosInstance;
