import { API_URL } from "../localization/routes";
import { api } from "../utils/api";

export const fetchUsers = async () => {
    return api.get(`${API_URL}/api/users`).then(({ data }) => {
        return data;
    });
};