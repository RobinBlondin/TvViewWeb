import { SlideModel } from "../models/SlideModel";
import { apiClient } from "./apiClient";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + "/api/slides";

export const getSlideById = async (id: string): Promise<SlideModel> => {
  return apiClient.get(`${API_BASE_URL}/${id}`).then((res) => res.data);
};

export const getAllSlides = async (): Promise<SlideModel[]> => {
  return apiClient.get(`${API_BASE_URL}/all`).then((res) => res.data);
};

export const deleteSlideById = async (id: string) => {
  apiClient.delete(`${API_BASE_URL}/delete/${id}`);
};

export const createSlide = async (
  slideModel: SlideModel,
): Promise<SlideModel> => {
  return apiClient
    .post(`${API_BASE_URL}/create`, slideModel)
    .then((res) => res.data);
};

export const updateSlide = async (
  slideModel: SlideModel,
): Promise<SlideModel> => {
  return apiClient
    .put(`${API_BASE_URL}/edit`, slideModel)
    .then((res) => res.data);
};
