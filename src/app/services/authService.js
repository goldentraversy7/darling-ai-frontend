import api from "./api";

export const authService = {
  signIn: async (email, password) => {
    const response = await api.post("/auth/signin", { email, password });
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    return user;
  },

  signUp: async (name, email, password) => {
    const response = await api.post("/auth/signup", { name, email, password });
    return response.data;
  },

  signOut: () => {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  },

  getCurrentUser: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};
