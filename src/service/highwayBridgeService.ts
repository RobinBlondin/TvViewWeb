import { apiClient } from "./apiClient";
import { HighwayBridgeModel } from "../models/HighwayBridgeModel";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL + "/api/highway-bridge-opening";

export const getHighwayBridgeOpenings = async (): Promise<
  HighwayBridgeModel[]
> => {
  return apiClient.get(`${API_BASE_URL}/all`).then((res) => res.data);
};
