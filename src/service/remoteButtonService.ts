import { apiClient } from "./apiClient";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + "/api/remote";

export const sendRemoteCommand = async (message: string): Promise<string> => {
  if (!message) {
    throw new Error("Message cannot be empty");
  }

  if (message !== "BUS" && message !== "TRAIN" && message !== "BRIDGE") {
    throw new Error("Invalid message");
  }

  return apiClient.get(`${API_BASE_URL}/${message}`).then((res) => res.data);
};
