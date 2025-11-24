import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api";

export const api = axios.create({
  baseURL: API_URL,
});

export const analyzeResumes = async (
  jobTitle: string,
  keywords: string,
  files: File[],
  apiKey: string
) => {
  const formData = new FormData();
  formData.append("job_title", jobTitle);
  formData.append("keywords", keywords);

  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await api.post("/analyze", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-api-key": apiKey,
    },
  });

  return response.data;
};
