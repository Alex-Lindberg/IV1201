import { API_URL } from "../localization/routes";
import { api } from "../utils/api";

export const fetchTestData = async () => {
  return api.get(`${API_URL}/api/test`).then(({ data }) => {
    return data;
  });
};

export const fetchApplications = async () => {
  return api.get(`${API_URL}/api/applications`).then(({ data }) => {
    return data;
  });
};
