import { create } from "zustand";
import * as authApi from "../api/authApi";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  initialized: false,

  register: async (formData) => {
    set({ loading: true });
    try {
      const data = await authApi.register(formData);
      return data;
    } finally {
      set({ loading: false });
    }
  },

  verifyOtp: async (formData) => {
    set({ loading: true });
    try {
      const data = await authApi.verifyOtp(formData);
      return data;
    } finally {
      set({ loading: false });
    }
  },

  login: async (credentials) => {
    set({ loading: true });
    try {
      const data = await authApi.login(credentials);
      set({ user: data.data, isAuthenticated: true });
      return data;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await authApi.logout();

      set({
        user: null,
        isAuthenticated: false,
      });
    } finally {
      set({ loading: false });
    }
  },

  fetchCurrentUser: async () => {
    set({ loading: true });

    try {
      const data = await authApi.getCurrentUser();

      set({
        user: data.data,
        isAuthenticated: true,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
      });
    } finally {
      set({
        loading: false,
        initialized: true,
      });
    }
  },
}));
