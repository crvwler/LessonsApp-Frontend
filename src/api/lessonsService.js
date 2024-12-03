import apiClient from "./apiClient";

export const fetchLessons = async () => {
  try {
    const lessons = await apiClient.get("/lessons");
    return lessons;
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return [];
  }
};
