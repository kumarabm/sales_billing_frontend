import axios from "axios";

const api = axios.create({
  baseURL: "https://sales-bill-backend-9br2.vercel.app/api", // backend base URL
});

export default api;
