import api from "./api";

export const backgroundService = {
  fetchBackgroundNews: async (params) => {
    const response = await api.get("/background/news", { params });
    return response.data;
  },
};
