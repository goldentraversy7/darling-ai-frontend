import api from "./api";

export const stockService = {
  getStock: async (params) => {
    const response = await api.get("/stock", { params });
    return response.data;
  },
};
