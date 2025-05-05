import axios from "axios";

const api = axios.create({
  baseURL: "https://sales-bill-backend-sqz9.vercel.app//api", // backend base URL
});

export default api;
