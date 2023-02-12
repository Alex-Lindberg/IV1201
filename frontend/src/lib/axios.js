import Axios from "axios";
import { API_URL } from "../config";

/* @TODO: add the cookies when ready */
// import Cookies from "js-cookie";

export const axios = Axios.create({
  baseURL: API_URL,
  customErrorMessage: (response) =>
    "Request at URL " +
    response.config.url +
    " failed with status code " +
    response.status,
});

const authRequestInterceptor = (config) => {
  //   const token = Cookies.get("token");
  //   if (token) {
  //     config.Cookies = `${token}`;
  //   }
  config.headers.Accept = "application/json";
  config.headers["Content-Type"] = "application/json";
  return config;
};

axios.interceptors.request.use(authRequestInterceptor, (err) => {
  return Promise.reject({ ...err.toJSON(), requestUrl: err?.config?.url });
});

axios.interceptors.response.use(
  (response) => response,
  (err) => {
    // Delete async stacktrace
    if (err.stack) delete err.stack;
    
    return Promise.reject({ ...err.toJSON(), requestUrl: err?.config?.url });
  }
);
