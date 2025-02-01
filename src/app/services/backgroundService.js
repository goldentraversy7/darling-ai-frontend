import api from "./api";

export const backgroundService = {
  fetchBackgroundNews: async (params) => {
    const response = await api.get("/background/news", { params });
    return response.data;
  },
  fetchBackgroundSocialPosts: async (params) => {
    const response = await api.get("/background/social-post", { params });
    return response.data;
  },
  fetchBackgroundPublicReports: async (params) => {
    const response = await api.get("/background/public-record", { params });
    return response.data;
  },
};
