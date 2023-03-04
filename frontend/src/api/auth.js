import { API_URL } from "../config";
import { api } from "../utils/api";

export const fetchUser = async () => {
  return api
    .get(`${API_URL}/api/users`)
    .then(({ data }) => {
      return data;
    })
    .catch(console.error);
};
