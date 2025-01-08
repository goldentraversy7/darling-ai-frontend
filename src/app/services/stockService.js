import api from "./api";

export const stockService = {
  getStock: async () => {
    const response = await api.get("/stock");
    return response.data;
  },
};
