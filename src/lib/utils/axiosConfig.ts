import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.wetrocloud.com/v1",
  headers: {
    "Content-Type": "application/json",
    "Authorization": process.env.WETROCLOUD_API_KEY,

  },
});
export default axiosInstance;
