import { API_URL } from "../config";
import { api } from "../utils/api";

export const login = async ({ username, password }) => {
  return api
    .post(`${API_URL}/api/login`, {
      username: username,
      password: password
    })
    .then(({ data }) => {
      return data;
    })
    .catch(console.error);
};
