import { apiClient } from "./apiClient";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + "/api/files";

export const uploadFile = (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    return apiClient.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data", // This is optional! Axios sets it automatically.
        },
    }).then((res) => res.data);
};
