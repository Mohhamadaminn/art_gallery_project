import axios from "axios";
import { attachAuthInterceptors } from "./authInterceptor";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
});

attachAuthInterceptors(api);

export default api;