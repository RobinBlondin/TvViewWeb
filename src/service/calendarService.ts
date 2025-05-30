import { CalendarEventModel } from "../models/CalendarEventModel";
import { apiClient } from "./apiClient";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + "/api/calendar";

export const getAllCalendarEvents = async (): Promise<CalendarEventModel[]> => {
  return apiClient.get(`${API_BASE_URL}/events`).then((res) => res.data);
};
