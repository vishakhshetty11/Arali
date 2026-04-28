import axios from "axios";

const API = axios.create({
  baseURL: "https://arali-customer-backend.onrender.com",
});

export default API;