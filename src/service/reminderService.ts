import { ReminderModel } from "../models/ReminderModel"
import { apiClient } from "./apiClient"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + "/api/reminders"

export const getReminderById = async (id: string): Promise<ReminderModel> => {
    return apiClient.get(`${API_BASE_URL}/${id}`).then((res) => res.data)
}

export const getAllReminders = async (): Promise<ReminderModel[]> => {
    return apiClient.get(`${API_BASE_URL}/all`).then((res) => res.data)
}

export const deleteReminderById = async (id: string) => {
    apiClient.delete(`${API_BASE_URL}/delete/${id}`)
}

export const createReminder = async (reminderModel: ReminderModel): Promise<ReminderModel> => {
    return apiClient.post(`${API_BASE_URL}/create`, reminderModel).then((res) => res.data)
}

export const updateReminder = async (reminderModel: ReminderModel): Promise<ReminderModel> => {
    return apiClient.put(`${API_BASE_URL}/edit`, reminderModel).then((res) => res.data)
}


