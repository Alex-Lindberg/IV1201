import axios from "axios";

/* @TODO: add the cookies when ready */
// import Cookies from "js-cookie";

export const api = {
  get: (url, params = {}) =>
    axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        // token: Cookies.get("token"),
      },
      ...params,
    }),
  post: (url, data) =>
    axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        // token: Cookies.get("token"),
      },
    }),
  patch: (url, data) =>
    axios.patch(url, data, {
      headers: {
        "Content-Type": "application/json",
        // token: Cookies.get("token"),
      },
    }),
  put: (url, data) =>
    axios.put(url, data, {
      headers: {
        "Content-Type": "application/json",
        // token: Cookies.get("token"),
      },
    }),
  delete: (url) =>
    axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
        // token: Cookies.get("token"),
      },
    }),
};
