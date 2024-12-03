// src/api/lessonsService.js
import apiClient from "./apiClient";

export const fetchLessons = async () => {
  try {
    const response = await apiClient.get("/lessons");
    return response.data;
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return [];
  }
};
