import axios from "axios";

const api = axios.create({
  baseURL: "https://sales-bill-backend.onrender.com/api", // backend base URL
});

export default api;
