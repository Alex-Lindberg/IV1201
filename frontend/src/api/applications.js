import { API_URL } from "../config";
import { api } from "../utils/api";

export const fetchTestData = async () => {
  return api
    .get(`${API_URL}/api/test`)
    .then(({ data }) => {
      return data;
    })
    .catch(console.error);
};

export const fetchApplications = async () => {
  return api
    .get(`${API_URL}/api/applicants`)
    .then(({ data }) => {
      return data;
    })
    .catch(console.error);
};
