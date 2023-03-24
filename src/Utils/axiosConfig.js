import axios from "axios";

import {baseURL} from "../baseURL"

const axiosConfig = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

axiosConfig.interceptors.request.use(function (config) {
  const Token = '';
  if (Token) config.headers["Authorization"] = "Bearer " + Token;
  return config;
});

axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.data?.statuscode === 410) {
      const callbackURL = window.location.pathname;
      window.location.href = `/token-expiry?callbackURL=${callbackURL}`;
    }
     return Promise.reject(error);
  }
);

export default axiosConfig;
