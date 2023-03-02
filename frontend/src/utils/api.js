import { axios } from "../lib/axios";

export const api = {
  get: (url, params = {}) =>
    axios.get(url, {
      ...params,

    }),
  post: (url, data) => axios.post(url, data, {}),
  patch: (url, data) => axios.patch(url, data, {}),
  put: (url, data) => axios.put(url, data, {}),
  delete: (url) => axios.delete(url, {}),
};
