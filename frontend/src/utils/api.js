import Axios from "axios";
import { makeUseAxios } from "axios-hooks";
import { API_HOST } from "./Constant";

export const axiosInstance = Axios.create({
  baseURL: API_HOST,
});

export const useAxios = makeUseAxios({
  axios: axiosInstance,
});
