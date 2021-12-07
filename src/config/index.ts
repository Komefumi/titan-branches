import axios from "axios";

const isDev = process.env.NODE_ENV === "development"

const apiAdapter = axios.create({
  baseURL: "http://localhost:4545/api/",
  timeout: 1000,
});

export { isDev, apiAdapter }
