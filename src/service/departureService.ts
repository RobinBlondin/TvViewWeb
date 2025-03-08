import { DepartureModel } from "../models/DepartureModel"
import { apiClient } from "./apiClient"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + "/api/commute"

export const getBusDepartures = async (): Promise<DepartureModel[]> => {
    return apiClient.get(`${API_BASE_URL}/bus`).then((res) => res.data)
}

export const getTrainDepartures = async (): Promise<DepartureModel[]> => {
    return apiClient.get(`${API_BASE_URL}/train`).then((res) => res.data)
}

export const getDeparturesByLine = async (line: string): Promise<DepartureModel[]> => {
    return apiClient.get(`${API_BASE_URL}/line/${line}`).then((res) => res.data)
}

export const getDeparturesByDirection = async (direction: string): Promise<DepartureModel[]> => {
    return apiClient.get(`${API_BASE_URL}/direction/${direction}`).then((res) => res.data)
}

export const getDeparturesByLineAndDirection = async (line: string, direction: string): Promise<DepartureModel[]> => {
    return apiClient.get(`${API_BASE_URL}/line-direction/${line}/${direction}`).then((res) => res.data)
}


