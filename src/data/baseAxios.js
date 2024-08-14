import axios from "axios";
import store from "../store/store";

const state = store.getState(); // Get the current state
const token = state.auth.token;
console.log("🚀 ~ token:", token);

export const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { Authorization: `Bearer ${token}` },
});

export const useApiWithoutToken = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
